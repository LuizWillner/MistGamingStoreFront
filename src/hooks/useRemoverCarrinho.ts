import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAPICarrinho } from "./useAPICarrinho";


interface QueryString {
  cartId: number;
  userId: number;
}


export const useRemoverCarrinho = (queryString: QueryString) => {
  const { removerCarrinho } = useAPICarrinho();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (queryString: QueryString) => removerCarrinho({
      params: {
        ...queryString
      }
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["usuario", "carrinho", queryString],
      });
    },
  });
};