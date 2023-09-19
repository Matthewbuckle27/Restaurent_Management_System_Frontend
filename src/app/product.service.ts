import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../app/product-home/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:8088/product');
  }

  changeAvailability(productId: number): Observable<any> {
    return this.http.put(`http://localhost:8088/product/${productId}`, {});
  }

  updateProductPrice(productId: number, price: number): Observable<any> {
    return this.http.put(`http://localhost:8088/product/${productId}/${price}`, {});
  }
}
