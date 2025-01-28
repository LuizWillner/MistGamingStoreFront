import { useAxios } from "./useAxios";
import { AxiosRequestConfig } from "axios";
import { URL_CART } from "../util/constants";
import CustomError from "../util/customError";
import { Cart } from "../interfaces/cart";


export const useAPICarrinho = () => {

  const axiosInstance = useAxios();

  const recuperarCarrinho = (config: AxiosRequestConfig) => 
    axiosInstance
      .get<Cart>(URL_CART, config)
      .then(res => res.data)
      .catch((error) => {
          if (error.response) {
              // significa que o servidor respondeu, porém com erro
              throw new CustomError(
                  error.response.data.message,
                  error.response.data.errorCode
              )
          }
          else if (error.request) {
              // significa que a requisição foi enviada mas o servidor não respondeu
              throw error;
          }
          else {
              // erro desconhecido
              throw error;
          }
      });

  const removerCarrinho = (config: AxiosRequestConfig) =>
    axiosInstance
      .delete(URL_CART, config)
      .then(res => res.data)
      .catch((error) => {
        if (error.response) {
            // significa que o servidor respondeu, porém com erro
            throw new CustomError(
                error.response.data.message,
                error.response.data.errorCode
            )
        }
        else if (error.request) {
            // significa que a requisição foi enviada mas o servidor não respondeu
            throw error;
        }
        else {
            // erro desconhecido
            throw error;
        }
  });
  
  return { recuperarCarrinho, removerCarrinho };
}