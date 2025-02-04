import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAPI } from "./useAPI";
import { Game } from "../interfaces/game";
import { URL_GAME } from "../util/constants";

export const useAlterarGame = () => {
  const { alterar } = useAPI<Game>(URL_GAME);
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (game: Game) => alterar(game),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["games"],
      });
    },
  });
};
