import { useQuery } from "@tanstack/react-query";
import { fetchManagerData } from '../services/managerApi';

export const useManager = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["manager"],
    queryFn: () => fetchManagerData(),
    staleTime: 1000 * 60 * 2, // 2 minutes
    refetchOnWindowFocus: false,
  })

  return { managerData: data, isLoading, isError };
}