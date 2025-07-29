
import React from 'react';
import { cn } from '@/lib/utils';
import FadeIn from './animations/FadeIn';

interface AboutProps {
  className?: string;
}

const About: React.FC<AboutProps> = ({ className }) => {
  return (
    <section id="about" className={cn('py-20 md:py-32 bg-gray-50', className)}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-12 gap-12 md:gap-20 items-start">
          <FadeIn className="md:col-span-5">
            <div className="flex flex-col space-y-6">
              <div>
                <span className="text-sm md:text-base font-medium text-orangery-500 mb-2 inline-block">ShibaVik launches a website</span>
                <h2 className="text-3xl md:text-5xl font-serif font-medium tracking-tight mb-6">ShibaVik.io</h2>
              </div>
              
              <p className="text-lg text-muted-foreground">
                Soon MILHAU Sullyvan will launch ShibaVik.io-Loveable CryptoCurrency Trading Simulator Platform and MemeCoin ( Pump.Fun Solana protocol ETH, BTC , BSC )
              </p>
              <p className="text-lg text-muted-foreground">
                Follow the news on 𝕏 ShibaVik
              </p>
              
              <div className="flex space-x-4 mt-6">
                <a
                  href="https://twitter.com/Nft_ShibaVik"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-orangery-600 hover:text-orangery-700 transition-colors"
                >
                  <span className="text-lg">𝕏</span>
                  <span className="text-sm">Twitter</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/sullyvan-milhau"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-orangery-600 hover:text-orangery-700 transition-colors"
                >
                  <span className="text-lg">in</span>
                  <span className="text-sm">LinkedIn</span>
                </a>
                <a
                  href="https://opensea.io/ShibaVik"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-orangery-600 hover:text-orangery-700 transition-colors"
                >
                  <span className="text-lg">OS</span>
                  <span className="text-sm">OpenSea</span>
                </a>
                <a
                  href="https://github.com/ShibaVik"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-orangery-600 hover:text-orangery-700 transition-colors"
                >
                  <span className="text-lg">GH</span>
                  <span className="text-sm">GitHub</span>
                </a>
              </div>
            </div>
          </FadeIn>
          
          <FadeIn delay={150} className="md:col-span-7">
            <div className="relative h-[500px] lg:h-[600px] w-full rounded-lg overflow-hidden">
              <img 
                src="/lovable-uploads/39e309bf-81a7-40d8-a251-fe591e0b6da7.png"
                alt="ShibaVik character with blue gradient background"
                className="w-full h-full object-cover"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default About;
