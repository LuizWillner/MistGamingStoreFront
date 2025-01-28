import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons/faArrowAltCircleLeft";
import { Card, Col, Row } from "react-bootstrap";
// import '../styles/CardFilmes.css';

export const DetalhesGame = () => {
    const location = useLocation();
    const navigate = useNavigate();

    var game = location.state.data;
    console.log(game.trailer);

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
                <button onClick={handleVoltar} className="btn btn-vermelho mb-3">
                    <FontAwesomeIcon icon={faArrowAltCircleLeft} /> Voltar
                </button>
                <Card className="card-detalhe " style={{backgroundColor: "#1b1b1b"}}>
                    <h1 className="mb-4 w">{game.name}</h1>
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
                                <p className="w">
                                R${game.price.toLocaleString("pt-BR", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                    useGrouping: true
                                })}
                                    <span>
                                        <strong>
                                        R${(game.price * (1-game.discount)).toLocaleString("pt-BR", {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                            useGrouping: true
                                        })}
                                        </strong>
                                    </span>
                                </p>
                            ) : (
                                <p className="w">
                                    <strong>
                                        R${game.price.toLocaleString("pt-BR", {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                            useGrouping: true
                                        })}
                                    </strong>
                                </p>
                            )}
                            <p className="w"><strong>Ano de Lançamento:</strong> {formattedReleaseDate}</p>
                            <p className="w"><strong>Desenvolvedora:</strong> {game.developer}</p>
                            <p className="w"><strong>Publicadora:</strong> {game.publisher}</p>
                            <p className="w"><strong>Categoria:</strong> {game.category.name}</p>
                        </Col>
                        <Col md={6}>
                            <p className="w">{game.description}</p>
                        </Col>
                    </Row>
                </Card>

            </div>
        </>
    );
}
