import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUser } from '../Types/user';
import { environment } from '../../environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);
  private api = environment.apiUrl;
  constructor() {}
  getUser() {
    return this.http.get<IUser[]>(`${this.api}/api/User`);
  }
  getUserById(id: number) {
    return this.http.get<IUser>(`${this.api}/api/User/${id}`);
  }
  addUser(user: IUser) {
    return this.http.post<IUser>(`${this.api}/api/User`, user);
  }

  updateUser(user: IUser) {
    return this.http.put<IUser>(`${this.api}/api/User/${user.id}`, user);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.api}/api/User/${id}`);
  }
}
