import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { DollarSign, RotateCcw, Settings as SettingsIcon, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useCryptoApi } from '@/hooks/useCryptoApi';
import ApiSettings from './ApiSettings';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

interface SettingsProps {
  className?: string;
}

const Settings: React.FC<SettingsProps> = ({ className }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { apiConfig, updateApiConfig } = useCryptoApi();
  
  const [demoBalance, setDemoBalance] = useState(() => {
    const stored = localStorage.getItem('demoBalance');
    return stored ? parseFloat(stored) : 10000;
  });
  
  const [newBalance, setNewBalance] = useState(demoBalance.toString());
  const [isResetting, setIsResetting] = useState(false);

  const handleUpdateBalance = () => {
    const balance = parseFloat(newBalance);
    if (isNaN(balance) || balance < 0) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer un montant valide",
        variant: "destructive"
      });
      return;
    }
    
    setDemoBalance(balance);
    localStorage.setItem('demoBalance', balance.toString());
    
    toast({
      title: "Balance mise à jour",
      description: `Nouvelle balance de démonstration: $${balance.toLocaleString()}`
    });
  };

  const handleResetAccount = async () => {
    setIsResetting(true);
    
    try {
      // Reset demo balance
      const defaultBalance = 10000;
      setDemoBalance(defaultBalance);
      setNewBalance(defaultBalance.toString());
      localStorage.setItem('demoBalance', defaultBalance.toString());
      
      // Clear trading history
      localStorage.removeItem('tradingHistory');
      
      // If user is authenticated, reset their data in database
      if (user) {
        // Reset portfolio
        const { error: portfolioError } = await supabase
          .from('portfolio_holdings')
          .delete()
          .eq('user_id', user.id);
          
        if (portfolioError) {
          console.error('Error resetting portfolio:', portfolioError);
        }
        
        // Reset transaction history
        const { error: historyError } = await supabase
          .from('transaction_history')
          .delete()
          .eq('user_id', user.id);
          
        if (historyError) {
          console.error('Error resetting transaction history:', historyError);
        }
      }
      
      toast({
        title: "Compte réinitialisé",
        description: "Votre compte de démonstration a été remis à zéro avec succès"
      });
    } catch (error) {
      console.error('Error resetting account:', error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la réinitialisation",
        variant: "destructive"
      });
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <section className={className}>
      <div className="container mx-auto px-4 md:px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif mb-4 flex items-center justify-center gap-3">
              <SettingsIcon className="h-8 w-8" />
              Paramètres
            </h2>
            <p className="text-lg text-muted-foreground">
              Configurez votre expérience de trading et vos préférences API
            </p>
          </div>

          <div className="grid gap-8">
            {/* Demo Account Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Compte de Démonstration
                </CardTitle>
                <CardDescription>
                  Gérez votre balance virtuelle et réinitialisez votre progression
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="demo-balance">Balance actuelle: ${demoBalance.toLocaleString()}</Label>
                  <div className="flex gap-3">
                    <Input
                      id="demo-balance"
                      type="number"
                      placeholder="Nouveau montant"
                      value={newBalance}
                      onChange={(e) => setNewBalance(e.target.value)}
                      min="0"
                      step="100"
                    />
                    <Button onClick={handleUpdateBalance}>
                      Mettre à jour
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Définissez votre capital de démonstration pour le simulateur de trading
                  </p>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-amber-600">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="font-medium">Zone de danger</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Réinitialisez complètement votre compte pour recommencer à zéro
                  </p>
                  <Button 
                    variant="destructive" 
                    onClick={handleResetAccount}
                    disabled={isResetting}
                    className="w-full sm:w-auto"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    {isResetting ? 'Réinitialisation...' : 'Réinitialiser le compte'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* API Settings */}
            <ApiSettings 
              apiConfig={apiConfig}
              onConfigUpdate={updateApiConfig}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Settings;