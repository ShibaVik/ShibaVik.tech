import React from 'react';
import { cn } from '@/lib/utils';
import FadeIn from './animations/FadeIn';
import InteractiveButton from './InteractiveButton';

interface NFTSectionProps {
  className?: string;
}

const NFTSection: React.FC<NFTSectionProps> = ({ className }) => {
  const nftCollections = [
    {
      name: "ShibaVik Blue Lightning",
      description: "Collection Summer Era avec le légendaire ShibaVik aux lunettes éclair bleues",
      image: "/lovable-uploads/9c990978-0480-4029-845d-5aea6ca06e53.png",
      price: "0.08 ETH",
      supply: "2,500"
    },
    {
      name: "ShibaVik Pink Thunder", 
      description: "Edition spéciale aux couleurs violettes et roses de la Summer Era",
      image: "/lovable-uploads/dcf6ca16-0389-46eb-99ed-8e7ec60b0bcb.png",
      price: "0.12 ETH",
      supply: "1,000"
    },
    {
      name: "ShibaVik Classic",
      description: "Version monochrome iconique de la collection Summer Era",
      image: "/lovable-uploads/62eb8a2c-c9d5-4c86-97e6-79695ff89a29.png",
      price: "0.15 ETH", 
      supply: "500"
    }
  ];

  return (
    <section id="nft" className={cn('py-20 bg-gradient-to-b from-background to-muted/20', className)}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-serif mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                ShibaVik Summer Era
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Découvrez la collection officielle ShibaVik Summer Era sur OpenSea. 
                Chaque NFT offre des traits uniques et des avantages exclusifs dans l'écosystème ShibaVik.
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {nftCollections.map((collection, index) => (
              <FadeIn key={index} delay={100 + index * 100}>
                <div className="group relative bg-card rounded-2xl p-6 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10">
                  <div className="relative overflow-hidden rounded-xl mb-6">
                    <img 
                      src={collection.image} 
                      alt={collection.name}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {collection.name}
                  </h3>
                  <p className="text-muted-foreground mb-4 text-sm">
                    {collection.description}
                  </p>
                  
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Prix de base</p>
                      <p className="font-semibold text-primary">{collection.price}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Supply</p>
                      <p className="font-semibold">{collection.supply}</p>
                    </div>
                  </div>
                  
                  <InteractiveButton
                    onClick={() => window.open('https://opensea.io/collection/shibavik-summer-era/overview', '_blank')}
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    Voir sur OpenSea
                  </InteractiveButton>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={400}>
            <div className="text-center bg-card/50 rounded-2xl p-8 border border-border/30">
              <h3 className="text-2xl font-semibold mb-4">Collection ShibaVik Summer Era</h3>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                Explorez la collection complète ShibaVik Summer Era sur OpenSea. 
                Chaque NFT est unique avec des traits rares et des utilités spéciales.
              </p>
              
              <div className="flex justify-center">
                <InteractiveButton
                  onClick={() => window.open('https://opensea.io/collection/shibavik-summer-era/overview', '_blank')}
                  className="bg-primary hover:bg-primary/90"
                >
                  Voir Summer Era
                </InteractiveButton>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default NFTSection;