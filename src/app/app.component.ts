import { Component, OnInit } from '@angular/core';
import { SidebarService } from './shared/services/sidebar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  coinSelected: string;
  activeItemIndex = 0;

  constructor(private sidebarService: SidebarService) {}

  ngOnInit(): void {
    this.coinSelected = 'ethereum';
    this.onCoinSelected(this.coinSelected);
  }

  onCoinSelected(coin: string): void {
    this.coinSelected = coin;
    this.sidebarService.fetchDetailCoinData(this.coinSelected);
  }
}
