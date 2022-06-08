import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { NavFootService } from 'src/app/services/nav-foot.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = "";
  password: string = "";
  wrongCredentials: boolean = false;

  constructor(private router: Router, private loginService: LoginService, public nav: NavFootService) { }

  login() {
    this.wrongCredentials = !this.loginService.login(this.email, this.password);
    console.log(this.wrongCredentials);
  }

  ngOnInit(): void {
    if (this.loginService.checkUser()) {
      this.router.navigate(['/']);
    }
    this.nav.hide();
  }

}
