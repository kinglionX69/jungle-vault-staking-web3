
import { LeaderboardData } from '@/types/leaderboard';

export const mockLeaderboardData: LeaderboardData = {
  global: [
    {
      rank: 1,
      wallet: "0x8f3...24f",
      amountStaked: "11,000",
      pool: "LIONHEART",
      poolId: "lionheart",
      emoji: "🦁❤️",
      tier: "Whale",
      rewardToken: "LIONHEART",
      milestonesAchieved: 3,
      nftBoostActive: true
    },
    {
      rank: 2,
      wallet: "0x91b...88c",
      amountStaked: "7,200",
      pool: "RED ENVELOPE",
      poolId: "redenvelope",
      emoji: "🧧",
      tier: "Whale",
      rewardToken: "RED ENVELOPE",
      milestonesAchieved: 2,
      nftBoostActive: false
    },
    {
      rank: 3,
      wallet: "0xa1c...992",
      amountStaked: "6,800",
      pool: "ROCKET,HUNDRED",
      poolId: "rocket100",
      emoji: "🚀💯",
      tier: "Whale",
      rewardToken: "APT",
      milestonesAchieved: 3,
      nftBoostActive: true
    },
    {
      rank: 4,
      wallet: "0xd3f...aaa",
      amountStaked: "6,500",
      pool: "LIONHEART",
      poolId: "lionheart",
      emoji: "🦁❤️",
      tier: "Dolphin",
      rewardToken: "LIONHEART"
    },
    {
      rank: 5,
      wallet: "0x2b4...cd9",
      amountStaked: "5,900",
      pool: "GLOBE WITH MERIDIANS",
      poolId: "globe",
      emoji: "🌐",
      tier: "Dolphin",
      rewardToken: "APT"
    },
    {
      rank: 6,
      wallet: "0x7e1...f48",
      amountStaked: "4,200",
      pool: "CANCER",
      poolId: "cancer",
      emoji: "♋",
      tier: "Dolphin",
      rewardToken: "CANCER"
    },
    {
      rank: 7,
      wallet: "0x9c6...82b",
      amountStaked: "3,800",
      pool: "RED ENVELOPE",
      poolId: "redenvelope",
      emoji: "🧧",
      tier: "Fish",
      rewardToken: "RED ENVELOPE"
    },
    {
      rank: 8,
      wallet: "0x5a2...119",
      amountStaked: "3,100",
      pool: "SPONGE,JEANS",
      poolId: "spongejeans",
      emoji: "🧽👖",
      tier: "Fish",
      rewardToken: "APT"
    }
  ],
  byPool: {
    lionheart: [
      {
        rank: 1,
        wallet: "0x8f3...24f",
        amountStaked: "11,000",
        pool: "LIONHEART",
        poolId: "lionheart",
        emoji: "🦁❤️",
        tier: "Whale",
        rewardToken: "LIONHEART"
      },
      {
        rank: 2,
        wallet: "0xd3f...aaa",
        amountStaked: "6,500",
        pool: "LIONHEART",
        poolId: "lionheart",
        emoji: "🦁❤️",
        tier: "Dolphin",
        rewardToken: "LIONHEART"
      },
      {
        rank: 3,
        wallet: "0x4b8...cc1",
        amountStaked: "2,800",
        pool: "LIONHEART",
        poolId: "lionheart",
        emoji: "🦁❤️",
        tier: "Fish",
        rewardToken: "LIONHEART"
      }
    ],
    redenvelope: [
      {
        rank: 1,
        wallet: "0x91b...88c",
        amountStaked: "7,200",
        pool: "RED ENVELOPE",
        poolId: "redenvelope",
        emoji: "🧧",
        tier: "Whale",
        rewardToken: "RED ENVELOPE"
      },
      {
        rank: 2,
        wallet: "0x9c6...82b",
        amountStaked: "3,800",
        pool: "RED ENVELOPE",
        poolId: "redenvelope",
        emoji: "🧧",
        tier: "Dolphin",
        rewardToken: "RED ENVELOPE"
      }
    ],
    rocket100: [
      {
        rank: 1,
        wallet: "0xa1c...992",
        amountStaked: "6,800",
        pool: "ROCKET,HUNDRED",
        poolId: "rocket100",
        emoji: "🚀💯",
        tier: "Whale",
        rewardToken: "APT"
      }
    ],
    globe: [
      {
        rank: 1,
        wallet: "0x2b4...cd9",
        amountStaked: "5,900",
        pool: "GLOBE WITH MERIDIANS",
        poolId: "globe",
        emoji: "🌐",
        tier: "Whale",
        rewardToken: "APT"
      }
    ],
    cancer: [
      {
        rank: 1,
        wallet: "0x7e1...f48",
        amountStaked: "4,200",
        pool: "CANCER",
        poolId: "cancer",
        emoji: "♋",
        tier: "Whale",
        rewardToken: "CANCER"
      }
    ]
  }
};
