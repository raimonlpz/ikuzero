import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy, Inject, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { bitcoinUnitsBlob, commoditiesBlob, cryptocurrenciesBlob, fiatCurrenciesBlob, suggestedCurrenciesBlob } from '../shared/data';
import { AuthService } from '../shared/services/auth.service';
import { CoingeckoService } from '../shared/services/coingecko.service';
import { UserAction } from '../shared/interfaces';
import { TuiNotification, TuiNotificationsService } from '@taiga-ui/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent implements OnInit {
  open = false;

  loading = false;

  res = [];
  value = 'USD';
  lastValue = this.value;
  pagination = 1;

  @Output() coinSelection = new EventEmitter<string>();
  @Output() actionEmitted = new EventEmitter<any>();

  readonly cryptocurrencies = cryptocurrenciesBlob;
  readonly bitcoinUnits = bitcoinUnitsBlob;
  readonly suggestedCurrencies = suggestedCurrenciesBlob;
  readonly fiatCurrencies = fiatCurrenciesBlob;
  readonly commodities = commoditiesBlob;

  constructor(
    private coingeckoService: CoingeckoService,
    private router: Router,
    private auth: AuthService,
    private ref: ChangeDetectorRef,
    @Inject(TuiNotificationsService) private readonly notificationsService: TuiNotificationsService,
  ) { }

  ngOnInit(): void {
    this.fetchCryptoData(this.value);
  }

  toggle(open: boolean): void {
      this.open = open;
      this.res = [...this.res.slice(0, 49)];
      this.pagination = 1;
  }

  onSelect(): void {
    this.fetchCryptoData(this.value);
  }

  fetchCryptoData(value?: string): void {
    const currencyChange = this.lastValue !== this.value;

    if (currencyChange) {
      this.lastValue = this.value;
      this.pagination = 1;
    }
    // this.loading = true;

    this.coingeckoService.fetchSidebarCryptoData(value, this.pagination).subscribe(r => {
      if (currencyChange) {
        this.res = [];
      }
      // this.loading = false;
      this.res = [...this.res, ...r];
    });
  }

  onCoinSelectedForDetailView(coin: string): void {
    this.coinSelection.emit(coin);
    this.toggle(!this.open);
    this.router.navigate(['/explore']);
  }

  onCoinSelectedForAction(coinId: string, action: string, img: string): void {
    this.ref.markForCheck();
    this.toggle(!this.open);

    switch (action) {
      case 'dislike':
        this.auth.addActionToUser({
          id: (new Date()).toString(),
          coinImg: img,
          coinId,
          timestamp: new Date(),
          action: UserAction.Dislike
        });
        this.notificationsService.show(`You've disliked ${coinId.toUpperCase()}! 👎`, {
          label: 'Main Activity:', status: TuiNotification.Error
        }).subscribe();
        break;
      case 'like':
        this.auth.addActionToUser({
          id: (new Date()).toString(),
          coinId,
          coinImg: img,
          timestamp: new Date(),
          action: UserAction.Like
        });
        this.notificationsService.show(`You've liked ${coinId.toUpperCase()}! 👍`, {
          label: 'Main Activity:', status: TuiNotification.Success
        }).subscribe();
        break;
      case 'fav':
        this.auth.addActionToUser({
          id: (new Date()).toString(),
          coinId,
          coinImg: img,
          timestamp: new Date(),
          action: UserAction.Fav
        });
        this.notificationsService.show(`You've added to favs ${coinId.toUpperCase()}! ⭐`, {
          label: 'Main Activity:', status: TuiNotification.Warning
        }).subscribe();
        break;
    }
  }

  loadMoreCrypto(): void {
    this.pagination++;
    this.fetchCryptoData(this.value);
  }
}
