
import { AdminPool, AdminStats } from '@/types/admin';

export const mockAdminStats: AdminStats = {
  totalPoolsActive: 8,
  totalValueLocked: '347,200 APT',
  totalProjectsCreated: 12,
  totalStakingCapacity: '500,000 APT',
  capacityUtilizationRate: 69.4,
  averageMilestoneCompletion: 67.5,
  totalCreatorRewards: '24,850 LIONHEART',
  nftBoostAdoptionRate: 34.2,
  totalActiveStakers: 1247,
  totalCreators: 23
};

export const mockAdminPools: AdminPool[] = [
  {
    id: 'rocket100',
    emoji: '🚀💯',
    name: 'ROCKET,HUNDRED',
    rewardToken: 'APT',
    rewardTokenType: 'APT',
    lockDurations: [
      { id: 'rocket-7d', name: '7 days', days: 7, rewardsPercentage: 150, enabled: true },
      { id: 'rocket-30d', name: '30 days', days: 30, rewardsPercentage: 180, enabled: true },
      { id: 'rocket-90d', name: '90 days', days: 90, rewardsPercentage: 220, enabled: true }
    ],
    endsIn: '23 days',
    tvl: '68,000 APT',
    isFeatured: true,
    status: 'active',
    capacity: {
      maxStakeable: 100000,
      currentStaked: 68000,
      utilizationRate: 68,
      availableCapacity: 32000,
      capacityAlerts: ['High utilization - consider increasing capacity']
    },
    milestones: [
      { id: 'early', thresholdPercentage: 10, bonusPercentage: 5, description: 'Early Bird Bonus', completionRate: 100, label: 'Early Bird' },
      { id: 'halfway', thresholdPercentage: 40, bonusPercentage: 10, description: 'Halfway Milestone', completionRate: 100, label: 'Halfway Hero' },
      { id: 'major', thresholdPercentage: 80, bonusPercentage: 15, description: 'Major Milestone', completionRate: 15, label: 'Major Milestone' }
    ],
    creatorRewards: {
      totalLionheartDistributed: 8500,
      pendingDistribution: 1200,
      milestoneCompletionRate: 62.5,
      activeCreators: 1
    },
    nftBoostsEnabled: true,
    nftBoostUsage: 42,
    createdBy: '0xabc...123',
    createdAt: '2024-01-15',
    tier: 'Whale'
  },
  {
    id: 'lionheart',
    emoji: '🦁❤️',
    name: 'LION,HEART SUIT',
    rewardToken: 'LIONHEART',
    rewardTokenType: 'NATIVE',
    lockDurations: [
      { id: 'lion-14d', name: '14 days', days: 14, rewardsPercentage: 200, enabled: true },
      { id: 'lion-60d', name: '60 days', days: 60, rewardsPercentage: 250, enabled: true },
      { id: 'lion-180d', name: '180 days', days: 180, rewardsPercentage: 300, enabled: true }
    ],
    endsIn: '60 days',
    tvl: '77,100 APT',
    isFeatured: true,
    status: 'active',
    capacity: {
      maxStakeable: 90000,
      currentStaked: 77100,
      utilizationRate: 85.7,
      availableCapacity: 12900,
      capacityAlerts: ['Very high utilization', 'Consider emergency capacity increase']
    },
    milestones: [
      { id: 'early', thresholdPercentage: 10, bonusPercentage: 8, description: 'Early Bird Bonus', completionRate: 100, label: 'Early Bird' },
      { id: 'halfway', thresholdPercentage: 40, bonusPercentage: 15, description: 'Halfway Milestone', completionRate: 100, label: 'Halfway Hero' },
      { id: 'major', thresholdPercentage: 80, bonusPercentage: 25, description: 'Major Milestone', completionRate: 72, label: 'Major Milestone' }
    ],
    creatorRewards: {
      totalLionheartDistributed: 12400,
      pendingDistribution: 2800,
      milestoneCompletionRate: 72.25,
      activeCreators: 1
    },
    nftBoostsEnabled: true,
    nftBoostUsage: 56,
    createdBy: '0xdef...456',
    createdAt: '2024-01-10',
    tier: 'Whale'
  },
  {
    id: 'redenvelope',
    emoji: '🧧',
    name: 'RED ENVELOPE',
    rewardToken: 'RED ENVELOPE',
    rewardTokenType: 'NATIVE',
    lockDurations: [
      { id: 'red-7d', name: '7 days', days: 7, rewardsPercentage: 120, enabled: true },
      { id: 'red-21d', name: '21 days', days: 21, rewardsPercentage: 160, enabled: true },
      { id: 'red-45d', name: '45 days', days: 45, rewardsPercentage: 200, enabled: false }
    ],
    endsIn: '15 days',
    tvl: '32,600 APT',
    isFeatured: false,
    status: 'active',
    capacity: {
      maxStakeable: 50000,
      currentStaked: 32600,
      utilizationRate: 65.2,
      availableCapacity: 17400,
      capacityAlerts: []
    },
    milestones: [
      { id: 'early', thresholdPercentage: 10, bonusPercentage: 3, description: 'Early Bird Bonus', completionRate: 100, label: 'Early Bird' },
      { id: 'halfway', thresholdPercentage: 40, bonusPercentage: 7, description: 'Halfway Milestone', completionRate: 100, label: 'Halfway Hero' },
      { id: 'major', thresholdPercentage: 80, bonusPercentage: 12, description: 'Major Milestone', completionRate: 0, label: 'Major Milestone' }
    ],
    creatorRewards: {
      totalLionheartDistributed: 2100,
      pendingDistribution: 450,
      milestoneCompletionRate: 59.3,
      activeCreators: 1
    },
    nftBoostsEnabled: false,
    nftBoostUsage: 0,
    createdBy: '0x789...abc',
    createdAt: '2024-02-01',
    tier: 'Dolphin'
  },
  {
    id: 'globe',
    emoji: '🌐',
    name: 'GLOBE WITH MERIDIANS',
    rewardToken: 'APT',
    rewardTokenType: 'APT',
    lockDurations: [
      { id: 'globe-14d', name: '14 days', days: 14, rewardsPercentage: 120, enabled: true },
      { id: 'globe-30d', name: '30 days', days: 30, rewardsPercentage: 140, enabled: true },
      { id: 'globe-60d', name: '60 days', days: 60, rewardsPercentage: 170, enabled: true }
    ],
    endsIn: '30 days',
    tvl: '51,200 APT',
    isFeatured: true,
    status: 'active',
    capacity: {
      maxStakeable: 75000,
      currentStaked: 51200,
      utilizationRate: 68.3,
      availableCapacity: 23800,
      capacityAlerts: []
    },
    milestones: [
      { id: 'early', thresholdPercentage: 10, bonusPercentage: 2, description: 'Early Bird Bonus', completionRate: 100, label: 'Early Bird' },
      { id: 'halfway', thresholdPercentage: 40, bonusPercentage: 5, description: 'Halfway Milestone', completionRate: 100, label: 'Halfway Hero' },
      { id: 'major', thresholdPercentage: 80, bonusPercentage: 10, description: 'Major Milestone', completionRate: 12, label: 'Major Milestone' }
    ],
    creatorRewards: {
      totalLionheartDistributed: 4200,
      pendingDistribution: 900,
      milestoneCompletionRate: 55.75,
      activeCreators: 1
    },
    nftBoostsEnabled: true,
    nftBoostUsage: 28,
    createdBy: '0x456...def',
    createdAt: '2024-01-20',
    tier: 'Dolphin'
  }
];
