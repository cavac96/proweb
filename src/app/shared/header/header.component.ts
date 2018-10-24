import { Component, OnInit } from '@angular/core';
import {User} from '../models/user';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: User;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = this.authenticationService.getCurrentUser();
    this.authenticationService.userObservable.subscribe(user => {
      this.user = user;
    });
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }

  signin() {
    this.router.navigate(['/signin']);
  }

  userInfo() {
    this.router.navigate(['/info']);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
