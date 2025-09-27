import { EmojiCoinToken, TokenBalance } from '@/types/emojiCoin';
import { emojiCoinAPI } from './emojiCoinApi';

export class TokenService {
  private static instance: TokenService;
  private cachedTokens: EmojiCoinToken[] = [];
  private lastFetchTime: number = 0;
  private readonly CACHE_DURATION = 30000; // 30 seconds

  static getInstance(): TokenService {
    if (!TokenService.instance) {
      TokenService.instance = new TokenService();
    }
    return TokenService.instance;
  }

  async getTopTokens(limit: number = 30, forceRefresh: boolean = false): Promise<EmojiCoinToken[]> {
    const now = Date.now();
    const shouldRefresh = forceRefresh || 
      this.cachedTokens.length === 0 || 
      (now - this.lastFetchTime) > this.CACHE_DURATION;

    if (!shouldRefresh) {
      return this.cachedTokens.slice(0, limit);
    }

    try {
      const tokens = await emojiCoinAPI.getTopTokensByMarketCap(limit);
      if (tokens.length > 0) {
        this.cachedTokens = tokens;
        this.lastFetchTime = now;
      }
      return tokens;
    } catch (error) {
      console.error('TokenService: Failed to fetch tokens:', error);
      // Return cached data if available
      return this.cachedTokens.slice(0, limit);
    }
  }

  async getTokenDetails(tokenId: string): Promise<EmojiCoinToken | null> {
    try {
      return await emojiCoinAPI.getTokenDetails(tokenId);
    } catch (error) {
      console.error('TokenService: Failed to fetch token details:', error);
      return null;
    }
  }

  async getUserBalances(walletAddress: string): Promise<TokenBalance[]> {
    try {
      return await emojiCoinAPI.getUserTokenBalances(walletAddress);
    } catch (error) {
      console.error('TokenService: Failed to fetch user balances:', error);
      return [];
    }
  }

  formatBalance(balance: string | number, decimals: number = 6): string {
    const num = typeof balance === 'string' ? parseFloat(balance) : balance;
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toLocaleString(undefined, { maximumFractionDigits: decimals });
  }

  formatMarketCap(marketCap: number): string {
    if (marketCap >= 1000000000) {
      return '$' + (marketCap / 1000000000).toFixed(2) + 'B';
    }
    if (marketCap >= 1000000) {
      return '$' + (marketCap / 1000000).toFixed(2) + 'M';
    }
    if (marketCap >= 1000) {
      return '$' + (marketCap / 1000).toFixed(2) + 'K';
    }
    return '$' + marketCap.toFixed(2);
  }

  clearCache(): void {
    this.cachedTokens = [];
    this.lastFetchTime = 0;
  }
}

export const tokenService = TokenService.getInstance();