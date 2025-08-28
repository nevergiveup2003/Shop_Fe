import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IProduct } from '../Types/product';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor() {}

  http = inject(HttpClient);
  private api = environment.apiUrl;
  getProducts() {
    return this.http.get<IProduct[]>(`${this.api}/api/Product`);
  }
  getProductById(id: number) {
    return this.http.get<IProduct>(`${this.api}/api/Product/${id}`);
  }
  addProduct(product: IProduct) {
    return this.http.post<IProduct>(`${this.api}/api/Product`, product);
  }
  updateProduct(product: IProduct) {
    return this.http.put<IProduct>(
      `${this.api}/api/Product/${product.id}`,
      product
    );
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.api}/api/Product/${id}`);
  }
}
