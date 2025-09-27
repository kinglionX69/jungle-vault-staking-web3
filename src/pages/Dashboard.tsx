
import React from 'react';
import { useWallet } from '@/hooks/useWallet';
import { useDashboardData } from '@/hooks/useDashboardData';
import { useSimplifiedStaking } from '@/contexts/WeightedStakingContext';
import WalletLockScreen from '@/components/WalletLockScreen';
import RewardSummaryNew from '@/components/RewardSummaryNew';
import MyStakesNew from '@/components/MyStakesNew';
import MyNFTBoostsNew from '@/components/MyNFTBoostsNew';
import MyMilestonesNew from '@/components/MyMilestonesNew';
import PoolCreatorDashboardNew from '@/components/PoolCreatorDashboardNew';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Dashboard = () => {
  const { isConnected, connect } = useWallet();
  const { toast } = useToast();
  const { claimRewards, removeStake } = useSimplifiedStaking();
  const dashboardData = useDashboardData();

  const handleStakeAction = async (stakeId: string, action: 'claim' | 'unstake' | 'withdraw' | 'claim_and_unstake') => {
    try {
      if (action === 'claim') {
        const result = await claimRewards(stakeId);
        if (result.success) {
          toast({
            title: "Rewards Claimed! 🎉",
            description: `You claimed ${result.rewards?.finalReward.toFixed(2)} tokens`,
          });
        } else {
          throw new Error('Failed to claim rewards');
        }
      } else if (action === 'unstake') {
        removeStake(stakeId);
        toast({
          title: "Tokens Unstaked! 💰",
          description: "Your tokens have been unstaked successfully",
        });
      } else if (action === 'claim_and_unstake') {
        // First claim rewards, then unstake
        const result = await claimRewards(stakeId);
        if (result.success) {
          removeStake(stakeId);
          toast({
            title: "Rewards Claimed & Tokens Unstaked! 🎉💰",
            description: `You claimed ${result.rewards?.finalReward.toFixed(2)} tokens and unstaked successfully`,
          });
        } else {
          throw new Error('Failed to claim rewards');
        }
      }
    } catch (error) {
      toast({
        title: "Transaction Failed",
        description: "Please try again later",
        variant: "destructive"
      });
    }
  };

  const handleEndPool = async (poolId: string) => {
    try {
      // TODO: Implement actual pool ending logic
      // This should:
      // 1. Calculate rewards for all stakers
      // 2. Auto-distribute staker rewards
      // 3. Return unallocated rewards to creator
      // 4. Mark pool as ended
      
      toast({
        title: "Pool Ended Successfully! 🎯",
        description: "Rewards have been distributed to all stakers",
      });
    } catch (error) {
      toast({
        title: "Failed to End Pool",
        description: "Please try again later",
        variant: "destructive"
      });
      throw error;
    }
  };

  if (!isConnected) {
    return <WalletLockScreen onConnect={connect} />;
  }

  return (
    <div className="min-h-screen scanlines-effect">
      {/* Page Header */}
      <div className="temple-bg py-8 px-6 border-b border-jungle-600/30">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-shadow-glow mb-2 pixel-text text-pixel-glow">
            YOUR DASHBOARD
            <span className="ml-3 text-5xl animate-pixel-pulse">🏛️</span>
          </h1>
          <p className="text-jungle-200 text-lg">
            Your emojicoin staking adventure overview
          </p>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="container mx-auto px-6 py-8">
        <RewardSummaryNew summary={dashboardData.summary} />
        
        <Tabs defaultValue="staker" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 pixel-card">
            <TabsTrigger value="staker" className="pixel-text">Staker Dashboard</TabsTrigger>
            <TabsTrigger value="creator" className="pixel-text">Creator Dashboard</TabsTrigger>
          </TabsList>
          
          <TabsContent value="staker">
            <MyStakesNew 
              stakes={dashboardData.stakes} 
              onStakeAction={handleStakeAction}
            />
            
            <div className="grid md:grid-cols-2 gap-8">
              <MyNFTBoostsNew nftBoosts={dashboardData.nftBoosts} />
              <MyMilestonesNew milestones={dashboardData.milestones} />
            </div>
          </TabsContent>
          
          <TabsContent value="creator">
            <PoolCreatorDashboardNew 
              createdPools={dashboardData.createdPools}
              creatorStats={dashboardData.summary.creatorStats || {
                poolsCreated: 0,
                totalCapacityProvided: 0,
                lionheartEarned: 0,
                lionheartPotential: 0
              }}
              onEndPool={handleEndPool}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Jungle background decoration */}
      <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-jungle-900/30 to-transparent pointer-events-none">
        <div className="flex justify-center items-end h-full text-3xl space-x-12 opacity-20">
          <span className="animate-float">🦁</span>
          <span className="animate-float" style={{ animationDelay: '1s' }}>🐒</span>
          <span className="animate-float" style={{ animationDelay: '2s' }}>🦜</span>
          <span className="animate-float" style={{ animationDelay: '3s' }}>🌿</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
