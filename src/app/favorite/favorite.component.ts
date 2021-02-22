import { Component, OnInit } from '@angular/core';
import { ConcreteAction, UserAction } from '../shared/interfaces';
import { AuthService } from '../shared/services/auth.service';
import { CoingeckoService } from '../shared/services/coingecko.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {

  actions: Array<ConcreteAction>;
  favCoinsIds: Array<ConcreteAction>;
  favCoins: Array<any> = [];

  constructor(private auth: AuthService, private coingeckoService: CoingeckoService) { }

  ngOnInit(): void {
    // this.actions = this.auth.userLogged.actions;
    this.actions = JSON.parse(window.localStorage.getItem('user-actions')).actions.reverse();

    this.favCoinsIds = JSON.parse(window.localStorage.getItem('user-actions'))
                            .actions
                            .filter((a: ConcreteAction) => a.action === 2)
                            .reverse();

    this.getFavoriteCoins();
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
    console.log(actionId);
    // this.actions = JSON.parse(window.localStorage.getItem('user-actions')).actions.filter(a => {
    //   return a.id !== actionId;
    // });  window.localStorage.setItem('user-actions', JSON.stringify(this.actions));
  }

  getFavoriteCoins(): void {
    this.favCoinsIds.map(coin => {
      this.coingeckoService.fetchCoinForFavsDashboard(coin.coinId).subscribe(r => {
        this.favCoins.push(r);
      });
    });
  }
}
