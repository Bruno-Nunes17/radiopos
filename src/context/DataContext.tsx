import React, { createContext, useEffect, useState } from "react";
import type { GetSync200, GetSync200IncidencesItem } from "../lib/api/fetch-generated";
import { syncAppData } from "../lib/sync";
import { getSyncData, getSavedIncidences, saveIncidenceLocal, removeIncidenceLocal } from "../lib/offline-db";

export interface DataContextType {
  data: GetSync200 | null;
  loading: boolean;
  savedIncidences: GetSync200IncidencesItem[];
  sync: () => Promise<void>;
  toggleSave: (incidence: GetSync200IncidencesItem) => Promise<void>;
  isSaved: (id: string) => boolean;
}

export const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<GetSync200 | null>(null);
  const [loading, setLoading] = useState(true);
  const [savedIncidences, setSavedIncidences] = useState<GetSync200IncidencesItem[]>([]);

  const sync = async () => {
    setLoading(true);
    const result = await syncAppData();
    if (result) {
      setData(result);
    }
    setLoading(false);
  };

  const loadSaved = async () => {
    const saved = await getSavedIncidences();
    setSavedIncidences(saved);
  };

  const toggleSave = async (incidence: GetSync200IncidencesItem) => {
    const alreadySaved = savedIncidences.some(i => i.id === incidence.id);
    if (alreadySaved) {
      await removeIncidenceLocal(incidence.id);
      setSavedIncidences(prev => prev.filter(i => i.id !== incidence.id));
    } else {
      await saveIncidenceLocal(incidence);
      setSavedIncidences(prev => [...prev, incidence]);
    }
  };

  const isSaved = (id: string) => {
    return savedIncidences.some(i => i.id === id);
  };

  useEffect(() => {
    const init = async () => {
      // Carregar salvos e local primeiro
      const [local, saved] = await Promise.all([getSyncData(), getSavedIncidences()]);
      
      if (local) setData(local);
      setSavedIncidences(saved);
      
      if (local) setLoading(false);
      
      // Sincronizar em background
      await sync();
    };

    init();
  }, []);

  return (
    <DataContext.Provider value={{ data, loading, savedIncidences, sync, toggleSave, isSaved }}>
      {children}
    </DataContext.Provider>
  );
};
