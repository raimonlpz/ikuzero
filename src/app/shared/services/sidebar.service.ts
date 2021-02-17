import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private coinData = new Subject<any>();
  private detailCoinDataIsLoading = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  fetchSidebarCryptoData(currency: string, page: number = 1): Observable<Array<{}>> {
    return this.http
      .get<Array<{}>>(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${
          currency}&order=market_cap_desc&per_page=50&page=${
          page}&sparkline=false`
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

  getDetailCoinData(): Observable<any> {
    return this.coinData.asObservable();
  }

  getDatailCoinDataIsLoading(): Observable<boolean> {
    return this.detailCoinDataIsLoading.asObservable();
  }
}
