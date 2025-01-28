import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CartItem } from "../interfaces/cartItem";
import { useAPI } from "./useAPI";
import { URL_CART_ITEM } from "../util/constants";

export const useRemoverItemCarrinho = () => {
  const { removerPorId } = useAPI<CartItem>(URL_CART_ITEM);
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => removerPorId(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["carrinho", "item", "remover"],
      });
    },
  });
};
