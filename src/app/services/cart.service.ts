import { Injectable } from '@angular/core';
import { ProductService } from './product.service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  //this is the cart map of all users, map of userId and their cartItems
  getCartMap() {
    try {
      let cartMap = localStorage.getItem("cartMap");
      if (cartMap) {
        cartMap = JSON.parse(cartMap);
      }
      return cartMap || {};
    } catch (err) {
      return {};
    }
  }

  //getting Cart of the Current User
  getCartItems() {
    try {
      const cartMap = this.getCartMap();
      const userId = this.loginService.getUserId();
      if (userId) {
        console.log("if");
        return cartMap.hasOwnProperty(userId) ? cartMap[userId] : {};
      }
    } catch (err) {
      return {};
    }
  }

  getProductQuantity(productId) {
    const cartItems = this.getCartItems();
    console.log(cartItems);
    return cartItems[productId] || 0;
  }

  setCartMap(cartItems) {
    const cartMap = this.getCartMap();
    console.log(cartMap);
    const userId = this.loginService.getUserId();

    if (userId) {
      cartMap[userId] = cartItems;
    }
    localStorage.setItem("cartMap", JSON.stringify(cartMap));
  }

  deletefromCart(productId) {
    const cartItems = this.getCartItems();
    if (cartItems != null) {
      const index = cartItems.findIndex((cartItem) => cartItem.id === productId);
      if (index >= 0) {
        cartItems.splice(index, 1);
      }
      this.setCartMap(cartItems);
    }
  }

  increaseQuantity(productId) {
    console.log(productId);
    let quantity = this.getProductQuantity(productId);
    console.log(quantity);
    quantity++;
    this.addToCart(productId, quantity);
  }

  decreaseQuantity(productId) {
    let quantity = this.getProductQuantity(productId);

    if (quantity > 0) {
      quantity--;
    }
    else if (quantity <= 0) {
      quantity = 0;
    }
    this.addToCart(productId, quantity);
  }

  addToCart(productId, qty) {
    const cartItems = this.getCartItems();
    console.log(cartItems);
    //adding to cart item if product exists in cart
    cartItems[productId] = qty;
    this.setCartMap(cartItems);

  }
  constructor(private productService: ProductService, private loginService: LoginService) { }
}
