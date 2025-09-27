import React, { useState } from 'react';
import { useCreatePool } from '@/contexts/CreatePoolContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Step4ReviewConfirm = () => {
  const { formData, submitForm, isSubmitting } = useCreatePool();
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLaunchPool = async () => {
    try {
      await submitForm();
      setShowSuccess(true);
      toast.success('🎉 Pool created successfully!');
    } catch (error) {
      toast.error('Failed to create pool. Please try again.');
    }
  };

  const handleViewPool = () => {
    navigate('/pools');
  };

  if (showSuccess) {
    return (
      <div className="text-center space-y-8">
        <div className="pixel-card p-12 retro-glow">
          <div className="text-8xl mb-6 animate-pixel-pulse">🌴</div>
          <h2 className="text-4xl font-bold text-shadow-glow mb-4 pixel-text">
            Your Pool is Live!
          </h2>
          <p className="text-xl text-jungle-200 mb-8">
            Share it with your tribe and watch the staking magic happen!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleViewPool}
              variant="pixel-neon"
              className="text-lg px-8 py-4"
            >
              🏛️ View Pool
            </Button>
            <Button
              onClick={() => navigate('/dashboard')}
              variant="pixel"
              className="border-jungle-600 text-jungle-200 hover:bg-jungle-700"
            >
              📊 Dashboard
            </Button>
          </div>
        </div>
        
        {/* Celebratory jungle elements */}
        <div className="flex justify-center text-4xl space-x-8 opacity-60">
          <span className="animate-float">🎉</span>
          <span className="animate-float" style={{ animationDelay: '0.5s' }}>🦜</span>
          <span className="animate-float" style={{ animationDelay: '1s' }}>🐒</span>
          <span className="animate-float" style={{ animationDelay: '1.5s' }}>🌿</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-shadow mb-2 pixel-text text-pixel-glow">
          ✅ REVIEW & CONFIRM
        </h2>
        <p className="text-jungle-200">
          Double-check everything before launching your pool
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Token & Basic Settings */}
        <div className="pixel-card p-6">
          <h3 className="text-xl font-bold text-yellow-400 mb-4 pixel-text">🪙 Token Settings</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-jungle-300">Pool Name:</span>
              <span className="text-white font-bold">{formData.poolName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-jungle-300">Staking Token:</span>
              <span className="text-white font-bold">
                {formData.stakingToken?.emoji} {formData.stakingToken?.name}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-jungle-300">Reward Token:</span>
              <span className="text-white font-bold">
                {formData.rewardToken?.emoji} {formData.rewardToken?.name}
              </span>
            </div>
          </div>
        </div>

        {/* Pool Parameters */}
        <div className="pixel-card p-6">
          <h3 className="text-xl font-bold text-yellow-400 mb-4 pixel-text">⚙️ Pool Parameters</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-jungle-300">Lock Duration:</span>
              <span className="text-white font-bold">
                {formData.poolParameters.selectedDuration?.emoji} {formData.poolParameters.selectedDuration?.name}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-jungle-300">Reward %:</span>
              <span className="text-green-400 font-bold">{formData.poolParameters.selectedRewardPercentage}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-jungle-300">Reward Type:</span>
              <span className="text-blue-400 font-bold">Equal Distribution</span>
            </div>
            <div className="flex justify-between">
              <span className="text-jungle-300">Reward Amount:</span>
              <span className="text-white font-bold">
                {formData.poolParameters.totalRewardBudget.toLocaleString()} {formData.rewardToken?.symbol || 'Tokens'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-jungle-300">Max Pool Size:</span>
              <span className="text-white font-bold">
                {formData.poolParameters.maxPoolSize.toLocaleString()} {formData.stakingToken?.symbol || 'Tokens'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-jungle-300">Payment Method:</span>
              <span className="text-white font-bold flex items-center gap-1">
                {formData.paymentInfo.method === 'APT' ? '🔶 APT' : '🦁❤️ LIONHEART'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-jungle-300">Creation Fee:</span>
              <span className="text-yellow-400 font-bold">
                {formData.paymentInfo.method === 'APT' 
                  ? `${formData.paymentInfo.aptCost} APT`
                  : `${formData.paymentInfo.lionheartCost?.toFixed(1)} LIONHEART`
                }
              </span>
            </div>
            {formData.paymentInfo.method === 'LIONHEART' && (
              <div className="flex justify-between">
                <span className="text-green-400">Discount Applied:</span>
                <span className="text-green-400 font-bold">
                  20% off (-{formData.paymentInfo.savings?.toFixed(1)} LIONHEART)
                </span>
              </div>
            )}
          </div>
        </div>

        {/* NFT Boosts */}
        {formData.nftBoostsEnabled && formData.nftBoost && (
          <div className="jungle-card p-6">
            <h3 className="text-xl font-bold text-yellow-400 mb-4">🖼️ NFT Boosts</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-jungle-300">Collection:</span>
                <span className="text-white font-bold">+{formData.nftBoost.boostPercentage}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-jungle-300">Additional Budget:</span>
                <span className="text-yellow-400 font-bold">{formData.nftBoost.budgetImpact.toLocaleString()} tokens</span>
              </div>
            </div>
          </div>
        )}

        {/* Milestones */}
        {formData.milestonesEnabled && formData.milestones.some(m => m.enabled) && (
          <div className="jungle-card p-6">
            <h3 className="text-xl font-bold text-yellow-400 mb-4">🏆 Milestones</h3>
            <div className="space-y-2 text-sm">
              {formData.milestones
                .filter(m => m.enabled)
                .map((milestone) => (
                  <div key={milestone.id} className="flex justify-between">
                    <span className="text-jungle-300">
                      {milestone.label} ({milestone.thresholdPercentage}%):
                    </span>
                    <span className="text-white font-bold">+{milestone.bonusPercentage}%</span>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Creator Rewards - LIONHEART */}
        {formData.creatorRewards && (
          <div className="jungle-card p-6 md:col-span-2">
            <h3 className="text-xl font-bold text-yellow-400 mb-4">🦁 Creator Rewards (LIONHEART)</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-jungle-300">Total Pool Capacity:</span>
                <span className="text-white font-bold">
                  {formData.creatorRewards.totalStakingCapacity.toLocaleString()} {formData.stakingToken?.symbol || 'Tokens'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-jungle-300">Total LIONHEART Allocation:</span>
                <span className="text-yellow-400 font-bold text-lg">
                  {formData.creatorRewards.totalLionheartAllocated.toLocaleString()} LIONHEART
                </span>
              </div>
              
              <div className="space-y-2 mt-4">
                <h4 className="text-sm font-semibold text-jungle-200 mb-2">Creator Milestone Rewards (10%, 40%, 80%):</h4>
                {formData.creatorRewards.milestones.map((milestone, index) => {
                  const labels = ['🐦 Early Bird', '🏆 Halfway Hero', '🎯 Major Milestone'];
                  return (
                    <div key={milestone.id} className="flex justify-between items-center text-sm">
                      <span className="text-jungle-300">
                        {labels[index]} ({milestone.percentage}%):
                      </span>
                      <span className="text-yellow-400 font-semibold">
                        +{milestone.lionheartReward.toLocaleString()} LIONHEART
                      </span>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-4 p-3 bg-jungle-800/50 rounded-lg border border-yellow-400/20">
                <p className="text-xs text-jungle-200">
                  💡 <strong>How it works:</strong> You contribute {formData.poolParameters.baseRewardAmount.toLocaleString()} tokens 
                  and earn LIONHEART through 3 key milestones as your pool reaches 10%, 40%, and 80% utilization. 
                  Total potential: {formData.creatorRewards.totalLionheartAllocated.toLocaleString()} LIONHEART.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Launch Button */}
      <div className="text-center pt-8">
        <Button
          onClick={handleLaunchPool}
          disabled={isSubmitting}
          variant="pixel-retro"
          className="text-xl px-12 py-6"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin w-5 h-5 border-2 border-jungle-950 border-t-transparent rounded-full" />
              Launching Pool...
            </div>
          ) : (
            '🚀 Launch Pool'
          )}
        </Button>
      </div>
    </div>
  );
};

export default Step4ReviewConfirm;