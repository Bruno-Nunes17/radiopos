import { getSync } from "./api/fetch-generated";
import { saveSyncData, getSyncData } from "./offline-db";

export const syncAppData = async () => {
  try {
    const localData = await getSyncData();
    
    // A API agora exige o parâmetro 'since'
    const since = localData?.syncedAt || "2000-01-01T00:00:00Z";
    
    const response = await getSync({ since });
    
    if (response.status === 200 && 'syncedAt' in response.data) {
      // Se a API retornou novos dados, salvamos (a função saveSyncData já faz o merge)
      await saveSyncData(response.data);
      console.log("Dados sincronizados com sucesso");
      
      // Sempre retornamos o estado completo do banco local após o merge
      return await getSyncData();
    }
    
    return localData;
  } catch (error) {
    console.error("Erro ao sincronizar dados:", error);
    // Se falhar (ex: offline), tenta retornar o que tem no local
    return await getSyncData();
  }
};
