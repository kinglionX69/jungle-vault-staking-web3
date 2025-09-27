import { 
  WeightedStake, 
  MilestoneReward, 
  RewardCalculation, 
  PoolWeightedState,
  WeightedStakingConfig,
  NFTBoostConfig 
} from '@/types/weightedStaking';

/**
 * Calculate total staked amount (no multipliers needed)
 */
export const calculateTotalStaked = (stakes: WeightedStake[]): number => {
  return stakes.reduce((total, stake) => total + stake.amount, 0);
};

/**
 * Calculate reward per token (equal distribution)
 */
export const calculateRewardPerToken = (
  baseRewardPool: number, 
  totalStaked: number
): number => {
  if (totalStaked === 0) return 0;
  return baseRewardPool / totalStaked;
};

/**
 * Calculate base reward for a specific stake (no multipliers)
 */
export const calculateBaseReward = (
  stakeAmount: number, 
  rewardPerToken: number
): number => {
  return stakeAmount * rewardPerToken;
};

/**
 * Calculate NFT bonus reward
 */
export const calculateNFTBonus = (
  baseReward: number, 
  nftBoostPercentage: number
): number => {
  return baseReward * (nftBoostPercentage / 100);
};

/**
 * Check if a stake qualifies for milestone rewards
 */
export const checkMilestoneEligibility = (
  stakes: WeightedStake[],
  milestones: MilestoneReward[],
  maxTotalStake: number
): { [stakeId: string]: string[] } => {
  const eligibility: { [stakeId: string]: string[] } = {};
  
  // Sort stakes by timestamp to determine first-to-reach
  const sortedStakes = [...stakes].sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  
  let cumulativeStake = 0;
  const milestoneReached: { [milestoneId: string]: boolean } = {};
  
  for (const stake of sortedStakes) {
    cumulativeStake += stake.amount;
    const utilizationPercentage = (cumulativeStake / maxTotalStake) * 100;
    
    eligibility[stake.stakeId] = [];
    
    for (const milestone of milestones) {
      if (!milestoneReached[milestone.id] && 
          utilizationPercentage >= milestone.thresholdPercentage) {
        eligibility[stake.stakeId].push(milestone.id);
        milestoneReached[milestone.id] = true;
      }
    }
  }
  
  return eligibility;
};

/**
 * Calculate comprehensive rewards for all stakes in a pool (simplified, no multipliers)
 */
export const calculatePoolRewards = (
  stakes: WeightedStake[],
  config: WeightedStakingConfig,
  milestones: MilestoneReward[],
  nftBoosts: NFTBoostConfig[]
): RewardCalculation[] => {
  const totalStaked = calculateTotalStaked(stakes);
  const rewardPerToken = calculateRewardPerToken(
    config.baseRewardPool, 
    totalStaked
  );
  
  const milestoneEligibility = checkMilestoneEligibility(stakes, milestones, config.maxTotalStake);
  
  return stakes.map(stake => {
    const baseReward = calculateBaseReward(stake.amount, rewardPerToken);
    const nftBonus = stake.nftBoostActive 
      ? calculateNFTBonus(baseReward, stake.nftBoostPercentage)
      : 0;
    
    // Calculate milestone bonus
    const eligibleMilestones = milestoneEligibility[stake.stakeId] || [];
    const milestoneBonus = eligibleMilestones.reduce((total, milestoneId) => {
      const milestone = milestones.find(m => m.id === milestoneId);
      return total + (milestone?.rewardAmount || 0);
    }, 0);
    
    const finalReward = baseReward + nftBonus + milestoneBonus;
    
    return {
      stakerId: stake.stakerId,
      stakeId: stake.stakeId,
      baseReward,
      nftBonus,
      milestoneBonus,
      finalReward,
      rewardPerToken,
      stakeAmount: stake.amount
    };
  });
};

/**
 * Update pool state after new stake or unstake (simplified)
 */
export const updatePoolState = (
  stakes: WeightedStake[],
  config: WeightedStakingConfig,
  milestones: MilestoneReward[]
): PoolWeightedState => {
  const totalStaked = calculateTotalStaked(stakes);
  const rewardPerToken = calculateRewardPerToken(
    config.baseRewardPool,
    totalStaked
  );
  
  const utilizationPercentage = (totalStaked / config.maxTotalStake) * 100;
  
  // Check which milestones have been reached
  const milestonesClaimed: string[] = [];
  const stakesReachingMilestones: { [milestoneId: string]: string } = {};
  
  const milestoneEligibility = checkMilestoneEligibility(stakes, milestones, config.maxTotalStake);
  
  Object.entries(milestoneEligibility).forEach(([stakeId, milestoneIds]) => {
    milestoneIds.forEach(milestoneId => {
      if (!stakesReachingMilestones[milestoneId]) {
        stakesReachingMilestones[milestoneId] = stakeId;
        milestonesClaimed.push(milestoneId);
      }
    });
  });
  
  return {
    totalStaked,
    rewardPerToken,
    milestonesClaimed,
    stakesReachingMilestones,
    utilizationPercentage
  };
};

/**
 * Calculate milestone thresholds based on max total stake
 */
export const calculateMilestoneThresholds = (
  milestones: MilestoneReward[],
  maxTotalStake: number
): MilestoneReward[] => {
  return milestones.map(milestone => ({
    ...milestone,
    thresholdAmount: Math.floor((milestone.thresholdPercentage / 100) * maxTotalStake)
  }));
};

/**
 * Validate if a new stake would exceed pool capacity
 */
export const validateStakeCapacity = (
  currentTotalStaked: number,
  newStakeAmount: number,
  maxTotalStake: number
): { valid: boolean; error?: string } => {
  const newTotal = currentTotalStaked + newStakeAmount;
  
  if (newTotal > maxTotalStake) {
    return {
      valid: false,
      error: `Stake would exceed pool capacity. Available: ${maxTotalStake - currentTotalStaked} tokens`
    };
  }
  
  return { valid: true };
};

/**
 * Get pool utilization status
 */
export const getPoolUtilizationStatus = (
  utilizationPercentage: number
): 'low' | 'medium' | 'high' | 'full' => {
  if (utilizationPercentage >= 100) return 'full';
  if (utilizationPercentage >= 75) return 'high';
  if (utilizationPercentage >= 25) return 'medium';
  return 'low';
};