import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, FormBuilder } from '@angular/forms';
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

  brands = [...new Set(this.products.map((item) => item.brand))];
  categories = [...new Set(this.products.map((item) => item.category))];

  ngOnInit(): void {
    this.noOfResults = this.filteredProducts.length;
    for (let product of this.products) {
      product['quantity'] = this.cartService.getProductQuantity(product.id);
    }
    console.log(this.products);
  }
}