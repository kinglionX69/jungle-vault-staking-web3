import { DashboardCreatedPool } from '@/types/dashboardNew';

// Enhanced mock data for creator dashboard features
export interface PoolAnalytics {
  poolId: string;
  dailyVolume: number[];
  weeklyVolume: number[];
  stakerCount: number;
  newStakers: number;
  returningStakers: number;
  avgStakeDuration: number;
  rewardsPercentage: number;
  stakerRetention: number;
  milestoneAchievementRate: number;
  nftBoostUsage: number;
}

export interface TransactionHistory {
  id: string;
  type: 'stake_join' | 'stake_leave' | 'reward_claimed' | 'milestone_reached' | 'pool_action';
  poolId: string;
  poolName: string;
  amount?: number;
  timestamp: Date;
  staker?: string;
  details: string;
}

export interface CreatorNotification {
  id: string;
  type: 'milestone' | 'capacity_alert' | 'new_staker' | 'reward_claim';
  poolId: string;
  poolName: string;
  message: string;
  timestamp: Date;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
}

export interface EnhancedCreatorStats {
  poolsCreated: number;
  totalCapacityProvided: number;
  lionheartEarned: number;
  lionheartPotential: number;
  totalStakers: number;
  avgPoolUtilization: number;
  totalVolume: number;
  rewardsDistributed: number;
  avgStakerRetention: number;
  topPerformingPool: string;
}

export const mockPoolAnalytics: Record<string, PoolAnalytics> = {
  lionheart: {
    poolId: 'lionheart',
    dailyVolume: [2500, 3200, 2800, 4100, 3800, 4500, 5200],
    weeklyVolume: [18000, 22000, 25000, 28000],
    stakerCount: 147,
    newStakers: 23,
    returningStakers: 124,
    avgStakeDuration: 42,
    rewardsPercentage: 250,
    stakerRetention: 84.2,
    milestoneAchievementRate: 75,
    nftBoostUsage: 68
  },
  redenvelope: {
    poolId: 'redenvelope',
    dailyVolume: [1800, 2100, 1900, 2800, 2400, 3100, 3400],
    weeklyVolume: [12000, 15000, 18000, 21000],
    stakerCount: 89,
    newStakers: 15,
    returningStakers: 74,
    avgStakeDuration: 28,
    rewardsPercentage: 160,
    stakerRetention: 71.3,
    milestoneAchievementRate: 60,
    nftBoostUsage: 45
  }
};

export const mockTransactionHistory: TransactionHistory[] = [
  {
    id: '1',
    type: 'stake_join',
    poolId: 'lionheart',
    poolName: 'LIONHEART',
    amount: 1500,
    timestamp: new Date('2025-08-03T10:30:00'),
    staker: '0x1234...5678',
    details: 'New staker joined with 1,500 APT'
  },
  {
    id: '2',
    type: 'milestone_reached',
    poolId: 'lionheart',
    poolName: 'LIONHEART',
    timestamp: new Date('2025-08-03T09:15:00'),
    details: '50% capacity milestone reached - 1,000 LIONHEART earned'
  },
  {
    id: '3',
    type: 'stake_join',
    poolId: 'redenvelope',
    poolName: 'RED ENVELOPE',
    amount: 800,
    timestamp: new Date('2025-08-03T08:45:00'),
    staker: '0x5678...9012',
    details: 'New staker joined with 800 tokens'
  },
  {
    id: '4',
    type: 'reward_claimed',
    poolId: 'lionheart',
    poolName: 'LIONHEART',
    amount: 2250,
    timestamp: new Date('2025-08-02T16:20:00'),
    details: 'Creator rewards claimed: 2,250 LIONHEART'
  },
  {
    id: '5',
    type: 'stake_leave',
    poolId: 'redenvelope',
    poolName: 'RED ENVELOPE',
    amount: 1200,
    timestamp: new Date('2025-08-02T14:30:00'),
    staker: '0x3456...7890',
    details: 'Staker unstaked 1,200 tokens'
  }
];

export const mockCreatorNotifications: CreatorNotification[] = [
  {
    id: '1',
    type: 'milestone',
    poolId: 'lionheart',
    poolName: 'LIONHEART',
    message: '75% capacity milestone available to claim - 1,500 LIONHEART',
    timestamp: new Date('2025-08-03T11:00:00'),
    read: false,
    priority: 'high'
  },
  {
    id: '2',
    type: 'capacity_alert',
    poolId: 'lionheart',
    poolName: 'LIONHEART',
    message: 'Pool at 65% capacity - consider expanding limits',
    timestamp: new Date('2025-08-03T10:30:00'),
    read: false,
    priority: 'medium'
  },
  {
    id: '3',
    type: 'new_staker',
    poolId: 'redenvelope',
    poolName: 'RED ENVELOPE',
    message: '3 new stakers joined in the last hour',
    timestamp: new Date('2025-08-03T09:45:00'),
    read: true,
    priority: 'low'
  },
  {
    id: '4',
    type: 'reward_claim',
    poolId: 'lionheart',
    poolName: 'LIONHEART',
    message: '2,250 LIONHEART ready to claim from recent milestones',
    timestamp: new Date('2025-08-02T18:00:00'),
    read: true,
    priority: 'high'
  }
];

export const mockEnhancedCreatorStats: EnhancedCreatorStats = {
  poolsCreated: 2,
  totalCapacityProvided: 175000,
  lionheartEarned: 4050,
  lionheartPotential: 8600,
  totalStakers: 236,
  avgPoolUtilization: 58,
  totalVolume: 103000,
  rewardsDistributed: 15750,
  avgStakerRetention: 77.8,
  topPerformingPool: 'LIONHEART'
};

export const mockEnhancedCreatedPools: DashboardCreatedPool[] = [
  {
    poolId: 'lionheart',
    emoji: '🦁❤️',
    name: 'LIONHEART',
    tvl: 65000,
    utilizationRate: 65,
    maxCapacity: 100000,
    currentStaked: 65000,
    milestones: [
      { percentage: 10, achieved: true, lionheartReward: 500 },
      { percentage: 25, achieved: true, lionheartReward: 750 },
      { percentage: 50, achieved: true, lionheartReward: 1000 },
      { percentage: 75, achieved: false, lionheartReward: 1500 },
      { percentage: 100, achieved: false, lionheartReward: 2000 }
    ],
    totalLionheartEarned: 2250,
    activeDuration: '45 days',
    status: 'active'
  },
  {
    poolId: 'redenvelope',
    emoji: '🧧',
    name: 'RED ENVELOPE',
    tvl: 38000,
    utilizationRate: 51,
    maxCapacity: 75000,
    currentStaked: 38000,
    milestones: [
      { percentage: 10, achieved: true, lionheartReward: 400 },
      { percentage: 25, achieved: true, lionheartReward: 600 },
      { percentage: 50, achieved: false, lionheartReward: 800 },
      { percentage: 75, achieved: false, lionheartReward: 1200 },
      { percentage: 100, achieved: false, lionheartReward: 1600 }
    ],
    totalLionheartEarned: 1000,
    activeDuration: '32 days',
    status: 'active'
  }
];