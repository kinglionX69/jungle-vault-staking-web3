import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pool } from "@/types/pool";
import { useSimplifiedStaking } from "@/contexts/WeightedStakingContext";
import { useToast } from "@/hooks/use-toast";
import {
  aptosTestnetClient,
  getUserCoins,
  getUserTestnetCoins,
  testnetContracts,
} from "@/services/aptosService";
import {
  InputTransactionData,
  useWallet,
} from "@aptos-labs/wallet-adapter-react";

interface UserNFT {
  id: string;
  name: string;
  collectionAddress: string;
  boostPercentage: number;
  image?: string;
  emoji: string;
}

interface StakingModalProps {
  isOpen: boolean;
  onClose: () => void;
  pool: Pool | null;
  onStakeSuccess: (poolId: string, amount: number, txHash: string) => void;
}

const StakingModal = ({
  isOpen,
  onClose,
  pool,
  onStakeSuccess,
}: StakingModalProps) => {
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState(null);
  const [nftBoostActive, setNftBoostActive] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState<UserNFT | null>(null);
  const [isStaking, setIsStaking] = useState(false);
  const { addStake } = useSimplifiedStaking();
  const { toast } = useToast();
  const { connected, account, signAndSubmitTransaction } = useWallet();

  // Mock user balance
  const mockBalance = 10000;

  useEffect(() => {
    getBalance();
  }, [connected, pool?.rewardToken]);

  const getBalance = async () => {
    if (!pool?.rewardToken || !connected) return;
    const data = await getUserTestnetCoins(account.address);
    const c = data.filter((d) => d.asset_type == pool.rewardToken)[0];
    setBalance(c);
  };
  const b =
    balance?.amount / 10 ** balance?.metadata?.decimals
      ? balance?.amount / 10 ** balance?.metadata?.decimals
      : 0;

  // Mock user NFTs (in real app, this would come from user's wallet)
  const userNFTs: UserNFT[] = [
    {
      id: "lion-nft-1",
      name: "Lion King NFT",
      collectionAddress:
        "0x9951fc9827da09d5170248afd9a39a7f0d1e9a63fc15d1eba4ab9182dccd9cb7", //TODO: change this
      boostPercentage: 15,
      emoji: "🦁",
    },
  ];

  const handleStake = async () => {
    if (!pool || !amount || parseFloat(amount) <= 0) return;

    const numAmount = parseFloat(amount);
    const formattedAmount = balance?.amount / 10 ** balance?.metadata?.decimals;
    if (numAmount > formattedAmount) {
      toast({
        title: "Insufficient Balance",
        description: "You don't have enough tokens to stake this amount.",
        variant: "destructive",
      });
      return;
    }

    if (nftBoostActive && !selectedNFT) {
      toast({
        title: "NFT Required",
        description: "Please select an NFT to enable the boost.",
        variant: "destructive",
      });
      return;
    }

    setIsStaking(true);

    try {
      const stakeAmount = numAmount * 10 ** balance?.metadata?.decimals;
      const transaction: InputTransactionData = {
        data: {
          function:
            `${testnetContracts.staking}::stake` as `${string}::${string}::${string}`,
          typeArguments: [pool.stakeToken, pool.rewardToken],
          functionArguments: [
            pool.id,
            numAmount, // stake amount
            0, //TODO: Fix this NFT nft type: 0 => none, 1 => v1, 2 => v2
            "0xa8a9f9db2fbc4137d9f5f4215da3eac7ed4096bceaf9819ab29d9ded82c411bb", //TODO: Fix this tokenId
            "0xa2486ec230c263d3d692e0d877a6be8323572a3afeeceac7bc7c994853598ef8", //TODO: Fix this creator
            "Proud Lion", //TODO: Fix this Collection Name
            "Beta Lion #19", //TODO: Fix this Token Name
            0, //TODO: Fix this property version
          ],
        },
      };

      console.log(transaction.data);
      const tx = await signAndSubmitTransaction(transaction);
      await aptosTestnetClient.waitForTransaction({transactionHash: tx.hash});

      const result = {success: true}
      // const result = await addStake(
      //   pool.id,
      //   numAmount,
      //   pool.lockDurations[0].days, // No lock duration in new system
      //   nftBoostActive,
      //   nftBoostActive && selectedNFT ? selectedNFT.boostPercentage : 0,
      //   tx.hash
      // );

      if (result.success) {
        onStakeSuccess(pool.id, numAmount, tx.hash);

        const boostMessage =
          nftBoostActive && selectedNFT
            ? ` with ${selectedNFT.name} (+${selectedNFT.boostPercentage}% boost)`
            : "";

        toast({
          title: "Staking Successful! 🎉",
          description: `Successfully staked ${amount} tokens in ${pool.name}${boostMessage}`,
        });

        onClose();
        setAmount("");
        setNftBoostActive(false);
        setSelectedNFT(null);
      } else {
        throw new Error(result.error || "Staking failed");
      }
    } catch (error) {
      toast({
        title: "Staking Failed",
        description:
          error instanceof Error
            ? error.message
            : "Transaction failed. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsStaking(false);
    }
  };

  const setPercentage = (percentage: number) => {
    const formattedAmount = balance?.amount / 10 ** balance?.metadata?.decimals;
    const newAmount = ((formattedAmount * percentage) / 100).toString();
    setAmount(newAmount);
  };

  if (!pool) return null;

  // Get available NFTs for this pool (filter by compatibility if needed)
  const availableNFTs = userNFTs; // In real app, filter by pool compatibility

  // Calculate potential rewards (simplified)
  const baseRewardsPercentage = 200; // Fixed Rewards % for new system
  const boostPercentage =
    nftBoostActive && selectedNFT ? selectedNFT.boostPercentage : 0;
  const finalRewardsPercentage =
    baseRewardsPercentage + (baseRewardsPercentage * boostPercentage) / 100;
  const dailyReward = amount
    ? (parseFloat(amount) * finalRewardsPercentage) / 365 / 100
    : 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="pixel-card border-border max-w-md mx-4 sm:mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-foreground text-xl flex items-center gap-2 pixel-text text-pixel-glow">
            <span className="text-2xl animate-pixel-pulse">{pool.emoji}</span>
            Stake in {pool.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Pool Info */}
          <div className="pixel-card p-4 space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Base Rewards %:</span>
              <span className="font-bold text-green-400">
                {baseRewardsPercentage}%
              </span>
            </div>
            {nftBoostActive && selectedNFT && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">With NFT Boost:</span>
                <span className="font-bold text-purple-400">
                  {finalRewardsPercentage.toFixed(0)}% (+
                  {selectedNFT.boostPercentage}%)
                </span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-muted-foreground">Pool Capacity:</span>
              <span className="text-accent">
                {pool.stakingCapacity.utilizationRate.toFixed(1)}% used
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Reward Token:</span>
              <span className="text-foreground">
                {testnetContracts.lion.includes(pool.rewardToken.split("::")[2])
                  ? "🦁♥️"
                  : "🚀💯"}
              </span>
            </div>
          </div>

          {/* NFT Boost Selection */}
          {pool.nftBoostsEnabled && availableNFTs.length > 0 && (
            <div className="pixel-card p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-foreground font-medium">NFT Boost</p>
                  <p className="text-muted-foreground text-sm">
                    Stake an NFT for bonus rewards
                  </p>
                </div>
                <Switch
                  checked={nftBoostActive}
                  onCheckedChange={(checked) => {
                    setNftBoostActive(checked);
                    if (!checked) {
                      setSelectedNFT(null);
                    }
                  }}
                />
              </div>

              {nftBoostActive && (
                <div className="space-y-3">
                  <label className="text-foreground font-medium">
                    Select NFT to Stake
                  </label>
                  <Select
                    value={selectedNFT?.id || ""}
                    onValueChange={(value) => {
                      const nft = availableNFTs.find((n) => n.id === value);
                      setSelectedNFT(nft || null);
                    }}
                  >
                    <SelectTrigger className="bg-input border-border text-foreground">
                      <SelectValue placeholder="Choose an NFT..." />
                    </SelectTrigger>
                    <SelectContent>
                      {availableNFTs.map((nft) => (
                        <SelectItem key={nft.id} value={nft.id}>
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{nft.emoji}</span>
                            <div>
                              <div className="font-medium">{nft.name}</div>
                              <div className="text-sm text-muted-foreground">
                                +{nft.boostPercentage}% Rewards
                              </div>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {selectedNFT && (
                    <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{selectedNFT.emoji}</span>
                        <div>
                          <p className="text-purple-300 font-medium">
                            {selectedNFT.name}
                          </p>
                          <p className="text-purple-400 text-sm">
                            +{selectedNFT.boostPercentage}% Rewards bonus
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Amount Input */}
          <div className="space-y-3">
            <div className="flex justify-between">
              <label className="text-foreground font-medium">
                Amount to Stake
              </label>
              <span className="text-muted-foreground text-sm">
                Balance: {b.toLocaleString()}
              </span>
            </div>

            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="bg-input border-border text-foreground touch-target"
            />

            {/* Quick percentage buttons */}
            <div className="grid grid-cols-4 gap-2">
              {[25, 50, 75, 100].map((percentage) => (
                <Button
                  key={percentage}
                  variant="pixel"
                  size="sm"
                  onClick={() => setPercentage(percentage)}
                  className="touch-target"
                >
                  {percentage}%
                </Button>
              ))}
            </div>
          </div>

          {/* Estimated Rewards */}
          {amount && (
            <div className="pixel-card p-4">
              <div className="text-center">
                <p className="text-muted-foreground text-sm">
                  Estimated Daily Rewards
                </p>
                <p className="text-2xl font-bold text-green-400">
                  {dailyReward.toFixed(4)}{" "}
                  {testnetContracts.lion.includes(
                    pool.rewardToken.split("::")[2]
                  )
                    ? "🦁♥️"
                    : "🚀💯"}
                </p>
                {nftBoostActive && selectedNFT && (
                  <p className="text-purple-400 text-sm">
                    Including +{selectedNFT.boostPercentage}% NFT boost from{" "}
                    {selectedNFT.name}
                  </p>
                )}
                <p className="text-muted-foreground text-xs mt-1">
                  ~${(dailyReward * 5).toFixed(2)} USD
                </p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="pixel"
              onClick={onClose}
              className="flex-1 touch-target"
              disabled={isStaking}
            >
              Cancel
            </Button>
            <Button
              onClick={handleStake}
              variant="pixel-neon"
              className="flex-1 touch-target"
              disabled={
                !amount ||
                parseFloat(amount) <= 0 ||
                isStaking ||
                (nftBoostActive && !selectedNFT)
              }
            >
              {isStaking ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Staking...
                </>
              ) : (
                "🚀 Stake Now"
              )}
            </Button>
          </div>

          {/* Active Milestone Bonus */}
          {pool.milestones.find((m) => !m.achieved) && (
            <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-3">
              <p className="text-purple-300 text-sm">
                🎯 <strong>Milestone Bonus Available:</strong> The first staker
                to reach{" "}
                {pool.milestones.find((m) => !m.achieved)?.thresholdPercentage}%
                pool capacity gets{" "}
                <strong>
                  {pool.milestones.find((m) => !m.achieved)?.rewardAmount} bonus
                  tokens!
                </strong>
              </p>
              <p className="text-purple-400 text-xs mt-1">
                This is a one-time reward for the first staker who helps the
                pool reach this milestone.
              </p>
            </div>
          )}

          {/* High Rewards % Warning */}
          {finalRewardsPercentage > 250 && (
            <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-3">
              <p className="text-yellow-400 text-sm flex items-center gap-2">
                ⚠️ <strong>High Risk Pool:</strong> Very high Rewards % pools
                carry increased risk.
              </p>
            </div>
          )}

          {/* NFT Boost Info */}
          {pool.nftBoostsEnabled && availableNFTs.length === 0 && (
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-3">
              <p className="text-blue-300 text-sm">
                🚀 <strong>No Compatible NFTs:</strong> You don't have any NFTs
                that provide boosts for this pool.
              </p>
            </div>
          )}

          {pool.nftBoostsEnabled &&
            availableNFTs.length > 0 &&
            !nftBoostActive && (
              <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-3">
                <p className="text-blue-300 text-sm">
                  🚀 <strong>NFT Boosts Available:</strong> You have{" "}
                  {availableNFTs.length} NFT
                  {availableNFTs.length > 1 ? "s" : ""} that can boost your
                  rewards!
                </p>
              </div>
            )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StakingModal;
