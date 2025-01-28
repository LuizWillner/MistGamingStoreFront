import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useRecuperarCarrinho } from "../hooks/useRecuperarCarrinho";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuestionCircle,
  faShoppingCart,
  faSignIn,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/mist-logo.png";
import "../styles/Navbar.css";

export function NavBar() {
  
  const {
    data: carrinho,
    isLoading: carregandoCarrinho,
    error: errorCarrinho,
  } = useRecuperarCarrinho({cartId: 1, userId: 1});
  

  if (carregandoCarrinho) return <div>Carregando...</div>;
  // if (removendo) return null;
  if (errorCarrinho) throw errorCarrinho;


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
              className="d-none d-md-block"
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
                <FontAwesomeIcon icon={faShoppingCart} /> Carrinho
                {carrinho?.cartItems.length === 0 && (
                  <li className="d-flex justify-content-center">
                    vazio
                  </li>
                )}{" "}
                {carrinho?.cartItems.length !== 0 && (
                  <li className="d-flex justify-content-center">
                    R${" "}
                    {carrinho?.totalPrice
                      .toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                        useGrouping: true,
                      })}
                  </li>
                )}
              </Nav.Link>
              <Nav.Link className="nav-link nav-item" href="/login">
                <FontAwesomeIcon icon={faSignIn} /> Entrar
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
