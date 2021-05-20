import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Product } from 'src/app/models/product.model';
import { AuthService } from 'src/app/services/auth.service';
import { BasketService } from 'src/app/services/basket.service';
import { ProductService } from 'src/app/services/product.service';
import { ItemModalComponent } from './item-modal/item-modal.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MenuComponent implements OnInit {

  constructor(private productService: ProductService, 
    private basketService: BasketService,
    private authService: AuthService) { }

  ngOnInit(): void {
    // this.productService.productsList.subscribe(list => this.products = list)

    this.authService.isAuthenticated
      .then(logged => {
        if(logged) this.basketService.fetchBasket();
      })
  }

}
