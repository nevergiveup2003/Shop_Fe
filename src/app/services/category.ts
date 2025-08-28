import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ICategory } from '../Types/categories';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  http = inject(HttpClient);
  apiUrl = 'https://localhost:7081';
  constructor() {}
  getCategory() {
    return this.http.get<ICategory[]>(this.apiUrl + '/api/Category');
  }
  addCategory(name: string, description: string) {
    return this.http.post(this.apiUrl + '/api/Category', {
      name: name,
      description: description,
    });
  }
  updateCategory(id: number, name: string, description: string) {
    return this.http.put(this.apiUrl + '/api/Category/' + id, {
      name: name,
      description: description,
    });
  }
  deleteCategory(id: number) {
    return this.http.delete(this.apiUrl + '/api/Category/' + id);
  }
}
