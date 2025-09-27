
import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserStake } from '@/types/dashboard';

interface StakingTransaction {
  id: string;
  poolId: string;
  poolName: string;
  poolEmoji: string;
  amount: number;
  txHash: string;
  timestamp: Date;
  type: 'stake' | 'unstake' | 'claim';
  status: 'pending' | 'confirmed' | 'failed';
}

interface StakingContextType {
  stakes: UserStake[];
  transactions: StakingTransaction[];
  addStake: (poolId: string, poolName: string, poolEmoji: string, amount: number, lockDuration: { name: string; days: number; rewardsPercentage: string }, rewardToken: string, rewardTokenType: 'APT' | 'NATIVE', txHash: string) => void;
  removeStake: (poolId: string) => void;
  claimRewards: (poolId: string) => void;
  getStakeByPoolId: (poolId: string) => UserStake | undefined;
  totalStaked: number;
  totalRewards: number;
  activePools: number;
}

const StakingContext = createContext<StakingContextType | undefined>(undefined);

export const StakingProvider = ({ children }: { children: React.ReactNode }) => {
  const [stakes, setStakes] = useState<UserStake[]>([]);
  const [transactions, setTransactions] = useState<StakingTransaction[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedStakes = localStorage.getItem('jungle-vault-stakes');
    const savedTransactions = localStorage.getItem('jungle-vault-transactions');
    
    if (savedStakes) {
      setStakes(JSON.parse(savedStakes));
    }
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    }
  }, []);

  // Save to localStorage when stakes change
  useEffect(() => {
    localStorage.setItem('jungle-vault-stakes', JSON.stringify(stakes));
  }, [stakes]);

  useEffect(() => {
    localStorage.setItem('jungle-vault-transactions', JSON.stringify(transactions));
  }, [transactions]);

  // Simulate reward accumulation
  useEffect(() => {
    const interval = setInterval(() => {
      setStakes(prevStakes => 
        prevStakes.map(stake => {
          if (stake.status === 'active') {
            const rewardsPercentage = parseFloat(stake.lockDuration.rewardsPercentage.replace('%', ''));
            const currentRewards = parseFloat(stake.rewards);
            const stakedAmount = parseFloat(stake.amountStaked);
            
            // Calculate daily reward increase (simplified)
            const dailyIncrease = (stakedAmount * rewardsPercentage) / 365 / 100;
            const newRewards = currentRewards + (dailyIncrease / 24 / 60); // Per minute for demo
            
            return {
              ...stake,
              rewards: newRewards.toFixed(4)
            };
          }
          return stake;
        })
      );
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const addStake = (
    poolId: string,
    poolName: string,
    poolEmoji: string,
    amount: number,
    lockDuration: { name: string; days: number; rewardsPercentage: string },
    rewardToken: string,
    rewardTokenType: 'APT' | 'NATIVE',
    txHash: string
  ) => {
    const newStake: UserStake = {
      poolId,
      emoji: poolEmoji,
      name: poolName,
      amountStaked: amount.toString(),
      rewards: '0',
      rewardToken,
      rewardTokenType,
      status: 'active',
      lockDuration,
      timeRemaining: lockDuration.name === 'Flexible' ? undefined : `${lockDuration.days} days`,
      stakingCapacity: {
        maxStakeable: 100000,
        currentStaked: 50000,
        utilizationRate: 50
      },
      milestoneProgress: {
        currentMilestone: 25,
        nextMilestoneAt: 50,
        bonusEarned: '+5% Rewards'
      },
      nftBoostActive: false
    };

    const transaction: StakingTransaction = {
      id: Date.now().toString(),
      poolId,
      poolName,
      poolEmoji,
      amount,
      txHash,
      timestamp: new Date(),
      type: 'stake',
      status: 'confirmed'
    };

    setStakes(prev => [...prev, newStake]);
    setTransactions(prev => [...prev, transaction]);
  };

  const removeStake = (poolId: string) => {
    setStakes(prev => prev.filter(stake => stake.poolId !== poolId));
  };

  const claimRewards = (poolId: string) => {
    const stake = stakes.find(s => s.poolId === poolId);
    if (!stake) return;

    const transaction: StakingTransaction = {
      id: Date.now().toString(),
      poolId,
      poolName: stake.name,
      poolEmoji: stake.emoji,
      amount: parseFloat(stake.rewards),
      txHash: `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 6)}`,
      timestamp: new Date(),
      type: 'claim',
      status: 'confirmed'
    };

    setStakes(prev => 
      prev.map(s => 
        s.poolId === poolId 
          ? { ...s, rewards: '0' }
          : s
      )
    );
    setTransactions(prev => [...prev, transaction]);
  };

  const getStakeByPoolId = (poolId: string) => {
    return stakes.find(stake => stake.poolId === poolId);
  };

  const totalStaked = stakes.reduce((sum, stake) => sum + parseFloat(stake.amountStaked), 0);
  const totalRewards = stakes.reduce((sum, stake) => sum + parseFloat(stake.rewards), 0);
  const activePools = stakes.filter(stake => stake.status === 'active').length;

  return (
    <StakingContext.Provider value={{
      stakes,
      transactions,
      addStake,
      removeStake,
      claimRewards,
      getStakeByPoolId,
      totalStaked,
      totalRewards,
      activePools
    }}>
      {children}
    </StakingContext.Provider>
  );
};

export const useStaking = () => {
  const context = useContext(StakingContext);
  if (context === undefined) {
    throw new Error('useStaking must be used within a StakingProvider');
  }
  return context;
};
