import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, Clock, Zap } from 'lucide-react';
import { PoolAnalytics } from '@/data/mockCreatorDashboard';

interface PoolAnalyticsSectionProps {
  analytics: Record<string, PoolAnalytics>;
}

const PoolAnalyticsSection = ({ analytics }: PoolAnalyticsSectionProps) => {
  const poolEntries = Object.entries(analytics);

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white pixel-text text-pixel-glow">Pool Analytics</h3>
      
      {/* Analytics Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="jungle-card p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/20">
              <TrendingUp className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <div className="text-blue-400 font-bold text-lg">
                {poolEntries.reduce((sum, [_, analytics]) => sum + analytics.stakerCount, 0)}
              </div>
              <div className="text-jungle-300 text-sm">Total Stakers</div>
            </div>
          </div>
        </Card>

        <Card className="jungle-card p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-500/20">
              <Users className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <div className="text-green-400 font-bold text-lg">
                {(poolEntries.reduce((sum, [_, analytics]) => sum + analytics.stakerRetention, 0) / poolEntries.length).toFixed(1)}%
              </div>
              <div className="text-jungle-300 text-sm">Avg Retention</div>
            </div>
          </div>
        </Card>

        <Card className="jungle-card p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-yellow-500/20">
              <Clock className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <div className="text-yellow-400 font-bold text-lg">
                {Math.round(poolEntries.reduce((sum, [_, analytics]) => sum + analytics.avgStakeDuration, 0) / poolEntries.length)} days
              </div>
              <div className="text-jungle-300 text-sm">Avg Duration</div>
            </div>
          </div>
        </Card>

        <Card className="jungle-card p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-500/20">
              <Zap className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <div className="text-purple-400 font-bold text-lg">
                {(poolEntries.reduce((sum, [_, analytics]) => sum + analytics.nftBoostUsage, 0) / poolEntries.length).toFixed(0)}%
              </div>
              <div className="text-jungle-300 text-sm">NFT Boost Usage</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Individual Pool Analytics */}
      <div className="space-y-4">
        {poolEntries.map(([poolId, data]) => (
          <Card key={poolId} className="jungle-card p-6" id={`analytics-${poolId}`}>
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-lg font-bold text-white pixel-text">{poolId.toUpperCase()}</h4>
              <Badge variant="outline" className="border-green-400 text-green-400">
                {data.rewardsPercentage}% Rewards
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Staker Statistics */}
              <div>
                <div className="text-jungle-300 text-sm mb-2">Staker Statistics</div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-jungle-400 text-sm">Total:</span>
                    <span className="text-white font-semibold">{data.stakerCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-jungle-400 text-sm">New:</span>
                    <span className="text-green-400 font-semibold">+{data.newStakers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-jungle-400 text-sm">Returning:</span>
                    <span className="text-blue-400 font-semibold">{data.returningStakers}</span>
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div>
                <div className="text-jungle-300 text-sm mb-2">Performance</div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-jungle-400">Retention</span>
                      <span className="text-white">{data.stakerRetention}%</span>
                    </div>
                    <Progress value={data.stakerRetention} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-jungle-400">Milestones</span>
                      <span className="text-white">{data.milestoneAchievementRate}%</span>
                    </div>
                    <Progress value={data.milestoneAchievementRate} className="h-2" />
                  </div>
                </div>
              </div>

              {/* Volume Trends */}
              <div>
                <div className="text-jungle-300 text-sm mb-2">Weekly Volume</div>
                <div className="space-y-1">
                  {data.weeklyVolume.map((volume, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-jungle-400 text-sm">Week {index + 1}:</span>
                      <span className="text-white text-sm">{volume.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* NFT & Duration */}
              <div>
                <div className="text-jungle-300 text-sm mb-2">Additional Metrics</div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-jungle-400 text-sm">Avg Duration:</span>
                    <span className="text-white font-semibold">{data.avgStakeDuration}d</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-jungle-400 text-sm">NFT Usage:</span>
                    <span className="text-purple-400 font-semibold">{data.nftBoostUsage}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-jungle-400 text-sm">Today's Volume:</span>
                    <span className="text-green-400 font-semibold">{data.dailyVolume[data.dailyVolume.length - 1].toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PoolAnalyticsSection;