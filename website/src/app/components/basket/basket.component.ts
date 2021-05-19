import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Basket } from 'src/app/models/basket/basket.model';
import { BasketItem } from 'src/app/models/basket/basketItem.model';
import { AuthService } from 'src/app/services/auth.service';
import { BasketService } from 'src/app/services/basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BasketComponent implements OnInit {

  onDelivery: boolean = true;
  onPayment: boolean = false;
  onDesktop: boolean = true;
  toShow = false;

  basket: Basket;

  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
    this.onDesktop = window.innerWidth >= 1100;

    this.basketService.fetchBasket();
    this.basketService.basket.subscribe(basket => this.basket = basket);
  }

  onResize(event){
    this.onDesktop = event.target.innerWidth >= 1100;
  }

  show(){
    this.toShow = !this.toShow;
  }

  changeToPayment() {
    this.onDelivery = false;
    this.onPayment = true;
  }

  onBack(){
    this.onDelivery = true;
    this.onPayment = false;
    this.toShow = false;
  }

  increaseItemQuantity(item: BasketItem){
    this.basketService.increaseItemQuantity(item);
  }
  decreaseItemQuantity(item: BasketItem){
    this.basketService.decreaseItemQuantity(item);
  }
  removeItem(item: BasketItem){
    this.basketService.removeItem(item);
  }

}
