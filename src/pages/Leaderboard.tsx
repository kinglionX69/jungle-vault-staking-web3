
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockLeaderboardData } from '@/data/mockLeaderboard';
import LeaderboardTable from '@/components/LeaderboardTable';
import PoolSelector from '@/components/PoolSelector';

const Leaderboard = () => {
  const [selectedPool, setSelectedPool] = useState('lionheart');

  return (
    <div className="min-h-screen bg-jungle-950">
      {/* Header Section */}
      <div className="temple-bg py-12 px-6 border-b border-jungle-600/30">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-shadow-glow mb-4 pixel-text text-pixel-glow">
            TOP STAKERS IN THE JUNGLE
            <span className="ml-4 text-6xl animate-pixel-pulse">🦁</span>
          </h1>
          <p className="text-jungle-200 text-xl mb-6">
            Check out the biggest earners across all pools — are you on the list?
          </p>
          
          {/* Decorative jungle elements */}
          <div className="flex justify-center mt-8 text-3xl space-x-6 opacity-60">
            <span className="animate-float">🏆</span>
            <span className="animate-float" style={{ animationDelay: '0.5s' }}>🌿</span>
            <span className="animate-float" style={{ animationDelay: '1s' }}>🐋</span>
            <span className="animate-float" style={{ animationDelay: '1.5s' }}>🥇</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="global" className="w-full">
          <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-8 jungle-card">
            <TabsTrigger 
              value="global" 
              className="data-[state=active]:bg-jungle-600 data-[state=active]:text-white text-jungle-200"
            >
              🌍 Global Leaderboard
            </TabsTrigger>
            <TabsTrigger 
              value="bypool" 
              className="data-[state=active]:bg-jungle-600 data-[state=active]:text-white text-jungle-200"
            >
              🏊 By Pool
            </TabsTrigger>
          </TabsList>

          <TabsContent value="global" className="mt-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-jungle-100 mb-2 text-center">
                🌟 Global Rankings
              </h2>
              <p className="text-jungle-300 text-center">
                Top stakers across all pools in the jungle ecosystem
              </p>
            </div>
            <LeaderboardTable entries={mockLeaderboardData.global} showPool={true} />
          </TabsContent>

          <TabsContent value="bypool" className="mt-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-jungle-100 mb-4 text-center">
                🎯 Pool-Specific Rankings
              </h2>
              <div className="flex justify-center mb-6">
                <PoolSelector 
                  selectedPool={selectedPool} 
                  onPoolChange={setSelectedPool} 
                />
              </div>
            </div>
            
            {mockLeaderboardData.byPool[selectedPool] ? (
              <LeaderboardTable 
                entries={mockLeaderboardData.byPool[selectedPool]} 
                showPool={false} 
              />
            ) : (
              <div className="jungle-card text-center py-12">
                <div className="text-6xl mb-4">🌴</div>
                <h3 className="text-xl font-bold text-jungle-200 mb-2">
                  No Data Available
                </h3>
                <p className="text-jungle-400">
                  This pool doesn't have enough stakers yet. Be the first!
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Tier Legend */}
        <div className="mt-12 jungle-card p-6">
          <h3 className="text-xl font-bold text-jungle-100 mb-4 text-center">
            🏅 Staker Tiers
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-4 rounded-lg bg-gradient-to-b from-yellow-400/10 to-yellow-600/10 border border-yellow-500/20">
              <div className="text-3xl mb-2">🐋</div>
              <div className="font-bold text-yellow-400">Whale</div>
              <div className="text-sm text-jungle-300">Top 5% of stakers</div>
            </div>
            <div className="p-4 rounded-lg bg-gradient-to-b from-slate-300/10 to-slate-500/10 border border-slate-400/20">
              <div className="text-3xl mb-2">🐬</div>
              <div className="font-bold text-slate-300">Dolphin</div>
              <div className="text-sm text-jungle-300">Next 15% of stakers</div>
            </div>
            <div className="p-4 rounded-lg bg-gradient-to-b from-amber-600/10 to-amber-800/10 border border-amber-700/20">
              <div className="text-3xl mb-2">🐠</div>
              <div className="font-bold text-amber-400">Fish</div>
              <div className="text-sm text-jungle-300">Next 30% of stakers</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
