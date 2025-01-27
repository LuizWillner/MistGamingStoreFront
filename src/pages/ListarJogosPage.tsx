import { NavLink, Outlet } from "react-router-dom";

export const ListarJogosPage = () => {
  return (
    <div className="row">
      <div className="col-lg-2">
        <h5>Categorias</h5>
        <div className="nav flex-column nav-pills">
          <NavLink aria-current="page" className="nav-link" to="/listar-jogos/all">
            Todos
          </NavLink>
          <NavLink aria-current="page" className="nav-link" to="/listar-jogos/RPG Ação">
            RPG Ação
          </NavLink>
          <NavLink aria-current="page" className="nav-link" to="/listar-jogos/CRPG">
            CRPG
          </NavLink>
          <NavLink aria-current="page" className="nav-link" to="/listar-jogos/Coop">
            Coop
          </NavLink>
          <NavLink aria-current="page" className="nav-link" to="/listar-jogos/MOBA">
            MOBA
          </NavLink>
          <NavLink aria-current="page" className="nav-link" to="/listar-jogos/Ação e Aventura">
            Ação e Aventura
          </NavLink>
          <NavLink aria-current="page" className="nav-link" to="/listar-jogos/Mundo Aberto">
            Mundo Aberto
          </NavLink>
          <NavLink aria-current="page" className="nav-link" to="/listar-jogos/FPS">
            FPS
          </NavLink>
          <NavLink aria-current="page" className="nav-link" to="/listar-jogos/Hero Shooter">
            Hero Shooter
          </NavLink>
          <NavLink aria-current="page" className="nav-link" to="/listar-jogos/Esportes">
            Esportes
          </NavLink>
          <NavLink aria-current="page" className="nav-link" to="/listar-jogos/MMORPG">
            MMORPG
          </NavLink>
          <NavLink aria-current="page" className="nav-link" to="/listar-jogos/Souls Like">
            Souls Like
          </NavLink>
        </div>
      </div>
      <div className="col-lg-10">
        <Outlet />
      </div>
    </div>
  );
};
