export interface PriceData {
  lionheartToApt: number;
  aptToLionheart: number;
  lastUpdated: number;
}

export class PricingService {
  private static instance: PricingService;
  private cachedPrice: PriceData | null = null;
  private readonly CACHE_DURATION = 60000; // 1 minute
  
  static getInstance(): PricingService {
    if (!PricingService.instance) {
      PricingService.instance = new PricingService();
    }
    return PricingService.instance;
  }

  async getLionheartPrice(forceRefresh: boolean = false): Promise<PriceData> {
    const now = Date.now();
    const shouldRefresh = forceRefresh || 
      !this.cachedPrice || 
      (now - this.cachedPrice.lastUpdated) > this.CACHE_DURATION;

    if (!shouldRefresh && this.cachedPrice) {
      return this.cachedPrice;
    }

    try {
      // Mock pricing for now - in production this would fetch from an API
      // Real market rate: 1 LIONHEART = 0.00071694 APT (so 1 APT = 1,394.53 LIONHEART)
      const mockPrice: PriceData = {
        lionheartToApt: 0.00071694,
        aptToLionheart: 1394.53,
        lastUpdated: now
      };
      
      this.cachedPrice = mockPrice;
      return mockPrice;
    } catch (error) {
      console.error('PricingService: Failed to fetch price:', error);
      
      // Fallback to cached price or default
      if (this.cachedPrice) {
        return this.cachedPrice;
      }
      
      // Default fallback price
      return {
        lionheartToApt: 0.00071694,
        aptToLionheart: 1394.53,
        lastUpdated: now
      };
    }
  }

  calculateLionheartEquivalent(aptAmount: number, discount: number = 0): Promise<{
    originalLionheart: number;
    discountedLionheart: number;
    savings: number;
  }> {
    return this.getLionheartPrice().then(price => {
      const originalLionheart = aptAmount * price.aptToLionheart;
      const discountedLionheart = originalLionheart * (1 - discount);
      const savings = originalLionheart - discountedLionheart;
      
      return {
        originalLionheart,
        discountedLionheart,
        savings
      };
    });
  }

  clearCache(): void {
    this.cachedPrice = null;
  }
}

export const pricingService = PricingService.getInstance();