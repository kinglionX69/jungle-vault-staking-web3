
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UserStake } from '@/types/dashboard';

interface MyStakesProps {
  stakes: UserStake[];
  onStakeAction: (poolId: string, action: 'claim' | 'unstake' | 'withdraw') => void;
}

const MyStakes = ({ stakes, onStakeAction }: MyStakesProps) => {
  const getStatusBadge = (status: UserStake['status']) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500 text-white">Active</Badge>;
      case 'ended':
        return <Badge className="bg-yellow-500 text-black">Ended</Badge>;
      case 'claimed':
        return <Badge className="bg-gray-500 text-white">Claimed</Badge>;
      default:
        return <Badge className="bg-gray-500 text-white">{status}</Badge>;
    }
  };

  const getRewardDisplay = (stake: UserStake) => {
    const rewardEmoji = stake.rewardTokenType === 'APT' ? '🪙' : stake.emoji.split('').find(char => char !== '🚀' && char !== '💯') || '🎯';
    return (
      <div className="flex items-center gap-1">
        <span>{rewardEmoji}</span>
        <span>{stake.rewards} {stake.rewardToken}</span>
      </div>
    );
  };

  const getActionButtons = (stake: UserStake) => {
    switch (stake.status) {
      case 'active':
        return (
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="warning"
              onClick={() => onStakeAction(stake.poolId, 'claim')}
            >
              Claim
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => onStakeAction(stake.poolId, 'unstake')}
            >
              Unstake
            </Button>
          </div>
        );
      case 'ended':
        return (
          <Button
            size="sm"
            variant="success"
            onClick={() => onStakeAction(stake.poolId, 'withdraw')}
          >
            Withdraw
          </Button>
        );
      case 'claimed':
        return (
          <span className="text-muted-foreground text-sm">Completed</span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="jungle-card p-4 sm:p-6 mb-8">
      <h2 className="text-responsive-xl font-bold text-foreground mb-6 flex items-center gap-2">
        <span>🏛️</span>
        My Stakes
      </h2>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 text-muted-foreground">Pool</th>
              <th className="text-left py-3 text-muted-foreground">Staked</th>
              <th className="text-left py-3 text-muted-foreground">Rewards</th>
              <th className="text-left py-3 text-muted-foreground">Rewards %</th>
              <th className="text-left py-3 text-muted-foreground">Status</th>
              <th className="text-left py-3 text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {stakes.map((stake) => (
              <tr key={stake.poolId} className="border-b border-border hover:bg-accent/5">
                <td className="py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{stake.emoji}</span>
                  <div>
                    <div className="text-foreground font-semibold">{stake.name}</div>
                    <div className="text-muted-foreground text-sm">{stake.lockDuration.name}</div>
                    <div className="text-muted-foreground text-xs">
                      {stake.stakingCapacity.utilizationRate}% capacity used
                    </div>
                  </div>
                  </div>
                </td>
                <td className="py-4 text-foreground font-semibold">
                  {stake.amountStaked} tokens
                </td>
                <td className="py-4">
                  {getRewardDisplay(stake)}
                </td>
                <td className="py-4">
                  <div className="text-green-400 font-semibold">{stake.lockDuration.rewardsPercentage}</div>
                  {stake.nftBoostActive && (
                    <div className="text-yellow-400 text-sm">+NFT: {stake.nftBoostAmount}</div>
                  )}
                  <div className="text-purple-400 text-sm">{stake.milestoneProgress.bonusEarned}</div>
                </td>
                <td className="py-4">
                  {getStatusBadge(stake.status)}
                  {stake.timeRemaining && (
                    <div className="text-jungle-400 text-sm mt-1">
                      {stake.timeRemaining} left
                    </div>
                  )}
                </td>
                <td className="py-4">
                  {getActionButtons(stake)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {stakes.map((stake) => (
          <div key={stake.poolId} className="jungle-card p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{stake.emoji}</span>
                <div>
                  <div className="text-white font-semibold">{stake.name}</div>
                  <div className="text-jungle-400 text-sm">{stake.lockDuration.name}</div>
                  <div className="text-jungle-500 text-xs">
                    {stake.stakingCapacity.utilizationRate}% capacity
                  </div>
                </div>
              </div>
              {getStatusBadge(stake.status)}
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-jungle-300 text-sm">Staked</div>
                <div className="text-white font-semibold">{stake.amountStaked} tokens</div>
              </div>
              <div>
                <div className="text-jungle-300 text-sm">Rewards</div>
                {getRewardDisplay(stake)}
              </div>
              <div>
                <div className="text-jungle-300 text-sm">Rewards %</div>
                <div className="text-green-400 font-semibold">{stake.lockDuration.rewardsPercentage}</div>
                {stake.nftBoostActive && (
                  <div className="text-yellow-400 text-xs">+NFT: {stake.nftBoostAmount}</div>
                )}
                <div className="text-purple-400 text-xs">{stake.milestoneProgress.bonusEarned}</div>
              </div>
              <div>
                <div className="text-jungle-300 text-sm">Time Left</div>
                <div className="text-jungle-400">{stake.timeRemaining || 'N/A'}</div>
              </div>
            </div>
            
            <div className="flex justify-end">
              {getActionButtons(stake)}
            </div>
          </div>
        ))}
      </div>

      {stakes.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🌱</div>
          <h3 className="text-xl font-bold text-jungle-300 mb-2">No stakes yet</h3>
          <p className="text-jungle-400">Start staking in pools to see your positions here</p>
        </div>
      )}
    </div>
  );
};

export default MyStakes;
