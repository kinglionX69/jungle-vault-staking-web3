
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface TransactionSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  poolName: string;
  poolEmoji: string;
  amount: number;
  txHash: string;
  rewardToken: string;
  rewardsPercentage: string;
}

const TransactionSuccessModal = ({
  isOpen,
  onClose,
  poolName,
  poolEmoji,
  amount,
  txHash,
  rewardToken,
  rewardsPercentage
}: TransactionSuccessModalProps) => {
  const copyTxHash = () => {
    navigator.clipboard.writeText(txHash);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="jungle-card border-jungle-600 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white text-xl text-center">
            Transaction Successful! 🎉
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 text-center">
          {/* Success Animation */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="text-6xl animate-bounce">{poolEmoji}</div>
              <div className="absolute -top-2 -right-2 text-2xl animate-pulse">✨</div>
            </div>
          </div>

          {/* Transaction Details */}
          <div className="space-y-4">
            <div className="jungle-card p-4">
              <h3 className="text-lg font-bold text-white mb-3">Stake Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-jungle-300">Pool:</span>
                  <span className="text-white font-medium">{poolName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-jungle-300">Amount Staked:</span>
                  <span className="text-green-400 font-bold">{amount.toLocaleString()} tokens</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-jungle-300">Rewards %:</span>
                  <Badge className="bg-purple-600 text-white">{rewardsPercentage}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-jungle-300">Reward Token:</span>
                  <span className="text-white">{rewardToken}</span>
                </div>
              </div>
            </div>

            {/* Transaction Hash */}
            <div className="jungle-card p-4">
              <p className="text-jungle-300 text-sm mb-2">Transaction Hash:</p>
              <div className="flex items-center gap-2">
                <code className="text-xs text-jungle-200 bg-jungle-900 p-2 rounded flex-1 truncate">
                  {txHash}
                </code>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={copyTxHash}
                  className="border-jungle-600 text-jungle-200 hover:bg-jungle-700"
                >
                  📋
                </Button>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-green-900/20 border border-green-600/30 rounded-lg p-4">
              <h4 className="text-green-400 font-semibold mb-2">🌱 What's Next?</h4>
              <ul className="text-jungle-200 text-sm space-y-1">
                <li>• Your rewards will start accumulating immediately</li>
                <li>• Check your Dashboard to track progress</li>
                <li>• Claim rewards anytime (gas fees apply)</li>
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 border-jungle-600 text-jungle-200 hover:bg-jungle-700"
            >
              Continue Exploring
            </Button>
            <Button
              onClick={() => {
                onClose();
                window.location.href = '/dashboard';
              }}
              className="flex-1 neon-button"
            >
              🏛️ View Dashboard
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionSuccessModal;
