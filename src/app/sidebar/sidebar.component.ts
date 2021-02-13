import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
// import { Observable } from 'rxjs';
import { SidebarService } from '../sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent implements OnInit {
  open = false;
  res: Array<any> = [];

  loading = false;
  value = 'USD';

  readonly cryptocurrencies = [
      {id: 'BTC', name: 'Bitcoin'},
      {id: 'BCH', name: 'Bitcoin Cash'},
      {id: 'XRP', name: 'XRP'},
      {id: 'DOT', name: 'Polkadot'},
      {id: 'ETH', name: 'Ether'},
      {id: 'BNB', name: 'Binance Coin'},
      {id: 'XLM', name: 'Lumens'},
      {id: 'YFI', name: 'Yearn.finance'},
      {id: 'LTC', name: 'Litecoin'},
      {id: 'EOS', name: 'EOS'},
      {id: 'LINK', name: 'Chainlink'},
  ];

  readonly bitcoinUnits = [
    {id: 'BITS', name: 'Bits'},
    {id: 'SATS', name: 'Satoshi'},
  ];

  readonly suggestedCurrencies = [
    {id: 'USD', name: 'US Dollar'},
    {id: 'EUR', name: 'Euro'},
    {id: 'RUB', name: 'Russian Ruble'},
    {id: 'IDR', name: 'Indonesian Rupiah'},
    {id: 'KRW', name: 'South Korean Won'},
    {id: 'CNY', name: 'Chinese Yuan'},
    {id: 'TWD', name: 'New Taiwan Dollar'},
    {id: 'JPY', name: 'Japanese Yen'},
  ];

  readonly fiatCurrencies = [
    {id: 'AED', name: 'United Arab Emirates Dirham'},
    {id: 'ARS', name: 'Argentine Peso'},
    {id: 'AUD', name: 'Australian Dollar'},
    {id: 'BDT', name: 'Bangladeshi Taka'},
    {id: 'BHD', name: 'Bahraini Dinar'},
    {id: 'BMD', name: 'Bermudian Dollar'},
    {id: 'BRL', name: 'Brazil Real'},
    {id: 'CAD', name: 'Canadian Dollar'},
    {id: 'CHF', name: 'Swiss Franc'},
    {id: 'CLP', name: 'Chilean Peso'},
    {id: 'CZK', name: 'Czech Koruna'},
    {id: 'DKK', name: 'Danish Krone'},
    {id: 'GBP', name: 'British Pound Sterling'},
    {id: 'HKD', name: 'Hong Kong Dollar'},
    {id: 'HUF', name: 'Hungarian Forint'},
    {id: 'ILS', name: 'Israeli New Shekel'},
    {id: 'INR', name: 'Indian Rupee'},
    {id: 'KWD', name: 'Kuwaiti Dinar'},
    {id: 'LKR', name: 'Sri Lankan Rupee'},
    {id: 'MMK', name: 'Burmese Kyat'},
    {id: 'MXN', name: 'Mexican Peso'},
    {id: 'MYR', name: 'Malaysian Ringgit'},
    {id: 'NGN', name: 'Nigerian Naira'},
    {id: 'NOK', name: 'Norwegian Krone'},
    {id: 'NZD', name: 'New Zealand Dollar'},
    {id: 'PHP', name: 'Philippine Peso'},
    {id: 'PKR', name: 'Pakistani Rupee'},
    {id: 'PLN', name: 'Polish Zloty'},
    {id: 'SAR', name: 'Saudi Riyal'},
    {id: 'SEK', name: 'Swedish Krona'},
    {id: 'SGD', name: 'Singapore Dollar'},
    {id: 'THB', name: 'Thai Baht'},
    {id: 'TRY', name: 'Turkish Lira'},
    {id: 'UAH', name: 'Ukrainian hryvnia'},
    {id: 'VEF', name: 'Venezuelan bolívar fuerte'},
    {id: 'VND', name: 'Vietnamese đồng'},
    {id: 'ZAR', name: 'South African Rand'},
    {id: 'XDR', name: 'IMF Special Drawing Rights'},
  ];

  readonly commodities = [
    {id: 'XAG', name: 'Silver - Troy Ounce'},
    {id: 'XAU', name: 'Gold - Troy Ounce'}
  ];

  constructor(private sidebarService: SidebarService) { }

  ngOnInit(): void {
    this.fetchCryptoData(this.value);
  }

  toggle(open: boolean): void {
      this.open = open;
  }

  onSelect(): void {
    this.fetchCryptoData(this.value);
  }

  fetchCryptoData(value?: string): void {
    this.loading = true;

    this.sidebarService.fetchSidebarCryptoData(value).subscribe(r => {
      this.loading = false;
      this.res = r;
      console.log(this.res);
    });
  }


}
