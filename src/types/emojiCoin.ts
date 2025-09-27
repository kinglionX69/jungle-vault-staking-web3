export interface EmojiCoinToken {
  id: string;
  name: string;
  emoji: string;
  symbol: string;
  marketCap: number;
  price: number;
  volume24h: number;
  priceChange24h: number;
  address: string;
  balance?: string;
}

export interface EmojiCoinAPIResponse {
  tokens: EmojiCoinToken[];
  total: number;
  page: number;
  limit: number;
}

export interface TokenBalance {
  tokenId: string;
  balance: string;
  decimals: number;
}

export interface MarketData {
  marketCap: number;
  volume24h: number;
  price: number;
  priceChange24h: number;
  rank: number;
}