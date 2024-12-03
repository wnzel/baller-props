import { useQuery } from "@tanstack/react-query";

const fetchGameData = async () => {
  const response = await fetch(import.meta.env.VITE_BACKEND_URL);
  if (!response.ok) {
    throw new Error("error fetching backend data");
  }
  return response.json();
};

const useGameData = () => {
  return useQuery({
    queryKey: ["gamesData"],
    queryFn: fetchGameData,
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5,
  });
};

export default useGameData;
