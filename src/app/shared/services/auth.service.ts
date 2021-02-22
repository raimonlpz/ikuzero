import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ConcreteAction, User, UserAction } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private user: User;

  changeOnAuth = new Subject<boolean>();

  constructor() { }

  createUser(): void {
    this.user = {
      email: 'raimonlpez@gmail.com',
      password: 'raimon123',
      actions: []
    };
  }

  get userLogged(): User {
    return this.user;
  }

  addActionToUser(UAction: ConcreteAction): void {
    let actionIsRepeated = false;
    this.user.actions.forEach(a => {
      if (a.coinId === UAction.coinId && a.action === UAction.action && a.action !== UserAction.Seen) {
        actionIsRepeated = true;
      }
    });
    if (!actionIsRepeated) {
      this.user.actions.push(UAction);
      window.localStorage.setItem('user-actions', JSON.stringify(this.userLogged));
    }
  }

  get isAuth(): boolean {
    return this.isAuthenticated;
  }

  set isAuth(is: boolean) {
    this.isAuthenticated = is;
    this.changeOnAuth.next(this.isAuth);
  }
}
