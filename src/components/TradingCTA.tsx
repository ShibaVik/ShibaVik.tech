import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Rocket } from 'lucide-react';

interface TradingCTAProps {
  className?: string;
}

const TradingCTA: React.FC<TradingCTAProps> = ({ className }) => {
  return (
    <div className={cn('w-full px-6 py-16', className)}>
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Rocket className="w-8 h-8 text-shiba-cyan" />
          <h2 className="text-3xl font-bold text-white">
            Prêt pour le Trading Réel ?
          </h2>
        </div>
        
        <p className="text-shiba-muted text-lg mb-8">
          Passez au niveau suivant avec notre partenaire officiel
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-shiba-cyan hover:bg-shiba-cyan/80 text-white px-8 py-3">
            Commencer le Trading Réel
          </Button>
          <Button 
            variant="outline" 
            className="border-white/20 text-white hover:bg-white/10 px-8 py-3"
          >
            En savoir plus
          </Button>
        </div>
        
        <div className="mt-8 p-4 glass-card inline-block">
          <p className="text-shiba-muted text-sm">
            ⚠️ Le trading de cryptomonnaies comporte des risques. 
            Ne tradez que ce que vous pouvez vous permettre de perdre.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TradingCTA;