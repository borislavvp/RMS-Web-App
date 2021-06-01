import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Order } from 'src/app/models/order/order.model';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import { SocketService } from 'src/app/services/socket/socket.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  lastOrder: Order;

  trackerStates: string[];
  statusIcons: string[];
  orderNameStatus: string[] = ["Accepted", "Cooking", "Packaging", "Delivering", "Delivered"];

  constructor(private socketService: SocketService, private orderService: OrderService, private auth: AuthService) { 
    this.auth.User.then(user => this.socketService.connect(environment.ORDER_MESSAGE_SERVICE, user.access_token));
    this.socketService.on.OrderStatusChange = this.orderService.OrderStatusChangeHandler;
  }

  ngOnInit(): void {
    this.orderService.fetchOrders();
    this.orderService.ordersList
    .pipe(map(list => list.filter(order => order.status != "Delivered")),
      map(list => list.reverse()))
    .subscribe(list => {
      this.lastOrder = list[0];
      this.configureStryling();
    });
  }

  private configureStryling() {
    if(this.lastOrder?.status == "New"){
      this.trackerStates = ["current-state", "next-state", "next-state", "next-state", "next-state"];
      this.statusIcons = ["accepted_current.png", "cooking_future.png", "packaging_future.png", "delivering_future.png", "delivered_future.png"];
    }
    if(this.lastOrder?.status == "Preparing"){
      this.trackerStates = ["previous-state", "current-state", "next-state", "next-state", "next-state"];
      this.statusIcons = ["accepted_past.png", "cooking_current.png", "packaging_future.png", "delivering_future.png", "delivered_future.png"];
    }
    if(this.lastOrder?.status == "Prepared"){
      this.trackerStates = ["previous-state", "previous-state", "current-state", "next-state", "next-state"];
      this.statusIcons = ["accepted_past.png", "cooking_past.png", "packaging_current.png", "delivering_future.png", "delivered_future.png"];
    }
    if(this.lastOrder?.status == "Delivering"){
      this.trackerStates = ["previous-state", "previous-state", "previous-state", "current-state", "next-state"];
      this.statusIcons = ["accepted_past.png", "cooking_past.png", "packaging_past.png", "delivering_current.png", "delivered_future.png"];
    }
    if(this.lastOrder?.status == "Delivered"){
      this.trackerStates = ["previous-state", "previous-state", "previous-state", "previous-state", "done"];
      this.statusIcons = ["accepted_past.png", "cooking_past.png", "packaging_past.png", "delivering_past.png", "delivered_current.png"];
    }
  }

}
