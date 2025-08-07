import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, TrendingUp, TrendingDown } from 'lucide-react';
import { useCryptoApi, CryptoPrice } from '@/hooks/useCryptoApi';
import { PortfolioHolding } from '@/hooks/useCryptoApi';
import { SupabasePortfolioHolding } from '@/hooks/useSupabasePortfolio';

interface AddCryptoDialogProps {
  onAddCrypto: (crypto: Omit<SupabasePortfolioHolding, 'id' | 'created_at' | 'updated_at'>) => void;
}

const AddCryptoDialog: React.FC<AddCryptoDialogProps> = ({ onAddCrypto }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoPrice | null>(null);
  const [searchResults, setSearchResults] = useState<CryptoPrice[]>([]);
  const [popularTokens, setPopularTokens] = useState<CryptoPrice[]>([]);
  const [activeBlockchain, setActiveBlockchain] = useState('ethereum');

  const { searchTokens, getPopularTokensByBlockchain, isLoading } = useCryptoApi();

  const blockchains = [
    { id: 'ethereum', name: 'Ethereum', color: 'bg-blue-500' },
    { id: 'solana', name: 'Solana', color: 'bg-purple-500' },
    { id: 'bsc', name: 'BSC', color: 'bg-yellow-500' },
    { id: 'base', name: 'Base', color: 'bg-blue-600' }
  ];

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      const results = await searchTokens(searchQuery);
      setSearchResults(results);
    }
  };

  const loadPopularTokens = async (blockchain: string) => {
    const tokens = await getPopularTokensByBlockchain(blockchain);
    setPopularTokens(tokens);
  };

  const handleBlockchainChange = (blockchain: string) => {
    setActiveBlockchain(blockchain);
    loadPopularTokens(blockchain);
  };

  const handleSelectCrypto = (crypto: CryptoPrice) => {
    setSelectedCrypto(crypto);
  };

  const handleAddToPortfolio = () => {
    if (selectedCrypto && amount) {
      onAddCrypto({
        symbol: selectedCrypto.symbol,
        name: selectedCrypto.name,
        amount: parseFloat(amount),
        price: selectedCrypto.price,
        value: parseFloat(amount) * selectedCrypto.price,
        change_percentage: selectedCrypto.priceChange24h,
        blockchain: selectedCrypto.blockchain || 'ethereum',
        token_address: selectedCrypto.address
      });
      setIsOpen(false);
      setSelectedCrypto(null);
      setAmount('');
      setSearchQuery('');
      setSearchResults([]);
    }
  };

  React.useEffect(() => {
    if (isOpen) {
      loadPopularTokens(activeBlockchain);
    }
  }, [isOpen, activeBlockchain]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-orangery-500 hover:bg-orangery-600 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Ajouter une crypto
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Ajouter une cryptomonnaie</DialogTitle>
        </DialogHeader>

        <Tabs value={activeBlockchain} onValueChange={handleBlockchainChange} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            {blockchains.map((blockchain) => (
              <TabsTrigger key={blockchain.id} value={blockchain.id} className="text-xs">
                <div className={`w-2 h-2 rounded-full ${blockchain.color} mr-1`} />
                {blockchain.name}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="mt-4">
            <div className="flex gap-2 mb-4">
              <Input
                placeholder="Rechercher une crypto..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Button onClick={handleSearch} disabled={isLoading}>
                <Search className="w-4 h-4" />
              </Button>
            </div>

            {searchResults.length > 0 && (
              <div className="mb-4">
                <h3 className="text-sm font-medium mb-2">Résultats de recherche</h3>
                <div className="grid gap-2 max-h-40 overflow-y-auto">
                  {searchResults.map((crypto) => (
                    <div
                      key={crypto.symbol}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedCrypto?.symbol === crypto.symbol 
                          ? 'border-orangery-500 bg-orangery-50' 
                          : 'border-border hover:bg-muted'
                      }`}
                      onClick={() => handleSelectCrypto(crypto)}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">{crypto.name}</div>
                          <div className="text-sm text-muted-foreground">{crypto.symbol}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">${crypto.price.toFixed(4)}</div>
                          <div className={`text-sm flex items-center gap-1 ${
                            crypto.priceChange24h >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {crypto.priceChange24h >= 0 ? (
                              <TrendingUp className="w-3 h-3" />
                            ) : (
                              <TrendingDown className="w-3 h-3" />
                            )}
                            {crypto.priceChange24h.toFixed(2)}%
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {blockchains.map((blockchain) => (
              <TabsContent key={blockchain.id} value={blockchain.id}>
                <div>
                  <h3 className="text-sm font-medium mb-2">Tokens populaires sur {blockchain.name}</h3>
                  <div className="grid gap-2 max-h-60 overflow-y-auto">
                    {popularTokens.map((crypto) => (
                      <div
                        key={crypto.symbol}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          selectedCrypto?.symbol === crypto.symbol 
                            ? 'border-orangery-500 bg-orangery-50' 
                            : 'border-border hover:bg-muted'
                        }`}
                        onClick={() => handleSelectCrypto(crypto)}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium">{crypto.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {crypto.symbol}
                              <Badge variant="outline" className="ml-2 text-xs">
                                {blockchain.name}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">${crypto.price.toFixed(4)}</div>
                            <div className={`text-sm flex items-center gap-1 ${
                              crypto.priceChange24h >= 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {crypto.priceChange24h >= 0 ? (
                                <TrendingUp className="w-3 h-3" />
                              ) : (
                                <TrendingDown className="w-3 h-3" />
                              )}
                              {crypto.priceChange24h.toFixed(2)}%
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            ))}
          </div>

          {selectedCrypto && (
            <div className="mt-4 p-4 border rounded-lg bg-muted/50">
              <h3 className="font-medium mb-2">Crypto sélectionnée</h3>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <div className="font-medium">{selectedCrypto.name}</div>
                  <div className="text-sm text-muted-foreground">{selectedCrypto.symbol}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">${selectedCrypto.price.toFixed(4)}</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="amount">Quantité à acheter</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.000001"
                  placeholder="0.0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                {amount && (
                  <p className="text-sm text-muted-foreground">
                    Valeur totale: ${(parseFloat(amount) * selectedCrypto.price).toFixed(2)}
                  </p>
                )}
              </div>

              <Button 
                onClick={handleAddToPortfolio}
                disabled={!amount || parseFloat(amount) <= 0}
                className="w-full mt-4 bg-orangery-500 hover:bg-orangery-600"
              >
                Ajouter au portfolio
              </Button>
            </div>
          )}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AddCryptoDialog;