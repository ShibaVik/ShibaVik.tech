import React from 'react';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import FadeIn from './animations/FadeIn';

interface CryptoShowcaseProps {
  className?: string;
}

const CryptoShowcase: React.FC<CryptoShowcaseProps> = ({ className }) => {
  const cryptos = [
    {
      id: 'bitcoin',
      symbol: 'BTC',
      name: 'Bitcoin',
      price: '$119,554',
      change: '+1.04%',
      isPositive: true,
      icon: '₿'
    },
    {
      id: 'ethereum',
      symbol: 'ETH',
      name: 'Ethereum',
      price: '$3,929.44',
      change: '+3.92%',
      isPositive: true,
      icon: 'Ξ'
    },
    {
      id: 'solana',
      symbol: 'SOL',
      name: 'Solana',
      price: '$194.18',
      change: '+3.52%',
      isPositive: true,
      icon: '◎'
    },
    {
      id: 'bnb',
      symbol: 'BNB',
      name: 'BNB',
      price: '$851.55',
      change: '+6.80%',
      isPositive: true,
      icon: '⬢'
    }
  ];

  return (
    <section className={cn('py-20 bg-gray-50', className)}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-serif mb-8">Market Insights</h2>
          </FadeIn>
          <FadeIn delay={100}>
            <p className="text-lg text-muted-foreground">
              Track the performance of leading cryptocurrencies and digital assets
            </p>
          </FadeIn>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {cryptos.map((crypto, index) => (
            <FadeIn key={crypto.id} delay={150 + index * 50}>
              <Card className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-orangery-100 rounded-full flex items-center justify-center group-hover:bg-orangery-200 transition-colors">
                      <span className="text-orangery-600 text-lg font-bold">{crypto.icon}</span>
                    </div>
                    <div>
                      <div className="font-medium text-sm text-muted-foreground">{crypto.symbol}</div>
                      <div className="text-xs text-muted-foreground">{crypto.name}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-xl font-serif font-medium">{crypto.price}</div>
                    <div className={cn(
                      'flex items-center gap-1 text-sm font-medium',
                      crypto.isPositive ? 'text-green-600' : 'text-red-600'
                    )}>
                      {crypto.isPositive ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      <span>{crypto.change}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={400}>
          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground">
              Last updated: {new Date().toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default CryptoShowcase;