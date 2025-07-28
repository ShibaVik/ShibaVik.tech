import React from 'react';
import { cn } from '@/lib/utils';
import { TrendingUp } from 'lucide-react';

interface PopularCryptosProps {
  className?: string;
}

const PopularCryptos: React.FC<PopularCryptosProps> = ({ className }) => {
  const cryptos = [
    {
      id: 'bitcoin',
      symbol: 'BTC',
      name: 'Bitcoin',
      price: '$119,554',
      change: '1.04%',
      isPositive: true,
      icon: 'https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400'
    },
    {
      id: 'ethereum',
      symbol: 'ETH',
      name: 'Ethereum',
      price: '$3,929.44',
      change: '3.92%',
      isPositive: true,
      icon: 'https://coin-images.coingecko.com/coins/images/279/large/ethereum.png?1696501628'
    },
    {
      id: 'solana',
      symbol: 'SOL',
      name: 'Solana',
      price: '$194.18',
      change: '3.52%',
      isPositive: true,
      icon: 'https://coin-images.coingecko.com/coins/images/4128/large/solana.png?1718769756'
    },
    {
      id: 'bnb',
      symbol: 'BNB',
      name: 'BNB',
      price: '$851.55',
      change: '6.80%',
      isPositive: true,
      icon: 'https://coin-images.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1696501970'
    }
  ];

  return (
    <div className={cn('w-full px-6 py-8', className)}>
      <div className="max-w-7xl mx-auto">
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="text-yellow-400 text-lg">⭐</span>
              <h2 className="text-xl font-bold text-white">Popular Cryptos</h2>
            </div>
            <div className="flex items-center gap-1 text-shiba-green text-sm">
              <span>⚡</span>
              <span>Last Update: 02:21 AM</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {cryptos.map((crypto) => (
              <div key={crypto.id} className="crypto-card">
                <div className="flex items-center gap-3 mb-3">
                  <img 
                    src={crypto.icon} 
                    alt={crypto.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <div className="text-white font-medium">{crypto.symbol}</div>
                    <div className="text-shiba-muted text-sm">{crypto.name}</div>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="text-white text-xl font-bold">{crypto.price}</div>
                  <div className={cn(
                    'flex items-center gap-1 text-sm',
                    crypto.isPositive ? 'text-shiba-green' : 'text-red-400'
                  )}>
                    <TrendingUp className="w-3 h-3" />
                    <span>{crypto.change}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularCryptos;