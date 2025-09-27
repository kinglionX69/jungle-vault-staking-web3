export interface WeightedStakingConfig {
  maxTotalStake: number;
  totalRewardBudget: number;
  milestoneRewardBudget: number; // Separate from base rewards
  baseRewardPool: number; // totalRewardBudget - milestoneRewardBudget
}

// Removed TierMultiplier interface - no longer needed without multipliers

export interface WeightedStake {
  stakeId: string;
  poolId: string;
  stakerId: string;
  amount: number;
  nftBoostActive: boolean;
  nftBoostPercentage: number;
  timestamp: Date;
}

export interface MilestoneReward {
  id: string;
  thresholdPercentage: number;
  thresholdAmount: number; // Calculated from maxTotalStake
  rewardAmount: number;
  claimed: boolean;
  claimedBy?: string;
  claimedAt?: Date;
  firstStakerToReach?: string;
}

export interface RewardCalculation {
  stakerId: string;
  stakeId: string;
  baseReward: number;
  nftBonus: number;
  milestoneBonus: number;
  finalReward: number;
  rewardPerToken: number;
  stakeAmount: number;
}

export interface PoolWeightedState {
  totalStaked: number;
  rewardPerToken: number;
  milestonesClaimed: string[];
  stakesReachingMilestones: { [milestoneId: string]: string }; // milestone -> first staker
  utilizationPercentage: number;
}

export interface NFTBoostConfig {
  collectionAddress: string;
  boostPercentage: number;
  enabled: boolean;
  name: string;
}

// Enhanced pool interface without multipliers
export interface WeightedPool {
  id: string;
  name: string;
  emoji: string;
  config: WeightedStakingConfig;
  milestones: MilestoneReward[];
  nftBoosts: NFTBoostConfig[];
  state: PoolWeightedState;
  stakes: WeightedStake[];
  createdAt: Date;
  endDate?: Date;
}