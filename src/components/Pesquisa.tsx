import React from "react";
import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useGameStore } from "../store/useGameStore";


export const Pesquisa = () => {

  const setGameName = useGameStore(s=> s.setNome);
  const setPagina = useGameStore(s => s.setPagina);
  const name = useGameStore(s => s.nome);
  
  const tratarGameNamePesquisado = (gameName: string) => {
    setGameName(gameName);
    setPagina(0);
  };

  const gameNameRef = useRef<HTMLInputElement>(null);

  return (
    <form 
      onSubmit={(event) => {
          event.preventDefault();
          tratarGameNamePesquisado(gameNameRef.current!.value);
      }} 
      className="d-flex mb-3"
    >
      <input defaultValue={name} ref={gameNameRef} type="text" className="form-control form-control-sm me-2" placeholder="Pesquisar..." />
      <button type="submit" className="btn btn-success btn-sm">
      <FontAwesomeIcon icon={faSearch} />
      </button>
    </form>
  );
};