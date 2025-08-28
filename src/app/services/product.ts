import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IProduct } from '../Types/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor() {}

  http = inject(HttpClient);
  apiUrl = 'https://localhost:7081';
  getProducts() {
    return this.http.get<IProduct[]>(this.apiUrl + '/api/Product');
  }
  addProduct(
    name: string,
    description: string,
    price: number,
    categoryId: number
  ) {
    return this.http.post(this.apiUrl + '/api/Product', {
      name: name,
      description: description,
      price: price,
      categoryId: categoryId,
    });
  }
  UpdateProduct(
    id: number,
    name: string,
    description: string,
    price: number,
    categoryId: number
  ) {
    return this.http.put(this.apiUrl + '/api/Product/' + id, {
      name: name,
      description: description,
      price: price,
      categoryId: categoryId,
    });
  }
  DeleteProduct(id: number) {
    return this.http.delete(this.apiUrl + '/api/Product/' + id);
  }
}
