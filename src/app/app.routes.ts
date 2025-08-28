import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Products } from './pages/products/products';
import { Category } from './pages/category/category';
import { User } from './pages/user/user';

export const routes: Routes = [
    {path:'',component:Home},
    {path:'category',component:Category},

    {path:'product',component:Products},
    {path:'user',component:User},

];
