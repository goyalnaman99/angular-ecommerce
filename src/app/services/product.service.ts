import { Injectable } from '@angular/core';
import products from 'src/assets/json/inventory.json';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor() {}

  getProduct(productId: number) {
    for (let item of products) {
      if (item.id == productId) {
        return item;
      }
    }
    return {
      id: 1,
      brand: 'Roadster',
      category: 'T-Shirt',
      color: 'Maroon',
      imageUrl:
        'https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/2308267/2018/1/29/11517216335231-Roadster-Men-Maroon-Printed-Round-Neck-T-shirt-5591517216335098-1.jpg',
      mrp: 599,
      name: 'Typography Cotton T-Shirt',
      size: 'XS',
      styleId: '1297125-002',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit beatae libero maxime tenetur! Quia nostrum aliquid ducimus quam autem commodi sapiente. Iure excepturi eius laboriosam numquam ex laborum enim inventore?',
    };
  }
}
