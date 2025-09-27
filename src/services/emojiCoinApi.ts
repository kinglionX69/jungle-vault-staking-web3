import { EmojiCoinToken, EmojiCoinAPIResponse, TokenBalance } from '@/types/emojiCoin';
import { EmojiCoinScraper, generateMockEmojiTokens } from '@/utils/emojiCoinScraper';

const EMOJICOIN_API_BASE = 'https://api.emojicoin.fun';
const EMOJICOIN_WEB_BASE = 'https://www.emojicoin.fun';

class EmojiCoinAPI {
  private async fetchAPI(endpoint: string): Promise<any> {
    try {
      const response = await fetch(`${EMOJICOIN_API_BASE}${endpoint}`);
      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('EmojiCoin API Error:', error);
      throw error;
    }
  }

  async getTopTokensByMarketCap(limit: number = 25): Promise<EmojiCoinToken[]> {
    try {
      // Try to scrape data from emojicoin.fun
      const scrapedTokens = await EmojiCoinScraper.scrapeTopTokens();
      
      if (scrapedTokens.length > 0) {
        return scrapedTokens.slice(0, limit);
      }
      

      return this.transformTokenData(scrapedTokens);
      
    } catch (error) {
      console.error('Failed to fetch top tokens:', error);
      // Return generated demo data as fallback
      return generateMockEmojiTokens().slice(0, limit);
    }
  }

  async getTokenDetails(tokenId: string): Promise<EmojiCoinToken | null> {
    try {
      const data = await this.fetchAPI(`/tokens/${tokenId}`);
      return this.transformSingleToken(data);
    } catch (error) {
      console.error('Failed to fetch token details:', error);
      return null;
    }
  }

  async getUserTokenBalances(walletAddress: string): Promise<TokenBalance[]> {
    try {
      const data = await this.fetchAPI(`/balances/${walletAddress}`);
      return data.balances || [];
    } catch (error) {
      console.error('Failed to fetch user balances:', error);
      return [];
    }
  }

  private transformTokenData(apiData: any): EmojiCoinToken[] {
    if (!apiData) {
      return [];
    }

    return apiData.map((token: any) => ({
      id: apiData.tokenAddress || apiData.faAddress,
      name: apiData.name,
      emoji: apiData.emoji,
      symbol: apiData.symbol,
      marketCap: apiData.usdPrice * 5_000_000,
      price: apiData.usdPrice || 0,
      volume24h: apiData.volume_24h || apiData.volume24h || 0,
      priceChange24h: apiData.price_change_24h || apiData.priceChange24h || 0,
      address: apiData.tokenAddress || apiData.faAddress,
      balance: apiData.balance || '1'
    }));
  }

  private transformSingleToken(apiData: any): EmojiCoinToken {
    return {
      id: apiData.tokenAddress || apiData.faAddress,
      name: apiData.name,
      emoji: apiData.emoji,
      symbol: apiData.symbol,
      marketCap: apiData.usdPrice * 5_000_000,
      price: apiData.usdPrice || 0,
      volume24h: apiData.volume_24h || apiData.volume24h || 0,
      priceChange24h: apiData.price_change_24h || apiData.priceChange24h || 0,
      address: apiData.tokenAddress || apiData.faAddress,
      balance: apiData.balance || '1'
    };
  }
}

export const emojiCoinAPI = new EmojiCoinAPI();