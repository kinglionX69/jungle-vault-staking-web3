import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { AdminPool } from '@/types/admin';

interface PoolAnalyticsProps {
  pools: AdminPool[];
}

const PoolAnalytics = ({ pools }: PoolAnalyticsProps) => {
  const totalCapacity = pools.reduce((sum, pool) => sum + pool.capacity.maxStakeable, 0);
  const totalStaked = pools.reduce((sum, pool) => sum + pool.capacity.currentStaked, 0);
  const overallUtilization = (totalStaked / totalCapacity) * 100;

  const tierDistribution = pools.reduce((acc, pool) => {
    acc[pool.tier] = (acc[pool.tier] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const avgMilestoneCompletion = pools.reduce((sum, pool) => {
    const completedMilestones = pool.milestones.filter(m => m.completionRate > 0).length;
    return sum + (completedMilestones / pool.milestones.length) * 100;
  }, 0) / pools.length;

  const nftBoostStats = {
    enabled: pools.filter(p => p.nftBoostsEnabled).length,
    avgUsage: pools.filter(p => p.nftBoostsEnabled).reduce((sum, p) => sum + p.nftBoostUsage, 0) / pools.filter(p => p.nftBoostsEnabled).length || 0
  };

  return (
    <div className="space-y-6">
      <Card className="jungle-card">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-yellow-300 flex items-center gap-2">
            📈 Pool Analytics Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Overall Capacity Utilization */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-white">Overall Capacity</h3>
              <div className="text-3xl font-bold text-green-400">{overallUtilization.toFixed(1)}%</div>
              <Progress value={overallUtilization} className="h-2" />
              <div className="text-sm text-jungle-200">
                {totalStaked.toLocaleString()} / {totalCapacity.toLocaleString()} APT
              </div>
            </div>

            {/* Pool Tier Distribution */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-white">Pool Tiers</h3>
              {Object.entries(tierDistribution).map(([tier, count]) => (
                <div key={tier} className="flex justify-between items-center">
                  <span className="text-jungle-200">{tier}:</span>
                  <span className="text-white font-medium">{count}</span>
                </div>
              ))}
            </div>

            {/* Milestone Performance */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-white">Milestone Progress</h3>
              <div className="text-2xl font-bold text-yellow-400">{avgMilestoneCompletion.toFixed(1)}%</div>
              <Progress value={avgMilestoneCompletion} className="h-2" />
              <div className="text-sm text-jungle-200">Average completion</div>
            </div>

            {/* NFT Boost Analytics */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-white">NFT Boosts</h3>
              <div className="text-sm text-jungle-200">
                <div>Enabled: {nftBoostStats.enabled}/{pools.length} pools</div>
                <div>Avg Usage: {nftBoostStats.avgUsage.toFixed(1)}%</div>
              </div>
              <Progress value={nftBoostStats.avgUsage} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Individual Pool Performance */}
      <Card className="jungle-card">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-yellow-300">Individual Pool Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pools.map((pool) => (
              <div key={pool.id} className="border border-jungle-600/30 rounded-lg p-4 bg-jungle-800/30">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{pool.emoji}</span>
                    <span className="text-white font-medium">{pool.name}</span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      pool.tier === 'Whale' ? 'bg-purple-500/20 text-purple-300' :
                      pool.tier === 'Dolphin' ? 'bg-blue-500/20 text-blue-300' :
                      'bg-green-500/20 text-green-300'
                    }`}>
                      {pool.tier}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-jungle-200">Utilization</div>
                    <div className="text-lg font-bold text-white">{pool.capacity.utilizationRate}%</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm text-jungle-200 mb-1">Capacity Progress</div>
                    <Progress value={pool.capacity.utilizationRate} className="h-2 mb-1" />
                    <div className="text-xs text-jungle-200">
                      {pool.capacity.currentStaked.toLocaleString()} / {pool.capacity.maxStakeable.toLocaleString()} APT
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-jungle-200 mb-1">Milestones (10%, 40%, 80%)</div>
                    <div className="text-sm text-white">
                      {pool.milestones.filter(m => m.completionRate > 0).length} / 3 achieved
                    </div>
                    <div className="text-xs text-jungle-200 space-y-1">
                      {pool.milestones.map((milestone, idx) => {
                        const labels = ['🐦 Early Bird', '🏆 Halfway Hero', '🎯 Major'];
                        return (
                          <div key={milestone.id} className="flex justify-between">
                            <span>{labels[idx]}:</span>
                            <span className={milestone.completionRate > 0 ? 'text-green-400' : 'text-jungle-400'}>
                              {milestone.completionRate.toFixed(0)}%
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-jungle-200 mb-1">NFT Boosts</div>
                    <div className="text-sm text-white">
                      {pool.nftBoostsEnabled ? `${pool.nftBoostUsage}% usage` : 'Disabled'}
                    </div>
                    <div className="text-xs text-jungle-200">
                      {pool.lockDurations.length} lock durations
                    </div>
                  </div>
                </div>

                {pool.capacity.capacityAlerts.length > 0 && (
                  <div className="mt-3 p-2 bg-red-500/10 border border-red-500/30 rounded">
                    <div className="text-xs text-red-300">
                      ⚠️ {pool.capacity.capacityAlerts.join(', ')}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PoolAnalytics;