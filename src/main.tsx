import { StrictMode } from "react";
import { createRoot } from "react-dom/client"; // DOM = Document Object Model: uma estrutura em árvore que representa o documento HTML através do JS/TS.
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
