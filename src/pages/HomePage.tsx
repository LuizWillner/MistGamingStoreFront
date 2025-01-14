import React from "react";
import { Carousel } from "react-bootstrap";
import { Outlet } from "react-router-dom";
// import "../styles/Carrossel.css";

export const HomePage = () => {
  return (
    <>
      <Carousel
        style={{ marginTop: "69px" }}
        className="d-none d-md-block mb-4"
      >
        <Carousel.Item>
          <img
            className="d-block mx-auto carousel-image"
            src="https://i0.wp.com/imgs.hipertextual.com/wp-content/uploads/2021/11/Elden-Ring.jpeg?fit=1200%2C675&quality=70&strip=all&ssl=1"
          />
          <Carousel.Caption>
            <h3>
              Jogador zera Elden Ring usando apenas um controle de televisão
              como controle: "Achei fácil."
            </h3>
            <p>terça-feira, 31 de janeiro de 2025</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block mx-auto carousel-image"
            src="https://static1.thegamerimages.com/wordpress/wp-content/uploads/2021/03/The-Last-Of-Us-Abby-Golf-Club.jpg"
          />
          <Carousel.Caption>
            <h3>
              Vendas de tacos de golfe aumentaram após lançamento de The Last of
              Us: Parte 2? Veja o que a Mist apurou
            </h3>
            <p>terça-feira, 29 de janeiro de 2025</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block mx-auto carousel-image"
            src="https://i.redd.it/gw4h3begfrc81.jpg"
          />
          <Carousel.Caption>
            <h3>
              Jogador de LoL se emociona ao falar sobre sua vida depois que
              abandonou o jogo: "Encontrei uma namorada"
            </h3>
            <p>segunda-feira, 28 de janeiro de 2025</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block mx-auto carousel-image"
            src="https://pbs.twimg.com/media/GAnEbZTaAAAYab9.jpg:large"
          />
          <Carousel.Caption>
            <h3>
              GTA 6 terá gameplay como Uber de patinete e missões de entregar
              coxinha
            </h3>
            <p>terça-feira, 27 de janeiro de 2025</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <div>
        <Outlet></Outlet>
      </div>
    </>
  );
};
