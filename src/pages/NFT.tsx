import React from 'react';
import Header from '@/components/Header';
import NFTSection from '@/components/NFTSection';

const NFTPage = () => {
  return (
    <main className="relative min-h-screen bg-gray-50">
      <Header />
      <div className="pt-24">
        <NFTSection />
      </div>
    </main>
  );
};

export default NFTPage;