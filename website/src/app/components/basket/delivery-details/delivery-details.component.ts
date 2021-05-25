import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DeliveryDetails } from 'src/app/models/order/deliveryDetails.model';
import { OrderService } from 'src/app/services/order.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delivery-details',
  templateUrl: './delivery-details.component.html',
  styleUrls: ['./delivery-details.component.scss']
})
export class DeliveryDetailsComponent implements OnInit {

  @Input() onMobile: boolean;
  @Output() onPaymentPanel = new EventEmitter<boolean>();
  @Output() onBack = new EventEmitter<boolean>();

  deliveryDetailsForm: FormGroup;

  constructor(private orderService: OrderService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.deliveryDetailsForm = new FormGroup({
      'firstName': new FormControl(null, Validators.required),
      'lastName': new FormControl(null, Validators.required),
      'phone': new FormControl(null, Validators.required),
      'address': new FormControl(null, Validators.required),
    });
  }

  changePanel(){
    if(this.deliveryDetailsForm.valid){
      this.orderService.saveDeliveryDetails(this.deliveryDetailsForm.value as DeliveryDetails);
      this.onPaymentPanel.emit(true);
    }
    else this.toastr.error("Fields are invalid!");
  }
  
  goBack(){
    this.onBack.emit(true);
  }

}
