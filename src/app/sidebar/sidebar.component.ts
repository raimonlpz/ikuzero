import { ChangeDetectionStrategy, Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { bitcoinUnitsBlob, commoditiesBlob, cryptocurrenciesBlob, fiatCurrenciesBlob, suggestedCurrenciesBlob } from '../shared/data';
import { SidebarService } from '../shared/services/sidebar.service';

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

  readonly cryptocurrencies = cryptocurrenciesBlob;
  readonly bitcoinUnits = bitcoinUnitsBlob;
  readonly suggestedCurrencies = suggestedCurrenciesBlob;
  readonly fiatCurrencies = fiatCurrenciesBlob;
  readonly commodities = commoditiesBlob;

  constructor(private sidebarService: SidebarService, private router: Router) { }

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
    this.loading = true;

    this.sidebarService.fetchSidebarCryptoData(value, this.pagination).subscribe(r => {
      if (currencyChange) {
        this.res = [];
      }
      this.loading = false;
      this.res = [...this.res, ...r];
    });
  }

  onCoinSelectedForDetailView(coin: string): void {
    this.coinSelection.emit(coin);
    this.toggle(!this.open);
    this.router.navigate(['/explore']);
  }

  loadMoreCrypto(): void {
    this.pagination++;
    this.loading = true;
    this.fetchCryptoData(this.value);
  }
}
