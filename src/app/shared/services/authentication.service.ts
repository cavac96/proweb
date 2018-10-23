import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  private apiUrl: string;
  private user: User;

  public userObservable = new Subject<User>();

  constructor(private http: HttpClient) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.apiUrl = environment.apiUrl;
  }

  getCurrentUser() {
    return this.user;
  }

  setCurrentUser(user: User) {
    this.user = user;
    if (this.user !== null) {
      localStorage.setItem('currentUser', JSON.stringify(this.user));
    }
    this.notifyUserChange(this.user);
  }

  notifyUserChange(user) {
    this.userObservable.next(user);
  }

  login(email: string, password: string): Observable<User> {
    this.logout();
    return this.http.post<User>('${this.apiUrl}/authenticate', {email: email, password: password})
      .pipe(map(user => {
        if (user) {
          this.setCurrentUser(user);
        }
        return user;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.setCurrentUser(null);
  }

  signin(user: User): Observable<User> {
    // this.logout();
    return this.http.post<User>(this.apiUrl + '/authenticate/signin', user);
  }

}
