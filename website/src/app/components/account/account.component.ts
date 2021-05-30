import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order/order.model';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  order: Order = { id: 1, status: "new" }

  trackerStates: string[];
  statusIcons: string[];
  orderNameStatus: string[] = ["Accepted", "Cooking", "Packaging", "Delivering", "Delivered"];

  constructor() { }

  ngOnInit(): void {
    if(this.order.status == "new"){
      this.trackerStates = ["current-state", "next-state", "next-state", "next-state", "next-state"];
      this.statusIcons = ["accepted_current.png", "cooking_future.png", "packaging_future.png", "delivering_future.png", "delivered_future.png"];
    }
    if(this.order.status == "preparing"){
      this.trackerStates = ["previous-state", "current-state", "next-state", "next-state", "next-state"];
      this.statusIcons = ["accepted_past.png", "cooking_current.png", "packaging_future.png", "delivering_future.png", "delivered_future.png"];
    }
    if(this.order.status == "prepared"){
      this.trackerStates = ["previous-state", "previous-state", "current-state", "next-state", "next-state"];
      this.statusIcons = ["accepted_past.png", "cooking_past.png", "packaging_current.png", "delivering_future.png", "delivered_future.png"];
    }
    if(this.order.status == "delivering"){
      this.trackerStates = ["previous-state", "previous-state", "previous-state", "current-state", "next-state"];
      this.statusIcons = ["accepted_past.png", "cooking_past.png", "packaging_past.png", "delivering_current.png", "delivered_future.png"];
    }
    if(this.order.status == "delivered"){
      this.trackerStates = ["previous-state", "previous-state", "previous-state", "previous-state", "done"];
      this.statusIcons = ["accepted_past.png", "cooking_past.png", "packaging_past.png", "delivering_past.png", "delivered_current.png"];
    }
  }

}
