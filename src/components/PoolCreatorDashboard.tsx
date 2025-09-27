import React from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CreatedPool } from '@/types/dashboard';

interface PoolCreatorDashboardProps {
  createdPools: CreatedPool[];
  creatorStats: {
    poolsCreated: number;
    totalCapacityProvided: string;
    lionheartEarned: string;
    lionheartPotential: string;
  };
}

const PoolCreatorDashboard = ({ createdPools, creatorStats }: PoolCreatorDashboardProps) => {
  const getMilestoneProgress = (pool: CreatedPool) => {
    const achievedMilestones = pool.milestones.filter(m => m.achieved).length;
    return (achievedMilestones / pool.milestones.length) * 100;
  };

  return (
    <div className="jungle-card p-6 mb-8">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <span>👑</span>
        Pool Creator Dashboard
      </h2>

      {/* Creator Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="text-center jungle-card p-4">
          <div className="text-2xl font-bold text-blue-400 mb-1">
            {creatorStats.poolsCreated}
          </div>
          <div className="text-jungle-300 text-sm">Pools Created</div>
        </div>
        
        <div className="text-center jungle-card p-4">
          <div className="text-2xl font-bold text-green-400 mb-1">
            {creatorStats.totalCapacityProvided}
          </div>
          <div className="text-jungle-300 text-sm">Total Capacity</div>
        </div>
        
        <div className="text-center jungle-card p-4">
          <div className="text-2xl font-bold text-yellow-400 mb-1">
            {creatorStats.lionheartEarned}
          </div>
          <div className="text-jungle-300 text-sm">LIONHEART Earned</div>
        </div>
        
        <div className="text-center jungle-card p-4">
          <div className="text-2xl font-bold text-orange-400 mb-1">
            {creatorStats.lionheartPotential}
          </div>
          <div className="text-jungle-300 text-sm">Potential Rewards</div>
        </div>
      </div>

      {/* Created Pools */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white mb-4">Your Created Pools</h3>
        
        {createdPools.map((pool) => (
          <div key={pool.poolId} className="jungle-card p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{pool.emoji}</span>
                <div>
                  <div className="text-white font-semibold">{pool.name}</div>
                  <div className="text-jungle-300 text-sm">TVL: {pool.tvl}</div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-yellow-400 font-semibold">
                  {pool.totalLionheartEarned} LIONHEART
                </div>
                <div className="text-jungle-400 text-sm">
                  {pool.activeDuration} active
                </div>
              </div>
            </div>

            {/* Capacity Progress */}
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-jungle-300">Staking Capacity</span>
                <span className="text-white">{pool.stakingCapacity.utilizationRate}% filled</span>
              </div>
              <Progress value={pool.stakingCapacity.utilizationRate} className="h-2" />
              <div className="text-jungle-400 text-xs mt-1">
                {pool.stakingCapacity.currentStaked.toLocaleString()} / {pool.stakingCapacity.maxStakeable.toLocaleString()} APT
              </div>
            </div>

            {/* Milestone Progress */}
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-jungle-300">Creator Milestones</span>
                <span className="text-white">{getMilestoneProgress(pool).toFixed(0)}% complete</span>
              </div>
              <Progress value={getMilestoneProgress(pool)} className="h-2" />
              
              <div className="flex gap-2 mt-3">
                {pool.milestones.map((milestone, index) => (
                  <div key={index} className={`flex-1 text-center p-2 rounded ${
                    milestone.achieved ? 'bg-green-500/20 text-green-400' : 'bg-jungle-800 text-jungle-400'
                  }`}>
                    <div className="text-xs font-semibold">
                      {milestone.percentage === 10 ? 'Early Bird' : 
                       milestone.percentage === 40 ? 'Halfway Hero' : 
                       'Major Milestone'}
                    </div>
                    <div className="text-xs">{milestone.percentage}%</div>
                    <div className="text-xs">{milestone.lionheartReward} 🦁</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white">
                Manage Pool
              </Button>
              <Button size="sm" variant="outline" className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white">
                View Analytics
              </Button>
            </div>
          </div>
        ))}
      </div>

      {createdPools.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🏗️</div>
          <h3 className="text-xl font-bold text-jungle-300 mb-2">No pools created yet</h3>
          <p className="text-jungle-400 mb-4">Create your first emojicoin pool to start earning LIONHEART rewards</p>
          <Button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold">
            Create New Pool
          </Button>
        </div>
      )}
    </div>
  );
};

export default PoolCreatorDashboard;