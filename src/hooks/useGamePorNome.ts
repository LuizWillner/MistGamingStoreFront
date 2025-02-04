import { useQuery } from "@tanstack/react-query";
import { useAPI } from "./useAPI";
import { Game } from "../interfaces/game";
import { URL_GAME } from "../util/constants";


export const useGamePorNome = (gameName: string) => {
    const { recuperar } = useAPI<Game>(URL_GAME + "/title/" + gameName);

    return useQuery({
        queryKey: ["games"],
        queryFn: () => recuperar(),
        staleTime: 10_000,
        keepPreviousData: true,
    });
}