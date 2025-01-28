import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./Layout";
import { HomePage } from "../pages/HomePage";
import { CardsJogoPorDesconto } from "../pages/CardsJogoPorDesconto";
import { CardsJogo } from "../pages/CardsJogo";
import { ListarJogosPage } from "../pages/ListarJogosPage";
import { DetalhesGame } from "../pages/DetalhesGame";
import { PainelAdminPage } from "../pages/PainelAdminPage";
import { SobrePage } from "../pages/SobrePage";
// import ErrorPage from "../pages/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    // errorElement: <ErrorPage />,
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
      { path: "detalhesGame", element: <DetalhesGame /> },
      {path: "painel-admin", element: <PainelAdminPage />},
      {path: "sobre", element: <SobrePage /> },
    ],
  },
]);
