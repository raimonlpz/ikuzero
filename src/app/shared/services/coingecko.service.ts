import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoingeckoService {
  private coinData = new Subject<any>();
  private detailCoinDataIsLoading = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  fetchSidebarCryptoData(
    currency: string,
    page: number = 1,
    xpage: number = 30
  ): Observable<Array<{}>> {
    return this.http
      .get<Array<{}>>(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${
          currency}&order=market_cap_desc&per_page=${xpage}&page=${
          page}&sparkline=false`
      );
  }

  fetchTableCryptoData(page: number = 1): Observable<Array<any>> {
      return this.http
        .get<Array<any>>(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=25&page=${
            page}&sparkline=true&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C200d%2C1y`
        );
  }

  fetchDetailCoinData(coin: string): void {
    this.detailCoinDataIsLoading.next(true);
    this.http
        .get<Array<{}>>(
          `https://api.coingecko.com/api/v3/coins/${coin}?sparkline=true`
        ).
        subscribe(r => {
          this.coinData.next(r);
          this.detailCoinDataIsLoading.next(false);
    });
  }

  fetchOverallStats(): Observable<any> {
    return this.http.get('https://api.coingecko.com/api/v3/global');
  }

  fetchCryptoTrending(): Observable<any> {
    return this.http.get('https://api.coingecko.com/api/v3/search/trending');
  }

  getDetailCoinData(): Observable<any> {
    return this.coinData.asObservable();
  }

  getDatailCoinDataIsLoading(): Observable<boolean> {
    return this.detailCoinDataIsLoading.asObservable();
  }

  fetchCoinForFavsDashboard(coin: string, sparkline: boolean = true): Observable<any> {
    return this.http
    .get<Array<{}>>(
      `https://api.coingecko.com/api/v3/coins/${coin}?sparkline=${sparkline}`
    );
  }

  fetchCoinMarketChartForPortfolio(coin: string)
    : Observable<{prices: Array<Array<number>>, name: string }> {
    return this.http
      .get<{prices: Array<Array<number>>, name: string }>(`https://api.coingecko.com/api/v3/coins/${
              coin}/market_chart?vs_currency=usd&days=7`);
  }
}
