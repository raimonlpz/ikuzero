export enum UserAction { Like, Dislike, Fav, Seen }

export interface ConcreteAction {
  id: string;
  coinId: string;
  coinImg: string;
  action: UserAction;
  timestamp: Date;
}

export interface User {
  email: string;
  password: string;
  actions: Array<ConcreteAction>;
  leaguesCreated?: any;
  leaguesJoined?: any;
  portfolio?: any;
  settings?: any;
  lastLogin?: Date;
}

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

export interface TrendyCoins {
  id: string;
  name: string;
  score: number;
  marketCapRank: number;
  symbol: string;
  imgLarge: string;
}
