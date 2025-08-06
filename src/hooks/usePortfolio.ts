import { useState, useCallback } from 'react';
import { PortfolioHolding } from './useCryptoApi';

export const usePortfolio = () => {
  const [portfolio, setPortfolio] = useState<PortfolioHolding[]>([
    {
      id: '1',
      symbol: 'BTC',
      name: 'Bitcoin',
      amount: 0.5,
      price: 59777,
      value: 29888.5,
      change: 2.4,
      isPositive: true,
      blockchain: 'bitcoin'
    },
    {
      id: '2',
      symbol: 'ETH',
      name: 'Ethereum',
      amount: 3.2,
      price: 3929,
      value: 12572.8,
      change: -1.2,
      isPositive: false,
      blockchain: 'ethereum'
    },
    {
      id: '3',
      symbol: 'SOL',
      name: 'Solana',
      amount: 15,
      price: 194.2,
      value: 2913,
      change: 5.6,
      isPositive: true,
      blockchain: 'solana'
    }
  ]);

  const addToPortfolio = useCallback((token: Omit<PortfolioHolding, 'id' | 'value'>) => {
    const newHolding: PortfolioHolding = {
      ...token,
      id: Date.now().toString(),
      value: token.amount * token.price
    };
    
    setPortfolio(prev => [...prev, newHolding]);
  }, []);

  const removeFromPortfolio = useCallback((id: string) => {
    setPortfolio(prev => prev.filter(holding => holding.id !== id));
  }, []);

  const updateHoldingAmount = useCallback((id: string, newAmount: number) => {
    setPortfolio(prev => prev.map(holding => 
      holding.id === id 
        ? { ...holding, amount: newAmount, value: newAmount * holding.price }
        : holding
    ));
  }, []);

  const updatePrices = useCallback((updatedPrices: { symbol: string; price: number; change: number }[]) => {
    setPortfolio(prev => prev.map(holding => {
      const priceUpdate = updatedPrices.find(p => p.symbol === holding.symbol);
      if (priceUpdate) {
        return {
          ...holding,
          price: priceUpdate.price,
          change: priceUpdate.change,
          isPositive: priceUpdate.change >= 0,
          value: holding.amount * priceUpdate.price
        };
      }
      return holding;
    }));
  }, []);

  const totalValue = portfolio.reduce((sum, holding) => sum + holding.value, 0);
  const totalChange = portfolio.length > 0 
    ? portfolio.reduce((sum, holding) => sum + (holding.change * (holding.value / totalValue)), 0)
    : 0;

  return {
    portfolio,
    addToPortfolio,
    removeFromPortfolio,
    updateHoldingAmount,
    updatePrices,
    totalValue,
    totalChange
  };
};