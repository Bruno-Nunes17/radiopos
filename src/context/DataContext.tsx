import React, { createContext, useEffect, useState } from "react";
import type { GetSync200, GetSync200IncidencesItem } from "../lib/api/fetch-generated";
import { syncAppData } from "../lib/sync";
import { getSyncData, getSavedIncidences, saveIncidenceLocal, removeIncidenceLocal, getRecentIncidences, saveRecentIncidence } from "../lib/offline-db";

export interface DataContextType {
  data: GetSync200 | null;
  loading: boolean;
  savedIncidences: GetSync200IncidencesItem[];
  recentIncidences: GetSync200IncidencesItem[];
  sync: () => Promise<void>;
  toggleSave: (incidence: GetSync200IncidencesItem) => Promise<void>;
  isSaved: (id: string) => boolean;
  addToRecent: (incidence: GetSync200IncidencesItem) => Promise<void>;
}

export const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<GetSync200 | null>(null);
  const [loading, setLoading] = useState(true);
  const [savedIncidences, setSavedIncidences] = useState<GetSync200IncidencesItem[]>([]);
  const [recentIncidences, setRecentIncidences] = useState<GetSync200IncidencesItem[]>([]);

  const sync = async () => {
    setLoading(true);
    const result = await syncAppData();
    if (result) {
      setData(result);
    }
    setLoading(false);
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

  const addToRecent = async (incidence: GetSync200IncidencesItem) => {
    await saveRecentIncidence(incidence);
    const updatedRecent = await getRecentIncidences(5);
    setRecentIncidences(updatedRecent);
  };

  useEffect(() => {
    const init = async () => {
      const [local, saved, recent] = await Promise.all([
        getSyncData(), 
        getSavedIncidences(),
        getRecentIncidences(5)
      ]);
      
      if (local) setData(local);
      setSavedIncidences(saved);
      setRecentIncidences(recent);
      
      if (local) setLoading(false);
      
      await sync();
    };

    init();
  }, []);

  return (
    <DataContext.Provider value={{ 
      data, 
      loading, 
      savedIncidences, 
      recentIncidences, 
      sync, 
      toggleSave, 
      isSaved,
      addToRecent
    }}>
      {children}
    </DataContext.Provider>
  );
};
