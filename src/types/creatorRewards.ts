export interface CreatorRewardMilestone {
  id: string;
  percentage: number; // % of total staking capacity (20%, 40%, 60%, 80%, 100%)
  utilizationThreshold: number; // Calculated threshold based on pool capacity
  lionheartReward: number; // LIONHEART earned at this milestone
  achieved: boolean;
  claimed: boolean;
  claimedAt?: Date;
  description: string;
}

export interface CreatorRewardProgress {
  totalLionheartAllocated: number; // 10% of reward contribution in LIONHEART
  claimedLionheart: number; // Amount already claimed
  milestones: CreatorRewardMilestone[];
  currentUtilization: number; // Percentage 0-100
  currentStaked: number;
  totalStakingCapacity: number;
}

export interface PoolCreatorRewards {
  poolId: string;
  creatorAddress: string;
  rewardContribution: number;
  totalLionheartAllocated: number;
  totalEarned: number;
  totalClaimed: number;
  availableToClaim: number;
  milestones: CreatorRewardMilestone[];
  lastUpdated: Date;
}