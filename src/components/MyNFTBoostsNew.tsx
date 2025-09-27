import React from 'react';
import { Badge } from '@/components/ui/badge';
import { DashboardNFTBoost } from '@/types/dashboardNew';

interface MyNFTBoostsNewProps {
  nftBoosts: DashboardNFTBoost[];
}

const MyNFTBoostsNew = ({ nftBoosts }: MyNFTBoostsNewProps) => {
  return (
    <div className="pixel-card p-6 mb-8">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2 pixel-text text-pixel-glow">
        <span className="animate-pixel-pulse">🚀</span>
        MY NFT BOOSTS
      </h2>

      {nftBoosts.length > 0 ? (
        <div className="space-y-4">
          {nftBoosts.map((boost, index) => (
            <div key={index} className="pixel-card p-4 hover:scale-105 transition-transform">
              <div className="flex items-center gap-4">
                {/* NFT Image */}
                <div className="relative">
                  <img 
                    src={boost.imageUrl} 
                    alt={boost.nft}
                    className="w-16 h-16 rounded-lg object-cover border-2 border-jungle-400"
                    onError={(e) => {
                      e.currentTarget.src = '/proud-lion-logo.png';
                    }}
                  />
                  <span className="absolute -top-1 -right-1 text-lg animate-pixel-pulse">{boost.emoji}</span>
                </div>
                
                {/* NFT Info */}
                <div className="flex-1">
                  <div className="text-white font-semibold text-lg">{boost.nft}</div>
                  <div className="text-jungle-300 text-sm">
                    Boosting {boost.appliesTo} • {boost.lockDuration.name}
                  </div>
                  <div className="text-jungle-400 text-xs">
                    Staked: {boost.stakeAmount.toLocaleString()} tokens
                  </div>
                </div>
                
                {/* Boost Badge */}
                <div className="text-right">
                  <Badge className="bg-purple-500 text-white text-lg px-3 py-1">
                    {boost.boost} Boost
                  </Badge>
                  {boost.lockDuration.days > 0 && (
                    <div className="text-jungle-300 text-xs mt-1">
                      {boost.lockDuration.days} days
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="text-4xl mb-4 animate-pixel-pulse">🚀</div>
          <h3 className="text-lg font-bold text-jungle-300 mb-2 pixel-text">
            YOU'RE MISSING OUT ON EXTRA APR!
          </h3>
          <p className="text-jungle-400">
            Find NFT boosts in pool pages to supercharge your rewards
          </p>
        </div>
      )}
    </div>
  );
};

export default MyNFTBoostsNew;