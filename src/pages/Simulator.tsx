import React from 'react';
import Header from '@/components/Header';
import TradingSimulator from '@/components/TradingSimulator';

const SimulatorPage = () => {
  return (
    <main className="relative min-h-screen bg-gray-50">
      <Header forceScrolledStyle={true} />
      <div className="pt-24">
        <TradingSimulator />
      </div>
    </main>
  );
};

export default SimulatorPage;