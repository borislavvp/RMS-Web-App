import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BasketItem } from 'src/app/models/basket/basketItem.model';
import { Product } from 'src/app/models/products/product.model';
import { BasketService } from 'src/app/services/basket.service';
import { ItemModalComponent } from '../item-modal/item-modal.component';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {

  @Input() product: Product;

  constructor(public dialog: MatDialog, private basketService: BasketService) { }

  ngOnInit(): void {
  }

  openItemDialog(product: Product){
    this.dialog.open(ItemModalComponent, { 
      panelClass: 'custom-dialog',
      data: {
        product: product
      },
      backdropClass: 'backdropBackground'
    });
  }

  addToBasket(product: Product){
    var item: BasketItem = {
      productId: product.id,
      productName: product.name,
      price: product.price
    }
    this.basketService.addItem(item);
  }

}
