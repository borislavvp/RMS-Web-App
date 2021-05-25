import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Basket } from '../models/basket/basket.model';
import { BasketItem } from '../models/basket/basketItem.model';
import { AuthService } from './auth.service';
import { RequestService } from './request/request.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  basket: BehaviorSubject<Basket> = new BehaviorSubject<Basket>(null);

  constructor(private router: Router,
    private requestService: RequestService,
    private authService: AuthService,
    private toastr: ToastrService) {}

  fetchBasket(){
    this.authService.UserId.then(userId => 
      this.requestService.get("basket/" + userId)
      .subscribe(data => this.basket.next(data))
    )
  }

  updateBasket(basket: Basket){
    this.authService.UserId.then(userId => {
      basket.userId = userId;
      this.requestService.post("basket", basket)
      .subscribe(data => this.basket.next(data))
    })
  }

  deleteBasket(){
    this.authService.UserId.then(userId => {
      this.requestService.delete("basket/" + userId).subscribe()
    })
  }


  get BasketItems() {
    return this.basket.value.items;
  }
  get BasketPrice() {
    return this.basket.value.totalPrice;
  }

  addItem(item: BasketItem){
    this.authService.isAuthenticated
      .then(logged => {
        if(logged) { 
          var newBasket = this.basket.value;
          var existingItem = newBasket.items.find(i => i.productId == item.productId);
          if(existingItem) existingItem.quantity++;
          else {
            item.quantity = 1;
            newBasket.items.push(item);
          }
          this.toastr.success("Item added to basket");
          this.updateBasket(newBasket);
        }
        else this.router.navigate(["login"]); 
      })
  }

  increaseItemQuantity(item: BasketItem){
    var newBasket = this.basket.value;
    var existingItem = newBasket.items.find(i => i.productId == item.productId);
    if(existingItem) existingItem.quantity++;
    this.updateBasket(newBasket);
  }

  decreaseItemQuantity(item: BasketItem){
    var newBasket = this.basket.value;
    var existingItem = newBasket.items.find(i => i.productId == item.productId);
    if(existingItem.quantity > 1) {
      existingItem.quantity--;
      this.updateBasket(newBasket);
    }
    else this.removeItem(item);
  }

  removeItem(item: BasketItem){
    var newBasket = this.basket.value;
    const index = newBasket.items.indexOf(item, 0);
    if (index > -1) {
      newBasket.items.splice(index, 1);
    }
    this.updateBasket(newBasket);
  }
}
