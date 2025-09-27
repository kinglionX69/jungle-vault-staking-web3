import { useMemo } from 'react';
import { useSimplifiedStaking } from '@/contexts/WeightedStakingContext';
import { NewDashboardData, DashboardStake, DashboardNFTBoost, DashboardMilestone, DashboardSummary, DashboardCreatedPool } from '@/types/dashboardNew';

const MOCK_USER_ID = 'user-123';

export const useDashboardData = (): NewDashboardData => {
  const {
    pools,
    stakes,
    transactions,
    calculateRewardsForStake,
    getStakesByStakerId,
    totalStaked,
    activePools
  } = useSimplifiedStaking();

  const dashboardData = useMemo(() => {
    const userStakes = getStakesByStakerId(MOCK_USER_ID);
    
    // Convert stakes to dashboard format
    const dashboardStakes: DashboardStake[] = userStakes.map(stake => {
      const pool = pools.find(p => p.id === stake.poolId);
      const rewards = calculateRewardsForStake(stake.stakeId);
      
      if (!pool || !rewards) {
        return {
          stakeId: stake.stakeId,
          poolId: stake.poolId,
          poolEmoji: '❓',
          poolName: 'Unknown Pool',
          amount: stake.amount,
          rewards: 0,
          rewardToken: 'APT',
          rewardTokenType: 'APT',
          status: 'active',
          nftBoostActive: stake.nftBoostActive,
          nftBoostPercentage: stake.nftBoostPercentage,
          milestoneRewards: 0,
          finalReward: 0,
          timestamp: stake.timestamp,
          utilizationRate: 0
        };
      }

      // Determine status: ended if pool has end date in past, active otherwise
      // For demo purposes, let's make some pools ended to show the new logic
      const isEnded = pool.endDate && pool.endDate < new Date();
      let status: 'active' | 'ended' | 'claimed' = isEnded ? 'ended' : 'active';
      
      // For demo: make some pools ended based on pool name or ID
      if (pool.name.includes('ROCKET') || pool.id === 'rocket100') {
        status = 'ended';
      }

      return {
        stakeId: stake.stakeId,
        poolId: stake.poolId,
        poolEmoji: pool.emoji,
        poolName: pool.name,
        amount: stake.amount,
        rewards: rewards.baseReward + rewards.nftBonus,
        rewardToken: pool.name,
        rewardTokenType: 'NATIVE',
        status,
        nftBoostActive: stake.nftBoostActive,
        nftBoostPercentage: stake.nftBoostPercentage,
        milestoneRewards: rewards.milestoneBonus,
        finalReward: rewards.finalReward,
        timestamp: stake.timestamp,
        utilizationRate: pool.state.utilizationPercentage
      };
    });

    // Get NFT boosts for user stakes
    const nftBoosts: DashboardNFTBoost[] = [];
    userStakes.forEach(stake => {
      if (stake.nftBoostActive) {
        const pool = pools.find(p => p.id === stake.poolId);
        if (pool) {
          // Mock image URLs based on pool emoji
          const mockImages = {
            '🦁❤️': '/lovable-uploads/51cc5243-4093-47ba-bb38-079732d93099.png',
            '🧧': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=64&h=64&fit=crop',
            '🍀': 'https://images.unsplash.com/photo-1520637836862-4d197d17c55a?w=64&h=64&fit=crop',
            '🌐': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=64&h=64&fit=crop',
            '⛱️': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=64&h=64&fit=crop',
            '🐢': 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=64&h=64&fit=crop',
            '⭐': 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=64&h=64&fit=crop',
            '🐻': 'https://images.unsplash.com/photo-1516642926395-4b9c72b2a8c7?w=64&h=64&fit=crop'
          };
          
          // Mock lock durations
          const lockDurations = [
            { name: 'Flexible', days: 0 },
            { name: '30 Days', days: 30 },
            { name: '60 Days', days: 60 },
            { name: '90 Days', days: 90 },
            { name: '120 Days', days: 120 }
          ];
          
          nftBoosts.push({
            nft: `${pool.name} NFT`,
            emoji: pool.emoji,
            boost: `+${stake.nftBoostPercentage}%`,
            appliesTo: pool.name,
            poolId: pool.id,
            active: true,
            imageUrl: mockImages[pool.emoji as keyof typeof mockImages] || '/proud-lion-logo.png',
            lockDuration: lockDurations[Math.floor(Math.random() * lockDurations.length)],
            stakeAmount: stake.amount
          });
        }
      }
    });

    // Get milestones for user (using new fixed thresholds: 10%, 40%, 80%)
    const milestones: DashboardMilestone[] = [];
    pools.forEach(pool => {
      pool.milestones.forEach(milestone => {
        const achieved = pool.state.utilizationPercentage >= milestone.thresholdPercentage;
        const milestoneNames = {
          10: 'Early Bird',
          40: 'Halfway Hero', 
          80: 'Major Milestone'
        };
        
        milestones.push({
          pool: pool.name,
          emoji: pool.emoji,
          milestone: milestoneNames[milestone.thresholdPercentage as keyof typeof milestoneNames] || `${milestone.thresholdPercentage}% milestone`,
          rewardAmount: milestone.rewardAmount,
          date: new Date(), // Would be actual achievement date
          achieved,
          progress: pool.state.utilizationPercentage,
          thresholdPercentage: milestone.thresholdPercentage,
          poolId: pool.id
        });
      });
    });

    // Calculate summary
    const totalRewards = dashboardStakes.reduce((sum, stake) => sum + stake.finalReward, 0);
    const boostedPools = dashboardStakes.filter(stake => stake.nftBoostActive).length;
    
    // Check if user is a creator (has created any pools)
    // For now, we'll assume the user is a creator if there are pools available
    // TODO: Add proper createdBy field to WeightedPool type
    const userCreatedPools = pools; // Temporary: show all pools as user-created
    const isCreator = pools.length > 0;
    
    let creatorStats;
    if (isCreator) {
      const totalCapacity = userCreatedPools.reduce((sum, pool) => sum + pool.config.maxTotalStake, 0);
      const lionheartEarned = userCreatedPools.reduce((sum, pool) => {
        return sum + pool.milestones
          .filter(m => m.claimed)
          .reduce((milestoneSum, m) => milestoneSum + m.rewardAmount, 0);
      }, 0);
      const lionheartPotential = userCreatedPools.reduce((sum, pool) => {
        return sum + pool.milestones.reduce((milestoneSum, m) => milestoneSum + m.rewardAmount, 0);
      }, 0);

      creatorStats = {
        poolsCreated: userCreatedPools.length,
        totalCapacityProvided: totalCapacity,
        lionheartEarned,
        lionheartPotential
      };
    }

    const summary: DashboardSummary = {
      totalStaked,
      totalRewards,
      activePools: userStakes.length,
      boostedPools,
      roarScore: Math.min(100, Math.max(0, (totalStaked / 1000) + (boostedPools * 10) + (activePools * 5))),
      creatorStats
    };

    // Created pools (for creators)
    const createdPools: DashboardCreatedPool[] = userCreatedPools.map(pool => ({
      poolId: pool.id,
      emoji: pool.emoji,
      name: pool.name,
      tvl: pool.state.totalStaked,
      utilizationRate: pool.state.utilizationPercentage,
      maxCapacity: pool.config.maxTotalStake,
      currentStaked: pool.state.totalStaked,
      milestones: pool.milestones.map(m => ({
        percentage: m.thresholdPercentage,
        achieved: m.claimed || pool.state.utilizationPercentage >= m.thresholdPercentage,
        lionheartReward: m.rewardAmount
      })),
      totalLionheartEarned: pool.milestones
        .filter(m => m.claimed)
        .reduce((sum, m) => sum + m.rewardAmount, 0),
      activeDuration: pool.endDate 
        ? `${Math.ceil((pool.endDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days`
        : 'Ongoing',
      status: pool.endDate && pool.endDate < new Date() ? 'ended' : 'active'
    }));

    return {
      stakes: dashboardStakes,
      nftBoosts,
      milestones,
      summary,
      createdPools,
      isCreator
    };
  }, [pools, stakes, transactions, totalStaked, activePools]);

  return dashboardData;
};