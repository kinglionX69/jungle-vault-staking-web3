
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface EndPoolModalProps {
  isOpen: boolean;
  onClose: () => void;
  poolName: string;
  onEndPool: () => void;
}

const EndPoolModal = ({ isOpen, onClose, poolName, onEndPool }: EndPoolModalProps) => {
  const handleEndPool = () => {
    onEndPool();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="jungle-card max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-red-400 flex items-center gap-2">
            🔓 End Pool Early
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="p-4 bg-red-900/30 border border-red-600/30 rounded-lg">
            <p className="text-red-200 font-medium">⚠️ Warning</p>
            <p className="text-red-300 text-sm mt-1">
              This will stop all new rewards immediately for <strong>{poolName}</strong>.
              This action cannot be undone.
            </p>
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button 
              onClick={handleEndPool}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white"
            >
              🔓 End Pool Now
            </Button>
            <Button 
              variant="outline" 
              onClick={onClose}
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

export default EndPoolModal;
