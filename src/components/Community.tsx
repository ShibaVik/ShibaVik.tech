
import React from 'react';
import { cn } from '@/lib/utils';
import FadeIn from './animations/FadeIn';
import { Card, CardContent } from '@/components/ui/card';

interface CommunityProps {
  className?: string;
}

const Community: React.FC<CommunityProps> = ({ className }) => {
  const features = [
    {
      title: "Trading Simulator",
      description: "Practice cryptocurrency trading with our advanced simulator platform using virtual funds"
    },
    {
      title: "MemeCoin Platform",
      description: "Launch and trade memecoins using Pump.Fun Solana protocol, ETH, BTC, and BSC networks"
    }
  ];

  return (
    <section id="community" className={cn('py-20 bg-white', className)}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto mb-16">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-serif mb-8 text-center">ShibaVik Platform Features</h2>
          </FadeIn>
          
          <FadeIn delay={100}>
            <p className="text-xl text-center mb-12">
              Experience the future of cryptocurrency trading with our comprehensive platform designed for both beginners and experts.
            </p>
          </FadeIn>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {features.map((feature, index) => (
            <FadeIn key={index} delay={150 + index * 50}>
              <Card className="border-0 shadow-sm h-full">
                <CardContent className="p-8">
                  <h3 className="text-xl font-medium mb-4 font-serif">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
        
        <FadeIn delay={300}>
          <div className="text-center">
            <div className="relative h-[400px] w-full max-w-2xl mx-auto rounded-lg overflow-hidden">
              <img 
                src="/lovable-uploads/8647aafc-3e3b-438c-8961-f295eca354f4.png"
                alt="ShibaVik character with purple gradient background"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default Community;
