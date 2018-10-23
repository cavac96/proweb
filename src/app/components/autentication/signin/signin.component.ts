import { Component, OnInit } from '@angular/core';
import {User} from '../../../shared/models/user';
import {AuthenticationService} from '../../../shared/services/authentication.service';
import {Router} from '@angular/router';
import {Product} from '../../../shared/models/product';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  user: User;

  name;
  role;
  email;
  password;

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.user = this.authenticationService.getCurrentUser();
    this.authenticationService.userObservable.subscribe(user => {
      this.user = user;
    });
    if (this.userIsCashier()) {
      this.router.navigate(['/cashier/register']);
    }
    if (this.userIsWarehouseman()) {
      this.router.navigate(['/warehouseman/products-list']);
    }
  }

  signin() {
    let aux = new User(this.name, this.role, this.email, this.password);
    this.authenticationService.signin(aux).subscribe(u => {
      this.user = u;
      this.router.navigate(['/login']);
    }, error => {
      console.log(error);
    });
  }

  userIsWarehouseman() {
    if (this.user !== null) {
      return this.user.role === 'warehouseman';
    }
    return false;
  }

  userIsCashier() {
    if (this.user !== null) {
      return this.user.role === 'cashier';
    }
    return false;
  }

  userIsNotLogged() {
    return this.user === null;
  }

}
