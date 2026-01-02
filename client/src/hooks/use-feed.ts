const API_URL = "https://one-85nh.onrender.com";

export function useFeed() {
  return useQuery({
    queryKey: [api.feed.get.path],
    queryFn: async () => {
      const res = await fetch(API_URL + api.feed.get.path);
      if (!res.ok) {
        throw new Error('Failed to fetch catalog');
      }
      return api.feed.get.responses[200].parse(await res.json());
    },
  });
}
