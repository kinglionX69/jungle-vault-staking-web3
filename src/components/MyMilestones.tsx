
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { MilestoneBonus } from '@/types/dashboard';

interface MyMilestonesProps {
  milestones: MilestoneBonus[];
}

const MyMilestones = ({ milestones }: MyMilestonesProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="jungle-card p-6 mb-8">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <span>🏆</span>
        My Milestone Bonuses
      </h2>

      {milestones.length > 0 ? (
        <div className="space-y-4">
          {milestones.map((milestone, index) => (
            <div key={index} className="jungle-card p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{milestone.emoji}</span>
                  <div>
                    <div className="text-white font-semibold">{milestone.pool}</div>
                    <div className="text-jungle-300 text-sm">
                      {milestone.milestone}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <Badge className={`font-semibold ${
                    milestone.achieved ? 'bg-yellow-500 text-black' : 'bg-jungle-600 text-jungle-300'
                  }`}>
                    🎁 {milestone.bonus}
                  </Badge>
                  <div className="text-jungle-400 text-sm mt-1">
                    {formatDate(milestone.date)}
                  </div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mb-2">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-jungle-300">
                    {milestone.thresholdPercentage === 10 ? 'Early Bird' : 
                     milestone.thresholdPercentage === 40 ? 'Halfway Hero' : 
                     'Major Milestone'} ({milestone.thresholdPercentage}%)
                  </span>
                  <span className="text-white">{milestone.progress}%</span>
                </div>
                <Progress 
                  value={milestone.progress} 
                  className="h-2"
                />
              </div>
              
              {milestone.achieved && (
                <div className="text-green-400 text-sm font-semibold">
                  ✅ Milestone achieved!
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="text-4xl mb-4">🎯</div>
          <h3 className="text-lg font-bold text-jungle-300 mb-2">
            No milestones unlocked yet
          </h3>
          <p className="text-jungle-400">
            Keep staking to unlock milestone bonuses and rewards
          </p>
        </div>
      )}
    </div>
  );
};

export default MyMilestones;
