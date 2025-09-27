
import React from 'react';
import { UserSummary } from '@/types/dashboard';

interface RewardSummaryProps {
  summary: UserSummary;
}

const RewardSummary = ({ summary }: RewardSummaryProps) => {
  const getRoarScoreColor = (score: number) => {
    if (score >= 80) return 'from-yellow-400 to-orange-500';
    if (score >= 60) return 'from-green-400 to-blue-500';
    return 'from-blue-400 to-purple-500';
  };

  const getRoarScoreEmoji = (score: number) => {
    if (score >= 90) return '🦁👑';
    if (score >= 70) return '🦁🔥';
    return '🦁💪';
  };

  const isCreator = summary.creatorStats !== undefined;

  return (
    <div className="jungle-card p-6 mb-8">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <span>📊</span>
        Dashboard Summary
      </h2>
      
      <div className={`grid grid-cols-2 ${isCreator ? 'md:grid-cols-4' : 'md:grid-cols-4'} gap-4 mb-6`}>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-400 mb-1">
            {summary.totalStaked}
          </div>
          <div className="text-jungle-300 text-sm">Total Value Staked</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-400 mb-1">
            {summary.totalRewards}
          </div>
          <div className="text-jungle-300 text-sm">Total Rewards Earned</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-400 mb-1">
            {summary.activePools}
          </div>
          <div className="text-jungle-300 text-sm">Active Pools</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-400 mb-1">
            {summary.boostedPools}
          </div>
          <div className="text-jungle-300 text-sm">Boosted Pools</div>
        </div>
      </div>

      {/* Creator Stats Section */}
      {isCreator && summary.creatorStats && (
        <div className="mb-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span>👑</span>
            Creator Statistics
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center jungle-card p-4">
              <div className="text-2xl font-bold text-blue-400 mb-1">
                {summary.creatorStats.poolsCreated}
              </div>
              <div className="text-jungle-300 text-sm">Pools Created</div>
            </div>
            
            <div className="text-center jungle-card p-4">
              <div className="text-2xl font-bold text-green-400 mb-1">
                {summary.creatorStats.totalCapacityProvided}
              </div>
              <div className="text-jungle-300 text-sm">Total Capacity</div>
            </div>
            
            <div className="text-center jungle-card p-4">
              <div className="text-2xl font-bold text-yellow-400 mb-1">
                {summary.creatorStats.lionheartEarned}
              </div>
              <div className="text-jungle-300 text-sm">LIONHEART Earned</div>
            </div>
            
            <div className="text-center jungle-card p-4">
              <div className="text-2xl font-bold text-orange-400 mb-1">
                {summary.creatorStats.lionheartPotential}
              </div>
              <div className="text-jungle-300 text-sm">Potential Rewards</div>
            </div>
          </div>
        </div>
      )}
      
      {/* Roar Score */}
      <div className="text-center jungle-card p-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-2xl">{getRoarScoreEmoji(summary.roarScore)}</span>
          <span className="text-lg font-bold text-jungle-200">Roar Score</span>
        </div>
        <div className={`text-4xl font-bold bg-gradient-to-r ${getRoarScoreColor(summary.roarScore)} bg-clip-text text-transparent`}>
          {summary.roarScore}/100
        </div>
        <div className="text-jungle-400 text-sm mt-1">
          Based on staking activity & achievements
        </div>
      </div>
    </div>
  );
};

export default RewardSummary;
