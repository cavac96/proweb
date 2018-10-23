import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../shared/services/authentication.service';
import {User} from '../../../shared/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email;
  password;
  user: User;

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.user = this.authenticationService.getCurrentUser();
    this.authenticationService.userObservable.subscribe(user => {
      this.user = user;
    });
    if (!this.userIsNotLogged()) {
      if (this.user.role === 'cashier') {
        this.router.navigate(['/cashier/register']);
      }
      if (this.user.role === 'warehouseman') {
        this.router.navigate(['/warehouseman/products-list']);
      }
    }
  }

  login() {
    this.authenticationService.login(this.email, this.password).subscribe(
      user => {
        if(user.role === 'cashier') {
          this.router.navigate(['/cashier/register']);
        }
        if(user.role === 'warehouseman') {
          this.router.navigate(['/warehouseman/products-list']);
        }
      }, error => {
        console.log(error);
      }
    );
  }

  userIsNotLogged() {
    return this.user === null;
  }

}
