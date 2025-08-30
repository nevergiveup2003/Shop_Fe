import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Products } from './pages/products/products';
import { Category } from './pages/category/category';
import { User } from './pages/user/user';
import { Login } from './pages/login/login';
import { UserDashboard } from './pages/user-dashboard/user-dashboard';
import { Profile } from './pages/profile/profile';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'category', component: Category },

  { path: 'product', component: Products },
  { path: 'user', component: User },
  { path: 'login', component: Login },
  { path: 'user-dashboard', component: UserDashboard },
  {
    path:'profile',component:Profile
  }
];
