import { useAxios } from "./useAxios";
import { AxiosRequestConfig } from "axios";
// import Item_carrinho from "../interfaces/item_carrinho";
import { URL_GAME_PAGEABLE } from "../util/constants";
import { Game } from "../interfaces/game";
import { ResultadoPaginado } from "../interfaces/resultadoPaginado";
import CustomError from "../util/customError";

export const useAPIGame = () => {
  const axiosInstance = useAxios();

  //   const recuperarIngressoPorTituloFilme = (tituloFilme?: string) =>
  //     axiosInstance
  //       .get<Ingresso[]>(
  //         URL_INGRESSOS + (tituloFilme ? "/sessao/" + tituloFilme : "")
  //       )
  //       .then((res) => res.data)
  //       .catch((error) => {
  //         if (error.response) {
  //           // significa que o servidor respondeu, porém com erro
  //           throw new CustomError(
  //             error.response.data.message,
  //             error.response.data.errorCode
  //           );
  //         } else if (error.request) {
  //           // significa que a requisição foi enviada mas o servidor não respondeu
  //           throw error;
  //         } else {
  //           // erro desconhecido
  //           throw error;
  //         }
  //       });

  const recuperarGamePaginadoPorDesconto = (config: AxiosRequestConfig) =>
    axiosInstance
      .get<ResultadoPaginado<Game>>(URL_GAME_PAGEABLE + "/discount", config)
      .then((res) => res.data)
      .catch((error) => {
        if (error.response) {
          // significa que o servidor respondeu, porém com erro
          throw new CustomError(
            error.response.data.message,
            error.response.data.errorCode
          );
        } else if (error.request) {
          // significa que a requisição foi enviada mas o servidor não respondeu
          throw error;
        } else {
          // erro desconhecido
          throw error;
        }
      });

  const recuperarGamePaginadoPorCategoria = (config: AxiosRequestConfig) =>
    axiosInstance
      .get<ResultadoPaginado<Game>>(
        URL_GAME_PAGEABLE + "/category/name",
        config
      )
      .then((res) => res.data)
      .catch((error) => {
        if (error.response) {
          // significa que o servidor respondeu, porém com erro
          throw new CustomError(
            error.response.data.message,
            error.response.data.errorCode
          );
        } else if (error.request) {
          // significa que a requisição foi enviada mas o servidor não respondeu
          throw error;
        } else {
          // erro desconhecido
          throw error;
        }
      });
  //   const recuperarItensCarrinho = (idCarrinho: number) =>
  //     axiosInstance
  //       .get<Item_carrinho[]>(URL_ITEM + "/" + String(idCarrinho))
  //       .then((res) => res.data)
  //       .catch((error) => {
  //         if (error.response) {
  //           // significa que o servidor respondeu, porém com erro
  //           throw new CustomError(
  //             error.response.data.message,
  //             error.response.data.errorCode
  //           );
  //         } else if (error.request) {
  //           // significa que a requisição foi enviada mas o servidor não respondeu
  //           throw error;
  //         } else {
  //           // erro desconhecido
  //           throw error;
  //         }
  //       });

  return {
    // recuperarIngressoPorTituloFilme,
    recuperarGamePaginadoPorDesconto,
    recuperarGamePaginadoPorCategoria,
    // recuperarItensCarrinho,
  };
};
