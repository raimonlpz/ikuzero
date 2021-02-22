import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TUI_DEFAULT_STRINGIFY } from '@taiga-ui/cdk';
import { CoingeckoService } from '../shared/services/coingecko.service';
import { OverallMarketStats } from '../shared/interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  coins: Array<any>;
  value: Array<Array<number>>;
  yHeight: number;
  chartCoinsDataIsLoading = true;

  length = 120;
  index = 0;

  overallMarket: OverallMarketStats;

  readonly stringify = TUI_DEFAULT_STRINGIFY;

  constructor(
    private coingeckoService: CoingeckoService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.fetchTableCryptoData();

    this.coingeckoService.fetchOverallStats().subscribe(r => {
      this.overallMarket = {
        activeCoins: r.data.active_cryptocurrencies,
        endedIcos: r.data.ended_icos,
        ongoingIcos: r.data.ongoing_icos,
        activeMarkets: r.data.markets,
        dominanceBtcPercent: r.data.market_cap_percentage.btc,
        dominanceEthPercent: r.data.market_cap_percentage.eth,
        marketCapChangePercent: r.data.market_cap_change_percentage_24h_usd,
      };
    });
  }

  fetchTableCryptoData(): void {
    this.chartCoinsDataIsLoading = true;
    this.coingeckoService.fetchTableCryptoData(this.index + 1).subscribe(r => {
      this.coins = r;
      this.chartCoinsDataIsLoading = false;
    });
  }

  getHeightForSparklineChart(a: Array<number>): number {
    let res: number = a[0];
    a.map((n: number) => {
      if ( res < n ) {
        res = n;
      }
    });
    return res;
  }

  getStartingHeightForSparklineChart(a: Array<number>): number {
    let res: number = a[0];
    a.map((n: number) => {
      if (res > n) {
        res = n;
      }
    });
    return res;
  }

  getValueArrayForSparkline(a: Array<number>): Array<Array<number>> {
    return a.map((n: number, i: number) => {
      return [i, n];
    });
  }


  goToPage(index: number): void {
    this.index = index;
    this.fetchTableCryptoData();
  }

  exploreCertainCoin(coinId: string): void {
    this.coingeckoService.fetchDetailCoinData(coinId);
    this.router.navigate(['/explore']);
  }
}
