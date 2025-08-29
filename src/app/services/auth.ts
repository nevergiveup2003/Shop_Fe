import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { IAuth } from '../Types/auth';
import { IAuthToken } from '../Types/authToken';
import { Router } from '@angular/router';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  http = inject(HttpClient);
  router = inject(Router);
  constructor() {}
  login(email: string, password: string) {
    return this.http.post<IAuthToken>(`${this.apiUrl}/api/Auth/login`, {
      email: email,
      password: password,
    });
  }
  saveToken(authtoken: IAuthToken) {
    localStorage.setItem('auth', JSON.stringify(authtoken));
    localStorage.setItem('token', authtoken.token);
  }
  logout() {
    localStorage.removeItem('auth');
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }
  get isLoggedIn() {
    return localStorage.getItem('token') ? true : false;
  }
  get isUser() {
    if (!this.isLoggedIn) {
      return false;
    }
    let token = JSON.parse(localStorage.getItem('auth')!);
    if (token.role == 'User') {
      return true;
    } else {
      return false;
    }
  }
  get authDetail(): IAuthToken | null {
    if(!this.isLoggedIn) {
      return null;}
      let token : IAuthToken = JSON.parse(localStorage.getItem('auth')!)
      return token
    
  }
}
