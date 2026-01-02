import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

const API_URL = import.meta.env.VITE_API_URL;

export function useFeed() {
  return useQuery({
    queryKey: [api.feed.get.path],
    queryFn: async () => {
      const res = await fetch(API_URL + "/api/feed");

      if (!res.ok) {
        throw new Error("Failed to fetch catalog");
      }

      return api.feed.get.responses[200].parse(await res.json());
    },
  });
}
