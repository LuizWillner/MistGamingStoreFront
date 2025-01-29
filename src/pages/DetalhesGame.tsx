import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons/faArrowAltCircleLeft";
import {
    faCartPlus,
    faCheck
  } from "@fortawesome/free-solid-svg-icons";
import { Card, Col, Row } from "react-bootstrap";
import { Game } from "../interfaces/game";
import { CartItemPost } from "../interfaces/cartItem";
import { useAdicionarItemCarrinho } from "../hooks/useAdicionarItemCarrinho";
import "../styles/GameCard.css";
import { useUsuarioStore } from "../store/useUsuarioStore";


export const DetalhesGame = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [addedToCart, setAddedToCart] = useState(false);
    const usuarioLogado = useUsuarioStore((s) => s.usuarioLogado);

    var game = location.state.data;
    console.log(game.trailer);

    const { mutate: cadastrarCartItem, error: errorCadastrarCartItem } = useAdicionarItemCarrinho();

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

    const handleVoltar = () => {
        navigate(-1);
    };

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
                <Card className="card-detalhe " style={{backgroundColor: "#566878"}}>
                    <h1 className="mb-4 w"><strong>{game.name}</strong></h1>
                    <Row className="mb-3">
                        <Col md={6}>
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
                                    <span className="card-text discount-badge">
                                        <strong>
                                        R${(game.price * (1-game.discount)).toLocaleString("pt-BR", {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                            useGrouping: true
                                        })}
                                        </strong>
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
