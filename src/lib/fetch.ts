const getApiKey = (): string => {
  return import.meta.env.VITE_API_KEY;
};

const getUrl = (endpoint: string): string => {
  return `${import.meta.env.VITE_PUBLIC_API_URL}${endpoint}`;
};

export const customFetch = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {
  const apiKey = getApiKey();

  const response = await fetch(getUrl(url), {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      ...(options.headers || {}),
    },
  });

  let data;

  try {
    data = await response.json();
  } catch {
    data = {};
  }

  // O Orval espera que o mutador retorne um objeto que contenha 'data', 'status' e 'headers'
  // se ele estiver configurado para retornar a resposta completa.
  return {
    data,
    status: response.status,
    headers: response.headers,
  } as T;
};
