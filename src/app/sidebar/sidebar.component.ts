import { ChangeDetectionStrategy, Component, OnInit, Output, EventEmitter } from '@angular/core';
import { bitcoinUnitsBlob, commoditiesBlob, cryptocurrenciesBlob, fiatCurrenciesBlob, suggestedCurrenciesBlob } from '../shared/data';
import { SidebarService } from '../shared/services/sidebar.service';

// TODO - LOADER IN CRYPTO SIDEBAR

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent implements OnInit {
  open = false;
  res = [];

  loading = false;
  value = 'USD';
  pagination = 1;

  @Output() coinSelection = new EventEmitter<string>();

  readonly cryptocurrencies = cryptocurrenciesBlob;
  readonly bitcoinUnits = bitcoinUnitsBlob;
  readonly suggestedCurrencies = suggestedCurrenciesBlob;
  readonly fiatCurrencies = fiatCurrenciesBlob;
  readonly commodities = commoditiesBlob;

  constructor(private sidebarService: SidebarService) { }

  ngOnInit(): void {
    this.fetchCryptoData(this.value);
  }

  toggle(open: boolean): void {
      this.open = open;
      this.res = [...this.res.slice(0, 49)];
  }

  onSelect(): void {
    this.fetchCryptoData(this.value);
  }

  fetchCryptoData(value?: string): void {
    this.loading = true;

    if (value !== this.value) {
      this.value = value;
      this.pagination = 1;
      this.res = [];
    }

    this.sidebarService.fetchSidebarCryptoData(this.value, this.pagination).subscribe(r => {
      this.loading = false;
      this.res = [...this.res, ...r];
    });
  }

  onCoinSelectedForDetailView(coin: string): void {
    this.coinSelection.emit(coin);
    this.toggle(!this.open);
  }

  loadMoreCrypto(): void {
    this.pagination++;
    this.fetchCryptoData(this.value);
  }
}
