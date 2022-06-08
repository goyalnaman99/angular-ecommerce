import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { CartService } from 'src/app/services/cart.service';
import { NavFootService } from 'src/app/services/nav-foot.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public loginService: LoginService, public cartService: CartService, public nav: NavFootService) { }

  logout() {
    this.loginService.logout();
  }

  ngOnInit(): void {
  }

}
