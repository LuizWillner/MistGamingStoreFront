import { useQuery } from "@tanstack/react-query";
import { useAPICarrinho } from "./useAPICarrinho";


interface QueryString {
  cartId: number;
  userId: number;
}


export const useRecuperarCarrinho = (queryString: QueryString) => {
  const { recuperarCarrinho } = useAPICarrinho();

  return useQuery({
    queryKey: ["carrinho", "item"],
    queryFn: () => recuperarCarrinho({
      params: {
        ...queryString
      }
    }),
    staleTime: 10_000,
    // keepPreviousData: true,
  });

}