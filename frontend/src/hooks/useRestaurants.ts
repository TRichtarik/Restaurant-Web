import { useQuery } from "@tanstack/react-query";
import { RestaurantsApi } from "../services/";

const useRestaurants = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [],
    retry: false,
    queryFn: () => RestaurantsApi.getAll(),
    staleTime: 1000 * 60 * 2, // 2 minutes
    refetchOnWindowFocus: false,
  });

  return { restaurants: data, isLoading, isError, error };
};

export default useRestaurants;