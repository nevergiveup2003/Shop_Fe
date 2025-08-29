import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth';
import { IAuth } from '../../Types/auth';
import { MatCardMdImage, MatCardModule } from '@angular/material/card';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  authService = inject(AuthService);
  auth: IAuth[] = [];
  fb = inject(FormBuilder);
  loginForm!: FormGroup;
  router = inject(Router);
  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    if (this.authService.isLoggedIn) {
      this.router.navigateByUrl('/');
    }
  }
  onLogin() {
    this.authService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe((result) => {
        console.log(result);
        this.authService.saveToken(result);
        if (result.role == 'Admin') {
          this.router.navigateByUrl('/');
        } else {
          this.router.navigateByUrl('/user-dashboard');
        }
      });
  }
}
