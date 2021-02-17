import { Component, Input, OnDestroy, OnInit} from '@angular/core';
import { TUI_DEFAULT_STRINGIFY } from '@taiga-ui/cdk';
import { Subscription } from 'rxjs';
import { CoinData } from '../shared/interfaces';
import { SidebarService } from '../shared/services/sidebar.service';

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

  subCoinData$: Subscription;
  subLoadingCoinData$: Subscription;

  readonly stringify = TUI_DEFAULT_STRINGIFY;

  constructor(private sidebarService: SidebarService) {}

  ngOnInit(): void {
    this.subCoinData$ = this.sidebarService.getDetailCoinData().subscribe(coin => {
      if (coin) {
        this.coinData = coin;
        this.yHeight = this.coinData.market_data.sparkline_7d.price[0];
        this.value = this.coinData.market_data.sparkline_7d.price.map((v, i) => {
          if (this.yHeight < v)  { this.yHeight = v; }
          return [i, v];
        });
      }
    });

    this.subLoadingCoinData$ = this.sidebarService.getDatailCoinDataIsLoading().subscribe(r => {
      this.isLoading = r;
    });
  }

  ngOnDestroy(): void {
    this.subCoinData$.unsubscribe();
    this.subLoadingCoinData$.unsubscribe();
  }
}
