import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DashboardStake } from '@/types/dashboardNew';

interface MyStakesNewProps {
  stakes: DashboardStake[];
  onStakeAction: (stakeId: string, action: 'claim' | 'unstake' | 'withdraw' | 'claim_and_unstake') => void;
}

const MyStakesNew = ({ stakes, onStakeAction }: MyStakesNewProps) => {
  const getStatusBadge = (status: DashboardStake['status']) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500 text-white">Active</Badge>;
      case 'ended':
        return <Badge className="bg-orange-500 text-white">Ended</Badge>;
      case 'claimed':
        return <Badge className="bg-gray-500 text-white">Claimed</Badge>;
      default:
        return <Badge className="bg-gray-400 text-white">Unknown</Badge>;
    }
  };

  const getRewardDisplay = (stake: DashboardStake) => (
    <div className="text-right">
      <div className="text-yellow-400 font-semibold">
        {stake.finalReward.toFixed(2)} {stake.poolEmoji}
      </div>
      {stake.nftBoostActive && (
        <div className="text-xs text-purple-400">
          +{stake.nftBoostPercentage}% NFT Boost
        </div>
      )}
      {stake.milestoneRewards > 0 && (
        <div className="text-xs text-green-400">
          +{stake.milestoneRewards.toFixed(2)} Milestone
        </div>
      )}
    </div>
  );

  const getActionButtons = (stake: DashboardStake) => {
    if (stake.status === 'active') {
      return (
        <div className="flex gap-2 flex-col sm:flex-row">
          <Button
            size="sm"
            onClick={() => onStakeAction(stake.stakeId, 'claim')}
            variant="pixel-neon"
          >
            Claim
          </Button>
          <Button
            size="sm"
            variant="pixel"
            onClick={() => onStakeAction(stake.stakeId, 'unstake')}
            disabled
            className="opacity-50 cursor-not-allowed"
            title="Pool must end before unstaking"
          >
            Unstake
          </Button>
        </div>
      );
    } else if (stake.status === 'ended') {
      return (
        <Button
          size="sm"
          onClick={() => onStakeAction(stake.stakeId, 'claim_and_unstake')}
          variant="pixel-retro"
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
        >
          Claim & Unstake
        </Button>
      );
    }
    return <span className="text-jungle-400 text-sm">No actions</span>;
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 0,
    }).format(num);
  };

  return (
    <div className="pixel-card p-6 mb-8">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2 pixel-text text-pixel-glow">
        <span className="animate-pixel-pulse">🎯</span>
        MY STAKES
      </h2>

      {stakes.length > 0 ? (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-jungle-600/30">
                  <th className="text-left py-3 text-jungle-300">Pool</th>
                  <th className="text-left py-3 text-jungle-300">Staked</th>
                  <th className="text-left py-3 text-jungle-300">Rewards</th>
                  <th className="text-left py-3 text-jungle-300">Status</th>
                  <th className="text-left py-3 text-jungle-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {stakes.map((stake) => (
                  <tr key={stake.stakeId} className="border-b border-jungle-600/20 hover:bg-accent/5">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl animate-pixel-pulse">{stake.poolEmoji}</span>
                        <div>
                          <div className="text-white font-semibold">{stake.poolName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="text-white font-semibold">
                        {formatNumber(stake.amount)} tokens
                      </div>
                    </td>
                    <td className="py-4">
                      {getRewardDisplay(stake)}
                    </td>
                    <td className="py-4">
                      {getStatusBadge(stake.status)}
                    </td>
                    <td className="py-4">
                      {getActionButtons(stake)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {stakes.map((stake) => (
              <div key={stake.stakeId} className="pixel-card p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl animate-pixel-pulse">{stake.poolEmoji}</span>
                    <div>
                      <div className="text-white font-semibold">{stake.poolName}</div>
                    </div>
                  </div>
                  {getStatusBadge(stake.status)}
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-jungle-300 text-sm">Staked</div>
                    <div className="text-white font-semibold">
                      {formatNumber(stake.amount)} tokens
                    </div>
                  </div>
                  <div>
                    <div className="text-jungle-300 text-sm">Rewards</div>
                    {getRewardDisplay(stake)}
                  </div>
                </div>
                
                <div className="pt-3 border-t border-jungle-600/20">
                  {getActionButtons(stake)}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-8">
          <div className="text-4xl mb-4 animate-pixel-pulse">🌿</div>
          <h3 className="text-lg font-bold text-jungle-300 mb-2 pixel-text">
            NO STAKES YET
          </h3>
          <p className="text-jungle-400">
            Visit the pools page to start staking and earning rewards
          </p>
        </div>
      )}
    </div>
  );
};

export default MyStakesNew;