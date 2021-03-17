import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BasketComponent implements OnInit {

  onDelivery: boolean = true;
  onPayment: boolean = false;
  
  constructor() { }

  ngOnInit(): void {
  }

  toggle(){
    this.onDelivery = !this.onDelivery;
    this.onPayment = !this.onPayment;
  }

}
