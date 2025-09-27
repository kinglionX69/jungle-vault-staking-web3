import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { Pool } from '@/types/pool';
import { useWeightedStaking } from '@/contexts/WeightedStakingContext';
import { 
  WeightedPool, 
  NFTBoostConfig 
} from '@/types/weightedStaking';
import { 
  calculateBaseReward,
  calculateNFTBonus
} from '@/utils/simplifiedStakingCalculator';

interface SimplifiedStakingModalProps {
  isOpen: boolean;
  onClose: () => void;
  pool: Pool | null;
  onStakeSuccess: (poolId: string, amount: number, txHash: string) => void;
}

export const SimplifiedStakingModal: React.FC<SimplifiedStakingModalProps> = ({
  isOpen,
  onClose,
  pool,
  onStakeSuccess
}) => {
  const [amount, setAmount] = useState('');
  const [nftBoostActive, setNftBoostActive] = useState(false);
  const [selectedNftBoost, setSelectedNftBoost] = useState<NFTBoostConfig | null>(null);
  const [isStaking, setIsStaking] = useState(false);
  const [estimatedRewards, setEstimatedRewards] = useState({
    baseReward: 0,
    nftBonus: 0,
    totalReward: 0,
    rewardPerToken: 0
  });

  const { addStake } = useWeightedStaking();
  const { toast } = useToast();

  // Mock weighted pool data based on regular pool
  const weightedPool: WeightedPool | null = pool ? {
    id: pool.id,
    name: pool.name,
    emoji: pool.emoji,
    config: {
      maxTotalStake: pool.stakingCapacity.maxStakeable,
      totalRewardBudget: 10000, // Mock total budget
      milestoneRewardBudget: 1500, // 15% for milestones
      baseRewardPool: 8500 // 85% for base rewards
    },
    milestones: pool.milestones.map(m => ({
      id: m.id,
      thresholdPercentage: m.thresholdPercentage,
      thresholdAmount: Math.floor((m.thresholdPercentage / 100) * pool.stakingCapacity.maxStakeable),
      rewardAmount: m.rewardAmount,
      claimed: m.achieved,
      claimedBy: m.achieved ? 'user-xyz' : undefined,
      claimedAt: m.achieved ? new Date() : undefined
    })),
    nftBoosts: pool.nftBoostsEnabled ? [
      { collectionAddress: '0x123...', boostPercentage: 10, enabled: true, name: 'Aptos Apes' },
      { collectionAddress: '0x456...', boostPercentage: 15, enabled: true, name: 'Bruh Bears' }
    ] : [],
    stakes: [],
    state: {
      totalStaked: pool.stakingCapacity.currentStaked,
      rewardPerToken: 0.00581, // Mock value - simplified
      milestonesClaimed: pool.milestones.filter(m => m.achieved).map(m => m.id),
      stakesReachingMilestones: {},
      utilizationPercentage: pool.stakingCapacity.utilizationRate
    },
    createdAt: new Date()
  } : null;

  const mockBalance = 100000; // Mock user balance
  const selectedDuration = pool?.lockDurations?.[0]; // Pool has fixed duration

  useEffect(() => {
    if (weightedPool && amount) {
      const stakeAmount = parseFloat(amount);
      const baseReward = calculateBaseReward(stakeAmount, weightedPool.state.rewardPerToken);
      
      const nftBoostPercentage = nftBoostActive && selectedNftBoost ? selectedNftBoost.boostPercentage : 0;
      const nftBonus = calculateNFTBonus(baseReward, nftBoostPercentage);
      
      setEstimatedRewards({
        baseReward,
        nftBonus,
        totalReward: baseReward + nftBonus,
        rewardPerToken: weightedPool.state.rewardPerToken
      });
    }
  }, [amount, nftBoostActive, selectedNftBoost, weightedPool]);

  const handleStake = async () => {
    if (!weightedPool || !amount || !selectedDuration) return;

    const stakeAmount = parseFloat(amount);
    if (stakeAmount <= 0 || stakeAmount > mockBalance) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid staking amount.",
        variant: "destructive"
      });
      return;
    }

    setIsStaking(true);

    try {
      // Simulate transaction delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      const nftBoostPercentage = nftBoostActive && selectedNftBoost ? selectedNftBoost.boostPercentage : 0;
      const txHash = `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 6)}`;

      const result = await addStake(
        weightedPool.id,
        stakeAmount,
        selectedDuration.days,
        nftBoostActive,
        nftBoostPercentage,
        txHash
      );

      if (result.success) {
        toast({
          title: "Staking Successful! 🎉",
          description: `Successfully staked ${stakeAmount} tokens for ${selectedDuration.name}${nftBoostActive ? ` with ${nftBoostPercentage}% NFT boost` : ''}!`
        });
        
        onStakeSuccess(weightedPool.id, stakeAmount, txHash);
        onClose();
      } else {
        toast({
          title: "Staking Failed",
          description: result.error || "Unknown error occurred",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Staking Failed",
        description: "Transaction failed. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsStaking(false);
    }
  };

  const setPercentage = (percentage: number) => {
    const value = (mockBalance * percentage / 100).toString();
    setAmount(value);
  };

  if (!pool || !weightedPool || !selectedDuration) return null;

  const availableCapacity = weightedPool.config.maxTotalStake - weightedPool.state.totalStaked;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="text-2xl">{pool.emoji}</span>
            Stake in {pool.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Pool Info */}
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Lock Duration:</span>
                  <div className="font-medium">{selectedDuration.name}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Rewards %:</span>
                  <div className="font-medium">{selectedDuration.rewardsPercentage}%</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Total Capacity:</span>
                  <div className="font-medium">{weightedPool.config.maxTotalStake.toLocaleString()} tokens</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Available:</span>
                  <div className="font-medium">{availableCapacity.toLocaleString()} tokens</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Utilization:</span>
                  <div className="font-medium">{weightedPool.state.utilizationPercentage.toFixed(1)}%</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Reward per Token:</span>
                  <div className="font-medium">${weightedPool.state.rewardPerToken.toFixed(6)}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* NFT Boost */}
          {weightedPool.nftBoosts.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={nftBoostActive}
                  onCheckedChange={setNftBoostActive}
                />
                <Label>Enable NFT Boost</Label>
              </div>

              {nftBoostActive && (
                <Select 
                  value={selectedNftBoost?.collectionAddress || ""} 
                  onValueChange={(value) => {
                    const boost = weightedPool.nftBoosts.find(b => b.collectionAddress === value);
                    setSelectedNftBoost(boost || null);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select NFT collection" />
                  </SelectTrigger>
                  <SelectContent>
                    {weightedPool.nftBoosts.map((boost) => (
                      <SelectItem key={boost.collectionAddress} value={boost.collectionAddress}>
                        <div className="flex items-center justify-between w-full">
                          <span>{boost.name}</span>
                          <Badge variant="secondary" className="ml-2">
                            +{boost.boostPercentage}%
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          )}

          {/* Amount Input */}
          <div className="space-y-3">
            <Label>Stake Amount</Label>
            <div className="space-y-3">
              <Input
                type="number"
                placeholder="Enter amount to stake"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="text-lg"
              />
              
              <div className="flex gap-2">
                {[25, 50, 75, 100].map((percentage) => (
                  <Button
                    key={percentage}
                    variant="outline"
                    size="sm"
                    onClick={() => setPercentage(percentage)}
                    className="flex-1"
                  >
                    {percentage}%
                  </Button>
                ))}
              </div>

              <div className="text-sm text-muted-foreground">
                Available Balance: {mockBalance.toLocaleString()} tokens
              </div>
            </div>
          </div>

          {/* Estimated Rewards */}
          {amount && (
            <Card className="bg-gradient-to-r from-primary/5 to-secondary/5">
              <CardContent className="p-4">
                <h4 className="font-medium mb-3">Estimated Rewards (Equal Distribution)</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Stake Amount:</span>
                    <span className="font-medium">{parseFloat(amount).toFixed(2)} tokens</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Base Reward:</span>
                    <span className="font-medium">${estimatedRewards.baseReward.toFixed(2)}</span>
                  </div>
                  {nftBoostActive && selectedNftBoost && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">NFT Bonus (+{selectedNftBoost.boostPercentage}%):</span>
                      <span className="font-medium text-green-600">+${estimatedRewards.nftBonus.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-medium">
                      <span>Total Estimated Reward:</span>
                      <span className="text-primary">${estimatedRewards.totalReward.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isStaking}
            >
              Cancel
            </Button>
            <Button
              onClick={handleStake}
              className="flex-1"
              disabled={!amount || isStaking}
            >
              {isStaking ? 'Staking...' : `Stake ${amount || '0'} Tokens`}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};