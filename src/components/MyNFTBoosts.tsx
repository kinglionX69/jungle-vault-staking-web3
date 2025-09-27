
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { NFTBoost } from '@/types/dashboard';

interface MyNFTBoostsProps {
  nftBoosts: NFTBoost[];
}

const MyNFTBoosts = ({ nftBoosts }: MyNFTBoostsProps) => {
  return (
    <div className="jungle-card p-6 mb-8">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <span>🎯</span>
        My NFT Boosts
      </h2>

      {nftBoosts.length > 0 ? (
        <div className="space-y-4">
          {nftBoosts.map((boost, index) => (
            <div key={index} className="jungle-card p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{boost.emoji}</span>
                <div>
                  <div className="text-white font-semibold">{boost.nft}</div>
                  <div className="text-jungle-300 text-sm">
                    Boosting {boost.appliesTo}
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <Badge className="bg-purple-500 text-white text-lg px-3 py-1">
                  {boost.boost} Boost
                </Badge>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="text-4xl mb-4">🌿</div>
          <h3 className="text-lg font-bold text-jungle-300 mb-2">
            You're missing out on extra APR!
          </h3>
          <p className="text-jungle-400">
            Find NFT boosts in pool pages to supercharge your rewards
          </p>
        </div>
      )}
    </div>
  );
};

export default MyNFTBoosts;
