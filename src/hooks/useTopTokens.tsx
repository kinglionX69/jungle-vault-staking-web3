import { useState, useEffect } from 'react';
import { EmojiCoinToken } from '@/types/emojiCoin';
import { emojiCoinAPI } from '@/services/emojiCoinApi';
import { mockWalletTokens } from '@/data/mockTokens';
import { TokenOption } from '@/types/createPool';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { getTop30Coins } from '@/services/aptosService';

export const useTopTokens = (limit: number = 25) => {
  const { account, connected } = useWallet();
  const [tokens, setTokens] = useState<TokenOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(false);

  const transformEmojiCoinToTokenOption = (emojiToken: EmojiCoinToken): TokenOption => ({
    id: emojiToken.id,
    name: emojiToken.name,
    emoji: emojiToken.emoji,
    symbol: emojiToken.symbol,
    balance: emojiToken.balance || '0'
  });

  const fetchTokens = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const emojiTokens = await getTop30Coins(account.address);
      
      if (emojiTokens.length === 0) {
        // Fallback to mock data
        console.log('Using fallback mock data');
        setTokens(mockWalletTokens);
        setUsingFallback(true);
      } else {
        // Transform and prioritize LIONHEART
        const transformedTokens = emojiTokens.map(transformEmojiCoinToTokenOption);
        const lionheartToken = transformedTokens.find(token => token.symbol == "🦁♥️");
        
        // Ensure LIONHEART is first if it exists in the data
        if (lionheartToken) {
          const filteredTokens = transformedTokens.filter(token => token.symbol !== "🦁♥️");
          setTokens([lionheartToken, ...filteredTokens]);
        } else {
          setTokens(transformedTokens);
        }
        setUsingFallback(false);
      }
    } catch (err) {
      console.error('Failed to fetch tokens:', err);
      if (connected) {
        setError(err instanceof Error ? err.message : 'Failed to fetch tokens');
        setTokens(mockWalletTokens);
        setUsingFallback(true);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTokens();
  }, [limit, connected]);

  const refresh = () => {
    fetchTokens();
  };

  return {
    tokens,
    loading,
    error,
    usingFallback,
    refresh
  };
};