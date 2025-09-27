import React from 'react';
import { useCreatePool } from '@/contexts/CreatePoolContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Slider } from '@/components/ui/slider';
import { AVAILABLE_DURATIONS, validateSimplifiedPool, getSimplifiedHealthScore, calculateMinimumRewardByDuration, getMinimumRewardPercentage } from '@/utils/poolEconomics';
const Step2PoolParameters = () => {
  const {
    formData,
    updateFormData,
    updatePaymentInfo
  } = useCreatePool();
  const {
    poolParameters
  } = formData;
  const updatePoolParameters = (updates: Partial<typeof poolParameters>) => {
    updateFormData({
      poolParameters: {
        ...poolParameters,
        ...updates
      }
    });
  };
const selectDuration = (duration: typeof AVAILABLE_DURATIONS[0]) => {
  const newMinimumRewardPercentage = getMinimumRewardPercentage(duration);
  const currentRewardPercentage = poolParameters.selectedRewardPercentage;
  
  updatePoolParameters({
    selectedDuration: duration,
    // Ensure reward percentage is within [min, 300]
    selectedRewardPercentage: Math.min(300, Math.max(currentRewardPercentage, newMinimumRewardPercentage))
  });
};
  const validation = validateSimplifiedPool(formData);
  const economicHealth = getSimplifiedHealthScore(formData);

  // Calculate dynamic minimums
  const minimumReward = calculateMinimumRewardByDuration(poolParameters.selectedDuration);
  const minimumRewardPercentage = getMinimumRewardPercentage(poolParameters.selectedDuration);
  return <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-shadow mb-2 pixel-text text-pixel-glow">
          ⚙️ POOL PARAMETERS
        </h2>
        <p className="text-jungle-200">
          Select a duration, set your reward amount and desired reward percentage - we'll calculate the optimal pool size automatically
        </p>
      </div>

      {/* Duration Selection */}
      <div>
        <Label className="text-lg font-semibold text-white mb-4 block">
          Lock Duration *
        </Label>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {AVAILABLE_DURATIONS.map(duration => <div key={duration.id} className={`
                pixel-card p-4 cursor-pointer transition-all duration-200 border-2
                ${poolParameters.selectedDuration?.id === duration.id ? 'border-yellow-500 bg-yellow-500/10 scale-105 pixel-glow' : 'border-jungle-600 hover:border-jungle-500 hover:bg-jungle-800/60'}
              `} onClick={() => selectDuration(duration)}>
              <div className="text-center">
                <div className="text-2xl mb-2 animate-pixel-pulse">{duration.emoji}</div>
                <div className="font-semibold text-white mb-1">{duration.name}</div>
                <div className="text-sm text-jungle-300 mb-2">
                  {duration.days} days lock
                </div>
                <div className="text-xs text-blue-400">
                  Min {getMinimumRewardPercentage({
                id: duration.id,
                name: duration.name,
                emoji: duration.emoji,
                days: duration.days
              })}% Reward
                </div>
              </div>
            </div>)}
        </div>
      </div>

      {/* Reward Amount Input */}
      <div>
        <Label className="text-lg font-semibold text-white mb-3 block">
          Reward Amount *
        </Label>
        <Input type="number" min={minimumReward} value={poolParameters.baseRewardAmount || ''} onChange={e => updatePoolParameters({
        baseRewardAmount: parseInt(e.target.value) || 0
      })} className="jungle-card border-jungle-600 text-white" placeholder={`Minimum ${minimumReward.toLocaleString()} tokens required`} />
        <div className="space-y-1 mt-2">
          <div className="text-xs text-jungle-400">
            Total {formData.rewardToken?.symbol || 'tokens'} you'll contribute for rewards
          </div>
          {poolParameters.selectedDuration && <div className="text-xs text-yellow-400">
              💡 Minimum for {poolParameters.selectedDuration.name}: {minimumReward.toLocaleString()} tokens
            </div>}
        </div>
      </div>

      {/* Reward Percentage Slider */}
      {poolParameters.selectedDuration && <div>
          <Label className="text-lg font-semibold text-white mb-3 block">
            Desired Reward % *
          </Label>
          <div className="space-y-4">
            <div className="px-4">
              <Slider value={[poolParameters.selectedRewardPercentage]} onValueChange={values => updatePoolParameters({
            selectedRewardPercentage: values[0]
          })} min={minimumRewardPercentage} max={300} step={1} className="w-full" />
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-jungle-400">Min: {minimumRewardPercentage}%</span>
              <span className="text-white font-bold text-lg">{poolParameters.selectedRewardPercentage}% Reward</span>
              <span className="text-jungle-400">Max: 300%</span>
            </div>
            
            {/* Reward Display */}
            <div className="bg-jungle-800/50 p-3 rounded-lg mt-3">
              <div className="text-sm text-jungle-200 text-center">
                💰 For every <span className="text-white font-bold">1</span> {formData.stakingToken?.symbol || 'token'} staked,
              </div>
              <div className="text-lg text-center font-bold text-green-400 mt-1">
                stakers receive <span className="text-yellow-400">{(poolParameters.selectedRewardPercentage / 100).toFixed(2)}</span> {formData.rewardToken?.symbol || 'tokens'} in rewards
              </div>
            </div>
          </div>
          <div className="text-xs text-jungle-400 mt-2">
            Higher reward percentage means smaller pool capacity for the same reward amount
          </div>
        </div>}

      {/* Auto-calculated Pool Size Display */}
      {poolParameters.selectedDuration && poolParameters.baseRewardAmount > 0 && poolParameters.selectedRewardPercentage > 0 && <div className="pixel-card p-6 bg-gradient-to-r from-blue-900/20 to-green-900/20 border border-blue-500/30 retro-glow">
          <div className="text-center">
            <div className="text-sm text-jungle-200 mb-2">Max Stakable Tokens</div>
            <div className="text-3xl font-bold text-blue-400 mb-2">
              {poolParameters.maxPoolSize.toLocaleString()}
            </div>
            <div className="text-sm text-jungle-300">
              {formData.stakingToken?.symbol || 'tokens'} maximum capacity
            </div>
            <div className="text-xs text-jungle-400 mt-2">
              Based on {poolParameters.baseRewardAmount.toLocaleString()} rewards ÷ {poolParameters.selectedRewardPercentage}% reward ratio
            </div>
          </div>
        </div>}


      {/* Payment Method Selection */}
      <div className="jungle-card p-4 bg-jungle-900/50">
        <Label className="text-sm font-semibold text-jungle-200 mb-3 block">
          💳 Payment Method
        </Label>
        
        <div className="grid grid-cols-2 gap-3 mb-4">
          <button type="button" onClick={() => updatePaymentInfo('APT')} className={`p-3 rounded-lg border-2 transition-all ${formData.paymentInfo.method === 'APT' ? 'border-yellow-500 bg-yellow-500/10' : 'border-jungle-600 hover:border-jungle-500'}`}>
            <div className="text-center">
              <div className="text-lg mb-1">🔶</div>
              <div className="text-sm font-semibold text-white">APT</div>
              <div className="text-xs text-jungle-300">Standard Rate</div>
            </div>
          </button>
          
          <button type="button" onClick={() => updatePaymentInfo('LIONHEART')} className={`p-3 rounded-lg border-2 transition-all ${formData.paymentInfo.method === 'LIONHEART' ? 'border-yellow-500 bg-yellow-500/10' : 'border-jungle-600 hover:border-jungle-500'}`}>
            <div className="text-center">
              <div className="text-lg mb-1">🦁❤️</div>
              <div className="text-sm font-semibold text-white">LIONHEART</div>
              <div className="text-xs text-green-400">20% Discount!</div>
            </div>
          </button>
        </div>
        
        <div className="space-y-2">
          {formData.paymentInfo.method === 'APT' ? <div className="flex justify-between items-center text-sm">
              <span className="text-jungle-300">Creation fee:</span>
              <span className="text-yellow-400 font-bold">{formData.paymentInfo.aptCost} APT</span>
            </div> : <>
              <div className="flex justify-between items-center text-sm">
                <span className="text-jungle-300">Creation fee:</span>
                <span className="text-yellow-400 font-bold">
                  {formData.paymentInfo.lionheartCost?.toFixed(1)} LIONHEART
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-jungle-400">Regular price:</span>
                <span className="text-jungle-400 line-through">
                  {formData.paymentInfo.originalLionheartCost?.toFixed(1)} LIONHEART
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-green-400">You save:</span>
                <span className="text-green-400 font-bold">
                  {formData.paymentInfo.savings?.toFixed(1)} LIONHEART (20%)
                </span>
              </div>
            </>}
        </div>
      </div>

      {/* Validation & Health */}
      {poolParameters.selectedDuration && (poolParameters.baseRewardAmount > 0 || poolParameters.maxPoolSize > 0) && <div className="p-3 bg-jungle-900/50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-jungle-200">Economic Health:</span>
            <div className={`px-2 py-1 rounded text-xs font-bold ${economicHealth === 'healthy' ? 'bg-green-500/20 text-green-400' : economicHealth === 'warning' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
              {economicHealth === 'healthy' ? '🟢 Healthy' : economicHealth === 'warning' ? '🟡 Warning' : '🔴 Critical'}
            </div>
          </div>
          {validation.errors.length > 0 && <Alert className="mt-2 border-red-500/20 bg-red-500/10">
              <AlertDescription className="text-red-400 text-xs">
                {validation.errors[0]}
              </AlertDescription>
            </Alert>}
          {validation.warnings.length > 0 && <Alert className="mt-2 border-yellow-500/20 bg-yellow-500/10">
              <AlertDescription className="text-yellow-400 text-xs">
                {validation.warnings[0]}
              </AlertDescription>
            </Alert>}
        </div>}

      {/* Pool Summary */}
      {validation.isValid && <div className="pixel-card p-6 bg-gradient-to-r from-jungle-800/50 to-jungle-700/50 retro-glow">
          <h3 className="text-xl font-bold text-yellow-400 mb-4 pixel-text">📊 Pool Summary</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-semibold text-jungle-200 mb-3">Pool Details:</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-jungle-300">Duration:</span>
                  <span className="text-white font-bold">
                    {poolParameters.selectedDuration?.emoji} {poolParameters.selectedDuration?.name}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-jungle-300">Reward %:</span>
                  <span className="text-green-400 font-bold">{poolParameters.selectedRewardPercentage}%</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-jungle-300">Reward Type:</span>
                  <span className="text-blue-400 font-bold">Equal Distribution</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-jungle-200 mb-3">Economics:</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-jungle-300">Reward Amount:</span>
                  <span className="text-white font-bold">
                    {poolParameters.baseRewardAmount.toLocaleString()} {formData.rewardToken?.symbol || 'Tokens'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-jungle-300">Max Pool Size:</span>
                  <span className="text-white font-bold">
                    {poolParameters.maxPoolSize.toLocaleString()} {formData.stakingToken?.symbol || 'Tokens'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-jungle-300">Creation Fee:</span>
                  <span className="text-yellow-400 font-bold">
                    {formData.paymentInfo.method === 'APT' ? `${formData.paymentInfo.aptCost} APT` : `${formData.paymentInfo.lionheartCost?.toFixed(1)} LIONHEART`}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Creator Rewards Preview */}
          {formData.creatorRewards && <div className="mt-4 p-3 bg-jungle-900/50 rounded-lg">
              <div className="text-sm text-jungle-200 mb-1">
                🦁❤️ Creator Rewards: You'll earn <span className="text-yellow-400 font-bold">
                  {formData.creatorRewards.totalLionheartAllocated.toLocaleString()} LIONHEART
                </span> total (10% of rewards) through 5 milestones as your pool fills up
              </div>
            </div>}
        </div>}
    </div>;
};
export default Step2PoolParameters;