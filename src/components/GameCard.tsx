import { useNavigate, useParams } from "react-router-dom";
import { Game } from "../interfaces/game";
import React from "react";

export const GameCard = (game: Game) => {
  const navigate = useNavigate();

  const detalhesGame = (game: Game) => {
    navigate(`/detalhesGame`, { state: { data: game } });
  };

  return (
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
              <span className="poltrona-number">{game.category.name}</span>
            </p>
            {game.discount != 1 ? (
              <p className="card-text">
                R${" "}
                {game.price.toLocaleString("pt-BR", {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                  useGrouping: true,
                })}
                <span className="card-text">
                  R${" "}
                  {(game.price * game.discount).toLocaleString("pt-BR", {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                    useGrouping: true,
                  })}
                </span>
              </p>
            ) : (
              <p className="card-text">
                R${" "}
                {game.price.toLocaleString("pt-BR", {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                  useGrouping: true,
                })}
              </p>
            )}
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
  );
};
