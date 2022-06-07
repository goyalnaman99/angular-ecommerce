import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import users from 'src/assets/json/login.json';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  login(email: string, password: string) {
    const user = users.filter(
      (users) => email === users.email && password === users.password
    );
    if (user.length) {
      localStorage.setItem("user", JSON.stringify(user[0].id));
      this.router.navigate(['/']);
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem("user");
    this.router.navigate(['login']);
  }

  checkUser() {
    let user = this.getUserId();
    if (user) {
      for (let element of users) {
        if (element.id == user) {
          return true;
        }
      }
      return false;
    }
    else return false;
  }

  getUserId() {
    try {
      return Number(localStorage.getItem("user"));
    } catch (err) {
      return null;
    }
  }

  getUserName() {
    let user = this.getUserId();
    if (user) {
      for (let element of users) {
        if (element.id == user) {
          return element.firstname;
        }
      }
      return "Invalid User";
    }
    return "Invalid User";
  }

  constructor(private router: Router) { }
}
