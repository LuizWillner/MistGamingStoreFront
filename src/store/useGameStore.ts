import { create } from "zustand";
import { Game } from "../interfaces/game";

interface GameStore {
    pagina: number;
    tamanho: number;
    nome: string;
    gameSelecionado: Game;

    setPagina: (pagina: number) => void;
    setTamanho: (tamanho: number) => void;
    setNome: (nome: string) => void;
    setGameSelecionado: (game: Game) => void;
}

export const useGameStore = create<GameStore>((set) => ({
    pagina: 0,
    tamanho: 10,
    nome: "",
    gameSelecionado: {} as Game,

    setPagina: (novaPagina: number) => set(() => ({pagina: novaPagina})),
    setTamanho: (novoTamanho: number) => set(() => ({tamanho: novoTamanho})),
    setNome: (novoNome: string) => set(() => ({nome: novoNome})),  
    setGameSelecionado: (novoGameSelecionado: Game) => set(() => ({gameSelecionado: novoGameSelecionado})),  
}))
