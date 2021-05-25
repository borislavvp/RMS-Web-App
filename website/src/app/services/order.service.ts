import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DeliveryDetails } from '../models/order/deliveryDetails.model';
import { OrderProduct } from '../models/order/orderProduct.model';
import { PaymentDetails } from '../models/order/paymentDetails.model';
import { PlaceOrder } from '../models/order/placeOrder.model';
import { AuthService } from './auth.service';
import { BasketService } from './basket.service';
import { ProductService } from './product.service';
import { RequestService } from './request/request.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private deliveryDetails: DeliveryDetails;

  constructor(private requestService: RequestService,
    private basketService: BasketService,
    private productService: ProductService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService) { }

  placeOrder(paymentDetails: PaymentDetails){
    var products: OrderProduct[] = [];

    this.basketService.BasketItems.forEach(item => {
      var foundItem = this.productService.getProductById(item.productId);
      products.push({
        productId: foundItem.id,
        name: foundItem.name,
        ingredients: foundItem.ingredients,
        price: foundItem.price,
        quantity: item.quantity,
        imageUrl: foundItem.image
      })
    });
    paymentDetails.value = this.basketService.BasketPrice * 100;

    this.authService.UserId.then(userId => {
      var order: PlaceOrder = {
        products: products,
        totalPrice: this.basketService.BasketPrice,
        userId: userId,
        firstName: this.deliveryDetails.firstName,
        lastName: this.deliveryDetails.lastName,
        phone: this.deliveryDetails.phone,
        address: this.deliveryDetails.address,
        paymentDetails: paymentDetails
      }
      this.requestService.post("orders", order).subscribe(
        () => {
          this.toastr.success("Order has been placed successfully!");
          this.basketService.deleteBasket();
          this.router.navigate(["account"]); 
        },
        error => this.toastr.error(error.error.error)
      )
    });
  }

  saveDeliveryDetails(deliveryDetails: DeliveryDetails){
    this.deliveryDetails = deliveryDetails;
  }
}
