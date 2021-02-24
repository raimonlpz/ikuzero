import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from './shared/interfaces';
import { AuthService } from './shared/services/auth.service';
import { CoingeckoService } from './shared/services/coingecko.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  coinSelected: string;
  activeItemIndex = 0;
  isAuthenticated: boolean;
  authSub$: Subscription;

  darkModeToggling: boolean;

  newUser: User;

  constructor(private coingeckoService: CoingeckoService, private authService: AuthService) {}

  ngOnInit(): void {
    this.darkModeToggling = true;

    this.coinSelected = 'ethereum';
    this.onCoinSelected(this.coinSelected);
    // this.isAuthenticated = this.authService.isAuth;
    this.isAuthenticated = true;

    this.authSub$ = this.authService.changeOnAuth.subscribe(is => {
      this.isAuthenticated = is;
    });

    this.authService.createUser();
    // console.log(this.authService.userLogged);
  }

  onCoinSelected(coin: string): void {
    this.coinSelected = coin;
    this.coingeckoService.fetchDetailCoinData(this.coinSelected);
  }

  ngOnDestroy(): void {
    this.authSub$.unsubscribe();
  }
}
