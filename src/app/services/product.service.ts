import { Injectable } from '@angular/core';
import products from 'src/assets/json/inventory.json';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor() { }

  getProducts() {
    return products;
  }

  getProduct(productId: any) {
    for (let item of products) {
      if (item.id == productId) {
        return item;
      }
    }
    return null;
  }
}
