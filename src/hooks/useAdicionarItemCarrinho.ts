import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAPI } from "./useAPI";
import { URL_CART_ITEM } from "../util/constants";
import { CartItemPost } from "../interfaces/cartItem";


export const useAdicionarItemCarrinho = () => {
  const { cadastrar } = useAPI<CartItemPost>(URL_CART_ITEM);
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (cartItemPost: CartItemPost) => cadastrar(cartItemPost),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["carrinho", "item"],
      });
    },
  });
};
