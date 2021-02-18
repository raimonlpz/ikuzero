import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  changeOnAuth = new Subject<boolean>();

  constructor() { }

  get isAuth(): boolean {
    return this.isAuthenticated;
  }

  set isAuth(is: boolean) {
    this.isAuthenticated = is;
    this.changeOnAuth.next(this.isAuth);
  }
}
