import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsComponent } from './user/product-details/product-details.component';
import { ProductsComponent } from './user/products/products.component';
const routes: Routes = [
  {
    path: 'product-details',
    component: ProductDetailsComponent,
  },
  {
    path: '',
    component: ProductsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
