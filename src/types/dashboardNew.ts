import { WeightedStake, WeightedPool, MilestoneReward, NFTBoostConfig } from '@/types/weightedStaking';

// New simplified dashboard types aligned with weighted staking system
export interface DashboardStake {
  stakeId: string;
  poolId: string;
  poolEmoji: string;
  poolName: string;
  amount: number;
  rewards: number;
  rewardToken: string;
  rewardTokenType: 'APT' | 'NATIVE';
  status: 'active' | 'ended' | 'claimed';
  nftBoostActive: boolean;
  nftBoostPercentage: number;
  milestoneRewards: number;
  finalReward: number;
  timestamp: Date;
  utilizationRate: number;
}

export interface DashboardNFTBoost {
  nft: string;
  emoji: string;
  boost: string;
  appliesTo: string;
  poolId: string;
  active: boolean;
  imageUrl: string;
  lockDuration: {
    name: string;
    days: number;
  };
  stakeAmount: number;
}

export interface DashboardMilestone {
  pool: string;
  emoji: string;
  milestone: string;
  rewardAmount: number;
  date: Date;
  achieved: boolean;
  progress: number;
  thresholdPercentage: number;
  poolId: string;
}

export interface DashboardSummary {
  totalStaked: number;
  totalRewards: number;
  activePools: number;
  boostedPools: number;
  roarScore: number;
  creatorStats?: {
    poolsCreated: number;
    totalCapacityProvided: number;
    lionheartEarned: number;
    lionheartPotential: number;
  };
}

export interface DashboardCreatedPool {
  poolId: string;
  emoji: string;
  name: string;
  tvl: number;
  utilizationRate: number;
  maxCapacity: number;
  currentStaked: number;
  milestones: {
    percentage: number;
    achieved: boolean;
    lionheartReward: number;
  }[];
  totalLionheartEarned: number;
  activeDuration: string;
  status: 'active' | 'ended';
}

export interface NewDashboardData {
  stakes: DashboardStake[];
  nftBoosts: DashboardNFTBoost[];
  milestones: DashboardMilestone[];
  summary: DashboardSummary;
  createdPools: DashboardCreatedPool[];
  isCreator: boolean;
}