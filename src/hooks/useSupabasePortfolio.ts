import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface SupabasePortfolioHolding {
  id: string;
  symbol: string;
  name: string;
  amount: number;
  price: number;
  value: number;
  change_percentage: number;
  blockchain: string;
  token_address?: string;
  created_at: string;
  updated_at: string;
}

export const useSupabasePortfolio = (userId?: string) => {
  const [portfolio, setPortfolio] = useState<SupabasePortfolioHolding[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchPortfolio = useCallback(async () => {
    if (!userId) {
      setPortfolio([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('portfolio_holdings')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPortfolio(data || []);
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: "Impossible de charger le portfolio",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [userId, toast]);

  useEffect(() => {
    fetchPortfolio();
  }, [fetchPortfolio]);

  const addToPortfolio = async (holding: Omit<SupabasePortfolioHolding, 'id' | 'created_at' | 'updated_at'>) => {
    if (!userId) return;

    try {
      const { data, error } = await supabase
        .from('portfolio_holdings')
        .insert([{
          ...holding,
          user_id: userId,
        }])
        .select()
        .single();

      if (error) throw error;

      setPortfolio(prev => [data, ...prev]);
      
      // Add transaction to history
      await supabase
        .from('transaction_history')
        .insert([{
          user_id: userId,
          type: 'buy',
          symbol: holding.symbol,
          name: holding.name,
          amount: holding.amount,
          price: holding.price,
          total_value: holding.value,
          blockchain: holding.blockchain,
          token_address: holding.token_address,
        }]);

      toast({
        title: "Succès",
        description: `${holding.symbol} ajouté au portfolio`,
      });
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const removeFromPortfolio = async (id: string) => {
    if (!userId) return;

    try {
      const holding = portfolio.find(h => h.id === id);
      if (!holding) return;

      const { error } = await supabase
        .from('portfolio_holdings')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setPortfolio(prev => prev.filter(h => h.id !== id));

      // Add sell transaction to history
      await supabase
        .from('transaction_history')
        .insert([{
          user_id: userId,
          type: 'sell',
          symbol: holding.symbol,
          name: holding.name,
          amount: holding.amount,
          price: holding.price,
          total_value: holding.value,
          blockchain: holding.blockchain,
          token_address: holding.token_address,
        }]);

      toast({
        title: "Succès",
        description: `${holding.symbol} retiré du portfolio`,
      });
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const updateHoldingAmount = async (id: string, newAmount: number) => {
    if (!userId) return;

    try {
      const holding = portfolio.find(h => h.id === id);
      if (!holding) return;

      const newValue = newAmount * holding.price;

      const { error } = await supabase
        .from('portfolio_holdings')
        .update({ 
          amount: newAmount, 
          value: newValue 
        })
        .eq('id', id);

      if (error) throw error;

      setPortfolio(prev => prev.map(h => 
        h.id === id 
          ? { ...h, amount: newAmount, value: newValue }
          : h
      ));
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const updatePrices = async (updatedPrices: { symbol: string; price: number; change: number }[]) => {
    if (!userId || portfolio.length === 0) return;

    try {
      const updates = portfolio.map(holding => {
        const priceUpdate = updatedPrices.find(p => p.symbol === holding.symbol);
        if (priceUpdate) {
          return {
            id: holding.id,
            price: priceUpdate.price,
            change_percentage: priceUpdate.change,
            value: holding.amount * priceUpdate.price
          };
        }
        return null;
      }).filter(Boolean);

      for (const update of updates) {
        if (update) {
          await supabase
            .from('portfolio_holdings')
            .update({
              price: update.price,
              change_percentage: update.change_percentage,
              value: update.value
            })
            .eq('id', update.id);
        }
      }

      setPortfolio(prev => prev.map(holding => {
        const priceUpdate = updatedPrices.find(p => p.symbol === holding.symbol);
        if (priceUpdate) {
          return {
            ...holding,
            price: priceUpdate.price,
            change_percentage: priceUpdate.change,
            value: holding.amount * priceUpdate.price
          };
        }
        return holding;
      }));
    } catch (error: any) {
      console.error('Error updating prices:', error);
    }
  };

  const totalValue = portfolio.reduce((sum, holding) => sum + holding.value, 0);
  const totalChange = portfolio.length > 0 
    ? portfolio.reduce((sum, holding) => sum + (holding.change_percentage * (holding.value / totalValue)), 0)
    : 0;

  return {
    portfolio,
    loading,
    addToPortfolio,
    removeFromPortfolio,
    updateHoldingAmount,
    updatePrices,
    totalValue,
    totalChange,
    refetch: fetchPortfolio
  };
};