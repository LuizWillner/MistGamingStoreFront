import { Card } from "react-bootstrap";
import { CadastroGameForm } from "../components/CadastroGameForm";
import { Pesquisa } from "../components/Pesquisa";
import { TabelaDeGames } from "../components/TabelaDeGames";
import { Paginacao } from "../components/Paginacao";

export const PainelAdminPage = () => {
  return (
    <>
      <Card className="card-detalhe">
        <div className="mb-4">
          <h5>Cadastro de Jogos</h5>
          <hr className="mt-0" />
        </div>

        <CadastroGameForm />

        <div className="mb-4">
          <h5>Lista de Jogos</h5>
          <hr className="mt-0" />
        </div>
        <Pesquisa />
        <TabelaDeGames />
        <Paginacao />
      </Card>
    </>
  );
};
