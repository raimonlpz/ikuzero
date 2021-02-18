import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './shared/services/auth.service';
import { SidebarService } from './shared/services/sidebar.service';

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

  constructor(private sidebarService: SidebarService, private authService: AuthService) {}

  ngOnInit(): void {
    this.coinSelected = 'ethereum';
    this.onCoinSelected(this.coinSelected);
    this.isAuthenticated = this.authService.isAuth;

    this.authSub$ = this.authService.changeOnAuth.subscribe(is => {
      this.isAuthenticated = is;
    });
  }

  onCoinSelected(coin: string): void {
    this.coinSelected = coin;
    this.sidebarService.fetchDetailCoinData(this.coinSelected);
  }

  ngOnDestroy(): void {
    this.authSub$.unsubscribe();
  }
}
