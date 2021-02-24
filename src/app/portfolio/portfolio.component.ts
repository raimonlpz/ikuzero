import { Component, OnInit } from '@angular/core';
import { Portfolio } from '../shared/interfaces';
import { AuthService } from '../shared/services/auth.service';
import { CoingeckoService } from '../shared/services/coingecko.service';
import { FormControl } from '@angular/forms';
import { TUI_DEFAULT_STRINGIFY } from '@taiga-ui/cdk';


@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  coinChecked = {};

  portfolio: Portfolio;
  coinValue = 'ethereum';
  readonly cashValue = new FormControl(0);
  items$ = [];
  USDInCryptoUnits = 0;

  coinsInvestedInForChart: Set<string>;

  readonly stringify = TUI_DEFAULT_STRINGIFY;

  values = [];

  coinsInvestedInForResume: Array<{ id: string, amount: number }> = [];
  coinsInvestResum: Array<{
    id: string,
    coinSymbol: string,
    cashAmountUSD: number,
    img: string }> = [];

  constructor(
    private authService: AuthService,
    private coingeckoService: CoingeckoService
  ) { }

  ngOnInit(): void {
    this.portfolio = this.authService.portfolioUserData;
    this.coingeckoService.fetchSidebarCryptoData('usd', 1, 500).subscribe(r => {
      this.items$ = r;
      this.fillMultiLineChartWithInvestmentsAndCoinsResume();
    });

    this.coinsInvestedInForChart = new Set(this.portfolio.investments.map(inv => inv.coinId));

    this.resetCheckersToTrue();
  }

  hint({$implicit}): any {
    return `Prices Last 7 days: \n${$implicit.map(([_, y], i: number) => `${parseFloat(y).toFixed(2)}$`).join('\n')}`;
  }

  pushMoneyToPortfolio(): void {
    if (this.cashValue.value > 0 ){
      this.authService.registerPortfolioUserAction(this.coinValue, this.cashValue.value);

      this.coinsInvestedInForChart = new Set(this.portfolio.investments.map(inv => inv.coinId));
      this.fillMultiLineChartWithInvestmentsAndCoinsResume();

      this.coinChecked[this.coinValue] = true;
    }
  }

  calcUSDInCryptoUnits(): void {
   this.USDInCryptoUnits =  this.cashValue.value / this.items$.filter((it: any) => it.id === this.coinValue)[0]?.current_price;
  }

  fillMultiLineChartWithInvestmentsAndCoinsResume(): void {
    this.values = [];

    this.coinsInvestedInForChart.forEach(coin => {
      this.coingeckoService.fetchCoinMarketChartForPortfolio(coin).subscribe(r => {
          this.values.push(r.prices.map(([_, b], i) => [i, b]));
      });
    });

    this.coinsInvestedInForResume = this.authService.portfolioUserData.investments.map(inv => (
      {  id: inv.coinId, amount: inv.amountCashInUsd }
    ));

    if (this.coinsInvestedInForResume.length > 0) {
      this.coinsInvestResum = [];
      this.coinsInvestedInForResume.forEach((c) => {
        const co = this.items$.filter((coin: any) => coin.id === c.id)[0];
        if (co) {
          this.coinsInvestResum.push({
            id: co.id,
            coinSymbol: co.symbol,
            cashAmountUSD: c.amount,
            img: co.image
          });
        }
      });
      this.coinsInvestResum = this.coinsInvestResum.slice().reverse();
    }
  }

  getSm(value: Array<Array<number>>): number {
    let sm = value[0][1];
    value.forEach(v => {
      if (v[1] < sm) {
        sm = v[1];
      }
    });
    return sm;
  }

  getHg(value: Array<Array<number>>): number {
    let hg = value[0][1];
    value.forEach(v => {
      if (v[1] > hg) {
        hg = v[1];
      }
    });
    return hg;
  }

  filterCoinsToWatch(): void {
    this.values = [];

    const coinsFiltered = Object.keys(this.coinChecked).filter(coin => this.coinChecked[coin] === true);
    coinsFiltered.forEach(coin => {
      this.coingeckoService.fetchCoinMarketChartForPortfolio(coin).subscribe(r => {
          this.values.push(r.prices.map(([_, b], i) => [i, b]));
      });
    });
  }

  resetCheckersToTrue(): void {
    this.coinsInvestedInForChart.forEach(coin => {
      this.coinChecked[coin] = true;
    });
  }
}
