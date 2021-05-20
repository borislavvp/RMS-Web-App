import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/products/product.model';
import { RequestService } from './request/request.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productsList: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>(null);
  products: Product[] = [
    { 
      id: "1",
      name: "Salad number one",
      description: "Salad number one description",
      ingredients: "some, ingredients, for salad, number, one",
      price: 5.80,
      availability: true,
      category: {name: "salad"}
    },
    { 
      id: "2",
      name: "Salad number two",
      description: "Salad number two description",
      ingredients: "some, ingredients, for salad, number, two",
      price: 5.80,
      availability: true,
      category: {name: "salad"}
    },
    { 
      id: "3",
      name: "Salad number three",
      description: "Salad number three description",
      ingredients: "some, ingredients, for salad, number, three",
      price: 5.80,
      availability: true,
      category: {name: "salad"}
    },
    { 
      id: "4",
      name: "Salad number four",
      description: "Salad number four description",
      ingredients: "some, ingredients, for salad, number, four",
      price: 5.80,
      availability: true,
      category: {name: "salad"}
    },
    { 
      id: "5",
      name: "Main course number one",
      description: "Main course number one description",
      ingredients: "some, ingredients, for main course, number, one",
      price: 14.60,
      availability: true,
      category: {name: "main"}
    },
    { 
      id: "6",
      name: "Main course number two",
      description: "Main course number two description",
      ingredients: "some, ingredients, for main course, number, two",
      price: 11.80,
      availability: true,
      category: {name: "main"}
    },
    { 
      id: "7",
      name: "Main course number three",
      description: "Main course number three description",
      ingredients: "some, ingredients, for main course, number, three",
      price: 19.70,
      availability: true,
      category: {name: "main"}
    },
    { 
      id: "8",
      name: "Main course number four",
      description: "Main course number four description",
      ingredients: "some, ingredients, for main course, number, four",
      price: 19.20,
      availability: true,
      category: {name: "main"}
    },
    { 
      id: "9",
      name: "Dessert number one",
      description: "Dessert number one description",
      ingredients: "some, ingredients, for dessert, number, one",
      price: 9.20,
      availability: true,
      category: {name: "dessert"}
    },
    { 
      id: "10",
      name: "Dessert number two",
      description: "Dessert number two description",
      ingredients: "some, ingredients, for dessert, number, two",
      price: 9.20,
      availability: true,
      category: {name: "dessert"}
    },
    { 
      id: "11",
      name: "Dessert number three",
      description: "Dessert number three description",
      ingredients: "some, ingredients, for dessert, number, three",
      price: 9.20,
      availability: true,
      category: {name: "dessert"}
    },
    { 
      id: "12",
      name: "Dessert number four",
      description: "Dessert number four description",
      ingredients: "some, ingredients, for dessert, number, four",
      price: 9.20,
      availability: true,
      category: {name: "dessert"}
    },
    { 
      id: "13",
      name: "Drink number one",
      description: "Drink number one description",
      ingredients: "some, ingredients, for drink, number, one",
      price: 8.20,
      availability: true,
      category: {name: "drink"}
    },
    { 
      id: "14",
      name: "Drink number two",
      description: "Drink number two description",
      ingredients: "some, ingredients, for drink, number, two",
      price: 8.20,
      availability: true,
      category: {name: "drink"}
    },
    { 
      id: "15",
      name: "Drink number three",
      description: "Drink number three description",
      ingredients: "some, ingredients, for drink, number, three",
      price: 8.20,
      availability: true,
      category: {name: "drink"}
    },
    { 
      id: "16",
      name: "Drink number four",
      description: "Drink number four description",
      ingredients: "some, ingredients, for drink, number, four",
      price: 8.20,
      availability: true,
      category: {name: "drink"}
    }
  ];

  constructor(private requestService: RequestService) {
    this.fetchProducts();
  }

  fetchProducts(){
    this.requestService.get("products").subscribe(data => this.productsList.next(data))
  }
}
