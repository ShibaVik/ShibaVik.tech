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
      name: "ShibaVik Genesis",
      description: "Premier collection NFT de ShibaVik avec des traits uniques",
      image: "/lovable-uploads/af28398b-9e23-4e2b-9de1-bda457e09fd8.png",
      price: "0.5 ETH",
      supply: "1,000"
    },
    {
      name: "Trading Masters",
      description: "NFTs exclusifs pour les meilleurs traders",
      image: "/lovable-uploads/34a58283-8b82-48f9-88f4-2c88b069921d.png", 
      price: "0.3 ETH",
      supply: "500"
    },
    {
      name: "Shiba Legends",
      description: "Collection rare avec des utilités spéciales",
      image: "/lovable-uploads/39e309bf-81a7-40d8-a251-fe591e0b6da7.png",
      price: "1.2 ETH", 
      supply: "250"
    }
  ];

  return (
    <section id="nft" className={cn('py-20 bg-gradient-to-b from-background to-muted/20', className)}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Collections NFT ShibaVik
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Découvrez nos collections NFT exclusives développées par MS-ShibaVik. 
                Chaque NFT offre des avantages uniques dans l'écosystème ShibaVik.
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
                    onClick={() => window.open('https://opensea.io/ShibaVik', '_blank')}
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
              <h3 className="text-2xl font-semibold mb-4">Rejoignez la communauté NFT</h3>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                Possédez un NFT ShibaVik et accédez à des fonctionnalités exclusives, 
                des airdrops et des avantages spéciaux dans notre écosystème.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <InteractiveButton
                  onClick={() => window.open('https://opensea.io/ShibaVik', '_blank')}
                  className="bg-primary hover:bg-primary/90"
                >
                  Explorer OpenSea
                </InteractiveButton>
                <InteractiveButton
                  onClick={() => window.open('https://discord.gg/shibavik', '_blank')}
                  variant="outline"
                  className="border-primary/30 hover:border-primary"
                >
                  Rejoindre Discord
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