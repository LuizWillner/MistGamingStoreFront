import { Container, Nav, Navbar, NavDropdown, Dropdown } from "react-bootstrap";
import { useRecuperarCarrinho } from "../hooks/useRecuperarCarrinho";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faShoppingCart,
  faSignIn,
  faSignOut
} from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/mist-logo.png";
import { useUsuarioStore } from "../store/useUsuarioStore";
import "../styles/Navbar.css";

export function NavBar() {

  const usuarioLogado = useUsuarioStore((s) => s.usuarioLogado);
  const logout = useUsuarioStore((s) => s.logout);
  
  const {
    data: carrinho,
    isLoading: carregandoCarrinho,
    error: errorCarrinho,
  } = useRecuperarCarrinho({cartId: 1, userId: 1});
  

  if (carregandoCarrinho) return <div>Carregando...</div>;
  if (errorCarrinho) throw errorCarrinho;

  const handleLogout = () => {
    logout();
    window.location.reload(); // Recarrega a página após o logout
  };

  return (
    <>
      <Navbar
        expand="md"
        variant="dark"
        className="navbar navbar-background navbar-expand-md"
      >
        <Container className="container mb-4">
          {/*Navbar.Brand: A marca ou logo do site*/}
          <Navbar.Brand className="navbar-brand" href="/">
            <img
              className="d-none d-md-block mt-2"
              src={logo}
              style={{ width: "125px" }}
            />
          </Navbar.Brand>
          <Navbar.Toggle className="navbar-toggler" aria-controls="menu" />
          <Navbar.Collapse className="collapse navbar-collapse">
            <Nav className="navbar-nav mx-auto">
              <Nav.Link className="nav-link nav-item" href="/">
                Home
              </Nav.Link>
              <NavDropdown title="Jogos" id="dropdownMenuButton">
                <NavDropdown.Item
                  className="dropdown-item"
                  href="/listar-jogos"
                >
                  Loja
                </NavDropdown.Item>
                <NavDropdown.Item
                  className="dropdown-item"
                  href="/painel-admin"
                >
                  Painel
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link className="nav-link nav-item" href="/sobre">
                Sobre
              </Nav.Link>
            </Nav>
            <Nav className="navbar-nav ml-auto">
              <Nav.Link className="nav-link nav-item" href="/carrinho">
                <div className="d-flex flex-column">
                  <FontAwesomeIcon icon={faShoppingCart} /> {/*Carrinho*/}
                  {carrinho?.cartItems.length === 0 && (
                    <span className="d-flex justify-content-center">
                      vazio
                    </span>
                  )}{" "}
                  {carrinho?.cartItems.length !== 0 && (
                    <span className="d-flex justify-content-center">
                      R${" "}
                      {carrinho?.totalPrice
                        .toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                          useGrouping: true,
                        })}
                    </span>
                  )}
                </div>
              </Nav.Link>
              {usuarioLogado ? (
                <Dropdown>
                  <Dropdown.Toggle as={Nav.Link} className="nav-link nav-item">
                    <FontAwesomeIcon icon={faUser} /> {/*Usuário*/}
                  </Dropdown.Toggle>

                  <Dropdown.Menu align="end">
                    <Dropdown.ItemText>{usuarioLogado}</Dropdown.ItemText>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout}>
                    <FontAwesomeIcon icon={faSignOut} /> Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Nav.Link className="nav-link nav-item" href="/login">
                  <FontAwesomeIcon icon={faSignIn} /> {/* Entrar */}
                </Nav.Link>
              )
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
