import dayjs from "dayjs";
import React, { useState } from "react";
import { Game } from "../interfaces/game";
import { useGameStore } from "../store/useGameStore";
import { useRemoverGame } from "../hooks/useRemoverGame";
import { useGamesPaginadosPorCategoria } from "../hooks/useGamesPaginadoPorCategoria";
import { useGamesPaginado } from "../hooks/useGamesPaginado";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faSort, faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";
import { Spinner } from "react-bootstrap";
import "../styles/TabelaDeGames.css";
import { render } from "react-dom";


export const TabelaDeGames = () => {

    const [removendoGameId, setRemovendoGameId] = useState<number | null>(null);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [sortColumn, setSortColumn] = useState<string>("gameId");

    const page = useGameStore(s => s.pagina);
    const size = useGameStore(s => s.tamanho);
    const name = useGameStore(s => s.nome);

    const setPagina = useGameStore(s => s.setPagina);
    const setGameSelecionado = useGameStore(s => s.setGameSelecionado);

    const {
      data: gameRemovido,
      mutate: removerGame,
      isLoading: removendoGame,
      // isPending: removendoGame,
      error: erroRemoverGame,
    } = useRemoverGame();

    const {
      data: gamesPaginados,
      isLoading: carregandoGames,
      error: errorGames,
    } = useGamesPaginado({page, size, name, sort: sortColumn, order: sortOrder});

    if (carregandoGames) return <h6>Carregando...</h6>;
    if (errorGames) throw errorGames;
    if (erroRemoverGame) throw erroRemoverGame;

    const games = gamesPaginados!.itens;

    const tratarRemocaoGame = (gameId: number) => {
      setRemovendoGameId(gameId);
      removerGame(gameId, {
        onSettled: () => {
          setRemovendoGameId(null);
        },
      });
      setPagina(0);
    };

    const tratarGameSelecionado = (game: Game) => setGameSelecionado(game);

    const handleSort = (column: string) => {
      if (sortColumn === column) {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
      } else {
        setSortColumn(column);
        setSortOrder("asc");
      }
      setPagina(0); // Resetar para a primeira página ao ordenar
    }

    const renderSortIcon = (column: string) => {
      if (sortColumn !== column) {
        return <FontAwesomeIcon icon={faSort} />;
      }
      if (sortOrder === "asc") {
        return <FontAwesomeIcon icon={faSortUp} />;
      }
      return <FontAwesomeIcon icon={faSortDown} />;
    };

    return (
      <div className="table-responsive">
        <table className="table table-striped table-hover table-bordered table-sm rounded">
        
          <thead>
            <tr>
              <th className="align-middle text-center sort-column"
                onClick={() => handleSort("gameId")}
              >
                Id {renderSortIcon("gameId")}
              </th>
              <th className="align-middle text-center">Imagem</th>
              <th className="align-middle text-center sort-column" 
                onClick={() => handleSort("name")}
              >
                Nome {renderSortIcon("name")}
              </th>
              <th className="align-middle text-center sort-column"
                onClick={() => handleSort("developer")}
              >
                Desenvolvedora {renderSortIcon("developer")}
              </th>
              <th className="align-middle text-center sort-column"
                onClick={() => handleSort("publisher")}
              >
                Publicadora {renderSortIcon("publisher")}
              </th>
              <th className="align-middle text-center sort-column"
                onClick={() => handleSort("category")} 
              >
                Categoria {renderSortIcon("category")}
              </th>
              <th className="align-middle text-center sort-column"
                onClick={() => handleSort("releaseDate")} 
              >
                Lançamento {renderSortIcon("releaseDate")}
              </th>
              <th className="align-middle text-center sort-column"
                onClick={() => handleSort("price")}
              >
                Preço cheio {renderSortIcon("price")}
              </th>
              <th className="align-middle text-center sort-column"
                onClick={() => handleSort("discount")}
              >
                Desconto {renderSortIcon("discount")}
              </th>
              <th className="align-middle text-center sort-column"
                onClick={() => handleSort("discountPrice")}
              >
                Preço descontado {renderSortIcon("discountPrice")}
              </th>
              <th className="align-middle text-center sort-column"
                onClick={() => handleSort("stockQuantity")}
              >
                Estoque {renderSortIcon("stockQuantity")}
              </th>
              <th className="align-middle text-center">Ação</th>
            </tr>
          </thead>
          <tbody>
            {games.map((game, index) => (
              <tr key={game.gameId} /*className={index % 2 === 0 ? 'table-light' : 'table-secondary'}*/>
                <td className="align-middle text-center">
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => tratarGameSelecionado(game)}
                  >
                    {game.gameId}
                  </button>
                </td>
                <td className="align-middle text-center">
                  <img src={game.image} width="35px"/>
                </td>
                <td className="align-middle text-center">
                  {game.name}
                </td>
                <td className="align-middle text-center">
                  {game.developer}
                </td>
                <td className="align-middle text-center">
                  {game.publisher}
                </td>
                <td className="align-middle text-center">
                  {game.category.name}
                </td>
                <td className="align-middle text-center">
                  {dayjs(game.releaseDate).format("DD/MM/YYYY")}
                </td>
                <td className="align-middle text-end pe-3">
                  {game.price.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                    useGrouping: true
                  })}
                </td>
                <td className="align-middle text-end pe-3">
                  {(game.discount*100).toLocaleString("pt-BR", {
                    minimumFractionDigits: 1,
                    maximumFractionDigits: 1,
                    useGrouping: true
                  })}%
                </td>
                <td className="align-middle text-end pe-3">
                  {(game.price * (1 - game.discount)).toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                    useGrouping: true
                  })}
                </td>
                <td className="align-middle text-center">
                  {game.stockQuantity}
                </td>
                <td width="10%" className="align-middle text-center">
                  <button 
                    onClick={() => tratarRemocaoGame(game.gameId!)} 
                    className="btn btn-danger btn-sm"
                    disabled={removendoGame}
                  >
                    {removendoGameId === game.gameId ? (
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                    ) : (
                      <FontAwesomeIcon icon={faTrashAlt} />
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        
        </table>
      </div>
    )
}