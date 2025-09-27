
import React, { useState } from 'react';
import { useWallet } from '@/hooks/useWallet';
import { SUPER_ADMIN_WALLET } from '@/types/admin';
import { mockAdminStats, mockAdminPools } from '@/data/mockAdmin';
import AdminLockScreen from '@/components/admin/AdminLockScreen';
import OverviewDashboard from '@/components/admin/OverviewDashboard';
import LivePoolManager from '@/components/admin/LivePoolManager';
import FeaturedPoolControl from '@/components/admin/FeaturedPoolControl';
import PoolAnalytics from '@/components/admin/PoolAnalytics';
import CreatorRewardsManager from '@/components/admin/CreatorRewardsManager';
import { AdminPool } from '@/types/admin';
import { useToast } from '@/hooks/use-toast';

const Admin = () => {
  const { isConnected, address } = useWallet();
  const { toast } = useToast();
  const [pools, setPools] = useState<AdminPool[]>(mockAdminPools);
  const [stats, setStats] = useState(mockAdminStats);
  const [activeTab, setActiveTab] = useState<'overview' | 'pools' | 'analytics' | 'rewards'>('overview');

  const isAdmin = isConnected && address === SUPER_ADMIN_WALLET;

  if (!isAdmin) {
    return <AdminLockScreen />;
  }

  const handleTopUp = (poolId: string, amount: string) => {
    console.log(`Top up pool ${poolId} with ${amount}`);
    toast({
      title: "Pool Topped Up! 🔋",
      description: `Added ${amount} rewards to the pool successfully.`,
    });
  };

  const handleEndPool = (poolId: string) => {
    setPools(prev => prev.map(pool => 
      pool.id === poolId 
        ? { ...pool, status: 'ended' as const }
        : pool
    ));
    
    toast({
      title: "Pool Ended! 🛑",
      description: "Pool has been ended early. No new rewards will be distributed.",
    });
  };

  const handleToggleFeatured = (poolId: string) => {
    const pool = pools.find(p => p.id === poolId);
    if (!pool) return;

    const featuredCount = pools.filter(p => p.isFeatured).length;
    
    if (!pool.isFeatured && featuredCount >= 5) {
      toast({
        title: "Feature Limit Reached",
        description: "Maximum 5 pools can be featured. Remove one first.",
        variant: "destructive"
      });
      return;
    }

    setPools(prev => prev.map(p => 
      p.id === poolId 
        ? { ...p, isFeatured: !p.isFeatured }
        : p
    ));

    toast({
      title: pool.isFeatured ? "Removed from Featured! 🌟" : "Added to Featured! ⭐",
      description: pool.isFeatured 
        ? "Pool removed from featured carousel"
        : "Pool added to featured carousel",
    });
  };

  const handleReorderFeatured = (poolId: string, direction: 'up' | 'down') => {
    const featuredPools = pools.filter(p => p.isFeatured);
    const poolIndex = featuredPools.findIndex(p => p.id === poolId);
    
    if (poolIndex === -1) return;
    
    const newIndex = direction === 'up' ? poolIndex - 1 : poolIndex + 1;
    if (newIndex < 0 || newIndex >= featuredPools.length) return;
    
    // Swap positions
    [featuredPools[poolIndex], featuredPools[newIndex]] = [featuredPools[newIndex], featuredPools[poolIndex]];
    
    // Update the pools array
    const updatedPools = pools.map(pool => {
      const featuredPool = featuredPools.find(fp => fp.id === pool.id);
      return featuredPool || pool;
    });
    
    setPools(updatedPools);
    
    toast({
      title: "Featured Pools Reordered! 🔄",
      description: "Featured pool order has been updated.",
    });
  };

  const handleRemoveFromFeatured = (poolId: string) => {
    setPools(prev => prev.map(p => 
      p.id === poolId 
        ? { ...p, isFeatured: false }
        : p
    ));

    toast({
      title: "Removed from Featured! 🌟",
      description: "Pool removed from featured carousel",
    });
  };

  const handleDistributeRewards = (poolId: string, amount: number) => {
    setPools(prev => prev.map(pool => 
      pool.id === poolId 
        ? { 
            ...pool, 
            creatorRewards: {
              ...pool.creatorRewards,
              totalLionheartDistributed: pool.creatorRewards.totalLionheartDistributed + amount,
              pendingDistribution: 0
            }
          }
        : pool
    ));
    
    // Update total rewards in stats
    const newTotalRewards = parseInt(stats.totalCreatorRewards.replace(/[^0-9]/g, '')) + amount;
    setStats(prev => ({
      ...prev,
      totalCreatorRewards: `${newTotalRewards.toLocaleString()} LIONHEART`
    }));
  };

  const handleAdjustMilestone = (poolId: string, milestoneId: string, newThreshold: 10 | 40 | 80) => {
    setPools(prev => prev.map(pool => 
      pool.id === poolId 
        ? {
            ...pool,
            milestones: pool.milestones.map(milestone =>
              milestone.id === milestoneId
                ? { ...milestone, thresholdPercentage: newThreshold }
                : milestone
            )
          }
        : pool
    ));
    
    toast({
      title: "Milestone Updated! 🎯",
      description: `Milestone threshold adjusted to ${newThreshold}%`,
    });
  };

  const handleExportCSV = () => {
    console.log('Exporting CSV data...');
    toast({
      title: "CSV Export Started! 📊",
      description: "Pool data is being prepared for download...",
    });
  };

  return (
    <div className="min-h-screen">
      {/* Admin Header Navigation */}
      <div className="border-b border-jungle-600/30 bg-jungle-900/50">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-8 py-4">
            <h1 className="text-2xl font-bold text-yellow-300 pixel-text text-pixel-glow">🛡️ ADMIN DASHBOARD</h1>
            
            <nav className="flex gap-4">
              {[
                { id: 'overview', label: '📊 Overview', icon: '📊' },
                { id: 'pools', label: '🏊 Pool Manager', icon: '🏊' },
                { id: 'analytics', label: '📈 Analytics', icon: '📈' },
                { id: 'rewards', label: '🦁 Creator Rewards', icon: '🦁' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                      : 'text-jungle-200 hover:text-white hover:bg-jungle-700/30'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Admin Content */}
      <div className="container mx-auto px-6 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <OverviewDashboard 
              stats={stats} 
              onExportCSV={handleExportCSV}
            />
            <FeaturedPoolControl 
              pools={pools}
              onReorderFeatured={handleReorderFeatured}
              onRemoveFromFeatured={handleRemoveFromFeatured}
            />
          </div>
        )}

        {activeTab === 'pools' && (
          <LivePoolManager 
            pools={pools}
            onTopUp={handleTopUp}
            onEndPool={handleEndPool}
            onToggleFeatured={handleToggleFeatured}
          />
        )}

        {activeTab === 'analytics' && (
          <PoolAnalytics pools={pools} />
        )}

        {activeTab === 'rewards' && (
          <CreatorRewardsManager 
            pools={pools}
            onDistributeRewards={handleDistributeRewards}
            onAdjustMilestone={handleAdjustMilestone}
          />
        )}
      </div>

      {/* Jungle background decoration */}
      <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-jungle-900/30 to-transparent pointer-events-none">
        <div className="flex justify-center items-end h-full text-3xl space-x-12 opacity-20">
          <span className="animate-float">🛡️</span>
          <span className="animate-float" style={{ animationDelay: '1s' }}>👑</span>
          <span className="animate-float" style={{ animationDelay: '2s' }}>🏛️</span>
          <span className="animate-float" style={{ animationDelay: '3s' }}>⚡</span>
        </div>
      </div>
    </div>
  );
};

export default Admin;
