
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AdminPool } from '@/types/admin';
import TopUpModal from './TopUpModal';
import EndPoolModal from './EndPoolModal';

interface LivePoolManagerProps {
  pools: AdminPool[];
  onTopUp: (poolId: string, amount: string) => void;
  onEndPool: (poolId: string) => void;
  onToggleFeatured: (poolId: string) => void;
}

const LivePoolManager = ({ pools, onTopUp, onEndPool, onToggleFeatured }: LivePoolManagerProps) => {
  const [topUpModal, setTopUpModal] = useState<{ isOpen: boolean; poolId: string; poolName: string }>({
    isOpen: false,
    poolId: '',
    poolName: ''
  });
  
  const [endPoolModal, setEndPoolModal] = useState<{ isOpen: boolean; poolId: string; poolName: string }>({
    isOpen: false,
    poolId: '',
    poolName: ''
  });

  const openTopUpModal = (poolId: string, poolName: string) => {
    setTopUpModal({ isOpen: true, poolId, poolName });
  };

  const openEndPoolModal = (poolId: string, poolName: string) => {
    setEndPoolModal({ isOpen: true, poolId, poolName });
  };

  const handleTopUp = (amount: string) => {
    onTopUp(topUpModal.poolId, amount);
  };

  const handleEndPool = () => {
    onEndPool(endPoolModal.poolId);
  };

  return (
    <>
      <Card className="jungle-card">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-yellow-300 flex items-center gap-2">
            🏊 Live Pool Manager
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-jungle-600">
                <TableHead className="text-jungle-200">Token</TableHead>
                <TableHead className="text-jungle-200">Pool Name</TableHead>
                <TableHead className="text-jungle-200">Capacity</TableHead>
                <TableHead className="text-jungle-200">Rewards % Range</TableHead>
                <TableHead className="text-jungle-200">Milestones</TableHead>
                <TableHead className="text-jungle-200">Creator Rewards</TableHead>
                <TableHead className="text-jungle-200">Featured</TableHead>
                <TableHead className="text-jungle-200">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pools.map((pool) => (
                <TableRow key={pool.id} className="border-jungle-600/30">
                  <TableCell className="text-white">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{pool.emoji}</span>
                      <div>
                        <div className={`px-2 py-1 rounded text-xs ${
                          pool.tier === 'Whale' ? 'bg-purple-500/20 text-purple-300' :
                          pool.tier === 'Dolphin' ? 'bg-blue-500/20 text-blue-300' :
                          'bg-green-500/20 text-green-300'
                        }`}>
                          {pool.tier}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell className="text-white">
                    <div className="font-medium">{pool.name}</div>
                    <div className="text-xs text-jungle-200">{pool.rewardToken}</div>
                    {pool.nftBoostsEnabled && (
                      <div className="text-xs text-yellow-300">🚀 NFT Boosts: {pool.nftBoostUsage}%</div>
                    )}
                  </TableCell>
                  
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm font-medium text-white">
                        {pool.capacity.utilizationRate}%
                      </div>
                      <div className="w-20 bg-jungle-600 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            pool.capacity.utilizationRate > 80 ? 'bg-red-500' :
                            pool.capacity.utilizationRate > 60 ? 'bg-yellow-500' :
                            'bg-green-500'
                          }`}
                          style={{ width: `${Math.min(pool.capacity.utilizationRate, 100)}%` }}
                        />
                      </div>
                      <div className="text-xs text-jungle-200">
                        {(pool.capacity.currentStaked / 1000).toFixed(0)}K / {(pool.capacity.maxStakeable / 1000).toFixed(0)}K
                      </div>
                      {pool.capacity.capacityAlerts.length > 0 && (
                        <div className="text-xs text-red-300">⚠️ Alert</div>
                      )}
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="space-y-1">
                      {pool.lockDurations.slice(0, 2).map((duration) => (
                        <div key={duration.id} className="text-xs">
                          <span className="text-green-400 font-medium">{duration.rewardsPercentage}%</span>
                          <span className="text-jungle-200 ml-1">({duration.days}d)</span>
                        </div>
                      ))}
                      {pool.lockDurations.length > 2 && (
                        <div className="text-xs text-jungle-200">+{pool.lockDurations.length - 2} more</div>
                      )}
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm font-medium text-white">
                        {pool.milestones.filter(m => m.completionRate > 0).length}/3
                      </div>
                      <div className="text-xs text-jungle-200">
                        10%, 40%, 80% milestones
                      </div>
                      <div className="w-16 bg-jungle-600 rounded-full h-1">
                        <div 
                          className="h-1 rounded-full bg-yellow-500"
                          style={{ width: `${pool.creatorRewards.milestoneCompletionRate}%` }}
                        />
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm font-medium text-yellow-400">
                        {pool.creatorRewards.pendingDistribution.toLocaleString()}
                      </div>
                      <div className="text-xs text-jungle-200">pending</div>
                      <div className="text-xs text-green-400">
                        {pool.creatorRewards.totalLionheartDistributed.toLocaleString()} total
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      pool.isFeatured 
                        ? 'bg-yellow-500/20 text-yellow-300' 
                        : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {pool.isFeatured ? '⭐ Featured' : 'Not Featured'}
                    </span>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          onClick={() => openTopUpModal(pool.id, pool.name)}
                          className="bg-blue-600 hover:bg-blue-700 text-xs px-2"
                        >
                          🔋
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => onToggleFeatured(pool.id)}
                          className={`text-xs px-2 ${
                            pool.isFeatured 
                              ? 'bg-gray-600 hover:bg-gray-700' 
                              : 'bg-yellow-600 hover:bg-yellow-700'
                          }`}
                        >
                          {pool.isFeatured ? '⭐' : '🌟'}
                        </Button>
                      </div>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => openEndPoolModal(pool.id, pool.name)}
                        className="text-xs px-2"
                      >
                        🔓 End
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <TopUpModal
        isOpen={topUpModal.isOpen}
        onClose={() => setTopUpModal({ isOpen: false, poolId: '', poolName: '' })}
        poolName={topUpModal.poolName}
        onTopUp={handleTopUp}
      />

      <EndPoolModal
        isOpen={endPoolModal.isOpen}
        onClose={() => setEndPoolModal({ isOpen: false, poolId: '', poolName: '' })}
        poolName={endPoolModal.poolName}
        onEndPool={handleEndPool}
      />
    </>
  );
};

export default LivePoolManager;
