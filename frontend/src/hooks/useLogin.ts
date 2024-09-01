import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthApi } from "../services";
import { useNavigate } from "react-router-dom";

type UseLoginProps = {
  redirect: string
}

type LoginCredentials = {
  email: string;
  password: string;
}

const useLogin = ({ redirect }: UseLoginProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutateAsync: login, isLoading, isError } = useMutation({
    mutationFn: (credentials: LoginCredentials) => AuthApi.login(credentials.email, credentials.password),
    retry: false,
    onSuccess: () => {
      navigate(redirect);
      void queryClient.invalidateQueries(['auth']);
    },
  })

  return { login, isLoading, isError };
}

export default useLogin;