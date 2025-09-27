import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CreatorRewardProgress } from '@/types/creatorRewards';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, Clock, Lock } from 'lucide-react';

interface CreatorRewardsClaimingProps {
  poolId: string;
  poolName: string;
  creatorRewards: CreatorRewardProgress;
  onClaimRewards: (poolId: string, amount: number) => Promise<void>;
}

export const CreatorRewardsClaiming: React.FC<CreatorRewardsClaimingProps> = ({
  poolId,
  poolName,
  creatorRewards,
  onClaimRewards
}) => {
  const { toast } = useToast();

  // Calculate available to claim based on current utilization
  const calculateAvailableToClaim = () => {
    const achievedMilestones = creatorRewards.milestones.filter(m => 
      creatorRewards.currentUtilization >= m.percentage && !m.claimed
    );
    return achievedMilestones.reduce((sum, m) => sum + m.lionheartReward, 0);
  };

  const availableToClaim = calculateAvailableToClaim();
  const totalEarned = creatorRewards.milestones
    .filter(m => creatorRewards.currentUtilization >= m.percentage)
    .reduce((sum, m) => sum + m.lionheartReward, 0);

  const handleClaim = async () => {
    if (availableToClaim <= 0) return;

    try {
      await onClaimRewards(poolId, availableToClaim);
      toast({
        title: "Rewards Claimed",
        description: `Successfully claimed ${availableToClaim.toLocaleString()} LIONHEART tokens`,
      });
    } catch (error) {
      toast({
        title: "Claim Failed",
        description: "Failed to claim rewards. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getMilestoneStatus = (milestone: any) => {
    if (milestone.claimed) return { icon: CheckCircle, color: 'text-green-500', label: 'Claimed' };
    if (creatorRewards.currentUtilization >= milestone.percentage) return { icon: Clock, color: 'text-blue-500', label: 'Ready to Claim' };
    return { icon: Lock, color: 'text-gray-400', label: 'Locked' };
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Creator Rewards - {poolName}</span>
          <Badge variant="secondary">
            {creatorRewards.currentUtilization.toFixed(1)}% Utilization
          </Badge>
        </CardTitle>
        <CardDescription>
          Milestone-based LIONHEART rewards for pool creators
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Reward Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-primary">
              {creatorRewards.totalLionheartAllocated.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Total LIONHEART</div>
          </div>
          
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {totalEarned.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Earned</div>
          </div>
          
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-orange-600">
              {creatorRewards.claimedLionheart.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Already Claimed</div>
          </div>
          
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {availableToClaim.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Available to Claim</div>
          </div>
        </div>

        {/* Pool Utilization Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Pool Utilization</span>
            <span>{creatorRewards.currentUtilization.toFixed(1)}%</span>
          </div>
          <Progress value={creatorRewards.currentUtilization} className="h-3" />
          <div className="text-xs text-muted-foreground">
            {creatorRewards.currentStaked.toLocaleString()} / {creatorRewards.totalStakingCapacity.toLocaleString()} tokens staked
          </div>
        </div>

        {/* Claim Button */}
        {availableToClaim > 0 && (
          <Button 
            onClick={handleClaim} 
            className="w-full"
            size="lg"
          >
            Claim {availableToClaim.toLocaleString()} LIONHEART
          </Button>
        )}

        {/* Milestone Progress */}
        <div className="space-y-3">
          <h4 className="font-semibold">Milestone Progress</h4>
          <div className="space-y-2">
            {creatorRewards.milestones.map((milestone) => {
              const status = getMilestoneStatus(milestone);
              const StatusIcon = status.icon;
              
              return (
                <div 
                  key={milestone.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <StatusIcon className={`w-5 h-5 ${status.color}`} />
                    <div>
                      <div className="font-medium">{milestone.description}</div>
                      <div className="text-sm text-muted-foreground">
                        {milestone.utilizationThreshold.toLocaleString()} tokens required
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-semibold">
                      {milestone.lionheartReward.toLocaleString()} LIONHEART
                    </div>
                    <Badge 
                      variant={milestone.claimed ? "default" : (creatorRewards.currentUtilization >= milestone.percentage) ? "secondary" : "outline"}
                      className="text-xs"
                    >
                      {status.label}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Payout Schedule Preview */}
        <div className="p-4 bg-muted/50 rounded-lg">
          <h4 className="font-semibold mb-2">Payout Schedule</h4>
          <div className="text-sm text-muted-foreground space-y-1">
            <div>• Each milestone unlocks {(creatorRewards.totalLionheartAllocated / 5).toLocaleString()} LIONHEART</div>
            <div>• Rewards are earned progressively based on pool utilization</div>
            <div>• Total potential: {creatorRewards.totalLionheartAllocated.toLocaleString()} LIONHEART (10% of reward contribution)</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};