import { useQuery } from "@tanstack/react-query";
import { AuthApi } from "../services";

const useAuth = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["auth"],
    retry: false,
    queryFn: () => AuthApi.auth(),
    staleTime: 1000 * 60 * 2, // 2 minutes
    refetchOnWindowFocus: false,
  })

  return { auth: data, isLoading, isError };
}

export default useAuth;