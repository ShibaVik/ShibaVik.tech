import React from 'react';
import { cn } from '@/lib/utils';
import FadeIn from './animations/FadeIn';
import { Card, CardContent } from '@/components/ui/card';

interface FoundersInSearchProps {
  className?: string;
}

const FoundersInSearch: React.FC<FoundersInSearchProps> = ({ className }) => {
  const founderTypes = [
    {
      title: "Applied Mathematics Specialists",
      description: "Mathematicians who apply advanced algorithms, statistical models, and quantitative analysis to solve real-world blockchain challenges."
    },
    {
      title: "Blockchain Architects", 
      description: "Technical experts who design and implement decentralized systems, smart contracts, and distributed ledger technologies."
    },
    {
      title: "DeFi Innovators",
      description: "Pioneers creating decentralized financial products, automated market makers, and yield optimization protocols."
    },
    {
      title: "Cryptographic Researchers",
      description: "Security experts developing new consensus mechanisms, zero-knowledge proofs, and privacy-preserving technologies."
    }
  ];

  return (
    <section id="founders" className={cn('py-20 bg-white', className)}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto mb-16">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-serif mb-8 text-center">Applied Mathematics & Blockchain</h2>
          </FadeIn>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {founderTypes.map((type, index) => (
            <FadeIn key={index} delay={150 + index * 50}>
              <Card className="border-0 shadow-sm h-full">
                <CardContent className="p-6">
                  <h3 className="text-xl font-medium mb-3 font-serif">{type.title}</h3>
                  <p className="text-muted-foreground">{type.description}</p>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FoundersInSearch;
