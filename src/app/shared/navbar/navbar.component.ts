import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { CartService } from 'src/app/services/cart.service';
import { NavFootService } from 'src/app/services/nav-foot.service';
import 'jquery';
declare var $: any;

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
    setTimeout(() => {
      $('[data-toggle="tooltip"]').tooltip();
    });
  }

}
