import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';
import { NavFootService } from 'src/app/services/nav-foot.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  productId: number = 0;
  product: any = null;
  displayStyle = "none";
  modalTitle = "";
  modalBody = "";
  currProductId: number;

  constructor(
    private route: ActivatedRoute,
    public productService: ProductService,
    public cartService: CartService,
    public nav: NavFootService
  ) { }

  increaseQuantity(productId: any) {
    this.cartService.increaseQuantity(productId);
  }

  deleteProduct(productId: number) {
    this.cartService.deletefromCart(productId);
    this.closePopup();
    location.reload();
  }

  openPopup(modalTitle: string, modalBody: string, productId?: any) {
    this.displayStyle = "block";
    this.modalTitle = modalTitle;
    this.currProductId = productId;
    this.modalBody = modalBody;
  }
  closePopup() {
    this.displayStyle = "none";
  }

  decreaseQuantity(productId: any) {
    if (this.cartService.getProductQuantity(productId) <= 1) {
      let prod = this.productService.getProduct(productId);
      this.openPopup("Remove From Cart", "Are you sure you want to delete " + prod?.name + " from cart?", productId);
    }
    else this.cartService.decreaseQuantity(productId);
  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe((params) => {
        this.productId = params['id'];
      });

    this.nav.show();

    this.product = this.productService.getProduct(this.productId);
  }
}
