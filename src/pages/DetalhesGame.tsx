import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons/faArrowAltCircleLeft";
import {
    faCartPlus,
    faCheck
  } from "@fortawesome/free-solid-svg-icons";
import { Card, Col, Row, Button } from "react-bootstrap";
import { Game } from "../interfaces/game";
import { CartItemPost } from "../interfaces/cartItem";
import { useAdicionarItemCarrinho } from "../hooks/useAdicionarItemCarrinho";
import "../styles/GameCard.css";
import { useUsuarioStore } from "../store/useUsuarioStore";
import { useGameStore } from "../store/useGameStore";
import { useRemoverGame } from "../hooks/useRemoverGame";


export const DetalhesGame = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [addedToCart, setAddedToCart] = useState(false);
    const [isDisabled, setDisabled] = useState(false);
    const usuarioLogado = useUsuarioStore((s) => s.usuarioLogado);
    const setGameSelecionado = useGameStore(s => s.setGameSelecionado);

    var game = location.state.data;

    const { 
        mutate: cadastrarCartItem, 
        error: errorCadastrarCartItem 
    } = useAdicionarItemCarrinho();

    const {
        data: gameRemovido,
        mutate: removerGame,
        isLoading: removendo,
        error: erroRemocao,
    } = useRemoverGame();

    const tratarAdicionarGameAoCarrinho = (game: Game) => {
      if (!usuarioLogado) {
        navigate('/login');
        return;
      }
      const newCartItem: CartItemPost = {
        cartId: 1,
        userId: 1,
        gameId: game.gameId!,
        quantity: 1,
      };
      cadastrarCartItem(newCartItem);
      setAddedToCart(true);
    };

    const tratarRemocaoGame = (gameId: number) => {
        removerGame(gameId);
        setDisabled(true);
    }

    const tratarGameSelecionado = (game: Game) => {
        setGameSelecionado(game);
        navigate("/painel-admin")
    }

    const handleVoltar = () => {
        navigate(-1);
    };

    if (erroRemocao) throw erroRemocao;

    // Extrair e formatar a data de lançamento
    const releaseDate = new Date(game.releaseDate);
    const releaseDay = String(releaseDate.getDate()).padStart(2, '0');
    const releaseMonth = String(releaseDate.getMonth() + 1).padStart(2, '0'); // getMonth() retorna 0-11, então adicionamos 1
    const releaseYear = releaseDate.getFullYear();
    const formattedReleaseDate = `${releaseDay}/${releaseMonth}/${releaseYear}`;

    return (
        <>
            <div className="container mt-4">
                <button onClick={handleVoltar} className="btn btn-azul-nub mb-3">
                    <FontAwesomeIcon icon={faArrowAltCircleLeft} /> Voltar
                </button>
                {gameRemovido && <p className="m-3 text-removido-com-sucesso">Jogo removido da loja com sucesso!</p>}
                <Card className="card-detalhe " style={{backgroundColor: "#566878"}}>
                    <div className="d-flex align-items-start mb-4">
                        <h1 className="w mr-3"><strong>{game.name}</strong></h1>
                        <Button
                            type="button"
                            className="ml-3 btn btn-sm btn-danger align-self-center"
                            disabled={isDisabled}
                            onClick={() => tratarRemocaoGame(game.gameId!)}
                            style={{marginLeft: 'auto'}}
                        >
                            Deletar
                        </Button>
                        <Button
                            className="btn btn-sm btn-info align-self-center"
                            disabled={isDisabled} onClick={() => tratarGameSelecionado(game)}
                            style={{marginLeft: '10px'}}
                        >
                            Alterar
                        </Button>
                    </div>
                    <Row className="mb-1">
                        <Col md={6} className="d-flex flex-column align-items-start mb-4">
                            <img src={game.image} alt={game.name} className="card-image-filme" style={{width: '250px'}} />
                        </Col>
                        <Col md={6}>
                            <iframe
                                className="media-video"
                                width="100%"
                                height="315"
                                src= {game.trailer}
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share">
                            </iframe>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            {game.discount != 0 ? (
                                <p className="card-text card-price-old">
                                R${game.price.toLocaleString("pt-BR", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                    useGrouping: true
                                })}
                                    <span className="card-text discount-badge-detalhes">
                                        <strong>
                                        R${(game.price * (1-game.discount)).toLocaleString("pt-BR", {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                            useGrouping: true
                                        })}
                                        </strong>
                                    </span>
                                    <span className="card-text discount-value-detalhes">
                                        {(game.discount*100).toLocaleString("pt-BR", {
                                            maximumFractionDigits: 2,
                                            minimumFractionDigits: 2,
                                            useGrouping: true,
                                        })}% OFF
                                    </span>
                                </p>
                            ) : (
                                <p className="card-text default-price-badge-detalhes">
                                    <strong>
                                        R${game.price.toLocaleString("pt-BR", {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                            useGrouping: true
                                        })}
                                    </strong>
                                </p>
                            )}
                            <div className="d-flex align-items-center justify-content-start mt-2">
                                <button 
                                  className={`btn ${addedToCart ? 'btn-success' : 'btn-primary'}`} 
                                  onClick={() => tratarAdicionarGameAoCarrinho(game)}
                                  disabled={isDisabled}
                                >
                                  {addedToCart ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faCartPlus} />}
                                </button>
                                <span className="stock-middle">Estoque: {game.stockQuantity}</span>
                            </div>
                            <div className="mt-3">
                                <p className="w"><strong>Lançamento:</strong> {formattedReleaseDate}</p>
                                <p className="w"><strong>Desenvolvedora:</strong> {game.developer}</p>
                                <p className="w"><strong>Publicadora:</strong> {game.publisher}</p>
                                <p className="w"><strong>Categoria:</strong> {game.category.name}</p>
                            </div>
                        </Col>
                        <Col md={6} className="description-rounded-background">
                            <p className="w">{game.description}</p>
                        </Col>
                    </Row>
                </Card>

            </div>
        </>
    );
}
