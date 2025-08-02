import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, TrendingUp } from 'lucide-react';
import FadeIn from './animations/FadeIn';

interface TradingSimulatorProps {
  className?: string;
}

const TradingSimulator: React.FC<TradingSimulatorProps> = ({ className }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [balance] = useState(10000);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const socialLinks = [
    { name: 'Twitter', symbol: '𝕏', href: 'https://twitter.com/ShibaVik', color: 'bg-blue-100 hover:bg-blue-200 text-blue-600' },
    { name: 'GitHub', symbol: 'GH', href: 'https://github.com/ShibaVik', color: 'bg-gray-100 hover:bg-gray-200 text-gray-700' },
    { name: 'OpenSea', symbol: '🌊', href: 'https://opensea.io/ShibaVik', color: 'bg-cyan-100 hover:bg-cyan-200 text-cyan-600' },
  ];

  return (
    <section className={cn('py-20 bg-white', className)}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif mb-6">Trading Simulator</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Practice trading with virtual funds and build your skills
              </p>
              
              <div className="flex items-center justify-center gap-6 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-serif font-medium text-orangery-600">
                    ${balance.toLocaleString()}.00
                  </div>
                  <div className="text-sm text-muted-foreground">Demo Balance</div>
                </div>
                
                <div className="flex items-center gap-2">
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:shadow-md",
                        link.color
                      )}
                      title={link.name}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="text-sm font-medium">{link.symbol}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="bg-orangery-50 rounded-xl p-8 mb-8">
              <div className="flex items-center gap-2 mb-6">
                <Search className="w-5 h-5 text-orangery-600" />
                <h3 className="text-xl font-serif font-medium">Search Assets</h3>
              </div>

              <form onSubmit={handleSearch} className="flex gap-3 mb-6">
                <Input
                  type="text"
                  placeholder="Search by symbol or name (e.g. BTC, Bitcoin)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  type="submit"
                  className="bg-orangery-500 hover:bg-orangery-600 text-white"
                >
                  Search
                </Button>
              </form>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {['BTC', 'ETH', 'SOL', 'BNB'].map((crypto) => (
                  <button
                    key={crypto}
                    onClick={() => setSearchQuery(crypto)}
                    className="p-3 border-2 border-orangery-200 rounded-lg hover:border-orangery-400 hover:bg-orangery-50 transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="text-sm font-medium text-orangery-600">{crypto}</div>
                  </button>
                ))}
              </div>
              
              <div className="text-center py-8 border-2 border-dashed border-orangery-200 rounded-lg hover:border-orangery-300 transition-colors">
                <TrendingUp className="w-12 h-12 text-orangery-400 mx-auto mb-4 animate-pulse" />
                <p className="text-muted-foreground">
                  Sélectionnez une cryptomonnaie pour commencer à trader
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="text-center">
              <h3 className="text-xl font-serif font-medium mb-4">Ready for Real Trading?</h3>
              <p className="text-muted-foreground mb-6">
                Take your skills to the next level with our trusted partners
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-orangery-500 hover:bg-orangery-600 text-white">
                  Start Real Trading
                </Button>
                <Button variant="outline" className="border-orangery-200 hover:bg-orangery-50">
                  Learn More
                </Button>
              </div>
              <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg inline-block">
                <p className="text-amber-800 text-sm">
                  ⚠️ Trading involves risk. Only trade what you can afford to lose.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default TradingSimulator;