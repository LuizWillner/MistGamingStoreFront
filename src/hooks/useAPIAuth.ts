import { TokenResponse } from "../interfaces/tokenResponse";
import { User } from "../interfaces/user";
import { URL_USER_LOGIN } from "../util/constants";
import { useAxios } from "./useAxios";



export const useAPIAuth = () => {
  const axiosInstance = useAxios();

  const tratarErro = (error: any) => {
    console.log("Erro: ", error);

    if (error.response) {
      console.log(
        "A requisição foi realizada e o servidor respondeu com as seguintes informações: "
      );
      console.log("Mensagem do servidor: ", error.response.data);
      console.log("Código de status: ", error.response.status);
    } else if (error.request && error.config) {
      console.log(
        "A requisição foi realizada mas nenhuma resposta foi recebida."
      );
      console.log("URL Base: ", error.config.baseURL);
      console.log("Método de envio: ", error.config.method);
      console.log("URL solicitado: ", error.config.url);
    } else {
      console.log(
        "Algo aconteceu durante a configuração do pedido que acionou um erro: ",
        error.message
      );
    }
  };

  const login = (user: User) =>
    axiosInstance
      .post<TokenResponse>(URL_USER_LOGIN, user)
      .then((res) => res.data)
      .catch((error) => {
        tratarErro(error);
        throw error;
      }); 

  return { login };

};