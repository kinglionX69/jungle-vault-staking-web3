import React from 'react';
import { useCreatePool } from '@/contexts/CreatePoolContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';
import { NFTBoost, PoolMilestone } from '@/types/createPool';
import { calculateRewardPercentageFromPoolSize } from '@/utils/poolEconomics';
const Step3NFTBoostsAndMilestones = () => {
  const {
    formData,
    updateFormData
  } = useCreatePool();
  const calculateNFTBoostBudget = (boostPercentage: number) => {
    if (!formData.poolParameters.selectedDuration) return 0;
    // Additional rewards needed for NFT boost = base rewards * boost percentage / 100
    return Math.floor(formData.poolParameters.baseRewardAmount * boostPercentage / 100);
  };
  const calculateMilestoneBudget = (milestones: PoolMilestone[]) => {
    const enabledMilestones = milestones.filter(m => m.enabled);
    return enabledMilestones.reduce((total, milestone) => {
      // Budget needed = base reward amount * bonus percentage / 100
      const bonusAmount = formData.poolParameters.baseRewardAmount * milestone.bonusPercentage / 100;
      return total + bonusAmount;
    }, 0);
  };
  const updateNFTBoost = (updates: Partial<NFTBoost>) => {
    const currentBoost = formData.nftBoost || createDefaultNFTBoost();
    const updatedBoost = {
      ...currentBoost,
      ...updates
    };
    const budgetImpact = calculateNFTBoostBudget(updatedBoost.boostPercentage);
    const newBoost: NFTBoost = {
      ...updatedBoost,
      budgetImpact,
      adjustmentMethod: 'ADD_REWARDS' // Default to adding rewards
    };
    updateFormData({
      nftBoost: newBoost
    });
    updateBudgets({
      nftBoost: newBoost
    });
  };
  const updateMilestone = (id: 'early' | 'halfway' | 'major', updates: Partial<PoolMilestone>) => {
    const updatedMilestones = formData.milestones.map(milestone => {
      if (milestone.id === id) {
        const updatedMilestone = {
          ...milestone,
          ...updates
        };
        // Calculate budget impact for this milestone
        if (updatedMilestone.enabled && updatedMilestone.bonusPercentage) {
          const thresholdAmount = formData.poolParameters.maxPoolSize * updatedMilestone.thresholdPercentage / 100;
          updatedMilestone.budgetImpact = formData.poolParameters.baseRewardAmount * updatedMilestone.bonusPercentage / 100;
        } else {
          updatedMilestone.budgetImpact = 0;
        }
        return updatedMilestone;
      }
      return milestone;
    });
    updateFormData({
      milestones: updatedMilestones
    });
    updateBudgets({
      milestones: updatedMilestones
    });
  };
  const updateBudgets = (overrides?: {
    nftBoostsEnabled?: boolean;
    nftBoost?: NFTBoost | null;
    milestonesEnabled?: boolean;
    milestones?: PoolMilestone[];
  }) => {
    const nftBoostsEnabled = overrides?.nftBoostsEnabled ?? formData.nftBoostsEnabled;
    const nftBoost = overrides?.nftBoost ?? formData.nftBoost;
    const milestonesEnabled = overrides?.milestonesEnabled ?? formData.milestonesEnabled;
    const milestones = overrides?.milestones ?? formData.milestones;
    const nftBudget = nftBoostsEnabled && nftBoost ? nftBoost.budgetImpact : 0;
    const milestoneBudget = milestonesEnabled ? calculateMilestoneBudget(milestones) : 0;
    const additionalRewardBudget = nftBudget + milestoneBudget;
    const totalRewardBudget = formData.poolParameters.baseRewardAmount + additionalRewardBudget;
    if (formData.poolParameters.selectedDuration) {
      const effectiveRewardPercentage = calculateRewardPercentageFromPoolSize(totalRewardBudget, formData.poolParameters.maxPoolSize);
      updateFormData({
        poolParameters: {
          ...formData.poolParameters,
          additionalRewardBudget,
          totalRewardBudget,
          effectiveRewardPercentage
        }
      });
    }
  };
  const createDefaultNFTBoost = (): NFTBoost => ({
    collectionAddress: '',
    boostPercentage: 10,
    budgetImpact: calculateNFTBoostBudget(10),
    adjustmentMethod: 'ADD_REWARDS'
  });
  return <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-shadow mb-2 pixel-text text-pixel-glow">
          🎯 NFT BOOSTS & MILESTONES
        </h2>
        <p className="text-jungle-200">
          Add extra rewards and incentives to make your pool more attractive
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* NFT Boosts Section */}
        <Card className="pixel-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-white">🖼️ NFT Boost</h3>
              <p className="text-jungle-300 text-sm">Reward one NFT collection with bonus rewards</p>
            </div>
            <Switch checked={formData.nftBoostsEnabled} onCheckedChange={checked => {
            if (checked) {
              const defaultBoost = createDefaultNFTBoost();
              updateFormData({
                nftBoostsEnabled: checked,
                nftBoost: defaultBoost
              });
              updateBudgets({
                nftBoostsEnabled: checked,
                nftBoost: defaultBoost
              });
            } else {
              updateFormData({
                nftBoostsEnabled: checked,
                nftBoost: null
              });
              updateBudgets({
                nftBoostsEnabled: checked,
                nftBoost: null
              });
            }
          }} />
          </div>

          {formData.nftBoostsEnabled && <div className="space-y-4">
              <div>
                <Label className="text-sm text-jungle-300">Collection ID v2/Creator Address v1 </Label>
                <Input value={formData.nftBoost?.collectionAddress || ''} onChange={e => updateNFTBoost({
              collectionAddress: e.target.value
            })} placeholder="0x..." className="bg-jungle-900 border-jungle-600 text-white" />
              </div>

              <div>
                <Label className="text-sm text-jungle-300">Boost Percentage</Label>
                <Input type="number" value={formData.nftBoost?.boostPercentage || 10} onChange={e => updateNFTBoost({
              boostPercentage: parseInt(e.target.value) || 0
            })} className="bg-jungle-900 border-jungle-600 text-white" min="1" max="50" />
              </div>

              {formData.nftBoost && <div className="mt-4 p-4 bg-jungle-900/30 rounded-lg">
                  <h4 className="text-sm font-bold text-yellow-400 mb-2">💰 Budget Impact</h4>
                  <div className="text-xs text-jungle-200 space-y-1">
                    <div>Additional Rewards Needed: {formData.nftBoost.budgetImpact.toLocaleString()} tokens</div>
                    <div>This increases your total reward budget to support {formData.nftBoost.boostPercentage}% NFT bonuses</div>
                  </div>
                </div>}
            </div>}
        </Card>

        {/* Milestones Section */}
        <Card className="pixel-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-white">🏆 Milestone Bonuses</h3>
              <p className="text-jungle-300 text-sm">Fixed milestones: Early Bird (10%), Halfway Hero (40%), Major Milestone (80%)</p>
              <p className="text-jungle-400 text-xs mt-1">
                The first stakers to reach these capacity levels receive bonus rewards on top of their base rewards
              </p>
            </div>
            <Switch checked={formData.milestonesEnabled} onCheckedChange={checked => {
            updateFormData({
              milestonesEnabled: checked
            });
            updateBudgets({
              milestonesEnabled: checked
            });
          }} />
          </div>

          {formData.milestonesEnabled && <div className="space-y-4">
              {formData.milestones.map(milestone => <div key={milestone.id} className="bg-jungle-800/50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="text-sm font-bold text-white">{milestone.label}</h4>
                      <p className="text-xs text-jungle-300">
                        {milestone.thresholdPercentage}% of max pool size
                      </p>
                    </div>
                    <Switch checked={milestone.enabled} onCheckedChange={checked => updateMilestone(milestone.id, {
                enabled: checked
              })} />
                  </div>

                  {milestone.enabled && <div>
                      <Label className="text-sm text-jungle-300">Bonus Percentage</Label>
                      <Input type="number" value={milestone.bonusPercentage} onChange={e => updateMilestone(milestone.id, {
                bonusPercentage: parseInt(e.target.value) || 0
              })} className="bg-jungle-900 border-jungle-600 text-white" min="1" max="50" />
                    </div>}
                </div>)}

              {formData.milestones.some(m => m.enabled) && <div className="mt-4 p-4 bg-jungle-900/30 rounded-lg">
                  <h4 className="text-sm font-bold text-yellow-400 mb-2">💰 Milestone Budget</h4>
                  <div className="text-xs text-jungle-200 space-y-1">
                    <div>Additional Rewards Needed: {calculateMilestoneBudget(formData.milestones).toLocaleString()} tokens</div>
                    <div>This covers bonus rewards for enabled milestones</div>
                  </div>
                </div>}
            </div>}
        </Card>
      </div>

      {/* Budget Summary */}
      {(formData.nftBoostsEnabled || formData.milestonesEnabled) && <Card className="pixel-card p-6 retro-glow">
          <h3 className="text-xl font-bold text-white mb-4 pixel-text">📊 Budget Summary</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-jungle-300">Base Reward Budget:</div>
              <div className="text-white font-bold">{formData.poolParameters.baseRewardAmount.toLocaleString()} tokens</div>
            </div>
            <div>
              <div className="text-jungle-300">Additional Budget Needed:</div>
              <div className="text-yellow-400 font-bold">{formData.poolParameters.additionalRewardBudget.toLocaleString()} tokens</div>
            </div>
            <div>
              <div className="text-jungle-300">Total Reward Budget:</div>
              <div className="text-green-400 font-bold">{formData.poolParameters.totalRewardBudget.toLocaleString()} tokens</div>
            </div>
            <div>
              <div className="text-jungle-300 flex items-center gap-1">
                Budgeted Effective Reward %:
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-3 w-3 text-jungle-400" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p className="text-xs">
                        Maximum possible reward assuming all stakers receive NFT boosts and milestone bonuses. 
                        Actual rewards will vary based on participation.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="text-blue-400 font-bold">{formData.poolParameters.effectiveRewardPercentage.toFixed(1)}%</div>
            </div>
          </div>
          
          {/* Detailed Breakdown */}
          <div className="mt-4 pt-4 border-t border-jungle-600">
            <h4 className="text-sm font-bold text-white mb-2">Reward Breakdown:</h4>
            <div className="space-y-1 text-xs text-jungle-200">
              <div className="flex justify-between">
                <span>Base Reward:</span>
                <span className="text-white">{formData.poolParameters.baseRewardPercentage.toFixed(1)}%</span>
              </div>
              {formData.nftBoostsEnabled && formData.nftBoost && (
                <div className="flex justify-between">
                  <span>+ NFT Boost:</span>
                  <span className="text-purple-400">+{formData.nftBoost.boostPercentage}%</span>
                </div>
              )}
              {formData.milestonesEnabled && formData.milestones.filter(m => m.enabled).map(milestone => (
                <div key={milestone.id} className="flex justify-between">
                  <span>+ {milestone.label}:</span>
                  <span className="text-orange-400">+{milestone.bonusPercentage}%</span>
                </div>
              ))}
              <div className="flex justify-between border-t border-jungle-700 pt-1 mt-2">
                <span className="font-bold">Total Potential:</span>
                <span className="text-blue-400 font-bold">{formData.poolParameters.effectiveRewardPercentage.toFixed(1)}%</span>
              </div>
            </div>
          </div>
        </Card>}
    </div>;
};
export default Step3NFTBoostsAndMilestones;