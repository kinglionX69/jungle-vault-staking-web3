
export interface PoolMilestone {
  id: 'early' | 'halfway' | 'major'; // Fixed milestone IDs
  thresholdPercentage: 10 | 40 | 80; // Fixed thresholds: 10%, 40%, 80%
  bonusPercentage: number;
  description: string;
  achieved: boolean;
  threshold?: number; // Calculated based on total capacity
  rewardAmount: number; // Fixed reward amount for milestone
  claimedBy?: string; // ID of the first staker to reach this milestone
  claimedAt?: Date;
  firstStakerToReach?: string; // First staker to reach this milestone gets the reward
}

export interface PoolLockDuration {
  id: string;
  name: string;
  days: number;
  rewardsPercentage: number;
  enabled: boolean;
}

export interface PoolStakingCapacity {
  maxStakeable: number;
  currentStaked: number;
  utilizationRate: number;
  availableCapacity: number;
}

export interface PoolCreatorMilestone {
  id: string;
  thresholdPercentage: number;
  bonusPercentage: number;
  description: string;
  achieved: boolean;
  threshold?: number;
  rewardAmount: number;
}

export interface PoolCreatorRewards {
  totalPotentialLionheart: number;
  earnedLionheart: number;
  milestones: PoolCreatorMilestone[];
  progress: number; // 0-100
}

export interface Pool {
  id: string;
  emoji: string;
  name: string;
  rewardToken: string;
  stakeToken?: string;
  rewardTokenType: 'APT' | 'NATIVE';
  lockDurations: PoolLockDuration[];
  tvl: string;
  endsIn: string;
  tier: 'Whale' | 'Dolphin' | 'Fish';
  gradient: string;
  marketCap: string;
  volume: string;
  stakingCapacity: PoolStakingCapacity;
  milestones: PoolMilestone[];
  creatorRewards: PoolCreatorRewards;
  nftBoostsEnabled: boolean;
  featured: boolean;
}

export interface PoolFilters {
  poolType: string;
  rewardsRange: number[];
  rewardToken: string;
  milestoneBonus: boolean;
  nftBoosts: boolean;
  availableCapacity: boolean;
}
