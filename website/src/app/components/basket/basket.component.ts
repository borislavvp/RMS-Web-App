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
  onDesktop: boolean = true;
  toShow = false;

  constructor() { }

  ngOnInit(): void {
    this.onDesktop = window.innerWidth >= 1100;
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

}
