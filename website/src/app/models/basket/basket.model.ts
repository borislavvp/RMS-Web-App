import { BasketItem } from "./basketItem.model";

export class Basket{
    userId: string;
    items: BasketItem[];
    totalPrice: number;
}