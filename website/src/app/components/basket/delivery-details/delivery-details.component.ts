import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-delivery-details',
  templateUrl: './delivery-details.component.html',
  styleUrls: ['./delivery-details.component.scss']
})
export class DeliveryDetailsComponent implements OnInit {

  @Input() onMobile: boolean;
  @Output() onPaymentPanel = new EventEmitter<boolean>();
  @Output() onBack = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  changePanel(){
    this.onPaymentPanel.emit(true);
  }
  
  goBack(){
    this.onBack.emit(true);
  }

}
