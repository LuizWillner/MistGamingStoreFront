import { useNavigate } from "react-router-dom";
import { Game } from "../interfaces/game";
import "../styles/GameCard.css";

export const GameCard = (game: Game) => {
  const navigate = useNavigate();

  const detalhesGame = (game: Game) => {
    navigate(`/detalhesGame/${game.name}`, { state: { data: game } });
  };

  return (
    <div className="card" style={{ backgroundColor: "#566878" }}>
      <div className="card-body">
        <div className="card-img-container">
          <img src={game.image} alt={`Imagem de ${game.name}`} />
        </div>
        <div className="card-info w">
          <h5 className="card-title ">{game.name}</h5>
          <p className="card-text ">{game.developer}</p>
          <p className="card-text ">
            Categoria:{" "}
            <span>{game.category.name}</span>
          </p>
          {game.discount != 0 ? (
            <p className="card-text card-price-old">
              R${" "}
              {game.price.toLocaleString("pt-BR", {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
                useGrouping: true,
              })}
              <span className="card-text discount-badge">
                R${" "}
                {(game.price * (1 - game.discount)).toLocaleString("pt-BR", {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                  useGrouping: true,
                })}
              </span>
              <span className="card-text discount-value">
                {(game.discount*100).toLocaleString("pt-BR", {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                  useGrouping: true,
                })}% OFF
              </span>
            </p>
          ) : (
            <p className="card-text default-price-badge-detail">
              R${" "}
              {game.price.toLocaleString("pt-BR", {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
                useGrouping: true,
              })}
            </p>
          )}
            <button
              className="btn btn-sm btn-azul-nub w-100"
              onClick={() => detalhesGame(game)}
            >
              Ver mais
            </button>
        </div>
      </div>
    </div>
  );
};
