import { Category } from "./category";

export interface Game {
  // TODO: Ingresso
  gameId?: number;
  name: string;
  image: string;
  trailer: string;
  description: string;
  developer: string;
  publisher: string;
  price: number;
  discount: number;
  releaseDate: Date;
  stockQuantity: number;
  createdAt?: Date;
  category: Category;
}
