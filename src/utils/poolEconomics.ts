import { LockDurationOption, CreatePoolFormData, PoolParameters } from '@/types/createPool';
import { CreatorRewardMilestone, CreatorRewardProgress } from '@/types/creatorRewards';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

// Minimum reward percentage requirements for each duration
export const MINIMUM_REWARD_PERCENTAGE_BY_DURATION: { [key: string]: number } = {
  '30d': 5,    // 5% reward percentage minimum for 30 days
  '60d': 10,   // 10% reward percentage minimum for 60 days  
  '90d': 20,   // 20% reward percentage minimum for 90 days
  '12m': 50    // 50% reward percentage minimum for 12 months
};

// Available lock duration options (no multipliers - equal reward distribution)
export const AVAILABLE_DURATIONS: LockDurationOption[] = [
  { id: '30d', name: '30 Days', emoji: '🔒', days: 30 },
  { id: '60d', name: '60 Days', emoji: '🔒', days: 60 },
  { id: '90d', name: '90 Days', emoji: '🔒', days: 90 },
  { id: '12m', name: '12 Months', emoji: '🔒', days: 365 }
];

// Get minimum reward percentage for a duration
export const getMinimumRewardPercentage = (duration: LockDurationOption | null): number => {
  if (!duration) return 20; // Default minimum
  return MINIMUM_REWARD_PERCENTAGE_BY_DURATION[duration.id] || 20;
};

// Calculate max pool size using the formula: MaxPool = RewardAmount / (RewardPercentage / 100)
export const calculateMaxPoolSize = (rewardAmount: number, rewardPercentage: number): number => {
  if (rewardAmount <= 0 || rewardPercentage <= 0) return 0;
  
  const maxPool = rewardAmount / (rewardPercentage / 100);
  return Math.floor(maxPool);
};

// Calculate minimum reward amount based on duration
export const calculateMinimumRewardByDuration = (duration: LockDurationOption | null): number => {
  if (!duration) return 1000; // Default minimum when no duration selected
  
  const minimumRewards: { [key: string]: number } = {
    '30d': 1000,   // 1,000 tokens for 30 days
    '60d': 2000,   // 2,000 tokens for 60 days
    '90d': 4000,   // 4,000 tokens for 90 days
    '12m': 10000   // 10,000 tokens for 12 months
  };
  
  return minimumRewards[duration.id] || 1000;
};

// Get recommended reward range for a duration
export const getRecommendedRewardRange = (duration: LockDurationOption | null, maxPoolSize: number): { min: number; max: number; optimal: number } => {
  if (!duration || maxPoolSize <= 0) return { min: 500, max: 5000, optimal: 1000 };
  
  const minimum = calculateMinimumRewardByDuration(duration);
  // Target reward percentage ranges
  const targetRewardPercentages = {
    '30d': { min: 50, max: 200, optimal: 100 },
    '60d': { min: 30, max: 150, optimal: 75 },
    '90d': { min: 20, max: 100, optimal: 50 },
    '12m': { min: 10, max: 50, optimal: 25 }
  };
  
  const targets = targetRewardPercentages[duration.id as keyof typeof targetRewardPercentages] || targetRewardPercentages['30d'];
  
  // Calculate reward amounts based on target reward percentages
  const minReward = Math.max(minimum, Math.floor((targets.min / 100) * maxPoolSize));
  const maxReward = Math.floor((targets.max / 100) * maxPoolSize);
  const optimalReward = Math.floor((targets.optimal / 100) * maxPoolSize);
  
  return { min: minReward, max: maxReward, optimal: optimalReward };
};

// Calculate reward percentage based on reward amount and pool size (reverse calculation)
export const calculateRewardPercentageFromPoolSize = (rewardAmount: number, maxPoolSize: number): number => {
  if (rewardAmount <= 0 || maxPoolSize <= 0) return 0;
  
  // Reward % = (reward / pool size) * 100
  const rewardPercentage = (rewardAmount / maxPoolSize) * 100;
  return Math.round(rewardPercentage * 10) / 10; // Round to 1 decimal place
};

// Validate reward percentage is within reasonable bounds
export const validateRewardPercentage = (rewardPercentage: number): { isValid: boolean; message?: string } => {
  if (rewardPercentage < 5) return { isValid: false, message: 'Reward percentage too low (min 5%) - increase reward amount or decrease pool size' };
  if (rewardPercentage > 300) return { isValid: false, message: 'Reward percentage too high (max 300%) - decrease reward amount or increase pool size' };
  return { isValid: true };
};

// Validate pool parameters
export const validatePoolParameters = (params: PoolParameters): ValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  if (!params.selectedDuration) {
    errors.push('Please select a lock duration');
  }
  
  if (params.baseRewardAmount <= 0) {
    errors.push('Reward amount must be greater than 0');
  }
  
  // Check dynamic minimum based on selected duration
  const minimumRequired = calculateMinimumRewardByDuration(params.selectedDuration);
  if (params.baseRewardAmount < minimumRequired) {
    errors.push(`Minimum ${minimumRequired.toLocaleString()} tokens required for ${params.selectedDuration?.name || 'selected duration'}`);
  }
  
  if (params.maxPoolSize <= 0) {
    errors.push('Max pool size must be greater than 0');
  }
  
  const rewardPercentageValidation = validateRewardPercentage(params.effectiveRewardPercentage);
  if (!rewardPercentageValidation.isValid && rewardPercentageValidation.message) {
    errors.push(rewardPercentageValidation.message);
  }
  
if (params.effectiveRewardPercentage < 10) {
  warnings.push('Low reward percentage may not attract stakers');
}

if (params.effectiveRewardPercentage > 300) {
  warnings.push('Very high reward percentage - ensure sustainability');
}
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};

// Validate simplified pool creation form
export const validateSimplifiedPool = (formData: CreatePoolFormData): ValidationResult => {
  return validatePoolParameters(formData.poolParameters);
};

// Generate economic warnings for simplified pool
export const generateSimplifiedWarnings = (formData: CreatePoolFormData): string[] => {
  const warnings: string[] = [];
  const params = formData.poolParameters;
  
  if (params.maxPoolSize < 10000) {
    warnings.push('Low pool size may limit staker participation');
  }
  
  if (params.baseRewardAmount / params.maxPoolSize < 0.05) {
    warnings.push('Low reward ratio may not attract stakers');
  }
  
  return warnings;
};

// Get economic health score for simplified pool
export const getSimplifiedHealthScore = (formData: CreatePoolFormData): 'healthy' | 'warning' | 'critical' => {
  const validation = validateSimplifiedPool(formData);
  
  if (!validation.isValid) return 'critical';
  if (validation.warnings.length > 0) return 'warning';
  
  return 'healthy';
};

// Creator Rewards - LIONHEART milestone system
// Calculate creator LIONHEART allocation based on reward contribution
export function calculateCreatorLionheartAllocation(rewardContribution: number): number {
  return rewardContribution * 0.1; // 10% of reward contribution
}

// Calculate earned LIONHEART based on current utilization
export function calculateEarnedLionheart(currentUtilization: number, totalAllocated: number): number {
  // Progressive payout: only get rewards proportional to pool utilization
  const earnedPercentage = Math.min(currentUtilization, 100) / 100;
  return totalAllocated * earnedPercentage;
}

export const calculateCreatorRewardMilestones = (
  rewardContribution: number, 
  totalStakingCapacity: number
): CreatorRewardMilestone[] => {
  const totalLionheartAllocated = calculateCreatorLionheartAllocation(rewardContribution);
  const lionheartPerMilestone = totalLionheartAllocated / 5; // 5 milestones

  const milestonePercentages = [20, 40, 60, 80, 100];
  
  return milestonePercentages.map((percentage, index) => ({
    id: `milestone-${percentage}`,
    percentage,
    utilizationThreshold: (totalStakingCapacity * percentage) / 100,
    lionheartReward: lionheartPerMilestone,
    achieved: false,
    claimed: false,
    description: `${percentage}% utilization milestone`
  }));
};

// Calculate creator reward progress for simplified pool
export const calculateSimplifiedCreatorRewards = (formData: CreatePoolFormData): CreatorRewardProgress => {
  const params = formData.poolParameters;
  
  // Calculate LIONHEART allocation (10% of reward amount)
  const totalLionheartAllocated = calculateCreatorLionheartAllocation(params.baseRewardAmount);

  // Generate creator milestones based on max pool size
  const milestones = calculateCreatorRewardMilestones(params.baseRewardAmount, params.maxPoolSize);

  // For demo purposes, assume 30% current utilization
  const currentUtilization = 0.3;
  const currentStaked = Math.floor(params.maxPoolSize * currentUtilization);
  const earnedLionheart = calculateEarnedLionheart(currentUtilization, totalLionheartAllocated);

  return {
    totalLionheartAllocated,
    claimedLionheart: Math.floor(earnedLionheart * 0.6), // 60% claimed for demo
    milestones,
    currentUtilization: currentUtilization * 100,
    currentStaked,
    totalStakingCapacity: params.maxPoolSize
  };
};

// Suggested milestone percentages for pool creators
export const SUGGESTED_MILESTONE_PERCENTAGES = [
  { percentage: 10, label: '10%' },
  { percentage: 25, label: '25%' },
  { percentage: 50, label: '50%' },
  { percentage: 75, label: '75%' }
];

export const calculateMilestoneThreshold = (percentage: number, totalStakingCapacity: number): number => {
  return Math.floor((percentage / 100) * totalStakingCapacity);
};

export const updateMilestonesWithCapacity = (milestones: any[], totalStakingCapacity: number) => {
  return milestones.map(milestone => ({
    ...milestone,
    threshold: calculateMilestoneThreshold(milestone.thresholdPercentage, totalStakingCapacity)
  }));
};