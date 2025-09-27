import React from 'react';
import { DashboardSummary } from '@/types/dashboardNew';

interface RewardSummaryNewProps {
  summary: DashboardSummary;
}

const RewardSummaryNew = ({ summary }: RewardSummaryNewProps) => {
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

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 0,
    }).format(num);
  };

  return (
    <div className="pixel-card p-6 mb-8">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2 pixel-text text-pixel-glow">
        <span className="animate-pixel-pulse">📊</span>
        DASHBOARD SUMMARY
      </h2>
      
      <div className={`grid grid-cols-2 ${isCreator ? 'md:grid-cols-4' : 'md:grid-cols-4'} gap-4 mb-6`}>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-400 mb-1">
            {formatNumber(summary.totalStaked)}
          </div>
          <div className="text-jungle-300 text-sm">Total Value Staked</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-400 mb-1">
            {formatNumber(summary.totalRewards)}
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
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 pixel-text text-pixel-glow">
            <span className="animate-pixel-pulse">👑</span>
            CREATOR STATISTICS
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center pixel-card p-4">
              <div className="text-2xl font-bold text-blue-400 mb-1">
                {summary.creatorStats.poolsCreated}
              </div>
              <div className="text-jungle-300 text-sm">Pools Created</div>
            </div>
            
            <div className="text-center pixel-card p-4">
              <div className="text-2xl font-bold text-green-400 mb-1">
                {formatNumber(summary.creatorStats.totalCapacityProvided)}
              </div>
              <div className="text-jungle-300 text-sm">Total Capacity</div>
            </div>
            
            <div className="text-center pixel-card p-4">
              <div className="text-2xl font-bold text-yellow-400 mb-1">
                {formatNumber(summary.creatorStats.lionheartEarned)}
              </div>
              <div className="text-jungle-300 text-sm">LIONHEART Earned</div>
            </div>
            
            <div className="text-center pixel-card p-4">
              <div className="text-2xl font-bold text-orange-400 mb-1">
                {formatNumber(summary.creatorStats.lionheartPotential)}
              </div>
              <div className="text-jungle-300 text-sm">Potential Rewards</div>
            </div>
          </div>
        </div>
      )}
      
      {/* Roar Score */}
      <div className="text-center pixel-card p-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-2xl animate-pixel-pulse">{getRoarScoreEmoji(summary.roarScore)}</span>
          <span className="text-lg font-bold text-jungle-200 pixel-text">ROAR SCORE</span>
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

export default RewardSummaryNew;