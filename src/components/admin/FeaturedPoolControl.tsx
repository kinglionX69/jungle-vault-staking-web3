
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AdminPool, MAX_FEATURED_POOLS } from '@/types/admin';

interface FeaturedPoolControlProps {
  pools: AdminPool[];
  onReorderFeatured: (poolId: string, direction: 'up' | 'down') => void;
  onRemoveFromFeatured: (poolId: string) => void;
}

const FeaturedPoolControl = ({ pools, onReorderFeatured, onRemoveFromFeatured }: FeaturedPoolControlProps) => {
  const featuredPools = pools.filter(pool => pool.isFeatured).slice(0, MAX_FEATURED_POOLS);

  return (
    <Card className="jungle-card">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-yellow-300 flex items-center gap-2">
          🌟 Featured Pool Control
          <span className="text-sm text-jungle-200">({featuredPools.length}/{MAX_FEATURED_POOLS})</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {featuredPools.length === 0 ? (
            <p className="text-jungle-200 text-center py-8">No featured pools yet</p>
          ) : (
            featuredPools.map((pool, index) => (
              <div key={pool.id} className="flex items-center justify-between p-4 bg-jungle-800/50 rounded-lg border border-jungle-600/30">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{pool.emoji}</span>
                  <div>
                    <div className="text-white font-medium">{pool.name}</div>
                    <div className="text-jungle-200 text-sm">
                      Rewards: {pool.lockDurations.length > 0 ? `${pool.lockDurations[0].rewardsPercentage}%` : 'N/A'}
                      {pool.lockDurations.length > 1 && ` - ${Math.max(...pool.lockDurations.map(d => d.rewardsPercentage))}%`}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-jungle-200 text-sm">#{index + 1}</span>
                  
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onReorderFeatured(pool.id, 'up')}
                      disabled={index === 0}
                      className="h-8 w-8 p-0 border-jungle-600 text-jungle-200 hover:bg-jungle-700"
                    >
                      ↑
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onReorderFeatured(pool.id, 'down')}
                      disabled={index === featuredPools.length - 1}
                      className="h-8 w-8 p-0 border-jungle-600 text-jungle-200 hover:bg-jungle-700"
                    >
                      ↓
                    </Button>
                  </div>
                  
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => onRemoveFromFeatured(pool.id)}
                    className="text-xs"
                  >
                    🗑️ Remove
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FeaturedPoolControl;
