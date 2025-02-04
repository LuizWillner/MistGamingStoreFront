import { useMutation } from "@tanstack/react-query";
import { useAPIAuth} from "./useAPIAuth";
import { User } from "../interfaces/user";


export const useEfetuarLogin = () => {
  const { login } = useAPIAuth();

  return useMutation({
    mutationFn: (usuario: User) => login(usuario),

  });
}