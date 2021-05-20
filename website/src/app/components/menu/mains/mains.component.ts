import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/products/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-mains',
  templateUrl: './mains.component.html',
  styleUrls: ['./mains.component.scss']
})
export class MainsComponent implements OnInit {

  products: Product[];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.products = this.productService.products.filter(x => x.category.name == "main");
  }

}
