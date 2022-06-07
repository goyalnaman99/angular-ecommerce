import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public loginService: LoginService, public cartService: CartService) { }

  logout() {
    this.loginService.logout();
  }

  ngOnInit(): void {
  }

}
