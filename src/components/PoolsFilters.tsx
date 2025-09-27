
import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PoolFilters } from '@/types/pool';
import { ChevronDown, ChevronUp, Filter, X, Clock, TrendingUp, Coins, Target, Zap, BarChart3 } from 'lucide-react';

interface PoolsFiltersProps {
  filters: PoolFilters;
  onFiltersChange: (filters: PoolFilters) => void;
}

const PoolsFilters = ({ filters, onFiltersChange }: PoolsFiltersProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const updateFilter = (key: keyof PoolFilters, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const resetFilters = () => {
    onFiltersChange({
      poolType: 'All',
      rewardsRange: [5, 500],
      rewardToken: 'All',
      milestoneBonus: false,
      nftBoosts: false,
      availableCapacity: false
    });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.poolType !== 'All') count++;
    if (filters.rewardsRange[0] !== 5 || filters.rewardsRange[1] !== 500) count++;
    if (filters.rewardToken !== 'All') count++;
    if (filters.milestoneBonus) count++;
    if (filters.nftBoosts) count++;
    if (filters.availableCapacity) count++;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <div className="pixel-card border border-jungle-600/30 overflow-hidden mb-8">
      {/* Filter Header */}
      <div className="bg-gradient-to-r from-jungle-800/80 to-jungle-700/80 p-4 border-b border-jungle-600/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-yellow-400" />
              <h2 className="text-xl font-bold text-yellow-400 pixel-text text-pixel-glow">Filter Pools</h2>
            </div>
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                {activeFiltersCount} active
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {activeFiltersCount > 0 && (
              <Button
                variant="pixel"
                size="sm"
                onClick={resetFilters}
                className="text-jungle-300 hover:text-white hover:bg-jungle-600/50"
              >
                <X className="h-4 w-4 mr-1" />
                Clear All
              </Button>
            )}
            <Button
              variant="pixel"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-jungle-200 hover:text-white hover:bg-jungle-600/50"
            >
              {isExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Filters Row */}
      <div className="p-4 border-b border-jungle-600/20 bg-jungle-800/40">
        <div className="flex flex-wrap gap-3">
          <Button
            variant={filters.nftBoosts ? "pixel-retro" : "pixel"}
            size="sm"
            onClick={() => updateFilter('nftBoosts', !filters.nftBoosts)}
            className={`${filters.nftBoosts 
              ? 'bg-purple-600 hover:bg-purple-700 text-white border-purple-500' 
              : 'border-jungle-500 text-jungle-200 hover:bg-jungle-700/50'
            }`}
          >
            <Zap className="h-4 w-4 mr-1" />
            NFT Boost
          </Button>
          
          <Button
            variant={filters.milestoneBonus ? "pixel-retro" : "pixel"}
            size="sm"
            onClick={() => updateFilter('milestoneBonus', !filters.milestoneBonus)}
            className={`${filters.milestoneBonus 
              ? 'bg-green-600 hover:bg-green-700 text-white border-green-500' 
              : 'border-jungle-500 text-jungle-200 hover:bg-jungle-700/50'
            }`}
          >
            <Target className="h-4 w-4 mr-1" />
            Milestone Bonus
          </Button>
          
          <Button
            variant={filters.availableCapacity ? "pixel-retro" : "pixel"}
            size="sm"
            onClick={() => updateFilter('availableCapacity', !filters.availableCapacity)}
            className={`${filters.availableCapacity 
              ? 'bg-blue-600 hover:bg-blue-700 text-white border-blue-500' 
              : 'border-jungle-500 text-jungle-200 hover:bg-jungle-700/50'
            }`}
          >
            <BarChart3 className="h-4 w-4 mr-1" />
            Has Capacity
          </Button>
        </div>
      </div>

      {/* Detailed Filters */}
      {isExpanded && (
        <div className="p-6 bg-jungle-800/20">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            
            {/* Duration Filter */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-medium text-jungle-200">
                <Clock className="h-4 w-4 text-yellow-400" />
                Lock Duration
              </label>
              <Select value={filters.poolType} onValueChange={(value) => updateFilter('poolType', value)}>
                <SelectTrigger className="bg-jungle-800/60 border-jungle-600/40 text-white hover:border-jungle-500/60 focus:border-yellow-400/50 transition-colors">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent className="bg-jungle-800 border-jungle-600 shadow-xl">
                  <SelectItem value="All">All Durations</SelectItem>
                  <SelectItem value="30 Days">30 Days</SelectItem>
                  <SelectItem value="60 Days">60 Days</SelectItem>
                  <SelectItem value="90 Days">90 Days</SelectItem>
                  <SelectItem value="365 Days">365 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Reward Token Filter */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-medium text-jungle-200">
                <Coins className="h-4 w-4 text-yellow-400" />
                Reward Token
              </label>
              <Select value={filters.rewardToken} onValueChange={(value) => updateFilter('rewardToken', value)}>
                <SelectTrigger className="bg-jungle-800/60 border-jungle-600/40 text-white hover:border-jungle-500/60 focus:border-yellow-400/50 transition-colors">
                  <SelectValue placeholder="Select reward token" />
                </SelectTrigger>
                <SelectContent className="bg-jungle-800 border-jungle-600 shadow-xl">
                  <SelectItem value="All">All Tokens</SelectItem>
                  <SelectItem value="APT">APT</SelectItem>
                  <SelectItem value="NATIVE">Native Tokens</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Rewards % Range Filter */}
            <div className="space-y-4 md:col-span-2 xl:col-span-1">
              <label className="flex items-center gap-2 text-sm font-medium text-jungle-200">
                <TrendingUp className="h-4 w-4 text-yellow-400" />
                Rewards % Range
              </label>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="border-green-500/30 bg-green-500/10 text-green-300">
                    {filters.rewardsRange[0]}%
                  </Badge>
                  <span className="text-jungle-400 text-sm">to</span>
                  <Badge variant="outline" className="border-green-500/30 bg-green-500/10 text-green-300">
                    {filters.rewardsRange[1]}%
                  </Badge>
                </div>
                
                <div className="px-2">
                  <Slider
                    value={filters.rewardsRange}
                    onValueChange={(value) => updateFilter('rewardsRange', value)}
                    max={500}
                    min={5}
                    step={5}
                    className="w-full"
                  />
                </div>
                
                <div className="flex justify-between text-xs text-jungle-400">
                  <span>5%</span>
                  <span>500%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PoolsFilters;
