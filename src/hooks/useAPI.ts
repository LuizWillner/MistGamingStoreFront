import { AxiosRequestConfig } from "axios";
import { useAxios } from "./useAxios";
import CustomError from "../util/customError";

export const useAPI = <T>(endpoint: string) => {

    const axiosInstance = useAxios();

    const recuperar = () =>
        axiosInstance
            .get<T[]>(endpoint)
            .then(res => res.data)
            .catch((error) => {
                if (error.response) {
                    // significa que o servidor respondeu, porém com erro
                    console.log("A requisição foi realizada e o servidor respondeu com as seguintes informações: ");
                    console.log("Mensagem do servidor: ", error.response.data);
                    console.log("Código de status: ", error.response.status);
                    throw new CustomError(
                        error.response.data.message,
                        error.response.data.errorCode
                    )
                }
                else if (error.request) {
                    // significa que a requisição foi enviada mas o servidor não respondeu
                    console.log("A requisição foi realizada mas nenhuma resposta foi recebida.");
                    console.log("URL Base: ", error.config.baseURL);
                    console.log("Método de envio: ", error.config.method);
                    console.log("URL solicitado: ", error.config.url);
                    throw error;
                }
                else {
                    // erro desconhecido
                    console.log("Algo aconteceu durante a configuração do pedido que acionou um erro: ", error.message);
                    throw error;
                }
            })

    const cadastrar = (obj: T) =>
        axiosInstance
            .post<T>(endpoint, obj)
            .then(res => res.data)
            .catch((error) => {
                if (error.response) {
                    // significa que o servidor respondeu, porém com erro
                    console.log("A requisição foi realizada e o servidor respondeu com as seguintes informações: ");
                    console.log("Mensagem do servidor: ", error.response.data);
                    console.log("Código de status: ", error.response.status);
                    if(error.response.data.errorCode === 422) {
                        throw new CustomError (
                            error.response.data.message,
                            error.response.data.errorCode,
                            Object.values(error.response.data.map)
                        )
                    }
                    throw new CustomError(
                        error.response.data.message,
                        error.response.data.errorCode
                    )
                }
                else if (error.request) {
                    // significa que a requisição foi enviada mas o servidor não respondeu
                    console.log("A requisição foi realizada mas nenhuma resposta foi recebida.");
                    console.log("URL Base: ", error.config.baseURL);
                    console.log("Método de envio: ", error.config.method);
                    console.log("URL solicitado: ", error.config.url);
                    throw error;
                }
                else {
                    // erro desconhecido
                    console.log("Algo aconteceu durante a configuração do pedido que acionou um erro: ", error.message);
                    throw error;
                }
            })

    const alterar = (obj: T) =>
        axiosInstance
            .put<T>(endpoint, obj)
            .then(res => res.data)
            .catch((error) => {
                if (error.response) {
                    // significa que o servidor respondeu, porém com erro
                    console.log("A requisição foi realizada e o servidor respondeu com as seguintes informações: ");
                    console.log("Mensagem do servidor: ", error.response.data);
                    console.log("Código de status: ", error.response.status);
                    if(error.response.data.errorCode === 422) {
                        throw new CustomError (
                            error.response.data.message,
                            error.response.data.errorCode,
                            Object.values(error.response.data.map)
                        )
                    }
                    throw new CustomError(
                        error.response.data.message,
                        error.response.data.errorCode
                    )
                }
                else if (error.request) {
                    // significa que a requisição foi enviada mas o servidor não respondeu
                    console.log("A requisição foi realizada mas nenhuma resposta foi recebida.");
                    console.log("URL Base: ", error.config.baseURL);
                    console.log("Método de envio: ", error.config.method);
                    console.log("URL solicitado: ", error.config.url);
                    throw error;
                }
                else {
                    // erro desconhecido
                    console.log("Algo aconteceu durante a configuração do pedido que acionou um erro: ", error.message);
                    throw error;
                }
            })
    return { recuperar, cadastrar, alterar };
}
