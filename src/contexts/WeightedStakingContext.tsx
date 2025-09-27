import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  WeightedStake, 
  WeightedPool, 
  RewardCalculation, 
  PoolWeightedState,
  NFTBoostConfig 
} from '@/types/weightedStaking';
import { 
  calculatePoolRewards,
  updatePoolState,
  validateStakeCapacity
} from '@/utils/simplifiedStakingCalculator';

interface SimplifiedStakingTransaction {
  id: string;
  poolId: string;
  poolName: string;
  poolEmoji: string;
  amount: number;
  txHash: string;
  timestamp: Date;
  type: 'stake' | 'unstake' | 'claim' | 'milestone_claim';
  status: 'pending' | 'confirmed' | 'failed';
  milestoneRewards?: number;
  nftBonus?: number;
}

interface SimplifiedStakingContextType {
  pools: WeightedPool[];
  stakes: WeightedStake[];
  transactions: SimplifiedStakingTransaction[];
  
  // Pool management
  createPool: (poolData: Omit<WeightedPool, 'id' | 'state' | 'stakes' | 'createdAt'>) => string;
  getPool: (poolId: string) => WeightedPool | undefined;
  getPoolState: (poolId: string) => PoolWeightedState | undefined;
  
  // Staking actions
  addStake: (
    poolId: string, 
    amount: number, 
    lockPeriodDays: number,
    nftBoostActive: boolean,
    nftBoostPercentage: number,
    txHash: string
  ) => Promise<{ success: boolean; error?: string; stakeId?: string }>;
  
  removeStake: (stakeId: string) => void;
  claimRewards: (stakeId: string) => Promise<{ success: boolean; rewards: RewardCalculation | null }>;
  claimMilestoneReward: (poolId: string, milestoneId: string) => Promise<{ success: boolean; amount?: number }>;
  
  // Getters
  getStakesByPoolId: (poolId: string) => WeightedStake[];
  getStakesByStakerId: (stakerId: string) => WeightedStake[];
  calculateRewardsForStake: (stakeId: string) => RewardCalculation | null;
  calculatePoolRewardsForAll: (poolId: string) => RewardCalculation[];
  
  // Stats
  totalStaked: number;
  totalPools: number;
  activePools: number;
}

const SimplifiedStakingContext = createContext<SimplifiedStakingContextType | undefined>(undefined);

// Mock user ID for demo purposes
const MOCK_USER_ID = 'user-123';

export const SimplifiedStakingProvider = ({ children }: { children: React.ReactNode }) => {
  const [pools, setPools] = useState<WeightedPool[]>([]);
  const [stakes, setStakes] = useState<WeightedStake[]>([]);
  const [transactions, setTransactions] = useState<SimplifiedStakingTransaction[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedPools = localStorage.getItem('jungle-vault-simplified-pools');
    const savedStakes = localStorage.getItem('jungle-vault-simplified-stakes');
    const savedTransactions = localStorage.getItem('jungle-vault-simplified-transactions');
    
    // Always initialize with sample data for demo (comment out these lines if you want to persist data)
    if (!savedPools || savedPools === '[]') {
      initializeSampleData();
    } else {
      setPools(JSON.parse(savedPools, (key, value) => {
        if (key === 'createdAt' || key === 'endDate' || key === 'timestamp' || key === 'claimedAt') {
          return value ? new Date(value) : null;
        }
        return value;
      }));
    }
    
    if (savedStakes && savedStakes !== '[]') {
      setStakes(JSON.parse(savedStakes, (key, value) => {
        if (key === 'timestamp') {
          return new Date(value);
        }
        return value;
      }));
    }
    if (savedTransactions && savedTransactions !== '[]') {
      setTransactions(JSON.parse(savedTransactions, (key, value) => {
        if (key === 'timestamp') {
          return new Date(value);
        }
        return value;
      }));
    }
  }, []);

  // Initialize with sample data for demo purposes
  const initializeSampleData = () => {
    const now = new Date();
    const dayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    // Sample stakes
    const sampleStakes: WeightedStake[] = [
      {
        stakeId: 'stake-lionheart-1',
        poolId: 'lionheart',
        stakerId: MOCK_USER_ID,
        amount: 5500,
        nftBoostActive: true,
        nftBoostPercentage: 25,
        timestamp: weekAgo
      },
      {
        stakeId: 'stake-lionheart-2',
        poolId: 'lionheart',
        stakerId: MOCK_USER_ID,
        amount: 3000,
        nftBoostActive: false,
        nftBoostPercentage: 0,
        timestamp: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000)
      },
      {
        stakeId: 'stake-rocket-1',
        poolId: 'rocket100',
        stakerId: MOCK_USER_ID,
        amount: 4200,
        nftBoostActive: false,
        nftBoostPercentage: 0,
        timestamp: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000)
      },
      {
        stakeId: 'stake-globe-1',
        poolId: 'globe',
        stakerId: MOCK_USER_ID,
        amount: 2500,
        nftBoostActive: true,
        nftBoostPercentage: 15,
        timestamp: dayAgo
      }
    ];
    
    // Sample pools - using IDs that match mockPools.ts
    const samplePools: WeightedPool[] = [
      {
        id: 'lionheart',
        name: 'LIONHEART',
        emoji: '🦁❤️',
        config: {
          maxTotalStake: 150000,
          totalRewardBudget: 45000,
          milestoneRewardBudget: 24000,
          baseRewardPool: 21000
        },
        milestones: [
          {
            id: 'early',
            thresholdPercentage: 10,
            thresholdAmount: 15000,
            rewardAmount: 3000,
            claimed: true,
            claimedBy: MOCK_USER_ID,
            claimedAt: dayAgo,
            firstStakerToReach: MOCK_USER_ID
          },
          {
            id: 'halfway',
            thresholdPercentage: 40,
            thresholdAmount: 60000,
            rewardAmount: 6000,
            claimed: false
          },
          {
            id: 'major',
            thresholdPercentage: 80,
            thresholdAmount: 120000,
            rewardAmount: 15000,
            claimed: false
          }
        ],
        nftBoosts: [
          {
            collectionAddress: '0x123...abc',
            boostPercentage: 25,
            enabled: true,
            name: 'Lion Hearts NFT'
          }
        ],
        state: {
          totalStaked: 8500,
          rewardPerToken: 2.47,
          milestonesClaimed: ['early'],
          stakesReachingMilestones: { 'early': 'stake-lionheart-1' },
          utilizationPercentage: 5.7
        },
        stakes: sampleStakes.filter(s => s.poolId === 'lionheart'),
        createdAt: weekAgo
      },
      {
        id: 'rocket100',
        name: 'ROCKET100',
        emoji: '🚀💯',
        config: {
          maxTotalStake: 120000,
          totalRewardBudget: 24000,
          milestoneRewardBudget: 12000,
          baseRewardPool: 12000
        },
        milestones: [
          {
            id: 'early',
            thresholdPercentage: 10,
            thresholdAmount: 12000,
            rewardAmount: 1500,
            claimed: false
          },
          {
            id: 'halfway',
            thresholdPercentage: 40,
            thresholdAmount: 48000,
            rewardAmount: 3000,
            claimed: false
          },
          {
            id: 'major',
            thresholdPercentage: 80,
            thresholdAmount: 96000,
            rewardAmount: 7500,
            claimed: false
          }
        ],
        nftBoosts: [],
        state: {
          totalStaked: 4200,
          rewardPerToken: 2.86,
          milestonesClaimed: [],
          stakesReachingMilestones: {},
          utilizationPercentage: 3.5
        },
        stakes: sampleStakes.filter(s => s.poolId === 'rocket100'),
        createdAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000),
        endDate: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'globe',
        name: 'GLOBE',
        emoji: '🌐',
        config: {
          maxTotalStake: 85000,
          totalRewardBudget: 17000,
          milestoneRewardBudget: 8500,
          baseRewardPool: 8500
        },
        milestones: [
          {
            id: 'early',
            thresholdPercentage: 10,
            thresholdAmount: 8500,
            rewardAmount: 1000,
            claimed: false
          },
          {
            id: 'halfway',
            thresholdPercentage: 40,
            thresholdAmount: 34000,
            rewardAmount: 2500,
            claimed: false
          },
          {
            id: 'major',
            thresholdPercentage: 80,
            thresholdAmount: 68000,
            rewardAmount: 5000,
            claimed: false
          }
        ],
        nftBoosts: [
          {
            collectionAddress: '0x456...def',
            boostPercentage: 15,
            enabled: true,
            name: 'Globe Explorer Collection'
          }
        ],
        state: {
          totalStaked: 2500,
          rewardPerToken: 3.4,
          milestonesClaimed: [],
          stakesReachingMilestones: {},
          utilizationPercentage: 2.9
        },
        stakes: sampleStakes.filter(s => s.poolId === 'globe'),
        createdAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
        endDate: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000)
      }
    ];

    // Sample transactions
    const sampleTransactions: SimplifiedStakingTransaction[] = [
      {
        id: 'tx-1',
        poolId: 'lionheart',
        poolName: 'LIONHEART',
        poolEmoji: '🦁❤️',
        amount: 3000,
        txHash: '0xabc123...def456',
        timestamp: dayAgo,
        type: 'milestone_claim',
        status: 'confirmed',
        milestoneRewards: 3000
      },
      {
        id: 'tx-2',
        poolId: 'lionheart',
        poolName: 'LIONHEART',
        poolEmoji: '🦁❤️',
        amount: 5500,
        txHash: '0x789xyz...123abc',
        timestamp: weekAgo,
        type: 'stake',
        status: 'confirmed'
      }
    ];

    setPools(samplePools);
    setStakes(sampleStakes);
    setTransactions(sampleTransactions);
    
    console.log('Sample data initialized:', { 
      pools: samplePools.length, 
      stakes: sampleStakes.length, 
      transactions: sampleTransactions.length 
    });
  };

  // Save to localStorage when data changes
  useEffect(() => {
    localStorage.setItem('jungle-vault-simplified-pools', JSON.stringify(pools));
  }, [pools]);

  useEffect(() => {
    localStorage.setItem('jungle-vault-simplified-stakes', JSON.stringify(stakes));
  }, [stakes]);

  useEffect(() => {
    localStorage.setItem('jungle-vault-simplified-transactions', JSON.stringify(transactions));
  }, [transactions]);

  const createPool = (poolData: Omit<WeightedPool, 'id' | 'state' | 'stakes' | 'createdAt'>): string => {
    const poolId = `pool-${Date.now()}`;
    
    // Default milestones for new 3-milestone system
    const defaultMilestones = [
      {
        id: 'early',
        label: 'Early Bird (10% capacity)',
        thresholdPercentage: 10,
        thresholdAmount: poolData.config?.maxTotalStake ? (poolData.config.maxTotalStake * 10) / 100 : 1000,
        rewardAmount: 1000,
        claimed: false
      },
      {
        id: 'halfway', 
        label: 'Halfway Hero (40% capacity)',
        thresholdPercentage: 40,
        thresholdAmount: poolData.config?.maxTotalStake ? (poolData.config.maxTotalStake * 40) / 100 : 4000,
        rewardAmount: 2000,
        claimed: false
      },
      {
        id: 'major',
        label: 'Major Milestone (80% capacity)',
        thresholdPercentage: 80,
        thresholdAmount: poolData.config?.maxTotalStake ? (poolData.config.maxTotalStake * 80) / 100 : 8000,
        rewardAmount: 5000,
        claimed: false
      }
    ];

    const newPool: WeightedPool = {
      ...poolData,
      id: poolId,
      stakes: [],
      milestones: poolData.milestones || defaultMilestones,
      state: {
        totalStaked: 0,
        rewardPerToken: 0,
        milestonesClaimed: [],
        stakesReachingMilestones: {},
        utilizationPercentage: 0
      },
      createdAt: new Date()
    };

    setPools(prev => [...prev, newPool]);
    return poolId;
  };

  const getPool = (poolId: string): WeightedPool | undefined => {
    return pools.find(pool => pool.id === poolId);
  };

  const getPoolState = (poolId: string): PoolWeightedState | undefined => {
    const pool = getPool(poolId);
    return pool?.state;
  };

  const addStake = async (
    poolId: string, 
    amount: number, 
    lockPeriodDays: number,
    nftBoostActive: boolean = false,
    nftBoostPercentage: number = 0,
    txHash: string
  ): Promise<{ success: boolean; error?: string; stakeId?: string }> => {
    const pool = getPool(poolId);
    if (!pool) {
      return { success: false, error: 'Pool not found' };
    }

    // Validate capacity
    const validation = validateStakeCapacity(
      pool.state.totalStaked,
      amount,
      pool.config.maxTotalStake
    );

    if (!validation.valid) {
      return { success: false, error: validation.error };
    }

    const stakeId = `stake-${Date.now()}`;

    const newStake: WeightedStake = {
      stakeId,
      poolId,
      stakerId: MOCK_USER_ID,
      amount,
      nftBoostActive,
      nftBoostPercentage,
      timestamp: new Date()
    };

    // Update stakes
    setStakes(prev => [...prev, newStake]);

    // Update pool with new stake and recalculate state
    setPools(prev => prev.map(p => {
      if (p.id === poolId) {
        const updatedStakes = [...p.stakes, newStake];
        const newState = updatePoolState(updatedStakes, p.config, p.milestones);
        return {
          ...p,
          stakes: updatedStakes,
          state: newState
        };
      }
      return p;
    }));

    // Create transaction
    const transaction: SimplifiedStakingTransaction = {
      id: Date.now().toString(),
      poolId,
      poolName: pool.name,
      poolEmoji: pool.emoji,
      amount,
      txHash,
      timestamp: new Date(),
      type: 'stake',
      status: 'confirmed'
    };

    setTransactions(prev => [...prev, transaction]);

    return { success: true, stakeId };
  };

  const removeStake = (stakeId: string) => {
    const stake = stakes.find(s => s.stakeId === stakeId);
    if (!stake) return;

    // Remove stake
    setStakes(prev => prev.filter(s => s.stakeId !== stakeId));

    // Update pool state
    setPools(prev => prev.map(p => {
      if (p.id === stake.poolId) {
        const updatedStakes = p.stakes.filter(s => s.stakeId !== stakeId);
        const newState = updatePoolState(updatedStakes, p.config, p.milestones);
        return {
          ...p,
          stakes: updatedStakes,
          state: newState
        };
      }
      return p;
    }));
  };

  const claimRewards = async (stakeId: string): Promise<{ success: boolean; rewards: RewardCalculation | null }> => {
    const rewards = calculateRewardsForStake(stakeId);
    if (!rewards) {
      return { success: false, rewards: null };
    }

    const stake = stakes.find(s => s.stakeId === stakeId);
    if (!stake) {
      return { success: false, rewards: null };
    }

    const pool = getPool(stake.poolId);
    if (!pool) {
      return { success: false, rewards: null };
    }

    // Create claim transaction
    const transaction: SimplifiedStakingTransaction = {
      id: Date.now().toString(),
      poolId: stake.poolId,
      poolName: pool.name,
      poolEmoji: pool.emoji,
      amount: rewards.finalReward,
      txHash: `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 6)}`,
      timestamp: new Date(),
      type: 'claim',
      status: 'confirmed',
      milestoneRewards: rewards.milestoneBonus,
      nftBonus: rewards.nftBonus
    };

    setTransactions(prev => [...prev, transaction]);

    return { success: true, rewards };
  };

  const claimMilestoneReward = async (poolId: string, milestoneId: string): Promise<{ success: boolean; amount?: number }> => {
    const pool = getPool(poolId);
    if (!pool) {
      return { success: false };
    }

    const milestone = pool.milestones.find(m => m.id === milestoneId);
    if (!milestone || milestone.claimed) {
      return { success: false };
    }

    // Mark milestone as claimed
    setPools(prev => prev.map(p => {
      if (p.id === poolId) {
        return {
          ...p,
          milestones: p.milestones.map(m => 
            m.id === milestoneId 
              ? { ...m, claimed: true, claimedBy: MOCK_USER_ID, claimedAt: new Date() }
              : m
          )
        };
      }
      return p;
    }));

    return { success: true, amount: milestone.rewardAmount };
  };

  const getStakesByPoolId = (poolId: string): WeightedStake[] => {
    return stakes.filter(stake => stake.poolId === poolId);
  };

  const getStakesByStakerId = (stakerId: string): WeightedStake[] => {
    return stakes.filter(stake => stake.stakerId === stakerId);
  };

  const calculateRewardsForStake = (stakeId: string): RewardCalculation | null => {
    const stake = stakes.find(s => s.stakeId === stakeId);
    if (!stake) return null;

    const pool = getPool(stake.poolId);
    if (!pool) return null;

    const allRewards = calculatePoolRewards(pool.stakes, pool.config, pool.milestones, pool.nftBoosts);
    return allRewards.find(r => r.stakeId === stakeId) || null;
  };

  const calculatePoolRewardsForAll = (poolId: string): RewardCalculation[] => {
    const pool = getPool(poolId);
    if (!pool) return [];

    return calculatePoolRewards(pool.stakes, pool.config, pool.milestones, pool.nftBoosts);
  };

  // Stats calculations (simplified, no weighted amounts)
  const totalStaked = stakes.reduce((sum, stake) => sum + stake.amount, 0);
  const totalPools = pools.length;
  const activePools = pools.filter(pool => !pool.endDate || pool.endDate > new Date()).length;

  return (
    <SimplifiedStakingContext.Provider value={{
      pools,
      stakes,
      transactions,
      createPool,
      getPool,
      getPoolState,
      addStake,
      removeStake,
      claimRewards,
      claimMilestoneReward,
      getStakesByPoolId,
      getStakesByStakerId,
      calculateRewardsForStake,
      calculatePoolRewardsForAll,
      totalStaked,
      totalPools,
      activePools
    }}>
      {children}
    </SimplifiedStakingContext.Provider>
  );
};

export const useSimplifiedStaking = () => {
  const context = useContext(SimplifiedStakingContext);
  if (context === undefined) {
    throw new Error('useSimplifiedStaking must be used within a SimplifiedStakingProvider');
  }
  return context;
};

// Maintain backward compatibility
export const WeightedStakingProvider = SimplifiedStakingProvider;
export const useWeightedStaking = useSimplifiedStaking;