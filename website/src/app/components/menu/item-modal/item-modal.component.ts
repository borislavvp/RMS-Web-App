import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BasketItem } from 'src/app/models/basket/basketItem.model';
import { Product } from 'src/app/models/products/product.model';
import { BasketService } from 'src/app/services/basket.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-item-modal',
  templateUrl: './item-modal.component.html',
  styleUrls: ['./item-modal.component.scss']
})
export class ItemModalComponent implements OnInit {

  product: Product;

  constructor(@Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<ItemModalComponent>,
    private basketService: BasketService,
    private productService: ProductService) { }

  ngOnInit(): void {
    this.product = this.data.product;
  }

  closeModal(){
    this.dialogRef.close();
  }

  addToBasket(){
    var item: BasketItem = {
      productId: this.product.id,
      productName: this.product.name,
      price: this.product.price
    }
    this.basketService.addItem(item);
    this.dialogRef.close();
  }

}
