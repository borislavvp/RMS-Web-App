import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Product } from 'src/app/models/product.model';
import { ItemModalComponent } from '../item-modal/item-modal.component';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {

  @Input() product: Product;

  constructor(public dialog: MatDialog) { }

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

  addToBasket(product: Product){}

}
