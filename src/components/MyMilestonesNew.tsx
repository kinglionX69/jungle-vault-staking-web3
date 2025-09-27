import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { DashboardMilestone } from '@/types/dashboardNew';

interface MyMilestonesNewProps {
  milestones: DashboardMilestone[];
}

const MyMilestonesNew = ({ milestones }: MyMilestonesNewProps) => {
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="pixel-card p-6 mb-8">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2 pixel-text text-pixel-glow">
        <span className="animate-pixel-pulse">🏆</span>
        MY MILESTONE BONUSES
      </h2>

      {milestones.length > 0 ? (
        <div className="space-y-4">
          {milestones.map((milestone, index) => (
            <div key={index} className="pixel-card p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl animate-pixel-pulse">{milestone.emoji}</span>
                  <div>
                    <div className="text-white font-semibold">{milestone.pool}</div>
                    <div className="text-jungle-300 text-sm">{milestone.milestone}</div>
                  </div>
                </div>
                
                <div className="text-right">
                  <Badge className={milestone.achieved ? "bg-green-500 text-white" : "bg-gray-500 text-white"}>
                    {milestone.achieved ? '✓ Achieved' : 'Pending'}
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <div>
                  <div className="text-jungle-300 text-sm">Bonus Amount</div>
                  <div className="text-yellow-400 font-semibold">
                    {milestone.rewardAmount} tokens
                  </div>
                </div>
                <div>
                  <div className="text-jungle-300 text-sm">Date</div>
                  <div className="text-jungle-200">{formatDate(milestone.date)}</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-jungle-300">Progress</span>
                  <span className="text-jungle-200">{milestone.progress.toFixed(1)}%</span>
                </div>
                <Progress 
                  value={milestone.progress} 
                  className="h-2"
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="text-4xl mb-4 animate-pixel-pulse">🏆</div>
          <h3 className="text-lg font-bold text-jungle-300 mb-2 pixel-text">
            NO MILESTONES ACHIEVED YET
          </h3>
          <p className="text-jungle-400">
            Stake more to help pools reach capacity milestones and earn bonuses
          </p>
        </div>
      )}
    </div>
  );
};

export default MyMilestonesNew;