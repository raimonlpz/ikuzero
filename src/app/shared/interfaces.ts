export interface CoinData {
  id: string;
  name: string;
  symbol: string;
  image: {
    large: string;
  };
  market_data: {
    sparkline_7d: {
      price: Array<number>
    }
  };
  description: {
    en: {}
  };
  coingecko_rank: number;
}

export interface OverallMarketStats {
  activeCoins: number;
  activeMarkets: number;
  ongoingIcos: number;
  endedIcos: number;
  dominanceBtcPercent: number;
  dominanceEthPercent: number;
  marketCapChangePercent: number;
}

// interface CoinGeckoResponse {
//   id: string;
//   symbol: string;
//   name: string;
//   image: string;
//   current_price: number;
//   market_cap: number;
//   market_cap_rank: number;
// }
