
import { Pool } from '@/types/pool';
// Removed dependency on calculateStakingCapacity

export const mockPools: Pool[] = [
  {
    id: 'lionheart',
    emoji: '🦁❤️',
    name: 'LION,HEART SUIT',
    rewardToken: 'LIONHEART',
    rewardTokenType: 'NATIVE',
    lockDurations: [
      { id: 'flex', name: 'Flexible', days: -1, rewardsPercentage: 200, enabled: true },
      { id: '30d', name: '30 Days', days: 30, rewardsPercentage: 250, enabled: true },
      { id: '60d', name: '60 Days', days: 60, rewardsPercentage: 300, enabled: true }
    ],
    tvl: '77,100 APT',
    endsIn: '60 days',
    tier: 'Whale',
    gradient: 'from-yellow-400 to-orange-500',
    marketCap: '$121,697',
    volume: '187.78 APT',
    stakingCapacity: {
      maxStakeable: 150000,
      currentStaked: 77100,
      utilizationRate: 51.4,
      availableCapacity: 72900
    },
    milestones: [
      { id: 'early', thresholdPercentage: 10, bonusPercentage: 5, description: 'Early Bird Bonus', achieved: true, threshold: 15000, rewardAmount: 500, firstStakerToReach: 'staker_001' },
      { id: 'halfway', thresholdPercentage: 40, bonusPercentage: 10, description: 'Halfway Milestone', achieved: true, threshold: 60000, rewardAmount: 750, firstStakerToReach: 'staker_007' },
      { id: 'major', thresholdPercentage: 80, bonusPercentage: 15, description: 'Major Milestone', achieved: false, threshold: 120000, rewardAmount: 1000 }
    ],
    creatorRewards: {
      totalPotentialLionheart: 150,
      earnedLionheart: 75,
      milestones: [
        { id: 'c1', thresholdPercentage: 25, bonusPercentage: 0, description: '25% staked', achieved: true, threshold: 37500, rewardAmount: 100 },
        { id: 'c2', thresholdPercentage: 50, bonusPercentage: 0, description: '50% staked', achieved: true, threshold: 75000, rewardAmount: 200 }
      ],
      progress: 51.4
    },
    nftBoostsEnabled: true,
    featured: true
  },
  {
    id: 'rocket100',
    emoji: '🚀💯',
    name: 'ROCKET,HUNDRED',
    rewardToken: 'APT',
    rewardTokenType: 'APT',
    lockDurations: [
      { id: '30d', name: '30 Days', days: 30, rewardsPercentage: 180, enabled: true },
      { id: '60d', name: '60 Days', days: 60, rewardsPercentage: 220, enabled: true }
    ],
    tvl: '68,000 APT',
    endsIn: '23 days',
    tier: 'Whale',
    gradient: 'from-blue-400 to-purple-600',
    marketCap: '$1,017,198',
    volume: '155.65 APT',
    stakingCapacity: {
      maxStakeable: 120000,
      currentStaked: 68000,
      utilizationRate: 56.7,
      availableCapacity: 52000
    },
    milestones: [
      { id: 'early', thresholdPercentage: 10, bonusPercentage: 8, description: 'Early Bird Bonus', achieved: true, threshold: 12000, rewardAmount: 400, firstStakerToReach: 'staker_002' },
      { id: 'halfway', thresholdPercentage: 40, bonusPercentage: 15, description: 'Halfway Milestone', achieved: true, threshold: 48000, rewardAmount: 600, firstStakerToReach: 'staker_008' },
      { id: 'major', thresholdPercentage: 80, bonusPercentage: 20, description: 'Major Milestone', achieved: false, threshold: 96000, rewardAmount: 800 }
    ],
    creatorRewards: {
      totalPotentialLionheart: 120,
      earnedLionheart: 68,
      milestones: [
        { id: 'c1', thresholdPercentage: 25, bonusPercentage: 0, description: '25% staked', achieved: true, threshold: 30000, rewardAmount: 80 },
        { id: 'c2', thresholdPercentage: 50, bonusPercentage: 0, description: '50% staked', achieved: true, threshold: 60000, rewardAmount: 160 }
      ],
      progress: 56.7
    },
    nftBoostsEnabled: false,
    featured: true
  },
  {
    id: 'globe',
    emoji: '🌐',
    name: 'GLOBE WITH MERIDIANS',
    rewardToken: 'APT',
    rewardTokenType: 'APT',
    lockDurations: [
      { id: '60d', name: '60 Days', days: 60, rewardsPercentage: 140, enabled: true },
      { id: '90d', name: '90 Days', days: 90, rewardsPercentage: 170, enabled: true }
    ],
    tvl: '51,200 APT',
    endsIn: '30 days',
    tier: 'Whale',
    gradient: 'from-green-400 to-blue-500',
    marketCap: '$475,465',
    volume: '249.03 APT',
    stakingCapacity: {
      maxStakeable: 85000,
      currentStaked: 51200,
      utilizationRate: 60.2,
      availableCapacity: 33800
    },
    milestones: [
      { id: 'early', thresholdPercentage: 10, bonusPercentage: 10, description: 'Early Bird Bonus', achieved: true, threshold: 8500, rewardAmount: 300, firstStakerToReach: 'staker_003' },
      { id: 'halfway', thresholdPercentage: 40, bonusPercentage: 18, description: 'Halfway Milestone', achieved: true, threshold: 34000, rewardAmount: 500, firstStakerToReach: 'staker_009' },
      { id: 'major', thresholdPercentage: 80, bonusPercentage: 25, description: 'Major Milestone', achieved: false, threshold: 68000, rewardAmount: 700 }
    ],
    creatorRewards: {
      totalPotentialLionheart: 85,
      earnedLionheart: 51,
      milestones: [
        { id: 'c1', thresholdPercentage: 25, bonusPercentage: 0, description: '25% staked', achieved: true, threshold: 21250, rewardAmount: 60 },
        { id: 'c2', thresholdPercentage: 50, bonusPercentage: 0, description: '50% staked', achieved: true, threshold: 42500, rewardAmount: 120 }
      ],
      progress: 60.2
    },
    nftBoostsEnabled: true,
    featured: false
  },
  {
    id: 'redenvelope',
    emoji: '🧧',
    name: 'RED ENVELOPE',
    rewardToken: 'RED ENVELOPE',
    rewardTokenType: 'NATIVE',
    lockDurations: [
      { id: 'flex', name: 'Flexible', days: -1, rewardsPercentage: 160, enabled: true }
    ],
    tvl: '32,600 APT',
    endsIn: '15 days',
    tier: 'Dolphin',
    gradient: 'from-red-400 to-pink-500',
    marketCap: '$281,861',
    volume: '9.42 APT',
    stakingCapacity: {
      maxStakeable: 55000,
      currentStaked: 32600,
      utilizationRate: 59.3,
      availableCapacity: 22400
    },
    milestones: [
      { id: 'early', thresholdPercentage: 10, bonusPercentage: 12, description: 'Early Bird Bonus', achieved: true, threshold: 5500, rewardAmount: 250, firstStakerToReach: 'staker_004' },
      { id: 'halfway', thresholdPercentage: 40, bonusPercentage: 22, description: 'Halfway Milestone', achieved: true, threshold: 22000, rewardAmount: 400, firstStakerToReach: 'staker_010' },
      { id: 'major', thresholdPercentage: 80, bonusPercentage: 30, description: 'Major Milestone', achieved: false, threshold: 44000, rewardAmount: 600 }
    ],
    creatorRewards: {
      totalPotentialLionheart: 55,
      earnedLionheart: 33,
      milestones: [
        { id: 'c1', thresholdPercentage: 25, bonusPercentage: 0, description: '25% staked', achieved: true, threshold: 13750, rewardAmount: 40 },
        { id: 'c2', thresholdPercentage: 50, bonusPercentage: 0, description: '50% staked', achieved: true, threshold: 27500, rewardAmount: 80 }
      ],
      progress: 59.3
    },
    nftBoostsEnabled: true,
    featured: false
  },
  {
    id: 'cancer',
    emoji: '♋',
    name: 'CANCER',
    rewardToken: 'CANCER',
    rewardTokenType: 'NATIVE',
    lockDurations: [
      { id: '30d', name: '30 Days', days: 30, rewardsPercentage: 120, enabled: true }
    ],
    tvl: '29,500 APT',
    endsIn: '17 days',
    tier: 'Dolphin',
    gradient: 'from-purple-400 to-blue-500',
    marketCap: '$106,122',
    volume: '303.04 APT',
    stakingCapacity: {
      maxStakeable: 45000,
      currentStaked: 29500,
      utilizationRate: 65.6,
      availableCapacity: 15500
    },
    milestones: [
      { id: 'early', thresholdPercentage: 10, bonusPercentage: 8, description: 'Early Bird Bonus', achieved: true, threshold: 4500, rewardAmount: 200, firstStakerToReach: 'staker_005' },
      { id: 'halfway', thresholdPercentage: 40, bonusPercentage: 15, description: 'Halfway Milestone', achieved: true, threshold: 18000, rewardAmount: 350, firstStakerToReach: 'staker_011' },
      { id: 'major', thresholdPercentage: 80, bonusPercentage: 22, description: 'Major Milestone', achieved: false, threshold: 36000, rewardAmount: 500 }
    ],
    creatorRewards: {
      totalPotentialLionheart: 45,
      earnedLionheart: 30,
      milestones: [
        { id: 'c1', thresholdPercentage: 25, bonusPercentage: 0, description: '25% staked', achieved: true, threshold: 11250, rewardAmount: 30 },
        { id: 'c2', thresholdPercentage: 50, bonusPercentage: 0, description: '50% staked', achieved: true, threshold: 22500, rewardAmount: 60 }
      ],
      progress: 65.6
    },
    nftBoostsEnabled: false,
    featured: false
  },
  {
    id: 'desertisland',
    emoji: '🏝️',
    name: 'DESERT ISLAND',
    rewardToken: 'APT',
    rewardTokenType: 'APT',
    lockDurations: [
      { id: 'flex', name: 'Flexible', days: -1, rewardsPercentage: 100, enabled: true }
    ],
    tvl: '21,800 APT',
    endsIn: '12 days',
    tier: 'Fish',
    gradient: 'from-yellow-300 to-green-400',
    marketCap: '$87,979',
    volume: '12.06 APT',
    stakingCapacity: {
      maxStakeable: 35000,
      currentStaked: 21800,
      utilizationRate: 62.3,
      availableCapacity: 13200
    },
    milestones: [
      { id: 'early', thresholdPercentage: 10, bonusPercentage: 6, description: 'Early Bird Bonus', achieved: true, threshold: 3500, rewardAmount: 150, firstStakerToReach: 'staker_006' },
      { id: 'halfway', thresholdPercentage: 40, bonusPercentage: 12, description: 'Halfway Milestone', achieved: true, threshold: 14000, rewardAmount: 250, firstStakerToReach: 'staker_012' },
      { id: 'major', thresholdPercentage: 80, bonusPercentage: 18, description: 'Major Milestone', achieved: false, threshold: 28000, rewardAmount: 400 }
    ],
    creatorRewards: {
      totalPotentialLionheart: 35,
      earnedLionheart: 22,
      milestones: [
        { id: 'c1', thresholdPercentage: 25, bonusPercentage: 0, description: '25% staked', achieved: true, threshold: 8750, rewardAmount: 25 },
        { id: 'c2', thresholdPercentage: 50, bonusPercentage: 0, description: '50% staked', achieved: true, threshold: 17500, rewardAmount: 50 }
      ],
      progress: 62.3
    },
    nftBoostsEnabled: false,
    featured: false
  },
  {
    id: 'pool8ball',
    emoji: '🎱🎱',
    name: 'POOL 8 BALL',
    rewardToken: 'APT',
    rewardTokenType: 'APT',
    lockDurations: [
      { id: 'flex', name: 'Flexible', days: -1, rewardsPercentage: 110, enabled: true }
    ],
    tvl: '19,200 APT',
    endsIn: '9 days',
    tier: 'Fish',
    gradient: 'from-gray-400 to-black',
    marketCap: '$84,694',
    volume: '2 APT',
    stakingCapacity: {
      maxStakeable: 28000,
      currentStaked: 19200,
      utilizationRate: 68.6,
      availableCapacity: 8800
    },
    milestones: [
      { id: 'early', thresholdPercentage: 10, bonusPercentage: 5, description: 'Early Bird Bonus', achieved: true, threshold: 2800, rewardAmount: 120, firstStakerToReach: 'staker_013' },
      { id: 'halfway', thresholdPercentage: 40, bonusPercentage: 10, description: 'Halfway Milestone', achieved: true, threshold: 11200, rewardAmount: 200, firstStakerToReach: 'staker_014' },
      { id: 'major', thresholdPercentage: 80, bonusPercentage: 15, description: 'Major Milestone', achieved: false, threshold: 22400, rewardAmount: 300 }
    ],
    creatorRewards: {
      totalPotentialLionheart: 28,
      earnedLionheart: 19,
      milestones: [
        { id: 'c1', thresholdPercentage: 25, bonusPercentage: 0, description: '25% staked', achieved: true, threshold: 7000, rewardAmount: 20 },
        { id: 'c2', thresholdPercentage: 50, bonusPercentage: 0, description: '50% staked', achieved: true, threshold: 14000, rewardAmount: 40 }
      ],
      progress: 68.6
    },
    nftBoostsEnabled: false,
    featured: false
  }
];
