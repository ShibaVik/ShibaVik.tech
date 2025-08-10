import React, { useEffect } from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, DollarSign, PieChart, Trash2, Settings } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';
import AddCryptoDialog from '@/components/AddCryptoDialog';
import { useSupabasePortfolio } from '@/hooks/useSupabasePortfolio';
import { useCryptoApi } from '@/hooks/useCryptoApi';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

const Portfolio = () => {
  const { user, loading: authLoading } = useAuth();
  const { 
    portfolio, 
    loading,
    addToPortfolio, 
    removeFromPortfolio, 
    updatePrices, 
    totalValue, 
    totalChange 
  } = useSupabasePortfolio(user?.id);
  const { getRealTimePrice } = useCryptoApi();
  const { toast } = useToast();

  // Update prices every 30 seconds
  useEffect(() => {
    if (!user || portfolio.length === 0) return;

    const updateAllPrices = async () => {
      const priceUpdates = await Promise.all(
        portfolio.map(async (holding) => {
          const priceData = await getRealTimePrice(holding.symbol.toLowerCase());
          if (priceData) {
            return {
              symbol: holding.symbol,
              price: priceData.price,
              change: priceData.priceChange24h
            };
          }
          return null;
        })
      );

      const validUpdates = priceUpdates.filter(Boolean) as { symbol: string; price: number; change: number }[];
      if (validUpdates.length > 0) {
        updatePrices(validUpdates);
      }
    };

    const interval = setInterval(updateAllPrices, 30000); // Update every 30 seconds
    updateAllPrices(); // Initial update

    return () => clearInterval(interval);
  }, [user, portfolio, getRealTimePrice, updatePrices]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 pt-24 flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orangery-600"></div>
        </div>
      </div>
    );
  }

  // Allow access to portfolio without login but with limited functionality
  const isGuestMode = !user;

  return (
    <main className="relative min-h-screen bg-gray-50">
      <Header />
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4 md:px-6">
          <FadeIn>
            <div className="text-center mb-8">
              <h1 className="text-4xl font-serif mb-4">
                {isGuestMode ? 'Portfolio Demo' : 'Mon Portfolio'}
              </h1>
              <p className="text-lg text-muted-foreground">
                {isGuestMode 
                  ? 'Explorez les fonctionnalités du portfolio. Créez un compte pour sauvegarder vos positions.'
                  : 'Gérez et suivez vos investissements crypto'
                }
              </p>
              {isGuestMode && (
                <div className="mt-4">
                  <a 
                    href="/auth" 
                    className="inline-flex items-center px-6 py-3 bg-orangery-600 text-white rounded-md hover:bg-orangery-700 transition-colors"
                  >
                    Créer un compte pour sauvegarder
                  </a>
                </div>
              )}
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <FadeIn delay={100}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Valeur totale</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
                  <p className={`text-xs ${totalChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {totalChange >= 0 ? '+' : ''}{totalChange.toFixed(2)}% depuis hier
                  </p>
                </CardContent>
              </Card>
            </FadeIn>

            <FadeIn delay={200}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Nombre d'actifs</CardTitle>
                  <PieChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{portfolio.length}</div>
                  <p className="text-xs text-muted-foreground">Cryptomonnaies détenues</p>
                </CardContent>
              </Card>
            </FadeIn>
          </div>

          <FadeIn delay={300}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Mes Holdings</CardTitle>
                <AddCryptoDialog onAddCrypto={addToPortfolio} />
              </CardHeader>
              <CardContent>
                {portfolio.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">
                      {isGuestMode 
                        ? 'Portfolio vide. Les positions ajoutées en mode démo ne seront pas sauvegardées.'
                        : 'Aucune cryptomonnaie dans votre portfolio'
                      }
                    </p>
                    <AddCryptoDialog onAddCrypto={addToPortfolio} />
                  </div>
                ) : (
                  <div className="space-y-4">
                    {portfolio.map((holding) => (
                      <div key={holding.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-orangery-100 rounded-full flex items-center justify-center">
                            <span className="font-bold text-orangery-600">{holding.symbol.slice(0, 3)}</span>
                          </div>
                          <div>
                            <div className="font-medium">{holding.name}</div>
                            <div className="text-sm text-muted-foreground flex items-center gap-2">
                              {holding.amount} {holding.symbol}
                              {holding.blockchain && (
                                <Badge variant="outline" className="text-xs">
                                  {holding.blockchain}
                                </Badge>
                              )}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              ${holding.price.toFixed(6)} par unité
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="font-medium">${holding.value.toLocaleString()}</div>
                            <div className={`text-sm flex items-center gap-1 ${holding.change_percentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {holding.change_percentage >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                              {holding.change_percentage.toFixed(2)}%
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              removeFromPortfolio(holding.id);
                            }}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </div>
    </main>
  );
};

export default Portfolio;