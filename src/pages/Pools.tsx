import React, { useEffect, useState } from "react";
import { mockPools } from "@/data/mockPools";
import PoolsGrid from "@/components/PoolsGrid";
import PoolsFilters from "@/components/PoolsFilters";
import PoolsPagination from "@/components/PoolsPagination";
import StakingModal from "@/components/modals/StakingModal";
import { useSimplifiedStaking } from "@/contexts/WeightedStakingContext";
import { Pool, PoolFilters } from "@/types/pool";
import {
  aptosClient,
  aptosTestnetClient,
  testnetContracts,
} from "@/services/aptosService";

const Pools = () => {
  const [pools, setPools] = useState<Pool[]>([]);
  const [filteredPools, setFilteredPools] = useState<Pool[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { createPool } = useSimplifiedStaking();
  const [filters, setFilters] = useState<PoolFilters>({
    poolType: "All",
    rewardsRange: [5, 500], // Full range from 5% to 500% to show all pools
    rewardToken: "All",
    milestoneBonus: false,
    nftBoosts: false,
    availableCapacity: false,
  });
  const [selectedPool, setSelectedPool] = useState<Pool | null>(null);
  const [isStakingModalOpen, setIsStakingModalOpen] = useState(false);

  function timeLeft(createdAt: number, daysToRun: number) {
    const endsAt = createdAt + daysToRun * 24 * 60 * 60;

    const now = Math.floor(Date.now() / 1000);
    const totalDays = daysToRun;

    const secondsRemaining = Math.max(0, endsAt - now);

    const daysLeft = Math.floor(secondsRemaining / (24 * 3600));
    const hoursLeft = Math.floor((secondsRemaining % (24 * 3600)) / 3600);
    const minutesLeft = Math.floor((secondsRemaining % 3600) / 60);
    const secsLeft = secondsRemaining % 60;

    // console.log(`Created At: ${new Date(createdAt * 1000).toUTCString()}`);
    // console.log(`Ends At: ${new Date(endsAt * 1000).toUTCString()}`);
    // console.log(`Total days: ${totalDays}`);
    // console.log(
    //   `Time left: ${daysLeft}d ${hoursLeft}h ${minutesLeft}m ${secsLeft}s`
    // );

    return `${daysLeft}d ${hoursLeft}h ${minutesLeft}m ${secsLeft}s`;
  }

  const getPools = async () => {
    try {
      const p = await aptosTestnetClient.getModuleEventsByEventType({
        eventType:
          `${testnetContracts.staking}::PoolCreated` as `${string}::${string}::${string}`,
      });
      p.reverse();
      const ps: Pool[] = [];
      for (let i = 0; i < p.length; i++) {
        const { pool_id, stake_token_name, reward_token_name } = p[i].data;
        const pInfo = await aptosTestnetClient.view({
          payload: {
            function:
              `${testnetContracts.staking}::get_pool_info` as `${string}::${string}::${string}`,
            typeArguments: [stake_token_name, reward_token_name],
            functionArguments: [pool_id],
          },
        });
        const _p = {
          id: pInfo[0].toString(),
          poolName: pInfo[1].toString(),
          owner: pInfo[2].toString(),
          creation_time: pInfo[3].toString(),
          closed: pInfo[4].toString(),
          max_stake_amount: pInfo[5].toString(),
          lock_days: pInfo[6].valueOf(),
          current_staked: pInfo[7].toString(),
          claimed_creator_rewards: pInfo[8].toString(),
          total_creator_reward: pInfo[9].toString(),
          total_base_rewards_distributed: pInfo[10].toString(),
          total_nft_rewards_distributed: pInfo[11].toString(),
          total_milestone_rewards_distributed: pInfo[12].toString(),
          nft_boost_percentage: pInfo[13].toString(),
          nft_collection: pInfo[14].toString(),
          milestones: pInfo[15].valueOf(),
        };

        const r: Pool = {
          id: _p.id,
          name: _p.poolName,
          emoji: testnetContracts.lion.includes(
            reward_token_name.split("::")[2]
          )
            ? "🦁♥️"
            : "🚀💯", //TODO change this f
          rewardToken: reward_token_name,
          stakeToken: stake_token_name,
          rewardTokenType:
            reward_token_name == testnetContracts.aptos ? "APT" : "NATIVE",
          lockDurations: [
            //TODO change this f
            {
              id: "yo yo",
              name: "yo",
              days: 3,
              rewardsPercentage: 10,
              enabled: true,
            },
          ],
          tvl: _p.current_staked,
          endsIn: timeLeft(Number(_p.creation_time), Number(_p.lock_days)),
          tier: "Dolphin", //TODO change this f
          gradient: "pInfo[9]", //TODO change this f
          marketCap: _p.max_stake_amount, //TODO change this f
          volume: _p.max_stake_amount,
          // volume: pInfo[11].toString(),
          stakingCapacity: {
            //TODO change this f
            maxStakeable: Number(_p.max_stake_amount),
            currentStaked: Number(_p.current_staked),
            utilizationRate:
            100 - (((Number(_p.max_stake_amount) - Number(_p.current_staked)) / Number(_p.max_stake_amount)) * 100),
            availableCapacity:
              Number(_p.max_stake_amount) - Number(_p.current_staked),
          },
          milestones: _p.milestones.map((t, index) => {
            //TODO change this f
            return {
              id: index == 0 ? "early" : index == 1 ? "halfway" : "major", // Fixed milestone IDs
              thresholdPercentage: t.threshold_percent, // Fixed thresholds: 10%, 40%, 80%
              bonusPercentage: t.extra_percentage,
              description: "string",
              achieved: false,
              rewardAmount: 1, // Fixed reward amount for milestone
              // threshold?: 1, // Calculated based on total capacity
              // claimedBy?: string; // ID of the first staker to reach this milestone
              // claimedAt?: Date;
              // firstStakerToReach?: string,
            };
          }),
          creatorRewards: {
            //TODO change this f
            totalPotentialLionheart: 1,
            earnedLionheart: 1,
            milestones: [],
            progress: 1, // 0-100
          },
          nftBoostsEnabled: true,
          featured: true,
        };
        createPool(r);
        ps.push(r);
      }
      setPools(ps);
      setFilteredPools(ps);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPools();
  }, []);

  const poolsPerPage = 6;
  const { addStake } = useSimplifiedStaking();

  const totalPages = Math.ceil(filteredPools.length / poolsPerPage);
  const startIndex = (currentPage - 1) * poolsPerPage;
  const displayedPools = filteredPools.slice(
    startIndex,
    startIndex + poolsPerPage
  );

  const handleStakeClick = (poolId: string) => {
    const pool = pools.find((p) => p.id === poolId);
    if (pool) {
      setSelectedPool(pool);
      setIsStakingModalOpen(true);
    }
  };

  const handleStakeSuccess = async (
    poolId: string,
    amount: number,
    txHash: string
  ) => {
    // The stake is already added by the StakingModal through addStake
    // No additional processing needed here since the new system handles it automatically
    console.log(
      `Stake successful: ${amount} tokens in pool ${poolId} with tx: ${txHash}`
    );
  };

  const handleFiltersChange = (newFilters: PoolFilters) => {
    setFilters(newFilters);
    let filtered = [...pools];

    // Filter by duration type
    if (newFilters.poolType && newFilters.poolType !== "All") {
      switch (newFilters.poolType) {
        case "30 Days":
          filtered = filtered.filter((pool) =>
            pool.lockDurations.some((d) => d.days === 30)
          );
          break;
        case "60 Days":
          filtered = filtered.filter((pool) =>
            pool.lockDurations.some((d) => d.days === 60)
          );
          break;
        case "90 Days":
          filtered = filtered.filter((pool) =>
            pool.lockDurations.some((d) => d.days === 90)
          );
          break;
        case "365 Days":
          filtered = filtered.filter((pool) =>
            pool.lockDurations.some((d) => d.days === 365)
          );
          break;
      }
    }

    // Filter by reward token
    if (newFilters.rewardToken && newFilters.rewardToken !== "All") {
      if (newFilters.rewardToken === "NATIVE") {
        filtered = filtered.filter((pool) => pool.rewardTokenType === "NATIVE");
      } else {
        filtered = filtered.filter(
          (pool) => pool.rewardToken === newFilters.rewardToken
        );
      }
    }

    // Filter by Rewards % range (using the highest rewards percentage from available durations)
    filtered = filtered.filter((pool) => {
      const maxRewardsPercentage = Math.max(
        ...pool.lockDurations.map((d) => d.rewardsPercentage)
      );
      return (
        maxRewardsPercentage >= newFilters.rewardsRange[0] &&
        maxRewardsPercentage <= newFilters.rewardsRange[1]
      );
    });

    // Filter by milestone bonus (pools with available milestones)
    if (newFilters.milestoneBonus) {
      filtered = filtered.filter((pool) =>
        pool.milestones.some(
          (m) =>
            !m.achieved &&
            pool.stakingCapacity.utilizationRate < m.thresholdPercentage
        )
      );
    }

    // Filter by NFT boosts
    if (newFilters.nftBoosts) {
      filtered = filtered.filter((pool) => pool.nftBoostsEnabled);
    }

    // Filter by available capacity
    if (newFilters.availableCapacity) {
      filtered = filtered.filter(
        (pool) => pool.stakingCapacity.utilizationRate < 90
      );
    }

    setFilteredPools(filtered);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen scanlines-effect">
      {/* Page Header */}
      <div className="temple-bg py-8 px-6 border-b border-jungle-600/30">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-shadow-glow mb-2 pixel-text">
            Explore Staking Pools
            <span className="ml-3 text-5xl animate-pixel-pulse">🌴</span>
          </h1>
          <p className="text-jungle-200 text-lg">
            Discover the best yielding pools in the jungle
          </p>
          <div className="mt-4 p-3 pixel-card inline-block">
            <p className="text-jungle-300 text-sm">
              💡 <strong>Ready to stake!</strong> Choose any pool to get started
            </p>
          </div>
        </div>
      </div>

      {/* Pools Content */}
      <div className="container mx-auto px-6 py-8">
        {/* <PoolsFilters filters={filters} onFiltersChange={handleFiltersChange} /> */}
        <PoolsGrid pools={displayedPools} onStakeClick={handleStakeClick} />
        <PoolsPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Staking Modal */}
      <StakingModal
        isOpen={isStakingModalOpen}
        onClose={() => setIsStakingModalOpen(false)}
        pool={selectedPool}
        onStakeSuccess={handleStakeSuccess}
      />

      {/* Background jungle decoration */}
      <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-jungle-900/30 to-transparent pointer-events-none">
        <div className="flex justify-center items-end h-full text-3xl space-x-12 opacity-20">
          <span className="animate-float">🌿</span>
          <span className="animate-float" style={{ animationDelay: "1s" }}>
            🦜
          </span>
          <span className="animate-float" style={{ animationDelay: "2s" }}>
            🐒
          </span>
          <span className="animate-float" style={{ animationDelay: "3s" }}>
            🍃
          </span>
        </div>
      </div>
    </div>
  );
};

export default Pools;
