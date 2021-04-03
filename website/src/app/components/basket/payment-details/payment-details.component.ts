import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.scss']
})
export class PaymentDetailsComponent implements OnInit {

  @Input() onMobile: boolean;
  @Output() onBack = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  goBack(){
    this.onBack.emit(true);
  }
}
