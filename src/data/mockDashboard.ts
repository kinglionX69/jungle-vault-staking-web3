import { DashboardData } from '@/types/dashboard';

export const mockDashboardData: DashboardData = {
  stakes: [
    {
      poolId: 'lionheart',
      emoji: '🦁❤️',
      name: 'LIONHEART',
      amountStaked: '3,200',
      rewards: '650',
      rewardToken: 'APT',
      rewardTokenType: 'APT',
      status: 'active',
      lockDuration: {
        name: 'Boosted',
        days: 60,
        rewardsPercentage: '250%'
      },
      timeRemaining: '45 days',
      stakingCapacity: {
        maxStakeable: 100000,
        currentStaked: 65000,
        utilizationRate: 65
      },
      milestoneProgress: {
        currentMilestone: 50,
        nextMilestoneAt: 75,
        bonusEarned: '+10% Rewards'
      },
      nftBoostActive: true,
      nftBoostAmount: '+15%'
    },
    {
      poolId: 'redenvelope',
      emoji: '🧧',
      name: 'RED ENVELOPE',
      amountStaked: '4,000',
      rewards: '1,200',
      rewardToken: 'RED ENVELOPE',
      rewardTokenType: 'NATIVE',
      status: 'active',
      lockDuration: {
        name: 'Flexible',
        days: 0,
        rewardsPercentage: '160%'
      },
      timeRemaining: '12 days',
      stakingCapacity: {
        maxStakeable: 75000,
        currentStaked: 38000,
        utilizationRate: 51
      },
      milestoneProgress: {
        currentMilestone: 25,
        nextMilestoneAt: 50,
        bonusEarned: '+5% Rewards'
      },
      nftBoostActive: false
    },
    {
      poolId: 'clover',
      emoji: '🍀',
      name: 'CLOVER',
      amountStaked: '5,500',
      rewards: '2,100',
      rewardToken: 'CLOVER',
      rewardTokenType: 'NATIVE',
      status: 'active',
      lockDuration: {
        name: 'Flexible',
        days: 0,
        rewardsPercentage: '285%'
      },
      timeRemaining: '18 days',
      stakingCapacity: {
        maxStakeable: 85000,
        currentStaked: 12750,
        utilizationRate: 15
      },
      milestoneProgress: {
        currentMilestone: 15,
        nextMilestoneAt: 40,
        bonusEarned: '+8% Rewards'
      },
      nftBoostActive: true,
      nftBoostAmount: '+20%'
    },
    {
      poolId: 'globe',
      emoji: '🌐',
      name: 'GLOBE',
      amountStaked: '6,800',
      rewards: '890',
      rewardToken: 'APT',
      rewardTokenType: 'APT',
      status: 'active',
      lockDuration: {
        name: '90 Days',
        days: 90,
        rewardsPercentage: '195%'
      },
      timeRemaining: '72 days',
      stakingCapacity: {
        maxStakeable: 120000,
        currentStaked: 52800,
        utilizationRate: 44
      },
      milestoneProgress: {
        currentMilestone: 44,
        nextMilestoneAt: 80,
        bonusEarned: '+12% Rewards'
      },
      nftBoostActive: true,
      nftBoostAmount: '+18%'
    },
    {
      poolId: 'desertisland',
      emoji: '🏝️',
      name: 'DESERT ISLAND',
      amountStaked: '2,200',
      rewards: '165',
      rewardToken: 'APT',
      rewardTokenType: 'APT',
      status: 'active',
      lockDuration: {
        name: 'Flexible',
        days: 0,
        rewardsPercentage: '95%'
      },
      timeRemaining: '25 days',
      stakingCapacity: {
        maxStakeable: 40000,
        currentStaked: 14400,
        utilizationRate: 36
      },
      milestoneProgress: {
        currentMilestone: 36,
        nextMilestoneAt: 40,
        bonusEarned: '+5% Rewards'
      },
      nftBoostActive: false
    },
    {
      poolId: 'beach',
      emoji: '⛱️',
      name: 'BEACH',
      amountStaked: '3,800',
      rewards: '1,450',
      rewardToken: 'BEACH',
      rewardTokenType: 'NATIVE',
      status: 'active',
      lockDuration: {
        name: '60 Days',
        days: 60,
        rewardsPercentage: '220%'
      },
      timeRemaining: '38 days',
      stakingCapacity: {
        maxStakeable: 65000,
        currentStaked: 28600,
        utilizationRate: 44
      },
      milestoneProgress: {
        currentMilestone: 44,
        nextMilestoneAt: 80,
        bonusEarned: '+12% Rewards'
      },
      nftBoostActive: true,
      nftBoostAmount: '+12%'
    },
    {
      poolId: 'turtle',
      emoji: '🐢',
      name: 'TURTLE',
      amountStaked: '8,200',
      rewards: '1,180',
      rewardToken: 'APT',
      rewardTokenType: 'APT',
      status: 'active',
      lockDuration: {
        name: '120 Days',
        days: 120,
        rewardsPercentage: '175%'
      },
      timeRemaining: '95 days',
      stakingCapacity: {
        maxStakeable: 150000,
        currentStaked: 126000,
        utilizationRate: 84
      },
      milestoneProgress: {
        currentMilestone: 84,
        nextMilestoneAt: 100,
        bonusEarned: '+20% Rewards'
      },
      nftBoostActive: true,
      nftBoostAmount: '+10%'
    },
    {
      poolId: 'star',
      emoji: '⭐',
      name: 'STAR',
      amountStaked: '7,500',
      rewards: '2,850',
      rewardToken: 'APT',
      rewardTokenType: 'APT',
      status: 'active',
      lockDuration: {
        name: '60 Days',
        days: 60,
        rewardsPercentage: '310%'
      },
      timeRemaining: '42 days',
      stakingCapacity: {
        maxStakeable: 90000,
        currentStaked: 90000,
        utilizationRate: 100
      },
      milestoneProgress: {
        currentMilestone: 100,
        nextMilestoneAt: 100,
        bonusEarned: '+25% Rewards'
      },
      nftBoostActive: true,
      nftBoostAmount: '+25%'
    },
    {
      poolId: 'pool8ball',
      emoji: '🎱',
      name: 'POOL 8 BALL',
      amountStaked: '1,800',
      rewards: '245',
      rewardToken: 'APT',
      rewardTokenType: 'APT',
      status: 'ended',
      lockDuration: {
        name: '30 Days',
        days: 30,
        rewardsPercentage: '350%'
      },
      stakingCapacity: {
        maxStakeable: 25000,
        currentStaked: 22500,
        utilizationRate: 90
      },
      milestoneProgress: {
        currentMilestone: 90,
        nextMilestoneAt: 100,
        bonusEarned: '+20% Rewards'
      },
      nftBoostActive: false
    },
    {
      poolId: 'bear',
      emoji: '🐻',
      name: 'BEAR',
      amountStaked: '4,500',
      rewards: '780',
      rewardToken: 'BEAR',
      rewardTokenType: 'NATIVE',
      status: 'claimed',
      lockDuration: {
        name: '30 Days',
        days: 30,
        rewardsPercentage: '165%'
      },
      stakingCapacity: {
        maxStakeable: 55000,
        currentStaked: 49500,
        utilizationRate: 90
      },
      milestoneProgress: {
        currentMilestone: 90,
        nextMilestoneAt: 100,
        bonusEarned: '+20% Rewards'
      },
      nftBoostActive: true,
      nftBoostAmount: '+15%'
    },
    {
      poolId: 'rocket100',
      emoji: '🚀💯',
      name: 'ROCKET,HUNDRED',
      amountStaked: '2,000',
      rewards: '180',
      rewardToken: 'APT',
      rewardTokenType: 'APT',
      status: 'ended',
      lockDuration: {
        name: '30 Days',
        days: 30,
        rewardsPercentage: '180%'
      },
      stakingCapacity: {
        maxStakeable: 50000,
        currentStaked: 45000,
        utilizationRate: 90
      },
      milestoneProgress: {
        currentMilestone: 90,
        nextMilestoneAt: 100,
        bonusEarned: '+20% Rewards'
      },
      nftBoostActive: true,
      nftBoostAmount: '+8%'
    },
    {
      poolId: 'cancer',
      emoji: '♋',
      name: 'CANCER',
      amountStaked: '1,500',
      rewards: '95',
      rewardToken: 'CANCER',
      rewardTokenType: 'NATIVE',
      status: 'claimed',
      lockDuration: {
        name: '30 Days',
        days: 30,
        rewardsPercentage: '120%'
      },
      stakingCapacity: {
        maxStakeable: 30000,
        currentStaked: 30000,
        utilizationRate: 100
      },
      milestoneProgress: {
        currentMilestone: 100,
        nextMilestoneAt: 100,
        bonusEarned: '+20% Rewards'
      },
      nftBoostActive: false
    }
  ],
  nftBoosts: [
    {
      nft: 'Lion NFT V2',
      emoji: '🦁',
      boost: '+15%',
      appliesTo: 'LIONHEART',
      poolId: 'lionheart'
    },
    {
      nft: 'Lucky Clover Charm',
      emoji: '🍀',
      boost: '+20%',
      appliesTo: 'CLOVER',
      poolId: 'clover'
    },
    {
      nft: 'Globe Trotter Badge',
      emoji: '🌐',
      boost: '+18%',
      appliesTo: 'GLOBE',
      poolId: 'globe'
    },
    {
      nft: 'Beach Umbrella NFT',
      emoji: '⛱️',
      boost: '+12%',
      appliesTo: 'BEACH',
      poolId: 'beach'
    },
    {
      nft: 'Turtle Shell Shield',
      emoji: '🐢',
      boost: '+10%',
      appliesTo: 'TURTLE',
      poolId: 'turtle'
    },
    {
      nft: 'Shooting Star NFT',
      emoji: '⭐',
      boost: '+25%',
      appliesTo: 'STAR',
      poolId: 'star'
    },
    {
      nft: 'Bear Hibernation Pass',
      emoji: '🐻',
      boost: '+15%',
      appliesTo: 'BEAR',
      poolId: 'bear'
    },
    {
      nft: 'Rocket Booster',
      emoji: '🚀',
      boost: '+8%',
      appliesTo: 'ROCKET,HUNDRED',
      poolId: 'rocket100'
    }
  ],
  milestones: [
    // LIONHEART Milestones
    {
      pool: 'LIONHEART',
      emoji: '🦁',
      milestone: 'Early Bird (10% capacity)',
      bonus: '+8% Rewards',
      date: '2025-06-15',
      achieved: true,
      progress: 65,
      thresholdPercentage: 10
    },
    {
      pool: 'LIONHEART',
      emoji: '🦁',
      milestone: 'Halfway Hero (40% capacity)',
      bonus: '+12% Rewards',
      date: '2025-06-15',
      achieved: true,
      progress: 65,
      thresholdPercentage: 40
    },
    {
      pool: 'LIONHEART',
      emoji: '🦁',
      milestone: 'Major Milestone (80% capacity)',
      bonus: '+20% Rewards',
      date: '2025-06-15',
      achieved: false,
      progress: 65,
      thresholdPercentage: 80
    },
    // RED ENVELOPE Milestones
    {
      pool: 'RED ENVELOPE',
      emoji: '🧧',
      milestone: 'Early Bird (10% capacity)',
      bonus: '+5% Rewards',
      date: '2025-06-20',
      achieved: true,
      progress: 51,
      thresholdPercentage: 10
    },
    {
      pool: 'RED ENVELOPE',
      emoji: '🧧',
      milestone: 'Halfway Hero (40% capacity)',
      bonus: '+8% Rewards',
      date: '2025-06-20',
      achieved: true,
      progress: 51,
      thresholdPercentage: 40
    },
    {
      pool: 'RED ENVELOPE',
      emoji: '🧧',
      milestone: 'Major Milestone (80% capacity)',
      bonus: '+15% Rewards',
      date: '2025-06-20',
      achieved: false,
      progress: 51,
      thresholdPercentage: 80
    },
    // CLOVER Milestones
    {
      pool: 'CLOVER',
      emoji: '🍀',
      milestone: 'Early Bird (10% capacity)',
      bonus: '+8% Rewards',
      date: '2025-06-22',
      achieved: true,
      progress: 15,
      thresholdPercentage: 10
    },
    {
      pool: 'CLOVER',
      emoji: '🍀',
      milestone: 'Halfway Hero (40% capacity)',
      bonus: '+12% Rewards',
      date: '2025-06-22',
      achieved: false,
      progress: 15,
      thresholdPercentage: 40
    },
    {
      pool: 'CLOVER',
      emoji: '🍀',
      milestone: 'Major Milestone (80% capacity)',
      bonus: '+18% Rewards',
      date: '2025-06-22',
      achieved: false,
      progress: 15,
      thresholdPercentage: 80
    },
    // GLOBE Milestones
    {
      pool: 'GLOBE',
      emoji: '🌐',
      milestone: 'Early Bird (10% capacity)',
      bonus: '+6% Rewards',
      date: '2025-06-18',
      achieved: true,
      progress: 44,
      thresholdPercentage: 10
    },
    {
      pool: 'GLOBE',
      emoji: '🌐',
      milestone: 'Halfway Hero (40% capacity)',
      bonus: '+12% Rewards',
      date: '2025-06-18',
      achieved: true,
      progress: 44,
      thresholdPercentage: 40
    },
    {
      pool: 'GLOBE',
      emoji: '🌐',
      milestone: 'Major Milestone (80% capacity)',
      bonus: '+18% Rewards',
      date: '2025-06-18',
      achieved: false,
      progress: 44,
      thresholdPercentage: 80
    },
    // BEACH Milestones
    {
      pool: 'BEACH',
      emoji: '⛱️',
      milestone: 'Early Bird (10% capacity)',
      bonus: '+8% Rewards',
      date: '2025-06-25',
      achieved: true,
      progress: 44,
      thresholdPercentage: 10
    },
    {
      pool: 'BEACH',
      emoji: '⛱️',
      milestone: 'Halfway Hero (40% capacity)',
      bonus: '+12% Rewards',
      date: '2025-06-25',
      achieved: true,
      progress: 44,
      thresholdPercentage: 40
    },
    {
      pool: 'BEACH',
      emoji: '⛱️',
      milestone: 'Major Milestone (80% capacity)',
      bonus: '+20% Rewards',
      date: '2025-06-25',
      achieved: false,
      progress: 44,
      thresholdPercentage: 80
    },
    // TURTLE Milestones
    {
      pool: 'TURTLE',
      emoji: '🐢',
      milestone: 'Early Bird (10% capacity)',
      bonus: '+5% Rewards',
      date: '2025-06-12',
      achieved: true,
      progress: 84,
      thresholdPercentage: 10
    },
    {
      pool: 'TURTLE',
      emoji: '🐢',
      milestone: 'Halfway Hero (40% capacity)',
      bonus: '+10% Rewards',
      date: '2025-06-12',
      achieved: true,
      progress: 84,
      thresholdPercentage: 40
    },
    {
      pool: 'TURTLE',
      emoji: '🐢',
      milestone: 'Major Milestone (80% capacity)',
      bonus: '+20% Rewards',
      date: '2025-06-12',
      achieved: true,
      progress: 84,
      thresholdPercentage: 80
    },
    // STAR Milestones (All achieved)
    {
      pool: 'STAR',
      emoji: '⭐',
      milestone: 'Early Bird (10% capacity)',
      bonus: '+10% Rewards',
      date: '2025-06-08',
      achieved: true,
      progress: 100,
      thresholdPercentage: 10
    },
    {
      pool: 'STAR',
      emoji: '⭐',
      milestone: 'Halfway Hero (40% capacity)',
      bonus: '+15% Rewards',
      date: '2025-06-08',
      achieved: true,
      progress: 100,
      thresholdPercentage: 40
    },
    {
      pool: 'STAR',
      emoji: '⭐',
      milestone: 'Major Milestone (80% capacity)',
      bonus: '+25% Rewards',
      date: '2025-06-08',
      achieved: true,
      progress: 100,
      thresholdPercentage: 80
    },
    // ROCKET,HUNDRED Milestones
    {
      pool: 'ROCKET,HUNDRED',
      emoji: '🚀',
      milestone: 'Early Bird (10% capacity)',
      bonus: '+5% Rewards',
      date: '2025-06-10',
      achieved: true,
      progress: 90,
      thresholdPercentage: 10
    },
    {
      pool: 'ROCKET,HUNDRED',
      emoji: '🚀',
      milestone: 'Halfway Hero (40% capacity)',
      bonus: '+10% Rewards',
      date: '2025-06-10',
      achieved: true,
      progress: 90,
      thresholdPercentage: 40
    },
    {
      pool: 'ROCKET,HUNDRED',
      emoji: '🚀',
      milestone: 'Major Milestone (80% capacity)',
      bonus: '+20% Rewards',
      date: '2025-06-10',
      achieved: true,
      progress: 90,
      thresholdPercentage: 80
    }
  ],
  summary: {
    totalStaked: '47,500',
    totalRewards: '9,540 APT + 4,780 tokens',
    activePools: 8,
    boostedPools: 6,
    roarScore: 94,
    creatorStats: {
      poolsCreated: 4,
      totalCapacityProvided: '385,000 APT',
      lionheartEarned: '6,850',
      lionheartPotential: '15,200'
    }
  },
  createdPools: [
    {
      poolId: 'lionheart',
      emoji: '🦁❤️',
      name: 'LIONHEART',
      tvl: '65,000 APT',
      stakingCapacity: {
        maxStakeable: 100000,
        currentStaked: 65000,
        utilizationRate: 65
      },
      milestones: [
        { percentage: 10, achieved: true, lionheartReward: 800 },
        { percentage: 40, achieved: true, lionheartReward: 1200 },
        { percentage: 80, achieved: false, lionheartReward: 2000 }
      ],
      totalLionheartEarned: 2000,
      activeDuration: '45 days',
      status: 'active'
    },
    {
      poolId: 'redenvelope',
      emoji: '🧧',
      name: 'RED ENVELOPE',
      tvl: '38,000 tokens',
      stakingCapacity: {
        maxStakeable: 75000,
        currentStaked: 38000,
        utilizationRate: 51
      },
      milestones: [
        { percentage: 10, achieved: true, lionheartReward: 600 },
        { percentage: 40, achieved: true, lionheartReward: 900 },
        { percentage: 80, achieved: false, lionheartReward: 1500 }
      ],
      totalLionheartEarned: 1500,
      activeDuration: '12 days',
      status: 'active'
    },
    {
      poolId: 'globe',
      emoji: '🌐',
      name: 'GLOBE',
      tvl: '52,800 APT',
      stakingCapacity: {
        maxStakeable: 120000,
        currentStaked: 52800,
        utilizationRate: 44
      },
      milestones: [
        { percentage: 10, achieved: true, lionheartReward: 750 },
        { percentage: 40, achieved: true, lionheartReward: 1250 },
        { percentage: 80, achieved: false, lionheartReward: 2200 }
      ],
      totalLionheartEarned: 2000,
      activeDuration: '28 days',
      status: 'active'
    },
    {
      poolId: 'star',
      emoji: '⭐',
      name: 'STAR',
      tvl: '90,000 APT',
      stakingCapacity: {
        maxStakeable: 90000,
        currentStaked: 90000,
        utilizationRate: 100
      },
      milestones: [
        { percentage: 10, achieved: true, lionheartReward: 900 },
        { percentage: 40, achieved: true, lionheartReward: 1350 },
        { percentage: 80, achieved: true, lionheartReward: 2500 }
      ],
      totalLionheartEarned: 4750,
      activeDuration: '52 days',
      status: 'active'
    }
  ],
  isCreator: true
};