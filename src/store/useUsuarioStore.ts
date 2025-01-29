import { create } from "zustand";


interface UsuarioStore {
    usuarioLogado: string;
    tentouLogar: boolean;
  
    setUsuarioLogado: (usuario: string) => void;
    setTentouLogar: (valor: boolean) => void;
}


export const useUsuarioStore = create<UsuarioStore>((set) => ({
    usuarioLogado: localStorage.getItem("usuarioLogado") || "",
    tentouLogar: false,
  
    setUsuarioLogado: (usuario: string) => {
        localStorage.setItem("usuarioLogado", usuario);
        set(() => ({ usuarioLogado: usuario }))
    },
    setTentouLogar: (valor: boolean) => set(() => ({ tentouLogar: valor })),
}));
