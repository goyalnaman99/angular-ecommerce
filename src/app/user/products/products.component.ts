import { Component, OnInit } from '@angular/core';
import { map } from 'jquery';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  filters = {
    brand: [],
    category: []
  }
  products = this.productService.getProducts();
  filteredProducts = this.products;
  noOfResults: number;
  cartItems = this.cartService.getCartItems();
  brands = [...new Set(this.products.map((item) => item.brand))];
  categories = [...new Set(this.products.map((item) => item.category))];
  displayStyle = "none";
  modalTitle = "";
  modalBody = "";
  currProductId: number;

  constructor(private productService: ProductService, public cartService: CartService) { }

  populateFilters(filterValue: string, filterType: string, isChecked: boolean) {
    if (isChecked) {
      this.filters[filterType].push(filterValue);
    } else {
      let index = this.filters[filterType].indexOf(filterValue);
      this.filters[filterType].splice(index, 1);
    }
    this.filterProducts(this.filters);
  }

  filterProducts(filters) {
    const filterKeys = Object.keys(filters);
    this.filteredProducts = this.products.filter(product => {
      return filterKeys.every(key => {
        if (!filters[key].length) return true;
        return filters[key].includes(product[key]);
      })
    })
    this.noOfResults = this.filteredProducts.length;
  }


  sortProducts(e) {
    var valueSelected = e.target.value;
    if (valueSelected == 1) {
      this.filteredProducts.sort((a, b) => (a.id > b.id ? 1 : -1));
    } else if (valueSelected == 2) {
      this.filteredProducts.sort((a, b) => (a.mrp > b.mrp ? 1 : -1));
    }
    else {
      this.filteredProducts.sort((a, b) => (a.mrp < b.mrp ? 1 : -1));
    }
  }

  clearFilters() {
    $("input[type=checkbox]").prop("checked", true).trigger("click");
  }

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
    this.noOfResults = this.filteredProducts.length;
    console.log(this.products);
  }
}