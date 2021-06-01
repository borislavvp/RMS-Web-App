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
import { SocketService } from './socket/socket.service';
import { environment } from 'src/environments/environment';
import { OrderStatusChangeMessage } from './socket/messages/server/OrderStatusChangeMessage';
import { BehaviorSubject } from 'rxjs';
import { Order } from '../models/order/order.model';
import { OrderAvailableMessage } from './socket/messages/server/OrderAvailableMessage';
import { QueryParameter } from './request/queryParameter';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private deliveryDetails: DeliveryDetails;
  ordersList: BehaviorSubject<Order[]> = new BehaviorSubject<Order[]>([]);

  constructor(private requestService: RequestService,
    private basketService: BasketService,
    private productService: ProductService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private socketService: SocketService) { }

  fetchOrders(){
    this.authService.UserId.then(id => {
      var params: QueryParameter[] = [];
      var queryParam = { key: "userId", value: id }
      params.push(queryParam);
      this.requestService.get("orders", params)
        .subscribe(data => this.ordersList.next(data));
    })
  }

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
          this.authService.User.then(user => this.socketService.connect(environment.ORDER_MESSAGE_SERVICE, user.access_token));
          this.toastr.success("Order has been placed successfully!");
          this.basketService.deleteBasket();
          this.router.navigate(["account"]); 
        },
        error => this.toastr.error(error.error.error)
      )
    });
  }

  OrderStatusChangeHandler = ({ payload }: OrderStatusChangeMessage) => {
    // const orderIndex = this.order.findIndex(o => o.id === payload.orderNumber)
    // if (orderIndex!==-1) {
    //   this._orders[orderIndex].status = payload.orderStatus;
    //   this.ordersChanged.next(this._orders);
    //   this.orderStatusChanged.next(this._orders[orderIndex]);
    // }
    console.log("ZDR");
    var list = this.ordersList.value;
    list.forEach(item => {
      if(item.id == payload.orderNumber) item.status = payload.orderStatus;
    });
    this.ordersList.next(list);
  }

  saveDeliveryDetails(deliveryDetails: DeliveryDetails){
    this.deliveryDetails = deliveryDetails;
  }
}
