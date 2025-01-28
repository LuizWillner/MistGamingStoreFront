import { Game } from "./game";

export interface CartItem {
    cartItemId?: number;
    game: Game;
    quantity: number;
    createdAt?: Date;
}
