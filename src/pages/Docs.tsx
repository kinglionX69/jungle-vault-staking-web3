import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Docs = () => {
  return (
    <div className="min-h-screen temple-bg">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4 pixel-text text-pixel-glow">
            🏛️ JUNGLE VAULT DOCUMENTATION
          </h1>
          <p className="text-xl text-jungle-200 max-w-3xl mx-auto">
            Complete guide to simplified emojicoin staking platform with equal-distribution rewards, 
            milestone bonuses, and creator incentives
          </p>
          <div className="flex justify-center gap-4 mt-6">
            <Link to="/pools">
              <Button className="neon-button">🌴 Explore Pools</Button>
            </Link>
            <Link to="/create">
              <Button variant="outline" className="border-jungle-400 text-jungle-200 hover:bg-jungle-700">
                🚀 Create Pool
              </Button>
            </Link>
          </div>
        </div>

        {/* Table of Contents */}
        <Card className="jungle-card mb-8">
          <CardHeader>
            <CardTitle className="text-yellow-300 flex items-center gap-2">
              📋 Table of Contents
            </CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <a href="#overview" className="block text-jungle-200 hover:text-white transition-colors">
                🏛️ Platform Overview
              </a>
              <a href="#pool-creation" className="block text-jungle-200 hover:text-white transition-colors">
                🚀 Pool Creation System
              </a>
              <a href="#staking" className="block text-jungle-200 hover:text-white transition-colors">
                💎 Simplified Staking
              </a>
              <a href="#creator-rewards" className="block text-jungle-200 hover:text-white transition-colors">
                🦁 Creator Rewards
              </a>
            </div>
            <div className="space-y-2">
              <a href="#dashboard" className="block text-jungle-200 hover:text-white transition-colors">
                📊 Dashboard Features
              </a>
              <a href="#roar-score" className="block text-jungle-200 hover:text-white transition-colors">
                🦁 Roar Score System
              </a>
              <a href="#admin" className="block text-jungle-200 hover:text-white transition-colors">
                👑 Admin Management
              </a>
              <a href="#economics" className="block text-jungle-200 hover:text-white transition-colors">
                💰 Platform Economics
              </a>
              <a href="#troubleshooting" className="block text-jungle-200 hover:text-white transition-colors">
                🔧 Troubleshooting
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Platform Overview */}
        <section id="overview" className="mb-12">
          <Card className="jungle-card">
            <CardHeader>
              <CardTitle className="text-3xl text-yellow-300 flex items-center gap-2">
                🏛️ Platform Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">What is Jungle Vault?</h3>
                <p className="text-jungle-200 leading-relaxed">
                  Jungle Vault is a simplified staking platform built on Aptos for emojicoin tokens. 
                  It features equal-distribution rewards, milestone bonuses, creator incentives, 
                  and transparent pool economics without complex multiplier systems.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="jungle-card p-4">
                  <h4 className="text-lg font-semibold text-green-400 mb-2">🌟 Key Features</h4>
                  <ul className="text-jungle-200 space-y-1">
                    <li>• Single duration staking pools</li>
                    <li>• Equal reward distribution</li>
                    <li>• Three-tier milestone system</li>
                    <li>• NFT boost integration</li>
                    <li>• Creator LIONHEART rewards</li>
                    <li>• Simplified pool analytics</li>
                  </ul>
                </div>
                <div className="jungle-card p-4">
                  <h4 className="text-lg font-semibold text-blue-400 mb-2">🎯 User Roles</h4>
                  <ul className="text-jungle-200 space-y-1">
                    <li>• <strong>Stakers:</strong> Earn proportional rewards</li>
                    <li>• <strong>Creators:</strong> Earn LIONHEART from utilization</li>
                    <li>• <strong>Admins:</strong> Manage platform operations</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Pool Creation System */}
        <section id="pool-creation" className="mb-12">
          <Card className="jungle-card">
            <CardHeader>
              <CardTitle className="text-3xl text-yellow-300 flex items-center gap-2">
                🚀 Pool Creation System
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-jungle-200 text-lg">
                Our simplified 4-step pool creation process allows creators to build efficient staking pools 
                with single duration selection, equal distribution rewards, and transparent economics.
              </p>

              {/* Step 1 */}
              <div className="jungle-card p-6">
                <h3 className="text-xl font-semibold text-green-400 mb-4">
                  Step 1: Token Settings 🪙
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Token Selection</h4>
                    <ul className="text-jungle-200 space-y-1 text-sm">
                      <li>• Choose staking token from wallet</li>
                      <li>• Select reward token (APT or Native)</li>
                      <li>• Automatic balance verification</li>
                      <li>• Real-time token data integration</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Pool Identity</h4>
                    <ul className="text-jungle-200 space-y-1 text-sm">
                      <li>• Custom pool name</li>
                      <li>• Emoji selection from token</li>
                      <li>• Unique pool identification</li>
                      <li>• Visual pool representation</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="jungle-card p-6">
                <h3 className="text-xl font-semibold text-blue-400 mb-4">
                  Step 2: Pool Parameters ⚙️
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Single Duration Selection</h4>
                    <div className="grid md:grid-cols-5 gap-3">
                      <div className="bg-green-500/10 p-3 rounded text-center">
                        <div className="text-green-400 font-medium">Flexible</div>
                        <div className="text-sm text-jungle-200">0 days</div>
                        <div className="text-xs text-green-300">5% min</div>
                      </div>
                      <div className="bg-blue-500/10 p-3 rounded text-center">
                        <div className="text-blue-400 font-medium">Short</div>
                        <div className="text-sm text-jungle-200">30 days</div>
                        <div className="text-xs text-blue-300">8% min</div>
                      </div>
                      <div className="bg-yellow-500/10 p-3 rounded text-center">
                        <div className="text-yellow-400 font-medium">Medium</div>
                        <div className="text-sm text-jungle-200">90 days</div>
                        <div className="text-xs text-yellow-300">12% min</div>
                      </div>
                      <div className="bg-orange-500/10 p-3 rounded text-center">
                        <div className="text-orange-400 font-medium">Long</div>
                        <div className="text-sm text-jungle-200">180 days</div>
                        <div className="text-xs text-orange-300">18% min</div>
                      </div>
                      <div className="bg-red-500/10 p-3 rounded text-center">
                        <div className="text-red-400 font-medium">Extended</div>
                        <div className="text-sm text-jungle-200">365 days</div>
                        <div className="text-xs text-red-300">25% min</div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-white mb-2">Auto-Calculated Pool Capacity</h4>
                    <ul className="text-jungle-200 space-y-1 text-sm">
                      <li>• Enter reward amount and reward percentage</li>
                      <li>• Pool capacity = Reward Amount ÷ Reward Percentage</li>
                      <li>• Minimum reward percentage enforced by duration</li>
                      <li>• Equal distribution to all stakers</li>
                    </ul>
                  </div>

                  <div className="bg-jungle-700/30 p-4 rounded">
                    <h4 className="font-semibold text-white mb-2">📊 Example Calculation</h4>
                    <div className="text-sm text-jungle-200">
                      <div>Reward Amount: 1,000 tokens</div>
                      <div>Reward Percentage: 10%</div>
                      <div>Duration: 90 days (Medium)</div>
                      <div className="text-yellow-400 mt-2">
                        Pool Capacity = 1,000 ÷ 0.10 = <strong>10,000 tokens</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="jungle-card p-6">
                <h3 className="text-xl font-semibold text-purple-400 mb-4">
                  Step 3: NFT Boosts & Milestones 🚀
                </h3>
                <div className="space-y-6">
                  {/* NFT Boost Section */}
                  <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded">
                    <h4 className="font-semibold text-white mb-3">Single NFT Collection Boost 🎨</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-purple-300 mb-2">Configuration</h5>
                        <ul className="text-jungle-200 space-y-1 text-sm">
                          <li>• Single collection address input</li>
                          <li>• Boost percentage (1-50%)</li>
                          <li>• Applied to base rewards only</li>
                          <li>• Choice: Add rewards or adjust APR</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-purple-300 mb-2">Budget Impact</h5>
                        <ul className="text-jungle-200 space-y-1 text-sm">
                          <li>• Additional budget = Base rewards × boost %</li>
                          <li>• Option A: Increase total reward budget</li>
                          <li>• Option B: Maintain budget, reduce base APR</li>
                          <li>• Transparent cost calculation</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Milestone Section */}
                  <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded">
                    <h4 className="font-semibold text-white mb-3">Fixed 3-Milestone System 🎯</h4>
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-3 gap-3">
                        <div className="bg-green-500/10 border border-green-500/30 p-3 rounded text-center">
                          <div className="text-green-400 font-bold text-lg">10%</div>
                          <div className="text-sm text-jungle-200">Early Bird</div>
                          <div className="text-xs text-green-300">First to reach 10% capacity</div>
                        </div>
                        <div className="bg-yellow-500/10 border border-yellow-500/30 p-3 rounded text-center">
                          <div className="text-yellow-400 font-bold text-lg">40%</div>
                          <div className="text-sm text-jungle-200">Halfway Hero</div>
                          <div className="text-xs text-yellow-300">First to reach 40% capacity</div>
                        </div>
                        <div className="bg-red-500/10 border border-red-500/30 p-3 rounded text-center">
                          <div className="text-red-400 font-bold text-lg">80%</div>
                          <div className="text-sm text-jungle-200">Major Milestone</div>
                          <div className="text-xs text-red-300">First to reach 80% capacity</div>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-medium text-blue-300 mb-2">Milestone Features</h5>
                          <ul className="text-jungle-200 space-y-1 text-sm">
                            <li>• Fixed thresholds: 10%, 40%, 80% of pool capacity</li>
                            <li>• Custom bonus amount per milestone</li>
                            <li>• Awarded to first staker reaching threshold</li>
                            <li>• Separate from creator utilization rewards</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-medium text-blue-300 mb-2">Budget Economics</h5>
                          <ul className="text-jungle-200 space-y-1 text-sm">
                            <li>• Total milestone budget calculated</li>
                            <li>• Same budget options as NFT boost</li>
                            <li>• Combined budget impact display</li>
                            <li>• Total reward budget transparency</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="jungle-card p-6">
                <h3 className="text-xl font-semibold text-orange-400 mb-4">
                  Step 4: Review & Confirm 🎯
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Payment Options</h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="bg-blue-500/10 border border-blue-500/30 p-3 rounded">
                        <div className="text-blue-400 font-medium">APT Payment 💎</div>
                        <div className="text-sm text-jungle-200">Standard pool creation fee</div>
                      </div>
                      <div className="bg-yellow-500/10 border border-yellow-500/30 p-3 rounded">
                        <div className="text-yellow-400 font-medium">LIONHEART Payment 🦁</div>
                        <div className="text-sm text-jungle-200">Discounted rate for LIONHEART holders</div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-white mb-2">Final Validation</h4>
                    <ul className="text-jungle-200 space-y-1 text-sm">
                      <li>• Complete parameter review</li>
                      <li>• Total reward budget verification</li>
                      <li>• Creator LIONHEART allocation preview</li>
                      <li>• Transaction preparation and deployment</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Simplified Staking System */}
        <section id="staking" className="mb-12">
          <Card className="jungle-card">
            <CardHeader>
              <CardTitle className="text-3xl text-yellow-300 flex items-center gap-2">
                💎 Simplified Staking System
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-jungle-200 text-lg">
                Our simplified staking system removes complex multipliers in favor of equal distribution 
                with milestone bonuses and NFT boosts for eligible stakers.
              </p>

              <div className="grid md:grid-cols-1 gap-6">
                <Card className="jungle-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span>⚡</span>
                      Equal Distribution Rewards
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Fair Reward Distribution</h4>
                      <p className="text-muted-foreground mb-2">All stakers receive proportional rewards based on their stake amount:</p>
                      <div className="bg-muted p-3 rounded-md text-sm space-y-1">
                        <code>Reward Per Token = Base Reward Pool ÷ Total Staked</code>
                        <code>Staker Reward = Stake Amount × Reward Per Token</code>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Three-Tier Milestone System</h4>
                      <p className="text-muted-foreground mb-2">Fixed milestone bonuses awarded to first stakers reaching capacity thresholds:</p>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                        <li><strong>Early Bird (10%)</strong>: Bonus for first to reach 10% pool capacity</li>
                        <li><strong>Halfway Hero (40%)</strong>: Bonus for first to reach 40% pool capacity</li>
                        <li><strong>Major Milestone (80%)</strong>: Bonus for first to reach 80% pool capacity</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Single Lock Duration</h4>
                      <p className="text-muted-foreground mb-2">Each pool has one lock duration with minimum reward percentage requirements:</p>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                        <li><strong>Flexible (0 days)</strong>: 5% minimum reward percentage</li>
                        <li><strong>Short (30 days)</strong>: 8% minimum reward percentage</li>
                        <li><strong>Medium (90 days)</strong>: 12% minimum reward percentage</li>
                        <li><strong>Long (180 days)</strong>: 18% minimum reward percentage</li>
                        <li><strong>Extended (365 days)</strong>: 25% minimum reward percentage</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">NFT Collection Boosts</h4>
                      <p className="text-muted-foreground">Optional single NFT collection boosts provide percentage increases to base rewards. Creators choose to either add extra reward budget or adjust rewards accordingly.</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Creator Reward System */}
        <section id="creator-rewards" className="mb-12">
          <Card className="jungle-card">
            <CardHeader>
              <CardTitle className="text-3xl text-yellow-300 flex items-center gap-2">
                🦁 Creator Reward System
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-jungle-200 text-lg">
                Pool creators earn LIONHEART tokens based on their pool's utilization performance, 
                separate from the staker milestone bonus system.
              </p>

              <Card className="jungle-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span>🎯</span>
                    LIONHEART Allocation System
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">10% LIONHEART Allocation</h4>
                    <p className="text-muted-foreground">Pool creators receive 10% of their reward contribution as LIONHEART tokens, distributed based on pool utilization milestones.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Creator Utilization Milestones</h4>
                    <p className="text-muted-foreground mb-2">Creators earn LIONHEART as their pools reach utilization targets (separate from staker capacity milestones):</p>
                    <div className="grid md:grid-cols-5 gap-2">
                      <div className="bg-green-500/10 p-2 rounded text-center">
                        <div className="text-green-400 font-bold">20%</div>
                        <div className="text-xs text-jungle-200">20% of LIONHEART</div>
                      </div>
                      <div className="bg-blue-500/10 p-2 rounded text-center">
                        <div className="text-blue-400 font-bold">40%</div>
                        <div className="text-xs text-jungle-200">40% of LIONHEART</div>
                      </div>
                      <div className="bg-yellow-500/10 p-2 rounded text-center">
                        <div className="text-yellow-400 font-bold">60%</div>
                        <div className="text-xs text-jungle-200">60% of LIONHEART</div>
                      </div>
                      <div className="bg-orange-500/10 p-2 rounded text-center">
                        <div className="text-orange-400 font-bold">80%</div>
                        <div className="text-xs text-jungle-200">80% of LIONHEART</div>
                      </div>
                      <div className="bg-red-500/10 p-2 rounded text-center">
                        <div className="text-red-400 font-bold">100%</div>
                        <div className="text-xs text-jungle-200">100% of LIONHEART</div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Dual Reward Systems</h4>
                    <div className="bg-yellow-500/10 border border-yellow-500/30 p-3 rounded">
                      <p className="text-muted-foreground text-sm">
                        <strong>Important:</strong> Creator utilization-based rewards (20%, 40%, 60%, 80%, 100%) are 
                        separate from staker milestone bonuses (10%, 40%, 80% capacity thresholds). These are two 
                        different reward systems operating independently.
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Claiming Process</h4>
                    <p className="text-muted-foreground">LIONHEART rewards are automatically calculated and can be claimed as milestones are achieved through the Creator Dashboard.</p>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </section>

        {/* Dashboard Features */}
        <section id="dashboard" className="mb-12">
          <Card className="jungle-card">
            <CardHeader>
              <CardTitle className="text-3xl text-yellow-300 flex items-center gap-2">
                📊 Dashboard Features
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-jungle-200 text-lg">
                Comprehensive dashboards for both stakers and creators with real-time data and simplified interfaces.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="jungle-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span>👤</span>
                      Staker Dashboard
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                      <li><strong>Reward Summary:</strong> Total rewards available, pending claims, historical earnings</li>
                      <li><strong>My Stakes:</strong> Active staking positions with real-time reward calculations</li>
                      <li><strong>NFT Boosts:</strong> Connected NFT collections providing percentage bonuses</li>
                      <li><strong>My Milestones:</strong> Progress toward staker milestone bonuses (10%, 40%, 80%)</li>
                      <li><strong>Quick Actions:</strong> Stake, unstake, and claim rewards across all pools</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="jungle-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span>🏗️</span>
                      Creator Dashboard
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                      <li><strong>Pool Management:</strong> Monitor pool performance, utilization, and health</li>
                      <li><strong>Creator Rewards:</strong> Track LIONHEART earnings from utilization milestones</li>
                      <li><strong>Analytics:</strong> Staker activity, reward distribution, trend analysis</li>
                      <li><strong>Notifications:</strong> Milestone achievements, low capacity warnings, pool events</li>
                      <li><strong>Transaction History:</strong> Complete record of pool-related transactions</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2 text-white">Simplified Interface</h4>
                <p className="text-muted-foreground">Clean, intuitive interface designed for both new and experienced DeFi users with clear reward calculations and straightforward staking actions.</p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Roar Score System */}
        <section id="roar-score" className="mb-12">
          <Card className="jungle-card">
            <CardHeader>
              <CardTitle className="text-3xl text-yellow-300 flex items-center gap-2">
                🦁 Roar Score System
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-jungle-200 text-lg">
                The Roar Score is a gamification feature that measures your engagement and success 
                on the Jungle Vault platform, rewarding active participation in staking pools.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="jungle-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span>🧮</span>
                      Calculation Formula
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-jungle-700/30 p-4 rounded">
                      <h4 className="font-semibold text-white mb-2">📊 Roar Score Formula</h4>
                      <div className="text-sm text-jungle-200 space-y-2">
                        <code className="block bg-black/20 p-2 rounded text-yellow-300">
                          Score = Min(100, Max(0, (totalStaked ÷ 1000) + (boostedPools × 10) + (activePools × 5)))
                        </code>
                        <div className="text-xs text-jungle-300">
                          <div>• Score is capped between 0 and 100</div>
                          <div>• Updates in real-time as you stake and participate</div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-white mb-2">Score Components</h4>
                      <ul className="text-jungle-200 space-y-2 text-sm">
                        <li><strong>Staking Volume:</strong> +1 point per 1,000 tokens staked</li>
                        <li><strong>NFT Boosted Pools:</strong> +10 points per pool with NFT boosts</li>
                        <li><strong>Active Pools:</strong> +5 points per active staking pool</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card className="jungle-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span>🏆</span>
                      Score Tiers & Rewards
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="bg-red-500/10 border border-red-500/30 p-3 rounded">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-2xl">🦁👑</span>
                          <span className="text-red-400 font-bold">Legendary Lion</span>
                        </div>
                        <div className="text-sm text-jungle-200">Score: 90-100</div>
                        <div className="text-xs text-red-300">Maximum engagement and platform mastery</div>
                      </div>

                      <div className="bg-orange-500/10 border border-orange-500/30 p-3 rounded">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-2xl">🦁🔥</span>
                          <span className="text-orange-400 font-bold">Fire Lion</span>
                        </div>
                        <div className="text-sm text-jungle-200">Score: 70-89</div>
                        <div className="text-xs text-orange-300">Active staker with solid diversification</div>
                      </div>

                      <div className="bg-yellow-500/10 border border-yellow-500/30 p-3 rounded">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-2xl">🦁💪</span>
                          <span className="text-yellow-400 font-bold">Strong Lion</span>
                        </div>
                        <div className="text-sm text-jungle-200">Score: 0-69</div>
                        <div className="text-xs text-yellow-300">Building your presence in the jungle</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="jungle-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span>💡</span>
                    Practical Examples
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-green-500/10 border border-green-500/30 p-4 rounded">
                      <h4 className="font-semibold text-white mb-2">Example A: New Staker</h4>
                      <ul className="text-jungle-200 space-y-1 text-sm">
                        <li>• 5,000 tokens staked = 5 points</li>
                        <li>• 2 active pools = 10 points</li>
                        <li>• 0 NFT boosts = 0 points</li>
                        <li className="text-green-400 font-medium">Total: 15 points (Strong Lion 🦁💪)</li>
                      </ul>
                    </div>

                    <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded">
                      <h4 className="font-semibold text-white mb-2">Example B: Active Staker</h4>
                      <ul className="text-jungle-200 space-y-1 text-sm">
                        <li>• 50,000 tokens staked = 50 points</li>
                        <li>• 4 active pools = 20 points</li>
                        <li>• 2 NFT boosted pools = 20 points</li>
                        <li className="text-orange-400 font-medium">Total: 90 points (Legendary Lion 🦁👑)</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="jungle-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span>🎯</span>
                    Strategy Tips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-white mb-2">Increasing Your Score</h4>
                      <ul className="text-jungle-200 space-y-1 text-sm">
                        <li>• Stake more tokens to increase volume points</li>
                        <li>• Diversify across multiple pools for activity points</li>
                        <li>• Use NFT collections for maximum boost points</li>
                        <li>• Maintain active positions rather than frequent withdrawals</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">Score Benefits</h4>
                      <ul className="text-jungle-200 space-y-1 text-sm">
                        <li>• Visible ranking and status in the community</li>
                        <li>• Demonstrates platform expertise and commitment</li>
                        <li>• Encourages healthy diversification strategies</li>
                        <li>• Real-time feedback on your DeFi activity</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </section>

        {/* Admin Management System */}
        <section id="admin" className="mb-12">
          <Card className="jungle-card">
            <CardHeader>
              <CardTitle className="text-3xl text-yellow-300 flex items-center gap-2">
                👑 Admin Management System
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-jungle-200 text-lg">
                Comprehensive admin tools for platform management, pool oversight, and creator support.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-white mb-3">Pool Management</h4>
                  <ul className="text-jungle-200 space-y-2 text-sm">
                    <li>• Monitor all active pools and their performance</li>
                    <li>• Emergency pool termination capabilities</li>
                    <li>• Pool capacity and utilization oversight</li>
                    <li>• Creator reward validation and support</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-white mb-3">Platform Analytics</h4>
                  <ul className="text-jungle-200 space-y-2 text-sm">
                    <li>• Total value locked (TVL) tracking</li>
                    <li>• Platform-wide staking metrics</li>
                    <li>• Creator and staker activity analysis</li>
                    <li>• Revenue and fee collection monitoring</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-white mb-3">Creator Support</h4>
                  <ul className="text-jungle-200 space-y-2 text-sm">
                    <li>• LIONHEART reward distribution management</li>
                    <li>• Pool performance optimization guidance</li>
                    <li>• Creator milestone tracking and validation</li>
                    <li>• Technical support and troubleshooting</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-white mb-3">Security Controls</h4>
                  <ul className="text-jungle-200 space-y-2 text-sm">
                    <li>• Platform-wide emergency controls</li>
                    <li>• Suspicious activity monitoring</li>
                    <li>• Smart contract security oversight</li>
                    <li>• User access management</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Platform Economics */}
        <section id="economics" className="mb-12">
          <Card className="jungle-card">
            <CardHeader>
              <CardTitle className="text-3xl text-yellow-300 flex items-center gap-2">
                💰 Platform Economics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-jungle-200 text-lg">
                Transparent and simplified economic model with fair fee structure and clear reward calculations.
              </p>

              <Card className="jungle-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span>💰</span>
                    Fee Structure & Payments
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Payment Methods</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                      <li><strong>APT Payment:</strong> Standard pool creation using APT tokens</li>
                      <li><strong>LIONHEART Payment:</strong> Discounted pool creation with potential savings</li>
                      <li><strong>No Staking Fees:</strong> Free staking, unstaking, and reward claiming</li>
                      <li><strong>Network Fees:</strong> Standard Aptos network transaction costs only</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Reward Percentage Requirements</h4>
                    <p className="text-muted-foreground mb-2">Minimum reward percentages based on lock duration ensure fair returns:</p>
                    <div className="grid md:grid-cols-5 gap-2">
                      <div className="bg-green-500/10 p-2 rounded text-center">
                        <div className="text-green-400 font-bold text-sm">Flexible</div>
                        <div className="text-xs text-jungle-200">5% min</div>
                      </div>
                      <div className="bg-blue-500/10 p-2 rounded text-center">
                        <div className="text-blue-400 font-bold text-sm">Short</div>
                        <div className="text-xs text-jungle-200">8% min</div>
                      </div>
                      <div className="bg-yellow-500/10 p-2 rounded text-center">
                        <div className="text-yellow-400 font-bold text-sm">Medium</div>
                        <div className="text-xs text-jungle-200">12% min</div>
                      </div>
                      <div className="bg-orange-500/10 p-2 rounded text-center">
                        <div className="text-orange-400 font-bold text-sm">Long</div>
                        <div className="text-xs text-jungle-200">18% min</div>
                      </div>
                      <div className="bg-red-500/10 p-2 rounded text-center">
                        <div className="text-red-400 font-bold text-sm">Extended</div>
                        <div className="text-xs text-jungle-200">25% min</div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Pool Capacity Calculation</h4>
                    <div className="bg-muted p-3 rounded-md text-sm space-y-2">
                      <p><code>Pool Capacity = Reward Amount ÷ Reward Percentage</code></p>
                      <p><code>Example: 1000 tokens ÷ 10% = 10,000 token capacity</code></p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Budget Management</h4>
                    <p className="text-muted-foreground">NFT boosts and milestones can either increase total reward budget (Add Rewards) or adjust rewards accordingly (Adjust APR) based on creator preference.</p>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </section>

        {/* Troubleshooting & Support */}
        <section id="troubleshooting" className="mb-12">
          <Card className="jungle-card">
            <CardHeader>
              <CardTitle className="text-3xl text-yellow-300 flex items-center gap-2">
                🔧 Troubleshooting & Support
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-jungle-200 text-lg">
                Common issues and solutions for the simplified staking platform.
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-white">Common Issues & Solutions</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-white">Pool Creation Validation Errors</h4>
                      <p className="text-sm text-muted-foreground">Ensure reward percentage meets minimum requirements for selected duration. Check sufficient token balance for reward amount.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Staking Capacity Exceeded</h4>
                      <p className="text-sm text-muted-foreground">Pool capacity is auto-calculated from reward budget. If pool is full, try a smaller stake amount or wait for capacity.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Milestone Bonus Not Received</h4>
                      <p className="text-sm text-muted-foreground">Milestone bonuses go to the first staker reaching 10%, 40%, or 80% pool capacity. Check if threshold was already claimed.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Creator Rewards Not Updating</h4>
                      <p className="text-sm text-muted-foreground">Creator LIONHEART rewards are based on pool utilization milestones (20%, 40%, 60%, 80%, 100%). Check current utilization percentage.</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4 text-white">Support Resources</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="jungle-card p-4">
                      <h4 className="font-semibold text-green-400 mb-2">Documentation</h4>
                      <ul className="text-jungle-200 space-y-1 text-sm">
                        <li>• Complete API documentation</li>
                        <li>• Step-by-step tutorials</li>
                        <li>• Video guides and walkthroughs</li>
                        <li>• Best practices guide</li>
                      </ul>
                    </div>
                    <div className="jungle-card p-4">
                      <h4 className="font-semibold text-blue-400 mb-2">Community Support</h4>
                      <ul className="text-jungle-200 space-y-1 text-sm">
                        <li>• Discord community chat</li>
                        <li>• Telegram support group</li>
                        <li>• GitHub issues and discussions</li>
                        <li>• Regular AMA sessions</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4 text-white">Technical Specifications</h3>
                  <div className="jungle-card p-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-white mb-2">Supported Features</h4>
                        <ul className="text-jungle-200 space-y-1 text-sm">
                          <li>• Aptos blockchain integration</li>
                          <li>• Emojicoin token support</li>
                          <li>• Equal distribution reward system</li>
                          <li>• Single NFT collection boosts</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-2">System Requirements</h4>
                        <ul className="text-jungle-200 space-y-1 text-sm">
                          <li>• Modern web browser</li>
                          <li>• Aptos-compatible wallet</li>
                          <li>• Stable internet connection</li>
                          <li>• JavaScript enabled</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Footer */}
        <div className="text-center py-8">
          <p className="text-jungle-200">
            Built with ❤️ for the Aptos ecosystem • Jungle Vault Documentation v2.0
          </p>
        </div>
      </div>
    </div>
  );
};

export default Docs;