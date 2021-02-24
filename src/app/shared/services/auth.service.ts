import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {
  ConcreteAction,
  Portfolio,
  User,
  UserAction,
  PortfolioInvestmentAction
} from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private user: User;

  changeOnAuth = new Subject<boolean>();
  userActions = new Subject<Array<ConcreteAction>>();
  // portfolioMovements = new Subject<Array<PortfolioInvestmentAction>>();

  constructor() { }

  createUser(): void {
    this.user = {
      email: 'raimonlpez@gmail.com',
      password: 'raimon123',
      actions: [],
      portfolio: {
        budget: 10_000_000,
        investments: []
      }
    };
  }

  get userLogged(): User {
    return this.user;
  }

  get portfolioUserData(): Portfolio {
    return this.user.portfolio;
  }

  registerPortfolioUserAction(coinId: string, amountCash: number): void {
    if (this.user.portfolio.budget >= amountCash) {
      this.user.portfolio.investments.push({
        investmentId: String(new Date().valueOf()),
        timestamp: new Date(),
        coinId,
        amountCashInUsd: amountCash
      });
      this.user.portfolio.budget -= amountCash;
    }
  }

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
