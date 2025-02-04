import { useQuery } from "@tanstack/react-query";
import { useAPI } from "./useAPI";
import { Category } from "../interfaces/category";
import { URL_CATEGORY } from "../util/constants";

export const useCategorias = () => {
  const { recuperar } = useAPI<Category>(URL_CATEGORY);

  return useQuery({
    queryKey: ["categorias"],
    queryFn: () => recuperar(),
    staleTime: 7 * 24 * 60 * 60 * 1000,
    keepPreviousData: true,
  });
};
