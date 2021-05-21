import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/models/products/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.scss']
})
export class DrinksComponent implements OnInit {

  products: Product[];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.productsList.pipe(map(list => 
      list.filter(product => product?.category?.name == "drink"))
    ).subscribe(list => this.products = list);
  }

}
