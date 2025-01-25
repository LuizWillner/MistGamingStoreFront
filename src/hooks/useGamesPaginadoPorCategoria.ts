import { useInfiniteQuery } from "@tanstack/react-query";
import { Game } from "../interfaces/game";
import { ResultadoPaginado } from "../interfaces/resultadoPaginado";
import { useAPIGame } from "./useAPIGame";

interface QueryString {
  size: number;
  categoryName?: string;
}

export const useGamesPaginadosPorCategoria = (query: QueryString) => {
  const { recuperarGamePaginadoPorCategoria } = useAPIGame();

  return useInfiniteQuery<ResultadoPaginado<Game>>({
    queryKey: ["games", "categoria", "paginacao", query],
    queryFn: ({ pageParam = 0 }) =>
      recuperarGamePaginadoPorCategoria({
        params: {
          page: pageParam,
          size: query.size,
          categoryName: query.categoryName,
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
