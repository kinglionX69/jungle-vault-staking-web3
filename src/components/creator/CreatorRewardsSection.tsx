import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Gift, Award, TrendingUp, Clock } from 'lucide-react';
import { DashboardCreatedPool } from '@/types/dashboardNew';
import { EnhancedCreatorStats } from '@/data/mockCreatorDashboard';

interface CreatorRewardsSectionProps {
  createdPools: DashboardCreatedPool[];
  creatorStats: EnhancedCreatorStats;
  onClaimRewards?: (poolId: string, milestoneId: number) => void;
}

const CreatorRewardsSection = ({ createdPools, creatorStats, onClaimRewards }: CreatorRewardsSectionProps) => {
  const getTotalClaimableRewards = () => {
    return createdPools.reduce((total, pool) => {
      const claimable = pool.milestones
        .filter(m => m.achieved)
        .reduce((sum, m) => sum + m.lionheartReward, 0);
      return total + claimable - pool.totalLionheartEarned;
    }, 0);
  };

  const getNextMilestoneReward = (pool: DashboardCreatedPool) => {
    const nextMilestone = pool.milestones.find(m => !m.achieved);
    return nextMilestone?.lionheartReward || 0;
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white pixel-text text-pixel-glow">Creator Rewards</h3>
      
      {/* Rewards Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="jungle-card p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-yellow-500/20">
              <Gift className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <div className="text-yellow-400 font-bold text-lg">
                {getTotalClaimableRewards().toLocaleString()}
              </div>
              <div className="text-jungle-300 text-sm">Claimable LIONHEART</div>
            </div>
          </div>
        </Card>

        <Card className="jungle-card p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-500/20">
              <Award className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <div className="text-green-400 font-bold text-lg">
                {creatorStats.lionheartEarned.toLocaleString()}
              </div>
              <div className="text-jungle-300 text-sm">Total Earned</div>
            </div>
          </div>
        </Card>

        <Card className="jungle-card p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/20">
              <TrendingUp className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <div className="text-blue-400 font-bold text-lg">
                {creatorStats.lionheartPotential.toLocaleString()}
              </div>
              <div className="text-jungle-300 text-sm">Potential Total</div>
            </div>
          </div>
        </Card>

        <Card className="jungle-card p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-500/20">
              <Clock className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <div className="text-purple-400 font-bold text-lg">
                {((creatorStats.lionheartEarned / creatorStats.lionheartPotential) * 100).toFixed(1)}%
              </div>
              <div className="text-jungle-300 text-sm">Progress</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Claim All Button */}
      {getTotalClaimableRewards() > 0 && (
        <Card className="jungle-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-lg font-bold text-white pixel-text">Ready to Claim</h4>
              <p className="text-jungle-300 text-sm">
                {getTotalClaimableRewards().toLocaleString()} LIONHEART available from milestone achievements
              </p>
            </div>
            <Button 
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold hover:from-yellow-500 hover:to-orange-600"
              onClick={() => {
                // Handle claim all logic
                console.log('Claiming all rewards');
              }}
            >
              Claim All Rewards
            </Button>
          </div>
        </Card>
      )}

      {/* Pool-specific Rewards */}
      <div className="space-y-4">
        <h4 className="text-lg font-bold text-white pixel-text">Pool Milestone Progress</h4>
        
        {createdPools.map((pool) => (
          <Card key={pool.poolId} className="jungle-card p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{pool.emoji}</span>
                <div>
                  <h5 className="text-white font-bold pixel-text">{pool.name}</h5>
                  <p className="text-jungle-300 text-sm">
                    Earned: {pool.totalLionheartEarned.toLocaleString()} LIONHEART
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-yellow-400 font-bold">
                  Next: {getNextMilestoneReward(pool).toLocaleString()} 🦁
                </div>
                <div className="text-jungle-400 text-sm">
                  {pool.utilizationRate}% capacity
                </div>
              </div>
            </div>

            {/* Capacity Progress */}
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-jungle-300">Pool Utilization</span>
                <span className="text-white">{pool.utilizationRate}% filled</span>
              </div>
              <Progress value={pool.utilizationRate} className="h-3" />
              <div className="text-jungle-400 text-xs mt-1">
                {pool.currentStaked.toLocaleString()} / {pool.maxCapacity.toLocaleString()} capacity
              </div>
            </div>

            {/* Milestone Cards */}
            <div className="grid grid-cols-5 gap-3">
              {pool.milestones.map((milestone, index) => (
                <div key={index} className={`text-center p-3 rounded-lg border ${
                  milestone.achieved 
                    ? 'bg-green-500/20 border-green-400 text-green-400' 
                    : pool.utilizationRate >= milestone.percentage
                    ? 'bg-yellow-500/20 border-yellow-400 text-yellow-400'
                    : 'bg-jungle-800 border-jungle-600 text-jungle-400'
                }`}>
                  <div className="text-sm font-bold mb-1">{milestone.percentage}%</div>
                  <div className="text-xs mb-2">{milestone.lionheartReward} 🦁</div>
                  
                  {milestone.achieved ? (
                    <Badge variant="outline" className="text-xs border-green-400 text-green-400">
                      ✓ Achieved
                    </Badge>
                  ) : pool.utilizationRate >= milestone.percentage ? (
                    <Button 
                      size="sm" 
                      className="w-full text-xs bg-yellow-500 text-black hover:bg-yellow-600"
                      onClick={() => onClaimRewards?.(pool.poolId, index)}
                    >
                      Claim
                    </Button>
                  ) : (
                    <Badge variant="outline" className="text-xs border-jungle-600 text-jungle-400">
                      Pending
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CreatorRewardsSection;