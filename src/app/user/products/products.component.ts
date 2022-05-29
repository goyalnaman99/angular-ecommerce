import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, FormBuilder } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  brandFilterList: Array<any> = [];
  categoryFilterList: Array<any> = [];
  products = this.productService.getProducts();
  filteredProducts = this.products;

  constructor(public productService: ProductService) { }

  BrandFilter(brand: string, isChecked: boolean) {
    if (isChecked) {
      this.brandFilterList.push(brand);
    } else {
      let index = this.brandFilterList.indexOf(brand);
      this.brandFilterList.splice(index, 1);
    }

    if (this.brandFilterList.length || this.categoryFilterList.length) {
      if (!this.categoryFilterList.length) {
        this.filteredProducts = this.products.filter((product) =>
          this.brandFilterList.includes(product.brand)
        );
      } else if (!this.brandFilterList.length) {
        this.filteredProducts = this.products.filter((product) =>
          this.categoryFilterList.includes(product.category)
        );
      } else {
        this.filteredProducts = this.products.filter(
          (product) =>
            this.categoryFilterList.includes(product.category) &&
            this.brandFilterList.includes(product.brand)
        );
      }
    } else this.filteredProducts = this.products;
  }

  CategoryFilter(category: string, isChecked: boolean) {
    if (isChecked) {
      this.categoryFilterList.push(category);
    } else {
      let index = this.categoryFilterList.indexOf(category);
      this.categoryFilterList.splice(index, 1);
    }

    if (this.brandFilterList.length || this.categoryFilterList.length) {
      if (!this.categoryFilterList.length) {
        this.filteredProducts = this.products.filter((product) =>
          this.brandFilterList.includes(product.brand)
        );
      } else if (!this.brandFilterList.length) {
        this.filteredProducts = this.products.filter((product) =>
          this.categoryFilterList.includes(product.category)
        );
      } else {
        this.filteredProducts = this.products.filter(
          (product) =>
            this.categoryFilterList.includes(product.category) &&
            this.brandFilterList.includes(product.brand)
        );
      }
    } else this.filteredProducts = this.products;
  }

  brands = [...new Set(this.products.map((item) => item.brand))];
  categories = [...new Set(this.products.map((item) => item.category))];

  ngOnInit(): void {
  }
}