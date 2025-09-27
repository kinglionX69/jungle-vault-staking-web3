import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface CreatorEndPoolModalProps {
  isOpen: boolean;
  onClose: () => void;
  poolName: string;
  poolEmoji: string;
  currentStaked: number;
  maxCapacity: number;
  totalRewards: number;
  onEndPool: () => Promise<void>;
}

const CreatorEndPoolModal = ({ 
  isOpen, 
  onClose, 
  poolName, 
  poolEmoji,
  currentStaked,
  maxCapacity,
  totalRewards,
  onEndPool 
}: CreatorEndPoolModalProps) => {
  const { toast } = useToast();
  const [isEnding, setIsEnding] = useState(false);

  const utilizationRate = (currentStaked / maxCapacity) * 100;
  const unallocatedRewards = ((maxCapacity - currentStaked) / maxCapacity) * totalRewards;
  const stakerRewards = (currentStaked / maxCapacity) * totalRewards;

  const handleEndPool = async () => {
    setIsEnding(true);
    try {
      await onEndPool();
      toast({
        title: "Pool Ended Successfully! 🎯",
        description: `${poolName} has been ended. Rewards have been distributed.`,
      });
      onClose();
    } catch (error) {
      toast({
        title: "Failed to End Pool",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setIsEnding(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="jungle-card max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-orange-400 flex items-center gap-2">
            {poolEmoji} End Pool: {poolName}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="p-4 bg-orange-900/30 border border-orange-600/30 rounded-lg">
            <p className="text-orange-200 font-medium">⚠️ Pool End Summary</p>
            <p className="text-orange-300 text-sm mt-1">
              Ending this pool will automatically distribute rewards and return unallocated funds.
            </p>
          </div>

          {/* Pool Summary */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="jungle-card p-3">
                <div className="text-jungle-300 text-sm">Pool Utilization</div>
                <div className="text-white font-semibold">{utilizationRate.toFixed(1)}%</div>
              </div>
              <div className="jungle-card p-3">
                <div className="text-jungle-300 text-sm">Staked Amount</div>
                <div className="text-white font-semibold">
                  {currentStaked.toLocaleString()} / {maxCapacity.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Reward Distribution */}
            <div className="space-y-3">
              <h4 className="text-white font-semibold">Reward Distribution:</h4>
              
              <div className="jungle-card p-3">
                <div className="flex justify-between">
                  <span className="text-green-400">💰 Staker Rewards:</span>
                  <span className="text-white font-semibold">{stakerRewards.toLocaleString()}</span>
                </div>
                <div className="text-jungle-300 text-xs">Auto-distributed to all stakers</div>
              </div>

              {unallocatedRewards > 0 && (
                <div className="jungle-card p-3">
                  <div className="flex justify-between">
                    <span className="text-blue-400">🔙 Returned to You:</span>
                    <span className="text-white font-semibold">{unallocatedRewards.toLocaleString()}</span>
                  </div>
                  <div className="text-jungle-300 text-xs">Unallocated reward tokens</div>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button 
              onClick={handleEndPool}
              disabled={isEnding}
              className="flex-1 bg-orange-600 hover:bg-orange-700 text-white"
            >
              {isEnding ? "Ending Pool..." : "🎯 End Pool & Distribute"}
            </Button>
            <Button 
              variant="outline" 
              onClick={onClose}
              disabled={isEnding}
              className="flex-1 border-jungle-600 text-jungle-200 hover:bg-jungle-800"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreatorEndPoolModal;