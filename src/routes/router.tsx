import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./Layout";
import { HomePage } from "../pages/HomePage";
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
        // children: [],
      },
    ],
  },
]);
