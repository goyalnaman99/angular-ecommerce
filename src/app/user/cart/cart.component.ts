import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';
import { Papa } from 'ngx-papaparse';
import { NavFootService } from 'src/app/services/nav-foot.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  totalPrice: number;
  cartItems = this.cartService.getCartItems();
  products = this.productService.getProducts();
  displayStyle = "none";
  displaySuccessModal = "none";
  modalTitle = "";
  modalBody = "";
  currProductId: number;

  constructor(public productService: ProductService, public cartService: CartService, private papa: Papa, public nav: NavFootService) { }

  increaseQuantity(productId: any) {
    this.cartService.increaseQuantity(productId);
  }


  decreaseQuantity(productId: any) {
    if (this.cartService.getProductQuantity(productId) <= 1) {
      let prod = this.productService.getProduct(productId);
      this.openPopup("Remove From Cart", "Are you sure you want to delete " + prod?.name + " from cart?", productId);
    }
    else this.cartService.decreaseQuantity(productId);
  }

  clearCart() {
    this.cartService.clearCart();
    this.closePopup();
    location.reload();
  }

  clearCartModal() {
    this.openPopup("Clear Cart", "Are you sure you want to remove all items from cart?", 0);
  }

  downloadOrderCSV() {
    let rows: any[] = [];
    for (let key in this.cartItems) {
      const product = this.productService.getProduct(key);
      const qty = this.cartService.getProductQuantity(key);
      rows.push({
        ID: product?.id,
        Name: product?.name,
        Brand: product?.brand,
        MRP: product?.mrp,
        Quantity: qty,
        "Total Price": (product?.mrp || 0) * qty,
      });
    }

    //sorting according to product id
    rows.sort((a, b) => (a.Id > b.Id ? 1 : b.Id > a.Id ? -1 : 0));

    //unparsing to csv
    const csv = this.papa.unparse(rows);

    // Creating a Blob for having a csv file format and passing the data with type
    const blob = new Blob([csv], { type: "text/csv" });

    // Creating an object for downloading url
    const url = window.URL.createObjectURL(blob);

    // Creating an anchor(a) tag of HTML
    const a = document.createElement("a");

    // Passing the blob downloading url
    a.setAttribute("href", url);

    //getting datetime of order
    var today = new Date().toLocaleString("en-IN");

    // Setting the anchor tag attribute for downloading and passing the download file name
    a.setAttribute("download", today + ".csv");

    //appending the temporary link
    document.body.appendChild(a);

    // Performing a download with click
    a.click();

    //removing the temporary link
    document.body.removeChild(a);

    //clearing cart
    this.cartService.clearCart();

    this.openSuccessModal();
  }

  openSuccessModal() {
    this.displaySuccessModal = "block";
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

  ngOnInit(): void {
    this.nav.show();
  }

}
