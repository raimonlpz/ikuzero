import { Component, Input, OnDestroy, OnInit} from '@angular/core';
import { TUI_DEFAULT_STRINGIFY } from '@taiga-ui/cdk';
import { Subscription } from 'rxjs';
import { CoinData, TrendyCoins, UserAction } from '../shared/interfaces';
import { AuthService } from '../shared/services/auth.service';
import { CoingeckoService } from '../shared/services/coingecko.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit, OnDestroy {
  @Input() coinSelected: string;
  coinData: CoinData;
  isLoading = true;
  value: Array<Array<number>>;
  yHeight: number;
  yMinHeight: number;

  model = '';

  subCoinData$: Subscription;
  subLoadingCoinData$: Subscription;

  trendyCoins: TrendyCoins[] = [];

  readonly stringify = TUI_DEFAULT_STRINGIFY;

  constructor(private coingeckoService: CoingeckoService, private auth: AuthService) {}

  ngOnInit(): void {
    this.coingeckoService.fetchCryptoTrending().subscribe(({ coins }) => {
      coins.map(({item: { id, name, score, symbol, market_cap_rank, large }}) => {
        this.trendyCoins.push({
          id,
          name,
          score,
          symbol,
          marketCapRank: market_cap_rank,
          imgLarge: large
        });
      });
    });

    this.subCoinData$ = this.coingeckoService.getDetailCoinData().subscribe(coin => {
      const { price } = coin.market_data.sparkline_7d;
      if (coin) {
        this.coinData = coin;
        this.yHeight = price[0];
        this.yMinHeight = price[0];
        this.value = price.map((v: number, i: number) => {
          if (this.yHeight < v)  { this.yHeight = v; }
          if (this.yMinHeight > v)  { this.yMinHeight = v; }
          return [i, v];
        });

        this.auth.addActionToUser({
          id:  String(new Date().valueOf()),
          coinImg: this.coinData.image.large,
          coinId: this.coinData.id,
          timestamp: new Date(),
          action: UserAction.Seen
        });

        console.log(this.coinData);
      }
    });

    this.subLoadingCoinData$ = this.coingeckoService.getDatailCoinDataIsLoading().subscribe(r => {
      this.isLoading = r;
    });
  }


  exploreCertainCoin(coinId: string): void {
    this.coingeckoService.fetchDetailCoinData(coinId);
  }

  ngOnDestroy(): void {
    this.subCoinData$.unsubscribe();
    this.subLoadingCoinData$.unsubscribe();
  }

}
