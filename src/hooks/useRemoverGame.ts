import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../util/constants";
import { URL_GAME } from "../util/constants";

export const useRemoverGame = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) =>
      axios.delete(BASE_URL + URL_GAME + "/" + id).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["games"],
      });
    },
  });
};