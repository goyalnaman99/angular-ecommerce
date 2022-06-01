import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsComponent } from './user/product-details/product-details.component';
import { ProductsComponent } from './user/products/products.component';
import { CartComponent } from './user/cart/cart.component';
import { LoginComponent } from './user/login/login.component';
const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'product-details',
    component: ProductDetailsComponent,
  },
  {
    path: '',
    component: ProductsComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
