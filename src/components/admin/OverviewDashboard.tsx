
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AdminStats } from '@/types/admin';

interface OverviewDashboardProps {
  stats: AdminStats;
  onExportCSV: () => void;
}

const OverviewDashboard = ({ stats, onExportCSV }: OverviewDashboardProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
      <Card className="jungle-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-bold text-yellow-300 flex items-center gap-2">
            🏊 Active Pools
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-white">{stats.totalPoolsActive}</div>
        </CardContent>
      </Card>

      <Card className="jungle-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-bold text-yellow-300 flex items-center gap-2">
            💰 Total Value Locked
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-white">{stats.totalValueLocked}</div>
        </CardContent>
      </Card>

      <Card className="jungle-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-bold text-yellow-300 flex items-center gap-2">
            🏗️ Projects Created
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-white">{stats.totalProjectsCreated}</div>
        </CardContent>
      </Card>

      <Card className="jungle-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-bold text-yellow-300 flex items-center gap-2">
            📊 Capacity Utilization
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-white">{stats.capacityUtilizationRate}%</div>
          <div className="text-sm text-jungle-200">{stats.totalStakingCapacity} total</div>
        </CardContent>
      </Card>

      <Card className="jungle-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-bold text-yellow-300 flex items-center gap-2">
            🎯 Milestone Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-white">{stats.averageMilestoneCompletion}%</div>
          <div className="text-sm text-jungle-200">avg completion</div>
        </CardContent>
      </Card>

      <Card className="jungle-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-bold text-yellow-300 flex items-center gap-2">
            🦁 Creator Rewards
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{stats.totalCreatorRewards}</div>
          <div className="text-sm text-jungle-200">{stats.totalCreators} creators</div>
        </CardContent>
      </Card>

      <Card className="jungle-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-bold text-yellow-300 flex items-center gap-2">
            🚀 NFT Boost Usage
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-white">{stats.nftBoostAdoptionRate}%</div>
          <div className="text-sm text-jungle-200">adoption rate</div>
        </CardContent>
      </Card>

      <Card className="jungle-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-bold text-yellow-300 flex items-center gap-2">
            🧾 Export Data
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={onExportCSV}
            className="neon-button w-full text-sm px-4 py-2"
          >
            Download CSV
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewDashboard;
