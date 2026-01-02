import { useQuery } from "@tanstack/react-query";

const API_URL = import.meta.env.VITE_API_URL;

export function useFeed() {
  return useQuery({
    queryKey: ["feed"],
    queryFn: async () => {
      const res = await fetch(API_URL + "/api/feed");

      if (!res.ok) {
        throw new Error("Failed to fetch catalog");
      }

      const json = await res.json();

      // Estrarre TUTTI gli episodi da tutti gli anni e mesi
      const audio = json.audio || {};
      const allEpisodes: any[] = [];

      for (const yearKey of Object.keys(audio)) {
        const yearObj = audio[yearKey];
        if (!yearObj?.months) continue;

        for (const monthKey of Object.keys(yearObj.months)) {
          const monthObj = yearObj.months[monthKey];
          if (!monthObj?.episodes) continue;

          allEpisodes.push(...monthObj.episodes);
        }
      }

      return allEpisodes;
    },
  });
}
