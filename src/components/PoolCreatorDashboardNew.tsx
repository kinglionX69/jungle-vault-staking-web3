import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { DashboardCreatedPool, DashboardSummary } from '@/types/dashboardNew';
import CreatorEndPoolModal from '@/components/modals/CreatorEndPoolModal';
import { useToast } from '@/hooks/use-toast';
import PoolAnalyticsSection from '@/components/creator/PoolAnalyticsSection';
import CreatorRewardsSection from '@/components/creator/CreatorRewardsSection';
import PoolManagementSection from '@/components/creator/PoolManagementSection';
import TransactionHistorySection from '@/components/creator/TransactionHistorySection';
import NotificationsSection from '@/components/creator/NotificationsSection';
import { 
  mockPoolAnalytics, 
  mockTransactionHistory, 
  mockCreatorNotifications,
  mockEnhancedCreatorStats,
  mockEnhancedCreatedPools,
  EnhancedCreatorStats
} from '@/data/mockCreatorDashboard';

interface PoolCreatorDashboardNewProps {
  createdPools: DashboardCreatedPool[];
  creatorStats: NonNullable<DashboardSummary['creatorStats']>;
  onEndPool?: (poolId: string) => Promise<void>;
}

const PoolCreatorDashboardNew = ({ createdPools, creatorStats, onEndPool }: PoolCreatorDashboardNewProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [endPoolModal, setEndPoolModal] = useState<{
    isOpen: boolean;
    pool: DashboardCreatedPool | null;
  }>({ isOpen: false, pool: null });

  const openEndPoolModal = (pool: DashboardCreatedPool) => {
    setEndPoolModal({ isOpen: true, pool });
  };

  const closeEndPoolModal = () => {
    setEndPoolModal({ isOpen: false, pool: null });
  };

  const handleEndPool = async () => {
    if (!endPoolModal.pool || !onEndPool) return;
    
    try {
      await onEndPool(endPoolModal.pool.poolId);
    } catch (error) {
      // Error handling is done in the modal
      throw error;
    }
  };
  const getMilestoneProgress = (pool: DashboardCreatedPool) => {
    const achievedMilestones = pool.milestones.filter(m => m.achieved).length;
    return (achievedMilestones / pool.milestones.length) * 100;
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 0,
    }).format(num);
  };

  // Handler functions for enhanced features
  const handleClaimRewards = async (poolId: string, milestoneId: number) => {
    toast({
      title: "Claiming Rewards",
      description: `Claiming milestone reward for pool ${poolId}`,
    });
  };

  const handleViewAnalytics = (poolId: string) => {
    // Switch to analytics tab using controlled state
    setActiveTab("analytics");
    
    // Wait for tab content to load, then scroll to specific pool
    setTimeout(() => {
      const poolElement = document.getElementById(`analytics-${poolId}`);
      if (poolElement) {
        poolElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Add highlight effect
        poolElement.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.5)';
        poolElement.style.border = '2px solid #00ffff';
        setTimeout(() => {
          poolElement.style.boxShadow = '';
          poolElement.style.border = '';
        }, 3000);
      }
    }, 200);
    
    toast({
      title: "Viewing Analytics",
      description: `Opening detailed analytics for ${poolId.toUpperCase()}`,
    });
  };

  const handlePausePool = async (poolId: string) => {
    toast({
      title: "Pool Paused",
      description: `Pool ${poolId} has been paused`,
    });
  };

  const handleResumePool = async (poolId: string) => {
    toast({
      title: "Pool Resumed",
      description: `Pool ${poolId} has been resumed`,
    });
  };

  const handleUpdateCapacity = async (poolId: string, newCapacity: number) => {
    toast({
      title: "Capacity Updated",
      description: `Pool ${poolId} capacity updated to ${newCapacity.toLocaleString()}`,
    });
  };

  const handleExportAnalytics = async (poolId: string) => {
    toast({
      title: "Exporting Analytics",
      description: `Analytics for pool ${poolId} will be downloaded`,
    });
  };

  const handleMarkNotificationAsRead = (notificationId: string) => {
    toast({
      title: "Notification marked as read",
      description: "Notification has been marked as read",
    });
  };

  const handleMarkAllNotificationsAsRead = () => {
    toast({
      title: "All notifications marked as read",
      description: "All notifications have been marked as read",
    });
  };

  const handleDismissNotification = (notificationId: string) => {
    toast({
      title: "Notification dismissed",
      description: "Notification has been dismissed",
    });
  };

  const handleExportHistory = () => {
    toast({
      title: "Exporting History",
      description: "Transaction history will be downloaded",
    });
  };

  return (
    <div className="space-y-8">
      {/* Enhanced Creator Stats Overview */}
      <Card className="jungle-card p-6">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2 pixel-text text-pixel-glow">
          <span>👑</span>
          Enhanced Creator Dashboard
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div className="text-center jungle-card p-4">
            <div className="text-2xl font-bold text-blue-400 mb-1">
              {mockEnhancedCreatorStats.poolsCreated}
            </div>
            <div className="text-jungle-300 text-sm">Pools Created</div>
          </div>
          
          <div className="text-center jungle-card p-4">
            <div className="text-2xl font-bold text-green-400 mb-1">
              {formatNumber(mockEnhancedCreatorStats.totalCapacityProvided)}
            </div>
            <div className="text-jungle-300 text-sm">Total Capacity</div>
          </div>
          
          <div className="text-center jungle-card p-4">
            <div className="text-2xl font-bold text-yellow-400 mb-1">
              {formatNumber(mockEnhancedCreatorStats.lionheartEarned)}
            </div>
            <div className="text-jungle-300 text-sm">LIONHEART Earned</div>
          </div>
          
          <div className="text-center jungle-card p-4">
            <div className="text-2xl font-bold text-orange-400 mb-1">
              {formatNumber(mockEnhancedCreatorStats.lionheartPotential)}
            </div>
            <div className="text-jungle-300 text-sm">Potential Rewards</div>
          </div>

          <div className="text-center jungle-card p-4">
            <div className="text-2xl font-bold text-purple-400 mb-1">
              {mockEnhancedCreatorStats.totalStakers}
            </div>
            <div className="text-jungle-300 text-sm">Total Stakers</div>
          </div>

          <div className="text-center jungle-card p-4">
            <div className="text-2xl font-bold text-cyan-400 mb-1">
              {mockEnhancedCreatorStats.avgStakerRetention.toFixed(1)}%
            </div>
            <div className="text-jungle-300 text-sm">Avg Retention</div>
          </div>
        </div>
      </Card>

      {/* Enhanced Creator Dashboard Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6 jungle-card">
          <TabsTrigger value="overview" className="pixel-text">Overview</TabsTrigger>
          <TabsTrigger value="analytics" className="pixel-text">Analytics</TabsTrigger>
          <TabsTrigger value="rewards" className="pixel-text">Rewards</TabsTrigger>
          <TabsTrigger value="management" className="pixel-text">Management</TabsTrigger>
          <TabsTrigger value="history" className="pixel-text">History</TabsTrigger>
          <TabsTrigger value="notifications" className="pixel-text">Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          {/* Basic Pool Overview */}
          <Card className="jungle-card p-6">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2 pixel-text text-pixel-glow">
              <span>🏗️</span>
              My Created Pools
            </h3>

            {mockEnhancedCreatedPools.length > 0 ? (
              <div className="space-y-6">
                {mockEnhancedCreatedPools.map((pool) => (
                  <div key={pool.poolId} className="jungle-card p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{pool.emoji}</span>
                        <div>
                          <h4 className="text-xl font-bold text-white pixel-text">{pool.name}</h4>
                          <div className="text-jungle-300">
                            TVL: {formatNumber(pool.tvl)} • {pool.activeDuration}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <Badge className={pool.status === 'active' ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'}>
                          {pool.status}
                        </Badge>
                        <div className="text-yellow-400 font-semibold mt-1">
                          {formatNumber(pool.totalLionheartEarned)} LIONHEART
                        </div>
                      </div>
                    </div>
                    
                    {/* Pool Metrics */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <div className="text-jungle-300 text-sm">Utilization</div>
                        <div className="text-white font-semibold">
                          {pool.utilizationRate.toFixed(1)}%
                        </div>
                      </div>
                      <div>
                        <div className="text-jungle-300 text-sm">Staked</div>
                        <div className="text-white font-semibold">
                          {formatNumber(pool.currentStaked)} / {formatNumber(pool.maxCapacity)}
                        </div>
                      </div>
                      <div>
                        <div className="text-jungle-300 text-sm">Milestone Progress</div>
                        <div className="text-white font-semibold">
                          {getMilestoneProgress(pool).toFixed(0)}%
                        </div>
                      </div>
                    </div>
                    
                    {/* Utilization Progress */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-jungle-300">Pool Capacity</span>
                        <span className="text-jungle-200">{pool.utilizationRate.toFixed(1)}%</span>
                      </div>
                      <Progress value={pool.utilizationRate} className="h-2" />
                    </div>
                    
                     {/* Creator Milestones - Fixed 10%, 40%, 80% system */}
                    <div className="mb-4">
                      <h5 className="text-white font-semibold mb-2 pixel-text">Creator Milestones</h5>
                      <div className="grid grid-cols-3 gap-2">
                        {pool.milestones.map((milestone, index) => {
                          const milestoneLabels = ['Early Bird', 'Halfway Hero', 'Major Milestone'];
                          const milestoneEmojis = ['🐦', '🏆', '🎯'];
                          
                          return (
                            <div
                              key={index}
                              className={`text-center p-3 rounded-lg border ${
                                milestone.achieved
                                  ? 'border-green-500 bg-green-500/20'
                                  : 'border-jungle-600 bg-jungle-800/50'
                              }`}
                            >
                              <div className="text-sm text-jungle-200 mb-1">
                                {milestoneEmojis[index]} {milestoneLabels[index]}
                              </div>
                              <div className="text-xs text-jungle-300 mb-1">{milestone.percentage}%</div>
                              <div className={`text-sm font-semibold ${
                                milestone.achieved ? 'text-green-400' : 'text-jungle-300'
                              }`}>
                                {formatNumber(milestone.lionheartReward)} 🦁
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex gap-2 pt-4 border-t border-jungle-600/30">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
                        onClick={() => handleViewAnalytics(pool.poolId)}
                      >
                        📊 View Analytics
                      </Button>
                      {pool.status === 'active' && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => openEndPoolModal(pool)}
                          className="border-orange-600 text-orange-400 hover:bg-orange-900/30"
                        >
                          🎯 End Pool
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">🏗️</div>
                <h4 className="text-lg font-bold text-jungle-300 mb-2">
                  No pools created yet
                </h4>
                <p className="text-jungle-400 mb-4">
                  Create your first staking pool to start earning LIONHEART rewards
                </p>
                <Link to="/create">
                  <Button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold">
                    Create Your First Pool
                  </Button>
                </Link>
              </div>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="mt-6" id="analytics-section">
          <PoolAnalyticsSection analytics={mockPoolAnalytics} />
        </TabsContent>

        <TabsContent value="rewards" className="mt-6">
          <CreatorRewardsSection 
            createdPools={mockEnhancedCreatedPools}
            creatorStats={mockEnhancedCreatorStats}
            onClaimRewards={handleClaimRewards}
          />
        </TabsContent>

        <TabsContent value="management" className="mt-6">
          <PoolManagementSection 
            createdPools={mockEnhancedCreatedPools}
            onPausePool={handlePausePool}
            onResumePool={handleResumePool}
            onUpdateCapacity={handleUpdateCapacity}
            onExportAnalytics={handleExportAnalytics}
          />
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <TransactionHistorySection 
            transactions={mockTransactionHistory}
            onExportHistory={handleExportHistory}
          />
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <NotificationsSection 
            notifications={mockCreatorNotifications}
            onMarkAsRead={handleMarkNotificationAsRead}
            onMarkAllAsRead={handleMarkAllNotificationsAsRead}
            onDismiss={handleDismissNotification}
          />
        </TabsContent>
      </Tabs>

      {/* End Pool Modal */}
      {endPoolModal.pool && (
        <CreatorEndPoolModal
          isOpen={endPoolModal.isOpen}
          onClose={closeEndPoolModal}
          poolName={endPoolModal.pool.name}
          poolEmoji={endPoolModal.pool.emoji}
          currentStaked={endPoolModal.pool.currentStaked}
          maxCapacity={endPoolModal.pool.maxCapacity}
          totalRewards={endPoolModal.pool.tvl} // Using TVL as total rewards for now
          onEndPool={handleEndPool}
        />
      )}
    </div>
  );
};

export default PoolCreatorDashboardNew;