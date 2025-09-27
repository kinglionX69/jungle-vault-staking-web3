
export interface AdminPoolLockDuration {
  id: string;
  name: string;
  days: number;
  rewardsPercentage: number;
  enabled: boolean;
}

export interface AdminPoolMilestone {
  id: 'early' | 'halfway' | 'major'; // Fixed milestone IDs
  thresholdPercentage: 10 | 40 | 80; // Fixed thresholds: 10%, 40%, 80%
  bonusPercentage: number;
  description: string;
  completionRate: number; // 0-100, how many users achieved this milestone
  label: string; // Human-readable label like "Early Bird", "Halfway Hero", etc.
}

export interface AdminPoolCapacity {
  maxStakeable: number;
  currentStaked: number;
  utilizationRate: number;
  availableCapacity: number;
  capacityAlerts: string[];
}

export interface AdminCreatorRewards {
  totalLionheartDistributed: number;
  pendingDistribution: number;
  milestoneCompletionRate: number;
  activeCreators: number;
}

export interface AdminPool {
  id: string;
  emoji: string;
  name: string;
  rewardToken: string;
  rewardTokenType: 'APT' | 'NATIVE';
  lockDurations: AdminPoolLockDuration[];
  endsIn: string;
  tvl: string;
  isFeatured: boolean;
  status: 'active' | 'ended';
  capacity: AdminPoolCapacity;
  milestones: AdminPoolMilestone[];
  creatorRewards: AdminCreatorRewards;
  nftBoostsEnabled: boolean;
  nftBoostUsage: number; // percentage of stakers using NFT boosts
  createdBy: string;
  createdAt: string;
  tier: 'Whale' | 'Dolphin' | 'Fish';
}

export interface AdminStats {
  totalPoolsActive: number;
  totalValueLocked: string;
  totalProjectsCreated: number;
  totalStakingCapacity: string;
  capacityUtilizationRate: number;
  averageMilestoneCompletion: number;
  totalCreatorRewards: string;
  nftBoostAdoptionRate: number;
  totalActiveStakers: number;
  totalCreators: number;
}

export interface FeaturedPool {
  id: string;
  emoji: string;
  name: string;
  rewardsPercentage: string;
  order: number;
}

export const SUPER_ADMIN_WALLET = "0x1234...abcd"; // Mock admin wallet
export const MAX_FEATURED_POOLS = 5;
