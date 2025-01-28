import { useQuery } from "@tanstack/react-query";
import { useAPIGame } from "./useAPIGame";

interface QueryString {
    page: number;
    size: number;
    name: string;
}

export const useGamesPaginado = (queryString: QueryString) => {
    const { recuperarGamePaginado } = useAPIGame();

    return useQuery({
        queryKey: ["games", "paginacao", queryString],
        queryFn: () => recuperarGamePaginado({
            params: {
                ...queryString
            }
        }),
        staleTime: 10_000,
        keepPreviousData: true,

        // getNextPageParam: (lastPage, allPages) => {
        //     return lastPage.paginaCorrente < lastPage.totalDePaginas - 1
        //       ? lastPage.paginaCorrente + 1
        //       : undefined;
        // },
    });
}