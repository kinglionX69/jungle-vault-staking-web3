import React from 'react';
import { Button } from '@/components/ui/button';
interface WalletLockScreenProps {
  onConnect: () => void;
}
const WalletLockScreen = ({
  onConnect
}: WalletLockScreenProps) => {
  return <div className="min-h-screen bg-jungle-950 flex items-center justify-center px-6">
      <div className="jungle-card p-12 text-center max-w-md w-full">
        {/* Animated treasure chest/vault */}
        <div className="text-8xl mb-8 animate-float">
          🏛️
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-6 text-shadow">Jungle Vault : Emojicoin</h1>
        
        <p className="text-jungle-200 text-lg mb-8 leading-relaxed">
          Connect your wallet to enter the jungle vault and view your staking treasures
          <span className="block text-2xl mt-2">🌴</span>
        </p>
        
        <Button onClick={onConnect} className="neon-button text-xl px-8 py-6 w-full">
          🔗 Connect Wallet
        </Button>
        
        {/* Decorative jungle elements */}
        <div className="flex justify-center mt-8 text-3xl space-x-6 opacity-60">
          <span className="animate-float">🦜</span>
          <span className="animate-float" style={{
          animationDelay: '1s'
        }}>🐒</span>
          <span className="animate-float" style={{
          animationDelay: '2s'
        }}>🌿</span>
        </div>
      </div>
    </div>;
};
export default WalletLockScreen;