import InfiniteScroll from "react-infinite-scroll-component";
import { Game } from "../interfaces/game";
import { useGamesPaginadosPorDesconto } from "../hooks/useGamesPaginadosPorDesconto";
import { GameCard } from "../components/GameCard";
import "../styles/SessaoDeCards.css";

export const CardsJogoPorDesconto = () => {
  // var { discountMin, discountMax } = useParams();
  const discountMax = 1.0;
  const discountMin = 0.01;
  const size = 4;

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
        <h5 className="mt-4 mb-3 titulo-sessao-card">Descontos da semana!</h5>
        <div className="row">
          {data?.pages.map((page) =>
            page.itens.map((game: Game) => (
              <div key={game.gameId} className="col-md-6 mb-4">
                <GameCard
                  gameId={game.gameId}
                  name={game.name}
                  image={game.image}
                  trailer={game.trailer}
                  description={game.description}
                  developer={game.developer}
                  publisher={game.publisher}
                  price={game.price}
                  discount={game.discount}
                  releaseDate={game.releaseDate}
                  stockQuantity={game.stockQuantity}
                  createdAt={game.createdAt}
                  category={game.category}
                />
              </div>
            ))
          )}
        </div>
      </InfiniteScroll>
    </>
  );
};
