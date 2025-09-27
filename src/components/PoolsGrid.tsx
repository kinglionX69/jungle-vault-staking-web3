
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Pool } from '@/types/pool';
import { testnetContracts } from '@/services/aptosService';

interface PoolsGridProps {
  pools: Pool[];
  onStakeClick: (poolId: string) => void;
}

const PoolsGrid = ({ pools, onStakeClick }: PoolsGridProps) => {
  const getTierEmoji = (tier: Pool['tier']) => {
    switch (tier) {
      case 'Whale': return '🐋';
      case 'Dolphin': return '🐬';
      case 'Fish': return '🐠';
      default: return '🐠';
    }
  };

  const getHighestRewardsPercentage = (lockDurations: Pool['lockDurations']) => {
    return Math.max(...lockDurations.map(d => d.rewardsPercentage));
  };

  const getActiveMilestone = (milestones: Pool['milestones']) => {
    return milestones.find(m => !m.achieved) || milestones[milestones.length - 1];
  };

  const getRewardTypeDisplay = (pool: Pool) => {
    if (pool.rewardTokenType === 'APT') {
      return {
        text: 'APT',
        emoji: '🪙',
        badgeClass: 'bg-green-600 text-white'
      };
    } else {
      return {
        text: 'SAME TOKEN',
        emoji: pool.emoji.split('').find(char => char !== '🚀' && char !== '💯') || '🎯',
        badgeClass: 'bg-yellow-600 text-black'
      };
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-0">
      {pools.map((pool) => {
        const rewardDisplay = getRewardTypeDisplay(pool);
        const highestRewardsPercentage = getHighestRewardsPercentage(pool.lockDurations);
        const activeMilestone = getActiveMilestone(pool.milestones);
        
        return (
          <div
            key={pool.id}
            className="pixel-card p-4 sm:p-6 hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-accent/20 flex flex-col h-full relative"
          >
            {/* Featured Badge */}
            {pool.featured && (
              <div className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded-full">
                ⭐ Featured
              </div>
            )}

            {/* Pool Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-2xl sm:text-3xl animate-pixel-pulse">{pool.emoji}</span>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-foreground pixel-text text-pixel-glow">{pool.name}</h3>
                  <p className="text-muted-foreground text-xs sm:text-sm">Reward: {testnetContracts.lion.includes((pool.rewardToken.split("::")[2])) ? '🦁♥️' : '🚀💯'}</p> {/*TODO: fix this*/ }
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <div className="flex items-center gap-1">
                  <span className="text-base sm:text-lg">{getTierEmoji(pool.tier)}</span>
                  <span className="text-xs text-muted-foreground hidden sm:inline">{pool.tier}</span>
                </div>
                {pool.nftBoostsEnabled && (
                  <span className="text-xs text-purple-400">🚀 NFT Boosts</span>
                )}
              </div>
            </div>

            {/* Rewards % Display */}
            <div className="text-center mb-4">
              <div className={`text-3xl sm:text-4xl font-bold bg-gradient-to-r ${pool.gradient} bg-clip-text text-transparent mb-1`}>
                {pool.lockDurations.length > 1 ? `Up to ${highestRewardsPercentage}%` : `${highestRewardsPercentage}%`}
              </div>
              <p className="text-muted-foreground text-xs sm:text-sm">
                {pool.lockDurations.length > 1 ? 'Multiple durations available' : 'Rewards Percentage'}
              </p>
            </div>

            {/* Staking Capacity */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground text-sm">Pool Capacity</span>
                <span className="text-accent text-sm font-semibold">
                  {pool.stakingCapacity.utilizationRate.toFixed(1)}%
                </span>
              </div>
              <Progress value={pool.stakingCapacity.utilizationRate} className="h-2 mb-1" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{pool.stakingCapacity.currentStaked.toLocaleString()} staked</span>
                <span>{pool.stakingCapacity.maxStakeable.toLocaleString()} max</span>
              </div>
            </div>

            {/* Active Milestone */}
            {activeMilestone && (
              <div className="mb-4 p-3 bg-gradient-to-r from-purple-900/30 to-yellow-900/30 rounded-lg border border-purple-500/30">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-purple-300 text-sm font-medium">
                    {activeMilestone.achieved ? 'Completed' : 'Next Milestone'}
                  </span>
                  <span className="text-yellow-400 text-sm font-bold">
                    {activeMilestone.rewardAmount} tokens
                  </span>
                </div>
                <div className="text-xs text-jungle-300">
                  {activeMilestone.description} - {activeMilestone.thresholdPercentage}% capacity
                </div>
                {!activeMilestone.achieved && (
                  <div className="text-xs text-purple-400 mt-1">
                    First staker to reach gets the milestone reward!
                  </div>
                )}
              </div>
            )}

            {/* Reward Type Badge */}
            <div className="text-center mb-4">
              <Badge className={`${rewardDisplay.badgeClass} rounded-full px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium`}>
                <span className="mr-1">{rewardDisplay.emoji}</span>
                🎁 Rewards in: {rewardDisplay.text}
              </Badge>
            </div>

            {/* Pool Details */}
            <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 flex-grow">
              {/* <div className="flex justify-between items-center">
                <span className="text-jungle-300 text-sm">Lock Options:</span>
                <span className="text-white font-semibold text-sm">
                  {pool.lockDurations.length} duration{pool.lockDurations.length > 1 ? 's' : ''}
                </span>
              </div> */}
              
              <div className="flex justify-between items-center">
                <span className="text-jungle-300 text-sm">TVL:</span>
                <span className="text-white font-semibold text-sm">{pool.tvl}</span>
              </div>
              
              {/* TODO */}
              <div className="flex justify-between items-center">
                <span className="text-jungle-300 text-sm">Available:</span>
                <span className="text-green-400 font-semibold text-sm">
                  {pool.stakingCapacity.availableCapacity.toLocaleString()} APT
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-jungle-300 text-sm">Ends in:</span>
                <span className="text-yellow-400 font-semibold text-sm">{pool.endsIn}</span>
              </div>
            </div>

            {/* CTA Button - Always at the bottom */}
            <div className="mt-auto">
              <Button
                onClick={() => onStakeClick(pool.id)}
                variant="pixel-neon"
                className="w-full text-base sm:text-lg py-3 sm:py-4 hover:scale-105 transition-transform min-h-[48px]"
              >
                🏦 Stake Now
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PoolsGrid;
