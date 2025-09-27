
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockPools } from '@/data/mockPools';

interface PoolSelectorProps {
  selectedPool: string;
  onPoolChange: (poolId: string) => void;
}

const PoolSelector = ({ selectedPool, onPoolChange }: PoolSelectorProps) => {
  return (
    <div className="w-full max-w-xs">
      <Select value={selectedPool} onValueChange={onPoolChange}>
        <SelectTrigger className="jungle-card border-jungle-600/50 text-white">
          <SelectValue placeholder="Select a pool" />
        </SelectTrigger>
        <SelectContent className="jungle-card border-jungle-600/50 bg-jungle-800">
          {mockPools.map((pool) => (
            <SelectItem 
              key={pool.id} 
              value={pool.id}
              className="text-white hover:bg-jungle-700 focus:bg-jungle-700"
            >
              <span className="flex items-center gap-2">
                <span className="text-lg">{pool.emoji}</span>
                <span>{pool.name}</span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default PoolSelector;
