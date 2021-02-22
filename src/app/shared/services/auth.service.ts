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
  userActions = new Subject<Array<ConcreteAction>>();

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

  // get userActionsForDashboard(): Array<ConcreteAction> {
  //   return this.user.actions;
  // }

  addActionToUser(UAction: ConcreteAction): void {
    let actionIsRepeated = false;
    this.user.actions.forEach(a => {
      if (a.coinId === UAction.coinId && a.action === UAction.action && a.action !== UserAction.Seen) {
        actionIsRepeated = true;
      }
    });
    if (!actionIsRepeated) {
      this.user.actions = [...this.user.actions, UAction];
      // window.localStorage.setItem('user-actions', JSON.stringify(this.userLogged));
      this.userActions.next(this.user.actions);
    }
  }

  deleteActionFromUser(actionId: string): void {
    this.user.actions = [...this.user.actions.filter(action => action.id !== actionId)];
    this.userActions.next(this.user.actions);
  }

  get isAuth(): boolean {
    return this.isAuthenticated;
  }

  set isAuth(is: boolean) {
    this.isAuthenticated = is;
    this.changeOnAuth.next(this.isAuth);
  }
}
