import { useState, useEffect, useCallback } from 'react';

export interface CryptoPrice {
  symbol: string;
  name: string;
  price: number;
  priceChange24h: number;
  marketCap: number;
  volume24h: number;
  address?: string;
}

export interface ApiConfig {
  coingeckoApiKey?: string;
  dexscreenerEnabled: boolean;
}

export const useCryptoApi = () => {
  const [apiConfig, setApiConfig] = useState<ApiConfig>({
    dexscreenerEnabled: true
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get real-time price from CoinGecko
  const getCoinGeckoPrice = useCallback(async (tokenId: string): Promise<CryptoPrice | null> => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${tokenId}&vs_currencies=usd&include_24hr_change=true&include_market_cap=true&include_24hr_vol=true`,
        {
          headers: apiConfig.coingeckoApiKey ? {
            'X-CG-Demo-API-Key': apiConfig.coingeckoApiKey
          } : {}
        }
      );
      
      if (!response.ok) throw new Error('Failed to fetch from CoinGecko');
      
      const data = await response.json();
      const tokenData = data[tokenId];
      
      if (!tokenData) return null;
      
      return {
        symbol: tokenId,
        name: tokenId,
        price: tokenData.usd,
        priceChange24h: tokenData.usd_24h_change || 0,
        marketCap: tokenData.usd_market_cap || 0,
        volume24h: tokenData.usd_24h_vol || 0
      };
    } catch (err) {
      console.error('CoinGecko API error:', err);
      return null;
    }
  }, [apiConfig.coingeckoApiKey]);

  // Get price from DexScreener by token address
  const getDexScreenerPrice = useCallback(async (tokenAddress: string): Promise<CryptoPrice | null> => {
    try {
      const response = await fetch(
        `https://api.dexscreener.com/latest/dex/tokens/${tokenAddress}`
      );
      
      if (!response.ok) throw new Error('Failed to fetch from DexScreener');
      
      const data = await response.json();
      
      if (!data.pairs || data.pairs.length === 0) return null;
      
      // Get the pair with highest liquidity
      const bestPair = data.pairs.reduce((best: any, current: any) => 
        (current.liquidity?.usd || 0) > (best.liquidity?.usd || 0) ? current : best
      );
      
      return {
        symbol: bestPair.baseToken.symbol,
        name: bestPair.baseToken.name,
        price: parseFloat(bestPair.priceUsd || '0'),
        priceChange24h: parseFloat(bestPair.priceChange?.h24 || '0'),
        marketCap: bestPair.marketCap || 0,
        volume24h: parseFloat(bestPair.volume?.h24 || '0'),
        address: tokenAddress
      };
    } catch (err) {
      console.error('DexScreener API error:', err);
      return null;
    }
  }, []);

  // Get real-time price with fallback strategy
  const getRealTimePrice = useCallback(async (identifier: string, isAddress = false): Promise<CryptoPrice | null> => {
    setIsLoading(true);
    setError(null);

    try {
      let price: CryptoPrice | null = null;

      if (isAddress && apiConfig.dexscreenerEnabled) {
        // Try DexScreener first for token addresses
        price = await getDexScreenerPrice(identifier);
      }

      if (!price && !isAddress) {
        // Try CoinGecko for token IDs
        price = await getCoinGeckoPrice(identifier);
      }

      if (!price) {
        throw new Error('Unable to fetch price data from any API');
      }

      return price;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [getDexScreenerPrice, getCoinGeckoPrice, apiConfig]);

  // Search tokens by name or symbol
  const searchTokens = useCallback(async (query: string): Promise<CryptoPrice[]> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/search?query=${encodeURIComponent(query)}`,
        {
          headers: apiConfig.coingeckoApiKey ? {
            'X-CG-Demo-API-Key': apiConfig.coingeckoApiKey
          } : {}
        }
      );

      if (!response.ok) throw new Error('Failed to search tokens');

      const data = await response.json();
      const tokenIds = data.coins?.slice(0, 10).map((coin: any) => coin.id) || [];

      if (tokenIds.length === 0) return [];

      // Get prices for found tokens
      const pricesResponse = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${tokenIds.join(',')}&vs_currencies=usd&include_24hr_change=true&include_market_cap=true&include_24hr_vol=true`,
        {
          headers: apiConfig.coingeckoApiKey ? {
            'X-CG-Demo-API-Key': apiConfig.coingeckoApiKey
          } : {}
        }
      );

      if (!pricesResponse.ok) return [];

      const pricesData = await pricesResponse.json();

      return data.coins.slice(0, 10).map((coin: any) => {
        const priceData = pricesData[coin.id];
        return {
          symbol: coin.symbol.toUpperCase(),
          name: coin.name,
          price: priceData?.usd || 0,
          priceChange24h: priceData?.usd_24h_change || 0,
          marketCap: priceData?.usd_market_cap || 0,
          volume24h: priceData?.usd_24h_vol || 0
        };
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Search failed';
      setError(errorMessage);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [apiConfig.coingeckoApiKey]);

  const updateApiConfig = useCallback((newConfig: Partial<ApiConfig>) => {
    setApiConfig(prev => ({ ...prev, ...newConfig }));
  }, []);

  return {
    getRealTimePrice,
    searchTokens,
    apiConfig,
    updateApiConfig,
    isLoading,
    error
  };
};