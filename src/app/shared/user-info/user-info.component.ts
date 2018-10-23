import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {User} from '../models/user';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  user: User;

  constructor(private location: Location, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.user = this.authenticationService.getCurrentUser();
    if(!this.userIsNotLogged()) {
    } else {
      console.log("Usuario no autorizado para acceder al producto.");
    }
  }

  userIsNotLogged() {
    return this.user === null;
  }

  goBack() {
    this.location.back();
  }

}
