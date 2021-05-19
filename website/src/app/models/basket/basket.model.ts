import { BasketItem } from "./basketItem.model";

export class Basket{
    userId: string;
    items: BasketItem[];
    totalPrice: number;

    AddItem(item: BasketItem){
        item.quantity = 1;
        this.items.push(item);
    }
}