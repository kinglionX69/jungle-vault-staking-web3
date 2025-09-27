
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface TopUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  poolName: string;
  onTopUp: (amount: string) => void;
}

const TopUpModal = ({ isOpen, onClose, poolName, onTopUp }: TopUpModalProps) => {
  const [amount, setAmount] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount) {
      onTopUp(amount);
      setAmount('');
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="jungle-card max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-yellow-300 flex items-center gap-2">
            🔋 Top Up Pool Rewards
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="text-jungle-200">Pool: {poolName}</Label>
          </div>
          
          <div>
            <Label htmlFor="amount" className="text-jungle-200">
              Additional Reward Amount
            </Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount..."
              className="mt-1 bg-jungle-800 border-jungle-600 text-white"
              required
            />
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button type="submit" className="neon-button flex-1">
              🔋 Top Up Rewards
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              className="flex-1 border-jungle-600 text-jungle-200 hover:bg-jungle-800"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TopUpModal;
