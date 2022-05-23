import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  constructor(public productService: ProductService) {}

  ngOnInit(): void {}

  productId = 5;
  product = this.productService.getProduct(this.productId);
}
