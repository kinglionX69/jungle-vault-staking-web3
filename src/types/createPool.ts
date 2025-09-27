
import { CreatorRewardProgress } from '@/types/creatorRewards';

export interface TokenOption {
  id: string;
  name: string;
  emoji: string;
  symbol: string;
  balance: string;
}

export interface NFTBoost {
  collectionAddress: string;
  boostPercentage: number;
  budgetImpact: number; // Additional rewards needed
  adjustmentMethod: 'ADD_REWARDS' | 'ADJUST_APR';
}

export interface PoolMilestone {
  id: 'early' | 'halfway' | 'major';
  label: string;
  thresholdPercentage: 10 | 40 | 80; // Fixed values
  enabled: boolean;
  bonusPercentage: number;
  budgetImpact: number; // Additional rewards needed
}

export interface LockDurationOption {
  id: string;
  name: string;
  emoji: string;
  days: number; // -1 for flexible
}

export interface PoolParameters {
  selectedDuration: LockDurationOption | null;
  baseRewardAmount: number; // Original amount
  additionalRewardBudget: number; // For boosts & milestones
  totalRewardBudget: number; // Combined
  selectedRewardPercentage: number; // User-selected reward percentage (min based on duration)
  maxPoolSize: number; // Auto-calculated based on reward amount and reward percentage
  baseRewardPercentage: number; // Without bonuses
  effectiveRewardPercentage: number; // With bonuses factored in
}

export type PaymentMethod = 'APT' | 'LIONHEART';

export interface PaymentInfo {
  method: PaymentMethod;
  aptCost: number;
  lionheartCost?: number;
  originalLionheartCost?: number;
  savings?: number;
}

export interface CreatePoolFormData {
  // Step 1: Token Settings
  stakingToken: TokenOption | null;
  rewardToken: TokenOption | null;
  poolName: string;
  
  // Step 2: Pool Parameters (Simplified)
  poolParameters: PoolParameters;
  paymentInfo: PaymentInfo;
  
  // Step 3: NFT Boosts & Milestones
  nftBoostsEnabled: boolean;
  nftBoost: NFTBoost | null;
  milestonesEnabled: boolean;
  milestones: PoolMilestone[];
  
  // Creator Rewards
  creatorRewards?: CreatorRewardProgress;
}

export interface PoolCreationStep {
  id: number;
  title: string;
  emoji: string;
  completed: boolean;
  valid: boolean;
}
