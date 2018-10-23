import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {Product} from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class SupermercadoService {

  private apiUrl: string;

  constructor( private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl + '/products');
  }

  getProductById(SKUcode: string): Observable<Product> {
    return this.http.get<Product>(this.apiUrl + '/product/' + SKUcode);
  }

  editProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(this.apiUrl + '/product/' + product.SKUcode, product);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl + '/product/', product);
  }

  deleteProduct(product: Product): Observable<Product> {
    return this.http.delete<Product>(this.apiUrl + '/product/' + product.SKUcode);
  }

  checkProduct(SKUcode: string, quantity: number): Observable<Product> {
    return this.http.get<Product>(this.apiUrl + '/cashier/' + SKUcode + '/' + quantity);
  }

  updateQuantity(product: Product): Observable<Product> {
    return this.http.put<Product>(this.apiUrl + '/product/' + product.SKUcode, product);
  }
}
