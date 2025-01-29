import React from "react";
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et lacus
            eget massa blandit dictum ut ut lorem. Quisque nec ultrices sapien, eu
            commodo ligula. Donec commodo dignissim vestibulum. Vivamus eu mattis
            nulla, at molestie dui. Proin lacus est, aliquet id ullamcorper vitae,
            eleifend sit amet neque. Aenean urna mi, ultricies eget magna eu,
            placerat pretium nunc. Suspendisse facilisis, ligula et faucibus
            blandit, quam lacus laoreet velit, nec congue quam risus id metus. Nam
            vulputate tincidunt consectetur. Etiam vitae ligula congue, commodo
            risus sit amet, convallis tortor. Cras tempus pretium tempor. Vivamus
            lectus enim, tincidunt vel magna ut, vehicula vehicula metus. Integer
            vehicula fermentum nisi id tristique. Quisque non lobortis risus, id
            ultricies nisl. Sed vehicula sem at lectus laoreet posuere.
          </p>
          <p className="w text-center">
            Sed ex tortor, lobortis eu viverra et, mattis a nisi. Duis et rhoncus
            ante. Nam eget lacus urna. Quisque id massa id urna interdum bibendum.
            Sed eleifend ipsum ligula, id facilisis tortor gravida id. Cras sit
            amet laoreet nisl. Pellentesque habitant morbi tristique senectus et
            netus et malesuada fames ac turpis egestas. Phasellus et tempor odio.
            Quisque nec mattis sem. Cras volutpat, arcu consequat cursus suscipit,
            ante nulla vestibulum nulla, et ornare arcu ipsum auctor augue.
            Vestibulum lorem sem, molestie ut lorem ut, tincidunt auctor urna.
            Cras a metus vel ante sodales aliquet at eget orci
          </p>
        </div>
    </>
  );
};
