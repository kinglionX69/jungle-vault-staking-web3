
export interface UserStake {
  poolId: string;
  emoji: string;
  name: string;
  amountStaked: string;
  rewards: string;
  rewardToken: string;
  rewardTokenType: 'APT' | 'NATIVE';
  status: 'active' | 'ended' | 'claimed';
  lockDuration: {
    name: string;
    days: number;
    rewardsPercentage: string;
  };
  timeRemaining?: string;
  stakingCapacity: {
    maxStakeable: number;
    currentStaked: number;
    utilizationRate: number;
  };
  milestoneProgress: {
    currentMilestone: number;
    nextMilestoneAt: number;
    bonusEarned: string;
  };
  nftBoostActive: boolean;
  nftBoostAmount?: string;
}

export interface NFTBoost {
  nft: string;
  emoji: string;
  boost: string;
  appliesTo: string;
  poolId: string;
}

export interface MilestoneBonus {
  pool: string;
  emoji: string;
  milestone: string;
  bonus: string;
  date: string;
  achieved: boolean;
  progress: number; // 0-100 percentage
  thresholdPercentage: 10 | 40 | 80; // Fixed thresholds: 10%, 40%, 80%
}

export interface UserSummary {
  totalStaked: string;
  totalRewards: string;
  activePools: number;
  boostedPools: number;
  roarScore: number;
  creatorStats?: {
    poolsCreated: number;
    totalCapacityProvided: string;
    lionheartEarned: string;
    lionheartPotential: string;
  };
}

export interface CreatedPool {
  poolId: string;
  emoji: string;
  name: string;
  tvl: string;
  stakingCapacity: {
    maxStakeable: number;
    currentStaked: number;
    utilizationRate: number;
  };
  milestones: {
    percentage: 10 | 40 | 80; // Fixed milestones: Early Bird, Halfway Hero, Major Milestone
    achieved: boolean;
    lionheartReward: number;
  }[];
  totalLionheartEarned: number;
  activeDuration: string;
  status: 'active' | 'ended';
}

export interface DashboardData {
  stakes: UserStake[];
  nftBoosts: NFTBoost[];
  milestones: MilestoneBonus[];
  summary: UserSummary;
  createdPools?: CreatedPool[];
  isCreator: boolean;
}
