import type { GetSync200, GetSync200CategoriesItem, GetSync200SubcategoriesItem, GetSync200IncidencesItem } from "./api/fetch-generated";
const DB_NAME = "radiopos-db";
const DB_VERSION = 2;
const STORES = {
  DATA: "sync-data",
  SAVED: "saved-incidences",
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
    };
  });
};

// ... mergeById stays the same ...

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
    };
  } else {
    mergedData = data;
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
