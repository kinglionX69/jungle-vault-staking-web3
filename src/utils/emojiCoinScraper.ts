import { EmojiCoinToken } from '@/types/emojiCoin';

export class EmojiCoinScraper {
  private static async fetchWithCORS(url: string): Promise<Response> {
    // Use a CORS proxy for development
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
    return fetch(proxyUrl);
  }

  static async scrapeTopTokens(): Promise<EmojiCoinToken[]> {
    try {
      const response = await fetch('https://api.panora.exchange/tokenlist?panoraUI=true,false&panoraTags=emojicoin', {
        headers: {
          "x-api-key":
            "a4^KV_EaTf4MW#ZdvgGKX#HUD^3IFEAOV_kzpIE^3BQGA8pDnrkT7JcIy#HNlLGi",
        },
      })
      
      if (!response.ok) {
        throw new Error('Failed to fetch emojicoin.fun data');
      }

      const data = await response.json();
      // const htmlContent = data.data;

      /*
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
      */ 
      const sortedTokens = data.data.sort((a,b) => b.usdPrice - a.usdPrice)

      return sortedTokens.slice(0, 30).filter(t => (t.name != '🦁❤️' || t.symbol != '🦁❤️'));
    } catch (error) {
      console.error('Failed to scrape emojicoin.fun:', error);
      return [];
    }
  }

  private static parseTokensFromHTML(html: string): EmojiCoinToken[] {
    // This is a simplified HTML parser
    // In a real implementation, you'd want to use a proper DOM parser
    const tokens: EmojiCoinToken[] = [];
    
    try {
      // Create a temporary DOM element to parse HTML
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      
      // Look for token rows/cards in the HTML
      // This selector would need to be adjusted based on actual HTML structure
      const tokenElements = doc.querySelectorAll('[data-token], .token-row, .token-card');
      
      tokenElements.forEach((element, index) => {
        try {
          const emoji = element.querySelector('.emoji, [data-emoji]')?.textContent?.trim() || '🪙';
          const name = element.querySelector('.name, .token-name, [data-name]')?.textContent?.trim() || `Token ${index + 1}`;
          const symbol = element.querySelector('.symbol, .token-symbol, [data-symbol]')?.textContent?.trim() || `TKN${index + 1}`;
          const marketCapText = element.querySelector('.market-cap, [data-market-cap]')?.textContent?.trim() || '0';
          
          // Parse market cap from text like "$1.2M" or "$1,234,567"
          const marketCap = this.parseMarketCap(marketCapText);
          
          tokens.push({
            id: `emojicoin_${index + 1}`,
            name,
            emoji,
            symbol,
            marketCap,
            price: 0, // Would need to parse from HTML
            volume24h: 0, // Would need to parse from HTML
            priceChange24h: 0, // Would need to parse from HTML
            address: `0x${Math.random().toString(16).substring(2, 42)}`, // Mock address
            balance: Math.floor(Math.random() * 100000).toString()
          });
        } catch (error) {
          console.error('Error parsing token element:', error);
        }
      });
      
    } catch (error) {
      console.error('Error parsing HTML:', error);
    }
    
    return tokens.slice(0, 30); // Return top 30
  }

  private static parseMarketCap(text: string): number {
    const cleaned = text.replace(/[$,\s]/g, '');
    const multiplier = text.includes('B') ? 1000000000 : 
                     text.includes('M') ? 1000000 : 
                     text.includes('K') ? 1000 : 1;
    
    const number = parseFloat(cleaned.replace(/[BMK]/g, ''));
    return isNaN(number) ? 0 : number * multiplier;
  }
}

// Fallback function that generates realistic looking token data
// This will be used until we have proper API access
export function generateMockEmojiTokens(): EmojiCoinToken[] {
  const emojis = ['🦁', '🍀', '⛱️', '🇼🇫', '🕓', '💅', '👀', '🦣', '🏓', '✡️', 
                 '🚚', '🐢', '🌃', '👂🏻', '🛳️', '🏨', '🤧', '🪻', '🛢️', '🔨',
                 '🇵🇾', '🦆', '🐻', '🍴', '😸', '🇮🇳', '⭐', '💓', '🇰🇷', '🍌'];
  
  const names = ['LIONHEART', 'CLOVER', 'BEACH', 'WALLIS FUTUNA', 'CLOCK', 'NAILS',
                'EYES', 'ELEPHANT', 'PING PONG', 'STAR OF DAVID', 'TRUCK', 'TURTLE',
                'CITY NIGHT', 'EAR', 'SHIP', 'HOTEL', 'SNEEZE', 'LOTUS', 'OIL', 'HAMMER',
                'PARAGUAY', 'DUCK', 'BEAR', 'FORK', 'CAT SMILE', 'INDIA', 'STAR', 'HEART',
                'KOREA', 'BANANA'];
  
  return emojis.map((emoji, index) => ({
    id: `token_${index + 1}`,
    name: names[index],
    emoji,
    symbol: names[index].replace(/\s+/g, '').substring(0, 8),
    marketCap: Math.floor(Math.random() * 10000000) + 1000000, // 1M to 11M
    price: Math.random() * 10,
    volume24h: Math.floor(Math.random() * 1000000),
    priceChange24h: (Math.random() - 0.5) * 20, // -10% to +10%
    address: `0x${Math.random().toString(16).substring(2, 42)}`,
    balance: Math.floor(Math.random() * 100000).toString()
  })).sort((a, b) => b.marketCap - a.marketCap); // Sort by market cap
}