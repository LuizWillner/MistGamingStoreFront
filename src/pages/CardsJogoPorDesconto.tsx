import { useNavigate, useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { Game } from "../interfaces/game";
import React from "react";
import { useGamesPaginadosPorDesconto } from "../hooks/useGamesPaginadosPorDesconto";
// import "../styles/CardsIngressoPorSessao.css";

export const CardsJogoPorDesconto = () => {
  // CardsIngressoPorSessao

  const navigate = useNavigate();

  const detalhesGame = (game: Game) => {
    navigate(`/detalhesGame`, { state: { data: game } });
  };

  // var { discountMin, discountMax } = useParams();
  const discountMax = 0.99;
  const discountMin = 0;
  const size = 3;

  const { data, isLoading, error, fetchNextPage, hasNextPage } =
    useGamesPaginadosPorDesconto({
      size,
      discountMin,
      discountMax,
    });

  if (isLoading) return <h6>Carregando...</h6>;

  if (error) throw error;

  const qtdTotalGames =
    data?.pages.reduce((total, page) => total + page.itens.length, 0) || 0;

  return (
    <>
      <InfiniteScroll
        dataLength={qtdTotalGames}
        hasMore={!!hasNextPage}
        next={() => fetchNextPage()}
        loader={<h6>Carregando...</h6>}
        style={{ overflow: "visible" }}
      >
        <h5 className="mt-4 mb-3 titulo-ingressos">Descontos da semana!</h5>
        <div className="row">
          {data?.pages.map((page) =>
            page.itens.map((game: Game) => (
              <div key={game.gameId} className="col-md-4 mb-4">
                <div className="card" style={{ backgroundColor: "#1b1b1b" }}>
                  <div className="card-body">
                    <div className="card-img-container">
                      <img src={game.image} alt={`Imagem de ${game.name}`} />
                    </div>
                    <div className="card-info w">
                      <h5 className="card-title ">{game.name}</h5>
                      <p className="card-text ">{game.developer}</p>
                      <p className="card-text ">
                        Categoria:{" "}
                        <span className="poltrona-number">
                          {game.category.name}
                        </span>
                      </p>
                      <p className="card-text">
                        R${" "}
                        {game.price.toLocaleString("pt-BR", {
                          maximumFractionDigits: 2,
                          minimumFractionDigits: 2,
                          useGrouping: true,
                        })}
                      </p>
                      <button
                        className="btn btn-vermelho w-100"
                        onClick={() => detalhesGame(game)}
                      >
                        Ver mais
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </InfiniteScroll>
    </>
  );
};
