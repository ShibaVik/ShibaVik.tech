
import React from 'react';
import ShibaHeader from '@/components/ShibaHeader';
import PopularCryptos from '@/components/PopularCryptos';
import SearchCrypto from '@/components/SearchCrypto';
import TradingCTA from '@/components/TradingCTA';

const Index = () => {
  return (
    <main className="min-h-screen">
      <ShibaHeader />
      <PopularCryptos />
      <SearchCrypto />
      <TradingCTA />
    </main>
  );
};

export default Index;
