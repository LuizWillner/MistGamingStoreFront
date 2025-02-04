import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import { NavBar } from "../components/NavBar";

interface AxiosError {
  response?: {
    data: any;
    status: number;
    statusText: string;
  };
  request?: any;
  config?: {
    baseURL: string;
    method: string;
    url: string;
  };
  message?: string;
}

export const ErrorPage = () => {
  const error = useRouteError() as AxiosError; // cast para AxiosError

  return (
    <>
      <NavBar />
      <div className="container mt-3">
        <h3>Ops! Houve um erro na aplicação 💀</h3>
        <hr className="mt-1" />
        {isRouteErrorResponse(error) ? (
          "Página requisitada inválida"
        ) : error.response ? (
          <div>
            <h4>Mensagem do servidor:</h4>
            <pre style={{ marginBottom: "0px" }}>
              {JSON.stringify(error.response.data, null, 2)}
            </pre>
          </div>
        ) : error.request ? (
          <div>
            <h4>Erro de requisição:</h4>
            <p>A requisição foi feita, mas não houve resposta do servidor.</p>
            {error.config ? (
              <div>
                <p>
                  <strong>URL Base:</strong> {error.config.baseURL}
                  <br />
                  <strong>Método:</strong> {error.config.method}
                  <br />
                  <strong>URL:</strong> {error.config.url}
                  <br />
                </p>
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          <div>
            <h4>Mensagem do erro:</h4>
            <p>{error.message || "Erro desconhecido"}</p>
          </div>
        )}
      </div>
    </>
  );
};
