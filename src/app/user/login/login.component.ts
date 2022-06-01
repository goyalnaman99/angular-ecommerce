import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = "";
  password: string = "";
  wrongCredentials: boolean = false;

  login() {
    this.wrongCredentials = !this.loginService.login(this.email, this.password);
    console.log(this.wrongCredentials);
  }

  constructor(private router: Router, private loginService: LoginService,) { }

  ngOnInit(): void {
    if (this.loginService.checkUser()) {
      this.router.navigate(['/']);
    }
  }

}
