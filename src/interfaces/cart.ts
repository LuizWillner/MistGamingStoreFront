import { CartItem } from "./cartItem";
import { User } from "./user";

export interface Cart {
    cartId?: number;
    createdAt?: Date;
    cartItems: CartItem[];
    user: User;
    totalPrice: number;
}
