import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { AdminPool } from '@/types/admin';
import { calculateCreatorLionheartAllocation, calculateEarnedLionheart } from '@/utils/poolEconomics';
import { useToast } from '@/hooks/use-toast';
import { ChevronDown, ChevronUp, TrendingUp, Users, DollarSign, Target, Coins } from 'lucide-react';

interface CreatorRewardsManagerProps {
  pools: AdminPool[];
  onDistributeRewards: (poolId: string, amount: number) => void;
  onAdjustMilestone: (poolId: string, milestoneId: string, newThreshold: number) => void;
}

export const CreatorRewardsManager: React.FC<CreatorRewardsManagerProps> = ({
  pools,
  onDistributeRewards,
  onAdjustMilestone
}) => {
  const { toast } = useToast();
  const [expandedPools, setExpandedPools] = useState<Set<string>>(new Set());

  // Calculate aggregated statistics based on existing AdminPool structure
  const pendingRewards = pools.reduce((sum, pool) => {
    return sum + pool.creatorRewards.pendingDistribution;
  }, 0);

  const totalDistributed = pools.reduce((sum, pool) => {
    return sum + pool.creatorRewards.totalLionheartDistributed;
  }, 0);

  const totalAllocated = pools.reduce((sum, pool) => {
    // Use existing reward budget from pool capacity
    const rewardBudget = pool.capacity.maxStakeable * 0.1; // Estimate 10% as rewards
    return sum + calculateCreatorLionheartAllocation(rewardBudget);
  }, 0);

  const avgUtilization = pools.reduce((sum, pool) => {
    return sum + pool.capacity.utilizationRate;
  }, 0) / pools.length;

  const handleDistributeAll = () => {
    if (pendingRewards > 0) {
      // In real implementation, this would trigger batch distribution
      toast({
        title: "Rewards Distributed",
        description: `Distributed ${pendingRewards.toLocaleString()} LIONHEART to ${pools.length} pool creators`,
      });
    }
  };

  const handleDistributePool = (poolId: string, amount: number) => {
    onDistributeRewards(poolId, amount);
    toast({
      title: "Pool Rewards Distributed",
      description: `Distributed ${amount.toLocaleString()} LIONHEART to pool creator`,
    });
  };

  const togglePoolExpansion = (poolId: string) => {
    const newExpanded = new Set(expandedPools);
    if (newExpanded.has(poolId)) {
      newExpanded.delete(poolId);
    } else {
      newExpanded.add(poolId);
    }
    setExpandedPools(newExpanded);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Coins className="w-6 h-6" />
            Creator Rewards Manager
          </CardTitle>
          <CardDescription>
            Milestone-based LIONHEART rewards for pool creators (10% of reward contribution)
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Rewards</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pendingRewards.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">LIONHEART ready to claim</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Distributed</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalDistributed.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">LIONHEART distributed</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Allocated</CardTitle>
                <Coins className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalAllocated.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">LIONHEART allocated</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Pool Utilization</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{avgUtilization.toFixed(1)}%</div>
                <p className="text-xs text-muted-foreground">Across all pools</p>
              </CardContent>
            </Card>
          </div>

          {/* Distribute All Button */}
          <div className="mb-6">
            <Button 
              onClick={handleDistributeAll}
              disabled={pendingRewards <= 0}
              size="lg"
              className="w-full md:w-auto"
            >
              Distribute All Pending Rewards ({pendingRewards.toLocaleString()} LIONHEART)
            </Button>
          </div>

          {/* Pool Details */}
          <div className="space-y-4">
            {pools.map((pool) => {
              const rewardBudget = pool.capacity.maxStakeable * 0.1;
              const totalAllocated = calculateCreatorLionheartAllocation(rewardBudget);
              const utilizationRate = pool.capacity.utilizationRate;
              const earned = calculateEarnedLionheart(utilizationRate, totalAllocated);
              const distributed = pool.creatorRewards.totalLionheartDistributed;
              const pendingForPool = pool.creatorRewards.pendingDistribution;
              const achievedMilestones = Math.floor(utilizationRate / 20);
              const milestoneProgress = Math.min(utilizationRate, 100);
              const isExpanded = expandedPools.has(pool.id);

              return (
                <Card key={pool.id} className="w-full">
                  <Collapsible open={isExpanded} onOpenChange={() => togglePoolExpansion(pool.id)}>
                    <CollapsibleTrigger asChild>
                      <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="text-2xl">{pool.emoji}</div>
                            <div>
                              <h3 className="font-semibold">{pool.name}</h3>
                              <p className="text-sm text-muted-foreground">Pool ID: {pool.id}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4">
                            <Badge variant="outline">
                              {utilizationRate.toFixed(1)}% Utilization
                            </Badge>
                            <div className="text-right">
                              <div className="text-lg font-semibold">{pendingForPool.toLocaleString()}</div>
                              <div className="text-sm text-muted-foreground">LIONHEART Pending</div>
                            </div>
                            <Button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDistributePool(pool.id, pendingForPool);
                              }}
                              disabled={pendingForPool <= 0}
                              size="sm"
                            >
                              Distribute
                            </Button>
                            {isExpanded ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </div>
                        </div>
                      </CardHeader>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <CardContent className="space-y-4">
                        {/* Creator Reward Details */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted/50 rounded-lg">
                          <div className="text-center">
                            <div className="text-lg font-semibold">{rewardBudget.toLocaleString()}</div>
                            <div className="text-xs text-muted-foreground">Estimated Rewards</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-semibold">{totalAllocated.toLocaleString()}</div>
                            <div className="text-xs text-muted-foreground">LIONHEART Allocated</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-semibold">{earned.toLocaleString()}</div>
                            <div className="text-xs text-muted-foreground">LIONHEART Earned</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-semibold">{distributed.toLocaleString()}</div>
                            <div className="text-xs text-muted-foreground">LIONHEART Distributed</div>
                          </div>
                        </div>

                        {/* Utilization Progress */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Pool Utilization</span>
                            <span>{utilizationRate.toFixed(1)}% ({achievedMilestones}/5 milestones)</span>
                          </div>
                          <Progress value={milestoneProgress} className="h-2" />
                          <div className="text-xs text-muted-foreground">
                            Next milestone at {((Math.floor(utilizationRate / 20) + 1) * 20)}% utilization
                          </div>
                        </div>

                        {/* Milestone Breakdown */}
                        <div className="space-y-2">
                          <h4 className="font-medium">Milestone Breakdown (20% increments)</h4>
                          <div className="grid grid-cols-5 gap-2">
                            {[20, 40, 60, 80, 100].map((threshold, index) => (
                              <div 
                                key={threshold}
                                className={`text-center p-2 rounded border ${
                                  utilizationRate >= threshold 
                                    ? 'bg-green-100 border-green-300 text-green-800 dark:bg-green-900 dark:border-green-700 dark:text-green-200' 
                                    : 'bg-gray-50 border-gray-200 text-gray-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400'
                                }`}
                              >
                                <div className="text-sm font-medium">{threshold}%</div>
                                <div className="text-xs">{(totalAllocated / 5).toLocaleString()} LIONHEART</div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Pool Statistics */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
                          <div className="text-center">
                            <div className="text-lg font-semibold">{pool.capacity.currentStaked.toLocaleString()}</div>
                            <div className="text-xs text-muted-foreground">Current Staked</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-semibold">{pool.capacity.maxStakeable.toLocaleString()}</div>
                            <div className="text-xs text-muted-foreground">Max Capacity</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-semibold">{pool.creatorRewards.activeCreators}</div>
                            <div className="text-xs text-muted-foreground">Active Creators</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-semibold">{pool.capacity.utilizationRate.toFixed(1)}%</div>
                            <div className="text-xs text-muted-foreground">Utilization</div>
                          </div>
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatorRewardsManager;