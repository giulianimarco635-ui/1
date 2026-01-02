import { useQuery } from "@tanstack/react-query";
import { api, type CatalogResponse } from "@shared/routes";

// URL del backend letto dalla variabile ambiente di Vite
const API_URL = import.meta.env.VITE_API_URL;

export function useFeed() {
  return useQuery<CatalogResponse>({
    queryKey: [api.feed.get.path],
    queryFn: async () => {
      // Costruisce l'URL completo: https://one-85nh.onrender.com + /feed (o qualunque sia il path)
      const res = await fetch(API_URL + api.feed.get.path);

      if (!res.ok) {
        throw new Error("Failed to fetch catalog");
      }

      return api.feed.get.responses[200].parse(await res.json());
    },
  });
}
