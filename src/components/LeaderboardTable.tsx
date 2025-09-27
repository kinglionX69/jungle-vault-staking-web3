
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LeaderboardEntry } from '@/types/leaderboard';
import TierBadge from './TierBadge';

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
  showPool?: boolean;
}

const LeaderboardTable = ({ entries, showPool = true }: LeaderboardTableProps) => {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return rank.toString();
    }
  };

  const getRankStyle = (rank: number) => {
    if (rank <= 3) {
      return 'text-yellow-400 font-bold text-lg animate-pulse';
    }
    return 'text-jungle-200';
  };

  return (
    <div className="jungle-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-jungle-600/30 hover:bg-jungle-800/50">
            <TableHead className="text-jungle-200 font-bold">Rank</TableHead>
            <TableHead className="text-jungle-200 font-bold">Wallet</TableHead>
            <TableHead className="text-jungle-200 font-bold">Tokens Staked</TableHead>
            {showPool && <TableHead className="text-jungle-200 font-bold">Pool</TableHead>}
            <TableHead className="text-jungle-200 font-bold">Boosts</TableHead>
            <TableHead className="text-jungle-200 font-bold">Tier</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.map((entry, index) => (
            <TableRow 
              key={`${entry.wallet}-${entry.poolId}`}
              className={`
                border-jungle-600/20 hover:bg-jungle-700/50 transition-all duration-300
                ${entry.rank <= 3 ? 'bg-gradient-to-r from-jungle-800/80 to-jungle-700/80 border-yellow-500/20' : ''}
                animate-fade-in
              `}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <TableCell className={getRankStyle(entry.rank)}>
                <span className="flex items-center gap-2">
                  {getRankIcon(entry.rank)}
                  {entry.rank <= 3 && <span className="animate-float">✨</span>}
                </span>
              </TableCell>
              <TableCell className="text-jungle-100 font-mono">
                {entry.wallet}
              </TableCell>
              <TableCell className="text-jungle-100 font-bold">
                {entry.amountStaked} {entry.rewardToken}
              </TableCell>
              {showPool && (
                <TableCell className="text-jungle-100">
                  <span className="flex items-center gap-2">
                    <span className="text-lg">{entry.emoji}</span>
                    <span>{entry.pool}</span>
                  </span>
                </TableCell>
              )}
              <TableCell>
                <div className="flex flex-col gap-1">
                  {entry.milestonesAchieved !== undefined && (
                    <div className="flex items-center gap-1 text-xs">
                      <span className="text-jungle-300">Milestones:</span>
                      <span className="text-yellow-400 font-bold">
                        {entry.milestonesAchieved}/3
                      </span>
                      {entry.milestonesAchieved === 3 && <span>🎯</span>}
                    </div>
                  )}
                  {entry.nftBoostActive && (
                    <div className="flex items-center gap-1 text-xs">
                      <span className="text-purple-400">🚀 NFT Boost</span>
                    </div>
                  )}
                  {!entry.milestonesAchieved && !entry.nftBoostActive && (
                    <span className="text-jungle-400 text-xs">No boosts</span>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <TierBadge tier={entry.tier} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default LeaderboardTable;
