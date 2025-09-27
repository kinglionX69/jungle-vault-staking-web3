
export interface LeaderboardEntry {
  rank: number;
  wallet: string;
  amountStaked: string;
  pool: string;
  poolId: string;
  emoji: string;
  tier: 'Whale' | 'Dolphin' | 'Fish' | null;
  rewardToken: string;
  milestonesAchieved?: number; // Number of milestones achieved (0-3)
  nftBoostActive?: boolean; // Whether NFT boost is active
}

export interface GlobalLeaderboard {
  entries: LeaderboardEntry[];
}

export interface PoolLeaderboard {
  [poolId: string]: LeaderboardEntry[];
}

export interface LeaderboardData {
  global: LeaderboardEntry[];
  byPool: PoolLeaderboard;
}
