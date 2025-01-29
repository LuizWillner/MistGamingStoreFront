import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAPICarrinho } from "./useAPICarrinho";


interface QueryString {
  cartId: number;
  userId: number;
}


export const useComprarCarrinho = (queryString: QueryString) => {
  const { comprarCarrinho } = useAPICarrinho();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (queryString: QueryString) => comprarCarrinho({
      params: {
        cartId: queryString.cartId,
        userId: queryString.userId,
      }
    }),
    onSuccess: () => {
      console.log("Sucesso na compra!");
      queryClient.invalidateQueries({
        queryKey: ["carrinho"],
      });
    },
  });
};