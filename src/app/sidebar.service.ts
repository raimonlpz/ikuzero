import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// interface CoinGeckoResponse {
//   id: string;
//   symbol: string;
//   name: string;
//   image: string;
//   current_price: number;
//   market_cap: number;
//   market_cap_rank: number;
// }

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  constructor(private http: HttpClient) { }

  fetchSidebarCryptoData(currency: string): Observable<Array<{}>> {
    return this.http
      .get<Array<{}>>(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=200&page=1&sparkline=false`
      );
  }
}
