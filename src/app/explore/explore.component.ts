import { Component, Input, OnDestroy, OnInit} from '@angular/core';
import { TUI_DEFAULT_STRINGIFY } from '@taiga-ui/cdk';
import { Subscription } from 'rxjs';
import { CoinData } from '../shared/interfaces';
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

  subCoinData$: Subscription;
  subLoadingCoinData$: Subscription;

  readonly stringify = TUI_DEFAULT_STRINGIFY;

  constructor(private coingeckoService: CoingeckoService) {}

  ngOnInit(): void {

    this.coingeckoService.fetchCryptoTrending().subscribe(r => {
      console.log(r);
    });

    this.subCoinData$ = this.coingeckoService.getDetailCoinData().subscribe(coin => {
      if (coin) {
        this.coinData = coin;
        this.yHeight = this.coinData.market_data.sparkline_7d.price[0];
        this.yMinHeight = this.coinData.market_data.sparkline_7d.price[0];
        this.value = this.coinData.market_data.sparkline_7d.price.map((v, i) => {
          if (this.yHeight < v)  { this.yHeight = v; }
          if (this.yMinHeight > v)  { this.yMinHeight = v; }
          return [i, v];
        });
      }
    });

    this.subLoadingCoinData$ = this.coingeckoService.getDatailCoinDataIsLoading().subscribe(r => {
      this.isLoading = r;
    });
  }

  ngOnDestroy(): void {
    this.subCoinData$.unsubscribe();
    this.subLoadingCoinData$.unsubscribe();
  }
}
