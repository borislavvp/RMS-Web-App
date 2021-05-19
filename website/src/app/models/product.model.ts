import { Category } from "./category.model";

export class Product{
    id: string;
    name: string;
    description: string;
    ingredients: string;
    image?: string;
    price: number;
    availability: boolean;
    category: Category;
}