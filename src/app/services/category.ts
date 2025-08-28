import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ICategory } from '../Types/categories';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  http = inject(HttpClient);
  private api = environment.apiUrl;
  constructor() {}
  getCategory() {
    return this.http.get<ICategory[]>(`${this.api}/api/Category`);
  }
  getCategoryById(id:number)
  {
    return this.http.get<ICategory>(`${this.api}/api/Category/${id}`);
  }
  addCategory(category:ICategory) {
    return this.http.post<ICategory>(`${this.api}/api/Category`,category)
  }
  updateCategory(category:ICategory) {
    return this.http.put(`${this.api}/api/Category/${category.id}`, category);
  }
  deleteCategory(id: number) {
    return this.http.delete(`${this.api}/api/Category/${id}`);
  }
}
