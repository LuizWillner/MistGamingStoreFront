import { Game } from "./game";

export interface CartItem {
    cartItemId?: number;
    game: Game;
    quantity: number;
    createdAt?: Date;
}

export interface CartItemPost {
    cartId: number;
    userId: number;
    gameId: number;
    quantity: number;
}
