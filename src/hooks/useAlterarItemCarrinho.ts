import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CartItem } from "../interfaces/cartItem";
import { useAPI } from "./useAPI";
import { URL_CART_ITEM } from "../util/constants";


export const useAlterarItemCarrinho = () => {
  const { alterar } = useAPI<CartItem>(URL_CART_ITEM);
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (cartItem: CartItem) => alterar(cartItem),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["carrinho", "item"],
      });
    },
  });
};
