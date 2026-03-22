import React, { createContext, useEffect, useState } from "react";
import type { GetSync200 } from "../lib/api/fetch-generated";
import { syncAppData } from "../lib/sync";
import { getSyncData } from "../lib/offline-db";

export interface DataContextType {
  data: GetSync200 | null;
  loading: boolean;
  sync: () => Promise<void>;
}

export const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<GetSync200 | null>(null);
  const [loading, setLoading] = useState(true);

  const sync = async () => {
    setLoading(true);
    const result = await syncAppData();
    if (result) {
      setData(result);
    }
    setLoading(false);
  };

  useEffect(() => {
    // Primeiro tenta carregar o que já está salvo
    const loadLocal = async () => {
      const local = await getSyncData();
      if (local) {
        setData(local);
        setLoading(false);
      }
      
      // Depois tenta sincronizar em background
      await sync();
    };

    loadLocal();
  }, []);

  return (
    <DataContext.Provider value={{ data, loading, sync }}>
      {children}
    </DataContext.Provider>
  );
};
