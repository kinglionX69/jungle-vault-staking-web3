
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const FeaturedPools = () => {
  const pools = [
    {
      id: 1,
      name: "🦁❤️ LIONHEART SUIT",
      rewardsPercentage: "250",
      timeLeft: "60d",
      totalStaked: "77.1K APT",
      emoji: "🦁❤️",
      gradient: "from-yellow-400 to-orange-500",
      milestones: {
        early: { thresholdPercentage: 10, achieved: true, rewardAmount: 500 },
        halfway: { thresholdPercentage: 40, achieved: true, rewardAmount: 750 },
        major: { thresholdPercentage: 80, achieved: false, rewardAmount: 1000 }
      },
      nftBoosts: true
    },
    {
      id: 2,
      name: "🚀💯 ROCKET HUNDRED",
      rewardsPercentage: "220",
      timeLeft: "23d",
      totalStaked: "68K APT",
      emoji: "🚀💯",
      gradient: "from-blue-400 to-purple-600",
      milestones: {
        early: { thresholdPercentage: 10, achieved: true, rewardAmount: 400 },
        halfway: { thresholdPercentage: 40, achieved: true, rewardAmount: 600 },
        major: { thresholdPercentage: 80, achieved: false, rewardAmount: 800 }
      },
      nftBoosts: false
    },
    {
      id: 3,
      name: "🌐 GLOBE MERIDIANS",
      rewardsPercentage: "170",
      timeLeft: "30d",
      totalStaked: "51.2K APT",
      emoji: "🌐", 
      gradient: "from-green-400 to-blue-500",
      milestones: {
        early: { thresholdPercentage: 10, achieved: true, rewardAmount: 300 },
        halfway: { thresholdPercentage: 40, achieved: true, rewardAmount: 500 },
        major: { thresholdPercentage: 80, achieved: false, rewardAmount: 700 }
      },
      nftBoosts: true
    },
    {
      id: 4,
      name: "🧧 RED ENVELOPE",
      rewardsPercentage: "160",
      timeLeft: "15d",
      totalStaked: "32.6K APT",
      emoji: "🧧",
      gradient: "from-red-400 to-pink-500",
      milestones: {
        early: { thresholdPercentage: 10, achieved: true, rewardAmount: 250 },
        halfway: { thresholdPercentage: 40, achieved: true, rewardAmount: 400 },
        major: { thresholdPercentage: 80, achieved: false, rewardAmount: 600 }
      },
      nftBoosts: true
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-jungle-950 to-jungle-900">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-shadow pixel-text">
            🏆 Featured Jungle Pools
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Discover the most rewarding staking pools in our mystical jungle ecosystem
          </p>
        </div>

        {/* Horizontal scrollable container */}
        <div className="overflow-x-auto pb-6">
          <div className="flex space-x-4 sm:space-x-6 min-w-max px-4">
            {pools.map((pool) => (
              <Card 
                key={pool.id} 
                className="pixel-card w-72 sm:w-80 flex-shrink-0 hover:scale-105 transition-all duration-300 cursor-pointer group h-full"
              >
                <div className="h-full flex flex-col">
                  <CardHeader className="text-center pb-4">
                    <div className={`text-4xl sm:text-6xl mb-3 sm:mb-4 group-hover:animate-pixel-pulse`}>
                      {pool.emoji}
                    </div>
                    <CardTitle className="text-lg sm:text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                      {pool.name}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="space-y-3 sm:space-y-4 flex-grow flex flex-col">
                    {/* Rewards % Display */}
                    <div className="text-center">
                      <div className="text-2xl sm:text-3xl font-bold text-accent mb-1">
                        {pool.rewardsPercentage}%
                      </div>
                      <div className="text-muted-foreground text-sm">Rewards %</div>
                    </div>

                    {/* Stats */}
                    <div className="space-y-2 sm:space-y-3 flex-grow">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground text-sm">Time Left:</span>
                        <span className="text-foreground font-semibold text-sm">{pool.timeLeft}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground text-sm">Total Staked:</span>
                        <span className="text-foreground font-semibold text-sm">{pool.totalStaked}</span>
                      </div>
                      
                      {/* Milestone Progress */}
                      <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-2">
                        <div className="text-xs text-purple-300 mb-1">
                          {pool.milestones.major.achieved ? '🏆 All Milestones Complete!' : '🎯 Next Milestone'}
                        </div>
                        {!pool.milestones.major.achieved && (
                          <div className="text-xs text-yellow-400">
                            {pool.milestones.major.rewardAmount} tokens at {pool.milestones.major.thresholdPercentage}%
                          </div>
                        )}
                      </div>
                      
                      {/* NFT Boost indicator */}
                      {pool.nftBoosts && (
                        <div className="flex items-center justify-center text-xs text-purple-400">
                          🚀 NFT Boosts Available
                        </div>
                      )}
                    </div>

                    {/* Stake Button */}
                    <Button 
                      variant="pixel" 
                      size="lg" 
                      className="w-full mt-auto"
                    >
                      🏦 Stake Now
                    </Button>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div className="text-center mt-6 sm:mt-8">
          <p className="text-muted-foreground text-xs sm:text-sm">
            ← Scroll to explore more pools →
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPools;
