
import { useWallet } from './useWallet';
import { useToast } from './use-toast';
import { Button } from '@/components/ui/button';

export const useWalletGuard = () => {
  const { isConnected, connect } = useWallet();
  const { toast } = useToast();

  const requireWallet = (action: () => void, actionName: string = 'perform this action') => {
    if (!isConnected) {
      toast({
        title: "Wallet Required! 🔗",
        description: `Please connect your wallet to ${actionName}.`,
        variant: "destructive"
      });
      return false;
    }
    action();
    return true;
  };

  const promptWalletConnection = (actionName: string = 'continue') => {
    toast({
      title: "Connect Your Wallet",
      description: `Connect your wallet to ${actionName}.`,
      action: (
        <Button onClick={connect} variant="outline" size="sm">
          Connect Wallet
        </Button>
      )
    });
  };

  return {
    isConnected,
    requireWallet,
    promptWalletConnection,
    connect
  };
};
