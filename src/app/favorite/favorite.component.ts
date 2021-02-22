import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConcreteAction, UserAction } from '../shared/interfaces';
import { AuthService } from '../shared/services/auth.service';
import { CoingeckoService } from '../shared/services/coingecko.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit, OnDestroy {

  actions: Array<ConcreteAction>;
  favCoinsIds: Array<ConcreteAction>;
  favCoins: Array<any> = [];

  userActionsSub$: Subscription;

  favCoinsDashboardIsLoading: boolean;

  constructor(
    private auth: AuthService,
    private coingeckoService: CoingeckoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.actions = this.auth.userLogged.actions.slice().reverse();
    // this.actions = JSON.parse(window.localStorage.getItem('user-actions')).actions.reverse();
    this.favCoinsIds = this.actions
                            .filter((a: ConcreteAction) => a.action === 2).slice().reverse();
    this.getFavoriteCoins();

    this.userActionsSub$ = this.auth.userActions.subscribe(actions => {
      this.actions = actions.slice().reverse();
      this.favCoinsIds = actions.filter((a: ConcreteAction) => a.action === 2).slice().reverse();
      if (this.favCoins.length !== this.favCoinsIds.length) {
        this.favCoins = [];
        this.getFavoriteCoins();
      }
    });

    this.favCoinsDashboardIsLoading = false;
  }

  buildActionStatus(actionId: UserAction, coinId: string): string {
    switch (actionId) {
      case UserAction.Like:
        return `👍 You've liked ${coinId.toUpperCase()}`;
      case UserAction.Dislike:
        return `👎 You've disliked ${coinId.toUpperCase()}`;
      case UserAction.Fav:
        return `⭐ You've added to favs ${coinId.toUpperCase()} `;
      case UserAction.Seen:
        return `👀 You've seen ${coinId.toUpperCase()} in detail`;
      default:
        return '';
    }
  }

  addStyleBg(actionId: UserAction): string {
    switch (actionId) {
      case UserAction.Like:
        return `background-color: var(--tui-success-fill)`;
      case UserAction.Dislike:
        return `background-color: var(--tui-error-fill)`;
      case UserAction.Fav:
        return `background-color: var(--tui-warning-fill)`;
      case UserAction.Seen:
        return `background-color: var(--tui-info-fill)`;
      default:
        return '';
    }
  }

  deleteActionFromDashboard(actionId: string): void {
    this.auth.deleteActionFromUser(actionId);
  }

  getFavoriteCoins(): void {
    this.favCoinsDashboardIsLoading = true;
    this.favCoinsIds.map(coin => {
      this.coingeckoService.fetchCoinForFavsDashboard(coin.coinId).subscribe(r => {
        this.favCoins.push(r);
        if (this.favCoins.length === this.favCoinsIds.length) {
          this.favCoinsDashboardIsLoading = false;
        }
      });
    });
  }

  exploreCertainCoin(coinId: string): void {
    this.coingeckoService.fetchDetailCoinData(coinId);
    this.router.navigate(['/explore']);
  }


  ngOnDestroy(): void {
    this.userActionsSub$.unsubscribe();
  }
}
