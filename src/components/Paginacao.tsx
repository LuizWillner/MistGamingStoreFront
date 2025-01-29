import React from "react";
import { useGameStore } from "../store/useGameStore";
import { useGamesPaginado } from "../hooks/useGamesPaginado";


export const Paginacao = () => {

  const page = useGameStore(s => s.pagina);
  const size = useGameStore(s => s.tamanho);
  const name = useGameStore(s => s.nome);

  const setPagina = useGameStore(s => s.setPagina);

  const tratarPaginaSelecionada = (page: number) => setPagina(page);

  const {
    data: gamesPaginados,
    isLoading: carregandoGames,
    error: errorGames,
  } = useGamesPaginado({ page, size, name, sort: "name", order: "asc" });


    if (carregandoGames) return <h6>Carregando...</h6>;

    if (errorGames) throw errorGames;

    const totalDePaginas = gamesPaginados!.totalDePaginas;

    const arrayDePaginas = [];


  if (totalDePaginas < 2) return null;

  for (let i = 0; i < totalDePaginas; i++) {
    arrayDePaginas.push(
      <li key={i} className={page === i ? "page-item active" : "page-item"} aria-current="page">
        <a onClick={() => tratarPaginaSelecionada(i)} className="page-link">
          {i + 1}
        </a>
      </li>
    );
  }
  return (
    <nav aria-label="Paginacao">
      <ul className="pagination">
        <li className={page === 0 ? "page-item disabled" : "page-item"}>
          <a onClick={() => tratarPaginaSelecionada(page - 1)} className="page-link">Anterior</a>
        </li>
        {arrayDePaginas}
        <li className={page === totalDePaginas - 1 ? "page-item disabled" : "page-item"}>
          <a onClick={() => tratarPaginaSelecionada(page + 1)} className="page-link">
            Próxima
          </a>
        </li>
      </ul>
    </nav>
  );
};