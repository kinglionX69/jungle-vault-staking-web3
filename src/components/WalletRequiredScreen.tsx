
import React from 'react';
import { Button } from '@/components/ui/button';

interface WalletRequiredScreenProps {
  title?: string;
  description?: string;
  actionText?: string;
}

const WalletRequiredScreen = ({ 
  title = "Wallet Connection Required",
  description = "Please connect your wallet to access this feature",
  actionText = "to continue"
}: WalletRequiredScreenProps) => {
  const { connect } = useWallet();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="jungle-card p-12 text-center max-w-md mx-auto">
        <div className="text-6xl mb-6">🔗</div>
        <h2 className="text-3xl font-bold text-shadow-glow mb-4">
          {title}
        </h2>
        <p className="text-jungle-200 text-lg mb-8">
          {description} {actionText}.
        </p>
        
        <Button
          onClick={connect}
          className="neon-button text-lg px-8 py-4"
        >
          🔗 Connect Wallet
        </Button>
        
        <div className="mt-8 text-jungle-400 text-sm">
          <p>Secure • Fast • Decentralized</p>
        </div>
      </div>

      {/* Background jungle decoration */}
      <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-jungle-900/30 to-transparent pointer-events-none">
        <div className="flex justify-center items-end h-full text-3xl space-x-12 opacity-20">
          <span className="animate-float">🔐</span>
          <span className="animate-float" style={{ animationDelay: '1s' }}>🌿</span>
          <span className="animate-float" style={{ animationDelay: '2s' }}>🔗</span>
          <span className="animate-float" style={{ animationDelay: '3s' }}>🏛️</span>
        </div>
      </div>
    </div>
  );
};

export default WalletRequiredScreen;
