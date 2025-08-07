import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface Transaction {
  id: string;
  type: 'buy' | 'sell';
  symbol: string;
  name: string;
  amount: number;
  price: number;
  total_value: number;
  blockchain: string;
  created_at: string;
}

const History = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
        fetchTransactions(session.user.id);
      } else {
        setLoading(false);
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setUser(session.user);
        fetchTransactions(session.user.id);
      } else {
        setUser(null);
        setTransactions([]);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchTransactions = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('transaction_history')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTransactions((data || []) as Transaction[]);
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: "Impossible de charger l'historique des transactions",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 pt-24 text-center">
          <Card className="max-w-md mx-auto">
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Connexion requise</h2>
              <p className="text-muted-foreground mb-4">
                Vous devez être connecté pour voir votre historique de transactions.
              </p>
              <a 
                href="/auth" 
                className="inline-flex items-center px-4 py-2 bg-orangery-600 text-white rounded-md hover:bg-orangery-700 transition-colors"
              >
                Se connecter
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-serif font-bold mb-2">Historique des transactions</h1>
            <p className="text-muted-foreground">
              Suivez toutes vos transactions d'achat et de vente de cryptomonnaies
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orangery-600"></div>
            </div>
          ) : transactions.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center py-12">
                <h3 className="text-lg font-semibold mb-2">Aucune transaction</h3>
                <p className="text-muted-foreground mb-4">
                  Vous n'avez pas encore effectué de transactions.
                </p>
                <a 
                  href="/portfolio" 
                  className="inline-flex items-center px-4 py-2 bg-orangery-600 text-white rounded-md hover:bg-orangery-700 transition-colors"
                >
                  Commencer à trader
                </a>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <Card key={transaction.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-full ${
                          transaction.type === 'buy' ? 'bg-green-100' : 'bg-red-100'
                        }`}>
                          {transaction.type === 'buy' ? (
                            <TrendingUp className={`w-5 h-5 ${
                              transaction.type === 'buy' ? 'text-green-600' : 'text-red-600'
                            }`} />
                          ) : (
                            <TrendingDown className="w-5 h-5 text-red-600" />
                          )}
                        </div>
                        
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{transaction.name}</h3>
                            <Badge variant="secondary">{transaction.symbol}</Badge>
                            <Badge 
                              variant={transaction.type === 'buy' ? 'default' : 'destructive'}
                            >
                              {transaction.type === 'buy' ? 'Achat' : 'Vente'}
                            </Badge>
                          </div>
                          
                          <div className="text-sm text-muted-foreground">
                            {transaction.amount} {transaction.symbol} à ${transaction.price.toFixed(4)} chacun
                          </div>
                          
                          <div className="text-xs text-muted-foreground mt-1">
                            {format(new Date(transaction.created_at), 'dd MMMM yyyy à HH:mm', { locale: fr })} · {transaction.blockchain}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-lg font-semibold">
                          ${transaction.total_value.toFixed(2)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Total
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default History;