import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { History, Search, Filter, Download, ArrowUpRight, ArrowDownLeft, Award, Star } from 'lucide-react';
import { TransactionHistory } from '@/data/mockCreatorDashboard';

interface TransactionHistorySectionProps {
  transactions: TransactionHistory[];
  onExportHistory?: () => void;
}

const TransactionHistorySection = ({ transactions, onExportHistory }: TransactionHistorySectionProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');

  const getTransactionIcon = (type: TransactionHistory['type']) => {
    switch (type) {
      case 'stake_join':
        return <ArrowUpRight className="w-4 h-4 text-green-400" />;
      case 'stake_leave':
        return <ArrowDownLeft className="w-4 h-4 text-red-400" />;
      case 'milestone_reached':
        return <Award className="w-4 h-4 text-yellow-400" />;
      case 'reward_claimed':
        return <Star className="w-4 h-4 text-purple-400" />;
      default:
        return <History className="w-4 h-4 text-blue-400" />;
    }
  };

  const getTransactionColor = (type: TransactionHistory['type']) => {
    switch (type) {
      case 'stake_join':
        return 'border-green-400 text-green-400';
      case 'stake_leave':
        return 'border-red-400 text-red-400';
      case 'milestone_reached':
        return 'border-yellow-400 text-yellow-400';
      case 'reward_claimed':
        return 'border-purple-400 text-purple-400';
      default:
        return 'border-blue-400 text-blue-400';
    }
  };

  const formatTransactionType = (type: TransactionHistory['type']) => {
    switch (type) {
      case 'stake_join':
        return 'Stake Join';
      case 'stake_leave':
        return 'Stake Leave';
      case 'milestone_reached':
        return 'Milestone';
      case 'reward_claimed':
        return 'Reward Claim';
      case 'pool_action':
        return 'Pool Action';
      default:
        return type;
    }
  };

  const filteredTransactions = transactions
    .filter(tx => {
      const matchesSearch = tx.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tx.poolName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterType === 'all' || tx.type === filterType;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      if (sortBy === 'oldest') return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
      if (sortBy === 'amount') return (b.amount || 0) - (a.amount || 0);
      return 0;
    });

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white pixel-text text-pixel-glow">Transaction History</h3>
        <Button
          variant="outline"
          className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white"
          onClick={onExportHistory}
        >
          <Download className="w-4 h-4 mr-2" />
          Export History
        </Button>
      </div>

      {/* Filters and Search */}
      <Card className="jungle-card p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-jungle-400" />
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="stake_join">Stake Joins</SelectItem>
              <SelectItem value="stake_leave">Stake Leaves</SelectItem>
              <SelectItem value="milestone_reached">Milestones</SelectItem>
              <SelectItem value="reward_claimed">Reward Claims</SelectItem>
              <SelectItem value="pool_action">Pool Actions</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="amount">Amount</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Transaction Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="jungle-card p-4 text-center">
          <div className="text-2xl font-bold text-green-400 mb-1">
            {transactions.filter(t => t.type === 'stake_join').length}
          </div>
          <div className="text-jungle-300 text-sm">Stake Joins</div>
        </Card>
        
        <Card className="jungle-card p-4 text-center">
          <div className="text-2xl font-bold text-red-400 mb-1">
            {transactions.filter(t => t.type === 'stake_leave').length}
          </div>
          <div className="text-jungle-300 text-sm">Stake Leaves</div>
        </Card>
        
        <Card className="jungle-card p-4 text-center">
          <div className="text-2xl font-bold text-yellow-400 mb-1">
            {transactions.filter(t => t.type === 'milestone_reached').length}
          </div>
          <div className="text-jungle-300 text-sm">Milestones</div>
        </Card>
        
        <Card className="jungle-card p-4 text-center">
          <div className="text-2xl font-bold text-purple-400 mb-1">
            {transactions.filter(t => t.type === 'reward_claimed').length}
          </div>
          <div className="text-jungle-300 text-sm">Rewards</div>
        </Card>
      </div>

      {/* Transaction List */}
      <Card className="jungle-card p-6">
        <div className="space-y-4">
          {filteredTransactions.length === 0 ? (
            <div className="text-center py-8">
              <History className="w-12 h-12 text-jungle-400 mx-auto mb-4" />
              <h4 className="text-lg font-bold text-jungle-300 mb-2">No transactions found</h4>
              <p className="text-jungle-400">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            filteredTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 rounded-lg bg-jungle-800/50 hover:bg-jungle-700/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-jungle-700">
                    {getTransactionIcon(transaction.type)}
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white font-semibold">{transaction.poolName}</span>
                      <Badge variant="outline" className={getTransactionColor(transaction.type)}>
                        {formatTransactionType(transaction.type)}
                      </Badge>
                    </div>
                    <p className="text-jungle-300 text-sm">{transaction.details}</p>
                    {transaction.staker && (
                      <p className="text-jungle-400 text-xs mt-1">
                        Staker: {transaction.staker}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="text-right">
                  {transaction.amount && (
                    <div className="text-white font-semibold mb-1">
                      {transaction.amount.toLocaleString()}
                      {transaction.type === 'stake_join' || transaction.type === 'stake_leave' ? ' APT' : ' 🦁'}
                    </div>
                  )}
                  <div className="text-jungle-400 text-sm">
                    {formatTimeAgo(transaction.timestamp)}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        {filteredTransactions.length > 10 && (
          <div className="mt-6 text-center">
            <Button variant="outline" className="border-jungle-400 text-jungle-400 hover:bg-jungle-400 hover:text-white">
              Load More Transactions
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default TransactionHistorySection;