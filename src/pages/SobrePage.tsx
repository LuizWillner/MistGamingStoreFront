import "../styles/SessaoDeCards.css";
import logo from "../assets/mist-logo.png";

export const SobrePage = () => {
  return (
    <>
      <h5 className="mt-4 mb-3 titulo-sessao-card">Sobre a Mist</h5>
      <div className="d-flex justify-content-center mb-4">
        <img
          className="d-none d-md-block mt-2"
          src={logo}
          style={{ width: "350px" }}
        />
      </div>
      <div>
        <p className="w text-center">
          A <strong>Mist Gaming Store</strong> nasceu da paixão de um grupo de entusiastas por
          jogos de PC que perceberam uma lacuna no mercado: a dificuldade de
          encontrar uma plataforma confiável que reunisse tanto títulos
          clássicos quanto lançamentos, com preços justos e suporte
          diferenciado. A ideia surgiu em um fórum de discussão sobre games,
          onde os fundadores debatiam como muitas lojas online priorizavam
          apenas grandes lançamentos e deixavam de lado títulos independentes ou
          menos populares. Com isso em mente, eles decidiram criar uma loja que
          fosse mais do que um simples marketplace — uma comunidade para gamers
          explorarem novas experiências e compartilharem suas paixões.
        </p>
        <p className="w text-center">
          O principal objetivo da Mist Gaming Store é oferecer uma seleção
          diversificada de jogos para todos os perfis de jogadores, desde os
          casuais até os hardcore, sempre com promoções justas e uma curadoria
          cuidadosa para destacar títulos que merecem atenção. Além disso, a
          loja aposta em um sistema de recomendações baseado nos gostos dos
          usuários e mantém um blog com análises, guias e entrevistas com
          desenvolvedores. Uma curiosidade interessante é que o nome "Mist"
          (névoa, em inglês) foi escolhido para simbolizar a emoção da
          descoberta—assim como em um jogo de exploração, onde novos mundos se
          revelam conforme o jogador avança, a Mist Gaming Store busca
          proporcionar essa sensação a cada visita.
        </p>
      </div>
    </>
  );
};
