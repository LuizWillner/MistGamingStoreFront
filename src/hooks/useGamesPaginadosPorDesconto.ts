import { useInfiniteQuery } from "@tanstack/react-query";
import { Game } from "../interfaces/game";
import { ResultadoPaginado } from "../interfaces/resultadoPaginado";
import { useAPIGame } from "./useAPIGame";

interface QueryString {
  size: number;
  discountMin?: number;
  discountMax?: number;
}

export const useGamesPaginadosPorDesconto = (query: QueryString) => {
  const { recuperarGamePaginadoPorDesconto } = useAPIGame();

  return useInfiniteQuery<ResultadoPaginado<Game>>({
    queryKey: ["games", "desconto", "paginacao", query],
    queryFn: ({ pageParam = 0 }) =>
      recuperarGamePaginadoPorDesconto({
        params: {
          page: pageParam,
          size: query.size,
          discountMin: query.discountMin,
          discountMax: query.discountMax,
        },
      }),
    staleTime: 10_000,
    keepPreviousData: true,

    getNextPageParam: (lastPage, allPages) => {
      return lastPage.paginaCorrente < lastPage.totalDePaginas - 1
        ? lastPage.paginaCorrente + 1
        : undefined;
    },
  });
};
