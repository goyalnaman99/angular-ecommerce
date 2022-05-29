import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  productId: number = 0;
  product: any = null;
  constructor(
    private route: ActivatedRoute,
    public productService: ProductService
  ) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe((params) => {
        this.productId = params['id'];
      });
    console.log(this.productId);

    this.product = this.productService.getProduct(this.productId);
  }
}
