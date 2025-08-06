import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Settings, Key, ExternalLink } from 'lucide-react';
import { ApiConfig } from '@/hooks/useCryptoApi';

interface ApiSettingsProps {
  apiConfig: ApiConfig;
  onConfigUpdate: (config: Partial<ApiConfig>) => void;
  className?: string;
}

const ApiSettings: React.FC<ApiSettingsProps> = ({
  apiConfig,
  onConfigUpdate,
  className
}) => {
  const [coingeckoKey, setCoingeckoKey] = useState(apiConfig.coingeckoApiKey || '');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSaveKey = () => {
    onConfigUpdate({ coingeckoApiKey: coingeckoKey });
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Paramètres API
        </CardTitle>
        <CardDescription>
          Configurez vos clés API pour accéder aux données crypto en temps réel
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* DexScreener Settings */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">DexScreener API</Label>
              <p className="text-sm text-muted-foreground">
                API gratuite pour les prix des tokens via adresse
              </p>
            </div>
            <Switch
              checked={apiConfig.dexscreenerEnabled}
              onCheckedChange={(checked) => 
                onConfigUpdate({ dexscreenerEnabled: checked })
              }
            />
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <ExternalLink className="h-4 w-4" />
            <a 
              href="https://docs.dexscreener.com/api/reference" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary"
            >
              Documentation DexScreener
            </a>
          </div>
        </div>

        {/* CoinGecko Settings */}
        <div className="space-y-3">
          <div>
            <Label className="text-base font-medium">CoinGecko API</Label>
            <p className="text-sm text-muted-foreground">
              Clé API optionnelle pour des limites plus élevées
            </p>
          </div>
          
          <div className="space-y-3">
            <div className="flex gap-2">
              <Input
                type="password"
                placeholder="Entrez votre clé API CoinGecko (optionnel)"
                value={coingeckoKey}
                onChange={(e) => setCoingeckoKey(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleSaveKey} size="sm">
                <Key className="h-4 w-4 mr-2" />
                Sauvegarder
              </Button>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ExternalLink className="h-4 w-4" />
              <a 
                href="https://www.coingecko.com/en/api/pricing" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary"
              >
                Obtenir une clé API CoinGecko
              </a>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="pt-4 border-t">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">DexScreener</span>
              <span className={`text-sm ${apiConfig.dexscreenerEnabled ? 'text-green-600' : 'text-gray-400'}`}>
                {apiConfig.dexscreenerEnabled ? 'Activé' : 'Désactivé'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">CoinGecko</span>
              <span className={`text-sm ${apiConfig.coingeckoApiKey ? 'text-green-600' : 'text-yellow-600'}`}>
                {apiConfig.coingeckoApiKey ? 'Clé configurée' : 'Mode gratuit'}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApiSettings;