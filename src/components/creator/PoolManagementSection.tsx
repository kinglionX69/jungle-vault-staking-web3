import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { AlertTriangle, Settings, Pause, Play, BarChart3, Download, TrendingUp } from 'lucide-react';
import { DashboardCreatedPool } from '@/types/dashboardNew';

interface PoolManagementSectionProps {
  createdPools: DashboardCreatedPool[];
  onPausePool?: (poolId: string) => void;
  onResumePool?: (poolId: string) => void;
  onUpdateCapacity?: (poolId: string, newCapacity: number) => void;
  onExportAnalytics?: (poolId: string) => void;
}

const PoolManagementSection = ({ 
  createdPools, 
  onPausePool, 
  onResumePool, 
  onUpdateCapacity,
  onExportAnalytics 
}: PoolManagementSectionProps) => {
  const [expandedPool, setExpandedPool] = useState<string | null>(null);
  const [newCapacities, setNewCapacities] = useState<Record<string, number>>({});

  const getPoolHealthStatus = (pool: DashboardCreatedPool) => {
    if (pool.utilizationRate >= 90) return { status: 'critical', color: 'red', message: 'Near capacity limit' };
    if (pool.utilizationRate >= 70) return { status: 'good', color: 'green', message: 'Healthy utilization' };
    if (pool.utilizationRate >= 30) return { status: 'moderate', color: 'yellow', message: 'Moderate activity' };
    return { status: 'low', color: 'gray', message: 'Low utilization' };
  };

  const handleCapacityUpdate = (poolId: string) => {
    const newCapacity = newCapacities[poolId];
    if (newCapacity && newCapacity > 0) {
      onUpdateCapacity?.(poolId, newCapacity);
      setNewCapacities(prev => ({ ...prev, [poolId]: 0 }));
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white pixel-text text-pixel-glow">Pool Management</h3>
      
      {/* Quick Actions */}
      <Card className="jungle-card p-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-bold text-white pixel-text">Quick Actions</h4>
          <Badge variant="outline" className="border-blue-400 text-blue-400">
            {createdPools.filter(p => p.status === 'active').length} Active Pools
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button 
            variant="outline" 
            className="border-green-400 text-green-400 hover:bg-green-400 hover:text-white"
            onClick={() => {
              createdPools.forEach(pool => onExportAnalytics?.(pool.poolId));
            }}
          >
            <Download className="w-4 h-4 mr-2" />
            Export All Analytics
          </Button>
          
          <Button 
            variant="outline" 
            className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
            onClick={() => {
              // Handle batch operations
              console.log('Batch update pools');
            }}
          >
            <Settings className="w-4 h-4 mr-2" />
            Batch Operations
          </Button>
          
          <Button 
            variant="outline" 
            className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
            onClick={() => {
              // Handle performance insights
              console.log('View insights');
            }}
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Performance Insights
          </Button>
        </div>
      </Card>

      {/* Individual Pool Management */}
      <div className="space-y-4">
        {createdPools.map((pool) => {
          const health = getPoolHealthStatus(pool);
          const isExpanded = expandedPool === pool.poolId;
          
          return (
            <Card key={pool.poolId} className="jungle-card p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{pool.emoji}</span>
                  <div>
                    <h5 className="text-white font-bold pixel-text">{pool.name}</h5>
                    <p className="text-jungle-300 text-sm">
                      TVL: {pool.tvl.toLocaleString()} • {pool.activeDuration} active
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge 
                    variant="outline" 
                    className={`border-${health.color}-400 text-${health.color}-400`}
                  >
                    {health.message}
                  </Badge>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setExpandedPool(isExpanded ? null : pool.poolId)}
                    className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white"
                  >
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Pool Health Indicators */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-jungle-300">Utilization</span>
                    <span className="text-white">{pool.utilizationRate}%</span>
                  </div>
                  <Progress value={pool.utilizationRate} className="h-2" />
                  {pool.utilizationRate >= 85 && (
                    <div className="flex items-center gap-1 mt-1">
                      <AlertTriangle className="w-3 h-3 text-orange-400" />
                      <span className="text-orange-400 text-xs">Consider expanding capacity</span>
                    </div>
                  )}
                </div>
                
                <div>
                  <div className="text-jungle-300 text-sm mb-2">Milestone Progress</div>
                  <div className="flex gap-1">
                    {pool.milestones.map((milestone, index) => (
                      <div
                        key={index}
                        className={`flex-1 h-2 rounded ${
                          milestone.achieved ? 'bg-green-400' : 'bg-jungle-700'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="text-jungle-400 text-xs mt-1">
                    {pool.milestones.filter(m => m.achieved).length}/{pool.milestones.length} achieved
                  </div>
                </div>
                
                <div>
                  <div className="text-jungle-300 text-sm mb-2">Quick Actions</div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white"
                      onClick={() => onExportAnalytics?.(pool.poolId)}
                    >
                      <BarChart3 className="w-3 h-3" />
                    </Button>
                    
                    {pool.status === 'active' ? (
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white"
                        onClick={() => onPausePool?.(pool.poolId)}
                      >
                        <Pause className="w-3 h-3" />
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-green-400 text-green-400 hover:bg-green-400 hover:text-white"
                        onClick={() => onResumePool?.(pool.poolId)}
                      >
                        <Play className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Expanded Management Options */}
              {isExpanded && (
                <div className="border-t border-jungle-600 pt-4 space-y-4">
                  <h6 className="text-white font-semibold pixel-text">Advanced Management</h6>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Capacity Management */}
                    <div>
                      <div className="text-jungle-300 text-sm mb-2">Update Capacity</div>
                      <div className="flex gap-2">
                        <Input
                          type="number"
                          placeholder={`Current: ${pool.maxCapacity.toLocaleString()}`}
                          value={newCapacities[pool.poolId] || ''}
                          onChange={(e) => setNewCapacities(prev => ({
                            ...prev,
                            [pool.poolId]: parseInt(e.target.value) || 0
                          }))}
                          className="flex-1"
                        />
                        <Button
                          size="sm"
                          onClick={() => handleCapacityUpdate(pool.poolId)}
                          className="bg-blue-500 hover:bg-blue-600"
                        >
                          Update
                        </Button>
                      </div>
                      <div className="text-jungle-400 text-xs mt-1">
                        Current: {pool.currentStaked.toLocaleString()} / {pool.maxCapacity.toLocaleString()}
                      </div>
                    </div>

                    {/* Pool Statistics */}
                    <div>
                      <div className="text-jungle-300 text-sm mb-2">Pool Statistics</div>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-jungle-400 text-sm">Active Since:</span>
                          <span className="text-white text-sm">{pool.activeDuration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-jungle-400 text-sm">Total Earned:</span>
                          <span className="text-yellow-400 text-sm">{pool.totalLionheartEarned.toLocaleString()} 🦁</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-jungle-400 text-sm">Status:</span>
                          <Badge 
                            variant="outline" 
                            className={pool.status === 'active' ? 'border-green-400 text-green-400' : 'border-gray-400 text-gray-400'}
                          >
                            {pool.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default PoolManagementSection;