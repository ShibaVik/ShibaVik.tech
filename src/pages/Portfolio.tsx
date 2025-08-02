import React from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, DollarSign, PieChart } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';

const Portfolio = () => {
  const holdings = [
    { symbol: 'BTC', name: 'Bitcoin', amount: 0.5, value: 59777, change: 2.4, isPositive: true },
    { symbol: 'ETH', name: 'Ethereum', amount: 3.2, value: 12574, change: -1.2, isPositive: false },
    { symbol: 'SOL', name: 'Solana', amount: 15, value: 2913, change: 5.6, isPositive: true },
  ];

  const totalValue = holdings.reduce((sum, holding) => sum + holding.value, 0);

  return (
    <main className="relative min-h-screen bg-gray-50">
      <Header />
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4 md:px-6">
          <FadeIn>
            <div className="text-center mb-8">
              <h1 className="text-4xl font-serif mb-4">Mon Portfolio</h1>
              <p className="text-lg text-muted-foreground">Gérez et suivez vos investissements crypto</p>
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
                  <p className="text-xs text-muted-foreground">+4.2% depuis hier</p>
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
                  <div className="text-2xl font-bold">{holdings.length}</div>
                  <p className="text-xs text-muted-foreground">Cryptomonnaies détenues</p>
                </CardContent>
              </Card>
            </FadeIn>
          </div>

          <FadeIn delay={300}>
            <Card>
              <CardHeader>
                <CardTitle>Mes Holdings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {holdings.map((holding, index) => (
                    <div key={holding.symbol} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-orangery-100 rounded-full flex items-center justify-center">
                          <span className="font-bold text-orangery-600">{holding.symbol}</span>
                        </div>
                        <div>
                          <div className="font-medium">{holding.name}</div>
                          <div className="text-sm text-muted-foreground">{holding.amount} {holding.symbol}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">${holding.value.toLocaleString()}</div>
                        <div className={`text-sm flex items-center gap-1 ${holding.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                          {holding.isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                          {holding.change}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </div>
    </main>
  );
};

export default Portfolio;