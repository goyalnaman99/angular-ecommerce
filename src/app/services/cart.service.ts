import { Injectable } from '@angular/core';
import { ProductService } from './product.service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private productService: ProductService, private loginService: LoginService) { }

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
        let cartItems = cartMap[userId] || {};
        for (let key in cartItems) {
          if (!this.productService.getProduct(key)) {
            // console.log("error in product id");
            delete cartItems[key];
            this.setCartMap(cartItems);
          }
          if (!isNaN(cartItems[key])) {
            if (cartItems[key] <= 0) {
              // console.log("quantity not positive");
              delete cartItems[key];
              this.setCartMap(cartItems);
            }
          }
          else {
            // console.log("quantity not number");
            delete cartItems[key];
            this.setCartMap(cartItems);
          }
        }
        return cartItems;
      }
    } catch (err) {
      return {};
    }
  }

  getProductQuantity(productId) {
    const cartItems = this.getCartItems();
    return cartItems[productId] || 0;
  }

  getTotalQuantity(): number {
    let cartItems = this.getCartItems();
    let quantity = 0;
    for (let key in cartItems) {
      quantity += cartItems[key];
    }
    return quantity;
  }

  getTotalPrice(): number {
    let cartItems = this.getCartItems();
    let totalPrice = 0;
    for (let key in cartItems) {
      let mrp = this.productService.getProduct(key)?.mrp || 0;
      let quantity: number = this.getProductQuantity(key);
      totalPrice += (mrp * quantity);
    }
    return totalPrice;
  }

  setCartMap(cartItems) {
    let cartMap = this.getCartMap();
    const userId = this.loginService.getUserId();

    if (userId) {
      cartMap[userId] = cartItems;
    }
    localStorage.setItem("cartMap", JSON.stringify(cartMap));
  }

  deletefromCart(productId) {
    if (!this.loginService.checkUser()) this.loginService.logout();
    let cartItems = this.getCartItems();
    if (cartItems != null) {
      console.log(cartItems[productId]);
      let stringId = productId.toString();
      delete cartItems[productId];
      console.log(cartItems[productId]);
      console.log(cartItems);
      this.setCartMap(cartItems);
    }
  }

  clearCart() {
    if (!this.loginService.checkUser()) this.loginService.logout();
    this.setCartMap({});
  }

  increaseQuantity(productId) {
    if (!this.loginService.checkUser()) this.loginService.logout();
    console.log(productId);
    let quantity = this.getProductQuantity(productId);
    console.log(quantity);
    quantity++;
    this.addToCart(productId, quantity);
  }

  decreaseQuantity(productId) {
    if (!this.loginService.checkUser()) this.loginService.logout();
    let quantity = this.getProductQuantity(productId);

    if (quantity > 1) {
      quantity--;
      this.addToCart(productId, quantity);
    }
    else if (quantity <= 1) {
      this.deletefromCart(productId);
    }
  }

  addToCart(productId, qty) {
    if (!this.loginService.checkUser()) this.loginService.logout();
    const cartItems = this.getCartItems();
    console.log(cartItems);
    //adding to cart item if product exists in cart
    cartItems[productId] = qty;
    this.setCartMap(cartItems);

  }
}
