import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/models/products/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-salads',
  templateUrl: './salads.component.html',
  styleUrls: ['./salads.component.scss']
})
export class SaladsComponent implements OnInit {
  
  products: Product[];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.productsList.pipe(map(list => 
      list.filter(product => product?.category?.name == "salad"))
    ).subscribe(list => this.products = list);
  }

}
