import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PaymentDetails } from 'src/app/models/order/paymentDetails.model';
import { OrderService } from 'src/app/services/order.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.scss']
})
export class PaymentDetailsComponent implements OnInit {

  @Input() onMobile: boolean;
  @Output() onBack = new EventEmitter<boolean>();

  paymentDetailsForm: FormGroup;

  constructor(private orderService: OrderService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.paymentDetailsForm = new FormGroup({
      'cardNumber': new FormControl(null, Validators.required),
      'cardholder': new FormControl(null, Validators.required),
      'expDate': new FormControl(null, Validators.compose([Validators.required, Validators.pattern('(0[1-9]|10|11|12)/20[0-9]{2}$')])),
      'cvv': new FormControl(null, Validators.compose([Validators.required, Validators.pattern('[0-9]{3,4}$')])),
    });
  }

  goBack(){
    this.onBack.emit(true);
  }

  pay(){
    if(this.paymentDetailsForm.valid){
      var fv = this.paymentDetailsForm.value;
      var paymentDetails: PaymentDetails = {
        cardNumber: fv.cardNumber,
        month: fv.expDate.substring(0, fv.expDate.indexOf("/")),
        year: fv.expDate.split('/')[1],
        cvv: fv.cvv
      }
      this.orderService.placeOrder(paymentDetails);
    }
    else this.toastr.error("Fields are invalid!");
  }
}
