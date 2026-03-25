import type { GetSync200, GetSync200IncidencesItem } from "./api/fetch-generated";
const DB_NAME = "radiopos-db";
const DB_VERSION = 3;
const STORES = {
  DATA: "sync-data",
  SAVED: "saved-incidences",
  RECENT: "recent-incidences",
};

export const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORES.DATA)) {
        db.createObjectStore(STORES.DATA);
      }
      if (!db.objectStoreNames.contains(STORES.SAVED)) {
        db.createObjectStore(STORES.SAVED, { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains(STORES.RECENT)) {
        db.createObjectStore(STORES.RECENT, { keyPath: "id" });
      }
    };
  });
};

// ... mergeById and other functions ...

export const saveRecentIncidence = async (incidence: GetSync200IncidencesItem): Promise<void> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORES.RECENT, "readwrite");
    const store = transaction.objectStore(STORES.RECENT);

    // Adicionamos a data de acesso para ordenar
    const itemWithTimestamp = { ...incidence, lastAccessed: Date.now() };
    const request = store.put(itemWithTimestamp);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

export const getRecentIncidences = async (limit = 5): Promise<GetSync200IncidencesItem[]> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORES.RECENT, "readonly");
    const store = transaction.objectStore(STORES.RECENT);
    const request = store.getAll();

    request.onsuccess = () => {
      const result = (request.result || []) as (GetSync200IncidencesItem & { lastAccessed: number })[];
      // Ordenar por data de acesso (mais recente primeiro) e limitar
      const sorted = result
        .sort((a, b) => b.lastAccessed - a.lastAccessed)
        .slice(0, limit);
      resolve(sorted);
    };
    request.onerror = () => reject(request.error);
  });
};


export const saveIncidenceLocal = async (incidence: GetSync200IncidencesItem): Promise<void> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORES.SAVED, "readwrite");
    const store = transaction.objectStore(STORES.SAVED);
    const request = store.put(incidence);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

export const removeIncidenceLocal = async (id: string): Promise<void> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORES.SAVED, "readwrite");
    const store = transaction.objectStore(STORES.SAVED);
    const request = store.delete(id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

export const getSavedIncidences = async (): Promise<GetSync200IncidencesItem[]> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORES.SAVED, "readonly");
    const store = transaction.objectStore(STORES.SAVED);
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () => reject(request.error);
  });
};

const mergeById = <T extends { id: string }>(current: T[], incoming: T[]): T[] => {
  const map = new Map<string, T>();
  current.forEach(item => map.set(item.id, item));
  incoming.forEach(item => map.set(item.id, item));
  return Array.from(map.values());
};

const pruneStore = async (storeName: string, validIds: string[]): Promise<void> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);
    const request = store.getAll();

    request.onsuccess = () => {
      const items = (request.result || []) as { id: string }[];
      const deletePromises = items
        .filter((item) => !validIds.includes(item.id))
        .map((item) => {
          return new Promise<void>((res, rej) => {
            const delRequest = store.delete(item.id);
            delRequest.onsuccess = () => res();
            delRequest.onerror = () => rej(delRequest.error);
          });
        });
      Promise.all(deletePromises).then(() => resolve()).catch(reject);
    };
    request.onerror = () => reject(request.error);
  });
};

export const saveSyncData = async (data: GetSync200): Promise<void> => {
  const db = await openDB();
  const currentData = await getSyncData();

  let mergedData: GetSync200;

  if (currentData) {
    mergedData = {
      syncedAt: data.syncedAt,
      categories: mergeById(currentData.categories, data.categories),
      subcategories: mergeById(currentData.subcategories, data.subcategories),
      incidences: mergeById(currentData.incidences, data.incidences),
      allIds: data.allIds,
    };
  } else {
    mergedData = data;
  }

  // Limpeza de Cache (Pruning)
  // Deletar as incidências órfãs antes das subcategorias se necessário.
  // Aqui filtramos as listas locais baseadas no allIds do servidor.
  if (data.allIds) {
    mergedData.incidences = mergedData.incidences.filter(item => 
      data.allIds.incidences.includes(item.id)
    );
    
    mergedData.subcategories = mergedData.subcategories.filter(item => 
      data.allIds.subcategories.includes(item.id)
    );
    
    mergedData.categories = mergedData.categories.filter(item => 
      data.allIds.categories.includes(item.id)
    );

    // Pruning de outras stores que guardam incidências
    await pruneStore(STORES.SAVED, data.allIds.incidences);
    await pruneStore(STORES.RECENT, data.allIds.incidences);
  }

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORES.DATA, "readwrite");
    const store = transaction.objectStore(STORES.DATA);
    const request = store.put(mergedData, "latest");

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

export const getSyncData = async (): Promise<GetSync200 | null> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORES.DATA, "readonly");
    const store = transaction.objectStore(STORES.DATA);
    const request = store.get("latest");

    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(request.error);
  });
};

export const clearSyncData = async (): Promise<void> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORES.DATA, "readwrite");
    const store = transaction.objectStore(STORES.DATA);
    const request = store.delete("latest");

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};
