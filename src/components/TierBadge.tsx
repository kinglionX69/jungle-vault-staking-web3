
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface TierBadgeProps {
  tier: 'Whale' | 'Dolphin' | 'Fish' | null;
  className?: string;
}

const TierBadge = ({ tier, className }: TierBadgeProps) => {
  if (!tier) return null;

  const getTierConfig = (tier: string) => {
    switch (tier) {
      case 'Whale':
        return {
          emoji: '🐋',
          className: 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black border-yellow-500 shadow-yellow-400/30 shadow-lg'
        };
      case 'Dolphin':
        return {
          emoji: '🐬',
          className: 'bg-gradient-to-r from-slate-300 to-slate-500 text-black border-slate-400 shadow-slate-400/30 shadow-lg'
        };
      case 'Fish':
        return {
          emoji: '🐠',
          className: 'bg-gradient-to-r from-amber-600 to-amber-800 text-white border-amber-700 shadow-amber-600/30 shadow-lg'
        };
      default:
        return { emoji: '', className: '' };
    }
  };

  const config = getTierConfig(tier);

  return (
    <Badge className={`${config.className} ${className} font-bold px-3 py-1 text-sm`}>
      {config.emoji} {tier}
    </Badge>
  );
};

export default TierBadge;
