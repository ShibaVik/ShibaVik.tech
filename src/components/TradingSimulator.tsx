import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, TrendingUp, Github, ExternalLink, AlertTriangle, CheckCircle } from 'lucide-react';
import { useCryptoApi, CryptoPrice } from '@/hooks/useCryptoApi';
import { useToast } from '@/hooks/use-toast';
import ApiSettings from '@/components/ApiSettings';
import { cn } from '@/lib/utils';
import FadeIn from './animations/FadeIn';

interface TradingSimulatorProps {
  className?: string;
}

const TradingSimulator: React.FC<TradingSimulatorProps> = ({ className }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedToken, setSelectedToken] = useState<CryptoPrice | null>(null);
  const [searchResults, setSearchResults] = useState<CryptoPrice[]>([]);
  const [showApiSettings, setShowApiSettings] = useState(false);
  const [tradeAmount, setTradeAmount] = useState('');
  
  const { getRealTimePrice, searchTokens, apiConfig, updateApiConfig, isLoading, error } = useCryptoApi();
  const { toast } = useToast();
  
  // Use localStorage for demo balance
  const [balance, setBalance] = useState(() => {
    const stored = localStorage.getItem('demoBalance');
    return stored ? parseFloat(stored) : 10000;
  });

  // Update balance when localStorage changes
  useEffect(() => {
    const updateBalance = () => {
      const stored = localStorage.getItem('demoBalance');
      if (stored) {
        setBalance(parseFloat(stored));
      }
    };
    
    window.addEventListener('storage', updateBalance);
    return () => window.removeEventListener('storage', updateBalance);
  }, []);

  const popularCryptos = [
    { symbol: 'BTC', name: 'Bitcoin', id: 'bitcoin' },
    { symbol: 'ETH', name: 'Ethereum', id: 'ethereum' },
    { symbol: 'SOL', name: 'Solana', id: 'solana' },
    { symbol: 'ADA', name: 'Cardano', id: 'cardano' },
    { symbol: 'DOGE', name: 'Dogecoin', id: 'dogecoin' },
    { symbol: 'MATIC', name: 'Polygon', id: 'matic-network' }
  ];

  // Handle search
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const results = await searchTokens(searchQuery);
    setSearchResults(results);
    
    if (results.length === 0) {
      toast({
        title: "Aucun résultat",
        description: "Aucun token trouvé pour cette recherche",
        variant: "destructive"
      });
    }
  };

  // Handle token selection (popular cryptos)
  const handleTokenSelect = async (tokenId: string) => {
    const price = await getRealTimePrice(tokenId, false);
    if (price) {
      setSelectedToken(price);
      setSearchQuery(price.symbol);
      setSearchResults([]);
    }
  };

  // Handle address input (for DexScreener)
  const handleAddressInput = async (address: string) => {
    if (address.length === 42 && address.startsWith('0x')) {
      const price = await getRealTimePrice(address, true);
      if (price) {
        setSelectedToken(price);
        setSearchResults([]);
      }
    }
  };

  // Handle trade execution
  const handleTrade = async (type: 'buy' | 'sell') => {
    if (!selectedToken || !tradeAmount) {
      toast({
        title: "Information manquante",
        description: "Veuillez sélectionner un token et entrer un montant",
        variant: "destructive"
      });
      return;
    }

    // Get real-time price before executing trade
    const currentPrice = await getRealTimePrice(
      selectedToken.address || selectedToken.symbol.toLowerCase(), 
      !!selectedToken.address
    );

    if (!currentPrice) {
      toast({
        title: "Erreur de prix",
        description: "Impossible de récupérer le prix actuel",
        variant: "destructive"
      });
      return;
    }

    const amount = parseFloat(tradeAmount);
    const totalValue = type === 'buy' ? amount : amount * currentPrice.price;

    toast({
      title: `${type === 'buy' ? 'Achat' : 'Vente'} simulé`,
      description: `${amount} ${currentPrice.symbol} à $${currentPrice.price.toFixed(6)} = $${totalValue.toFixed(2)}`,
    });

    // Update selected token with current price
    setSelectedToken(currentPrice);
  };

  useEffect(() => {
    if (searchQuery.length === 42 && searchQuery.startsWith('0x')) {
      handleAddressInput(searchQuery);
    }
  }, [searchQuery]);

  const socialLinks = [
    { name: '𝕏', href: 'https://twitter.com/Nft_ShibaVik', color: 'bg-black hover:bg-gray-800 text-white' },
    { name: 'OpenSea', logo: '/lovable-uploads/aff37192-08d1-43f3-8bad-47bcd838cdea.png', href: 'https://opensea.io/ShibaVik', color: 'bg-cyan-100 hover:bg-cyan-200 text-cyan-600' },
    { name: 'LinkedIn', logo: '/lovable-uploads/a3d05521-8a36-44d1-a5ec-8b4fa38f160b.png', href: 'https://linkedin.com/in/sullyvan-milhau-92945a2b1', color: 'bg-blue-100 hover:bg-blue-200 text-blue-700' },
    { name: 'GitHub', logo: '/lovable-uploads/cf7c815d-01c5-426a-af9f-26812957b1fc.png', href: 'https://github.com/ShibaVik', color: 'bg-gray-100 hover:bg-gray-200 text-gray-700' },
  ];

  return (
    <section className={cn('py-20 bg-white', className)}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif mb-6">Trading Simulator</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Practice trading with virtual funds and real-time crypto prices
              </p>
              
              <div className="flex items-center justify-center gap-6 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-serif font-medium text-orangery-600">
                    ${balance.toLocaleString()}.00
                  </div>
                  <div className="text-sm text-muted-foreground">Demo Balance</div>
                </div>
                
                <div className="flex items-center gap-2">
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:shadow-md",
                        link.color
                      )}
                      title={link.name}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.name === '𝕏' ? (
                        <span className="text-lg font-bold">𝕏</span>
                      ) : (
                        <img src={link.logo} alt={link.name} className="w-5 h-5" />
                      )}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="bg-orangery-50 rounded-xl p-8 mb-8">
              <div className="flex items-center gap-2 mb-6">
                <Search className="w-5 h-5 text-orangery-600" />
                <h3 className="text-xl font-serif font-medium">Search Assets</h3>
              </div>

              <form className="mb-6" onSubmit={handleSearch}>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Rechercher une crypto ou entrer une adresse de contrat..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4"
                  />
                  <Button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8" disabled={isLoading}>
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </form>

              {/* API Status */}
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {apiConfig.dexscreenerEnabled && (
                    <Badge variant="outline" className="flex items-center gap-1">
                      <CheckCircle className="h-3 w-3 text-green-600" />
                      DexScreener
                    </Badge>
                  )}
                  <Badge variant="outline" className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    CoinGecko {apiConfig.coingeckoApiKey ? 'Pro' : 'Free'}
                  </Badge>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowApiSettings(!showApiSettings)}
                >
                  Paramètres API
                </Button>
              </div>

              {/* API Settings */}
              {showApiSettings && (
                <div className="mb-6">
                  <ApiSettings 
                    apiConfig={apiConfig}
                    onConfigUpdate={updateApiConfig}
                  />
                </div>
              )}

              {/* Error Display */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <span className="text-red-700 text-sm">{error}</span>
                </div>
              )}

              {/* Search Results */}
              {searchResults.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Résultats de recherche</h3>
                  <div className="space-y-2">
                    {searchResults.map((token, index) => (
                      <Card 
                        key={index} 
                        className="p-3 cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => setSelectedToken(token)}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium">{token.name}</div>
                            <div className="text-sm text-gray-600">{token.symbol}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">${token.price.toFixed(6)}</div>
                            <div className={`text-sm ${token.priceChange24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {token.priceChange24h >= 0 ? '+' : ''}{token.priceChange24h.toFixed(2)}%
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Selected Token */}
              {selectedToken && (
                <div className="mb-6">
                  <Card className="p-4 bg-blue-50 border-blue-200">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">{selectedToken.name}</h3>
                        <p className="text-gray-600">{selectedToken.symbol}</p>
                        {selectedToken.address && (
                          <p className="text-xs text-gray-500 font-mono">
                            {selectedToken.address.slice(0, 6)}...{selectedToken.address.slice(-4)}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">${selectedToken.price.toFixed(6)}</div>
                        <div className={`text-sm ${selectedToken.priceChange24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {selectedToken.priceChange24h >= 0 ? '+' : ''}{selectedToken.priceChange24h.toFixed(2)}% (24h)
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div>
                        <span className="text-gray-600">Market Cap:</span>
                        <div className="font-medium">${selectedToken.marketCap.toLocaleString()}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Volume 24h:</span>
                        <div className="font-medium">${selectedToken.volume24h.toLocaleString()}</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Input
                        type="number"
                        placeholder="Montant à trader"
                        value={tradeAmount}
                        onChange={(e) => setTradeAmount(e.target.value)}
                        className="w-full"
                      />
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => handleTrade('buy')} 
                          className="flex-1 bg-green-600 hover:bg-green-700"
                          disabled={isLoading}
                        >
                          Acheter
                        </Button>
                        <Button 
                          onClick={() => handleTrade('sell')} 
                          variant="outline"
                          className="flex-1 border-red-600 text-red-600 hover:bg-red-50"
                          disabled={isLoading}
                        >
                          Vendre
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>
              )}

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                {popularCryptos.map((crypto, index) => (
                  <Card 
                    key={index} 
                    className="p-3 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => handleTokenSelect(crypto.id)}
                  >
                    <div className="text-center">
                      <div className="font-medium">{crypto.symbol}</div>
                      <div className="text-sm text-gray-600">{crypto.name}</div>
                      <div className="text-sm font-medium text-blue-600">Sélectionner</div>
                    </div>
                  </Card>
                ))}
              </div>
              
              {!selectedToken && (
                <div className="text-center py-8 border-2 border-dashed border-orangery-200 rounded-lg hover:border-orangery-300 transition-colors">
                  <TrendingUp className="w-12 h-12 text-orangery-400 mx-auto mb-4 animate-pulse" />
                  <p className="text-muted-foreground">
                    Sélectionnez une cryptomonnaie pour commencer à trader
                  </p>
                </div>
              )}
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="text-center">
              <h3 className="text-xl font-serif font-medium mb-4">Ready for Real Trading?</h3>
              <p className="text-muted-foreground mb-6">
                Take your skills to the next level with our trusted partners
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-orangery-500 hover:bg-orangery-600 text-white">
                  Start Real Trading
                </Button>
                <Button variant="outline" className="border-orangery-200 hover:bg-orangery-50">
                  Learn More
                </Button>
              </div>
              <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg inline-block">
                <p className="text-amber-800 text-sm">
                  ⚠️ Trading involves risk. Only trade what you can afford to lose.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default TradingSimulator;