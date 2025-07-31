
import React from 'react';
import { cn } from '@/lib/utils';
import FadeIn from './animations/FadeIn';

interface ManifestoProps {
  className?: string;
}

const Manifesto: React.FC<ManifestoProps> = ({ className }) => {
  return (
    <section id="thesis" className={cn('py-20 bg-white', className)}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-serif mb-10 text-center">ShibaVik Trading Simulator</h2>
          </FadeIn>
          
          <FadeIn delay={100}>
            <p className="text-xl md:text-2xl leading-relaxed mb-12 font-serif text-center">
              Experience real-time cryptocurrency trading with virtual funds in a risk-free environment powered by live market data.
            </p>
          </FadeIn>
          
          <FadeIn delay={200}>
            <p className="text-lg leading-relaxed text-muted-foreground text-center">
              Our platform simulates real market conditions using actual cryptocurrency prices from Bitcoin, Ethereum, Solana, and BNB. Practice trading strategies, learn market analysis, and prepare for real investments without financial risk. Built on Pump.Fun Solana protocol with support for ETH, BTC, and BSC networks.
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default Manifesto;

