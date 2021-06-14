import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Product } from '../models/products/product.model';
import { RequestService } from './request/request.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productsList: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  constructor(private requestService: RequestService, 
    private httpClient: HttpClient) {
    this.fetchProducts();
  }

  getProductById(id: string): Product {
    return this.productsList.value.find(prod => prod.id == id);
  }

  fetchProducts(){
    this.requestService.get("products")
    .pipe(map(list => list.filter(item => item.availability == true)))
    .subscribe(data => {console.log(data); this.productsList.next(data)})
  }

  // fetchImageUrl(imageUrl: string): Observable<any> {
  //   return this.httpClient.get(
  //     // environment.WEBSITE_GATEWAY + "/products/image/" + imageName, 
  //     imageUrl,
  //     { responseType: 'text' }
  //   );
  // }
}
