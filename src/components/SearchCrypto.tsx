import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface SearchCryptoProps {
  className?: string;
}

const SearchCrypto: React.FC<SearchCryptoProps> = ({ className }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className={cn('w-full px-6 py-8', className)}>
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-shiba-pink to-red-500 rounded-xl p-6 mb-6">
          <div className="flex items-center gap-2 text-white">
            <Search className="w-5 h-5" />
            <h2 className="text-xl font-bold">Search Cryptocurrency</h2>
          </div>
        </div>

        <form onSubmit={handleSearch} className="flex gap-3 mb-8">
          <Input
            type="text"
            placeholder="Contract address, symbol or name (e.g. 0xBC4564976eA89490304E4E9801EE034797939F39FA460F, BTC, ETH)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-shiba-muted"
          />
          <Button 
            type="submit"
            className="bg-shiba-pink hover:bg-shiba-pink/80 text-white px-8"
          >
            Search
          </Button>
        </form>

        <div className="glass-card p-8 text-center">
          <p className="text-shiba-muted text-lg">
            Search for a cryptocurrency to start trading
          </p>
        </div>
      </div>
    </div>
  );
};

export default SearchCrypto;