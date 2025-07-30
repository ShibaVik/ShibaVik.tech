import React from 'react';
import { cn } from '@/lib/utils';
import FadeIn from './animations/FadeIn';

interface HeroProps {
  className?: string;
}

const Hero: React.FC<HeroProps> = ({ className }) => {
  return (
    <section className={cn('relative min-h-screen flex items-center overflow-hidden', className)}>
      <div className="absolute inset-0 -z-10">
        <img 
          src="/lovable-uploads/a0278ce1-b82d-4ed6-a186-14a9503ef65c.png" 
          alt="Orangery" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 py-20 md:py-32 relative z-10 max-w-4xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <FadeIn delay={200}>
              <span className="text-sm md:text-base font-medium text-orangery-300 mb-2 inline-block">ShibaVik launches a website</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium tracking-tight text-white leading-tight mb-6">
                ShibaVik.io
              </h1>
            </FadeIn>
            
            <FadeIn delay={300}>
              <p className="text-lg md:text-xl text-white/90 mb-4">
                Soon MILHAU Sullyvan will launch ShibaVik.io-Loveable CryptoCurrency Trading Simulator Platform and MemeCoin ( Pump.Fun Solana protocol ETH, BTC , BSC )
              </p>
              <p className="text-lg md:text-xl text-white/90 mb-8">
                Follow the news on 𝕏 ShibaVik
              </p>
            </FadeIn>
          </div>
          
          <FadeIn delay={400} className="flex justify-center md:justify-end">
            <div className="relative w-80 h-80 lg:w-96 lg:h-96">
              <img 
                src="/lovable-uploads/39e309bf-81a7-40d8-a251-fe591e0b6da7.png"
                alt="ShibaVik character with blue gradient background"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default Hero;
