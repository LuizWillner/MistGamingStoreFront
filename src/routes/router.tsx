import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./Layout";
import { HomePage } from "../pages/HomePage";
import { CardsJogoPorDesconto } from "../pages/CardsJogoPorDesconto";
import { CardsJogo } from "../pages/CardsJogo";
import { ListarJogosPage } from "../pages/ListarJogosPage";
import { DetalhesGame } from "../pages/DetalhesGame";
import { PainelAdminPage } from "../pages/PainelAdminPage";
import { SobrePage } from "../pages/SobrePage";
import { CarrinhoPage } from "../pages/CarrinhoPage";
import { PrivateRoutes } from "./PrivateRoutes";
import { LoginPage } from "../pages/LoginPage";
import { ErrorPage } from "../pages/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <HomePage />,
        children: [
          {
            path: ":gamesDesconto?",
            element: <CardsJogoPorDesconto />,
          },
        ],
      },
      {
        path: "listar-jogos", 
        element: <ListarJogosPage />,
        children: [
          {
            path: ":nomeCategoria?",
            element: <CardsJogo />,
          }
        ],
      },
      { path: "detalhesGame/:gameName", element: <DetalhesGame /> },
      { path: "sobre", element: <SobrePage /> },
      { path: "login", element: <LoginPage /> },
    ],
  },
  {
    path: "/",
    element: <PrivateRoutes />,
    errorElement: <ErrorPage />,
    children: [
      { path: "painel-admin", element: <PainelAdminPage /> },
      { path: "carrinho", element: <CarrinhoPage /> },
    ],
  }
]);
