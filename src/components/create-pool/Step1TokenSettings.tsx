import React, { useEffect, useState } from "react";
import { useCreatePool } from "@/contexts/CreatePoolContext";
import { useTopTokens } from "@/hooks/useTopTokens";
import TokenSelector from "./TokenSelector";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Step1TokenSettings = () => {
  const { formData, updateFormData } = useCreatePool();
  const { tokens, loading, error, usingFallback, refresh } = useTopTokens(25);

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-shadow mb-2 pixel-text text-pixel-glow">
          🪙 TOKEN SETTINGS
        </h2>
        <p className="text-jungle-200">
          Choose your staking token and configure basic pool settings
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* API Status Messages */}
        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20">
            <div className="flex items-center gap-2 text-red-400">
              <span>⚠️</span>
              <span>API Error: {error}</span>
              <button
                onClick={refresh}
                className="ml-auto text-yellow-400 hover:text-yellow-300 underline text-sm"
              >
                Retry
              </button>
            </div>
          </div>
        )}
        {usingFallback && !error && (
          <div className="mb-6 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
            <div className="flex items-center gap-2 text-yellow-400">
              <span>ℹ️</span>
              <span>Using demo tokens (API unavailable)</span>
            </div>
          </div>
        )}

        {/* Form Fields */}
        <div className="space-y-8">
          {/* Pool Name */}
          <div className="space-y-3">
            <Label className="text-xl font-bold text-white">Pool Name *</Label>
            <Input
              value={formData.poolName}
              onChange={(e) => updateFormData({ poolName: e.target.value })}
              placeholder="Enter pool name (e.g., LIONHEART Staking Pool)"
              className="jungle-card border-jungle-600 text-white placeholder:text-jungle-400 text-lg p-4"
            />
          </div>

          {/* Token Selection Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Staking Token */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-xl font-bold text-white">
                  Staking Token *
                </Label>
                {!loading && (
                  <button
                    onClick={refresh}
                    className="text-jungle-300 hover:text-yellow-400 text-sm transition-colors"
                    title="Refresh token list"
                  >
                    🔄 Refresh
                  </button>
                )}
              </div>
              <TokenSelector
                tokens={tokens}
                selectedToken={formData.stakingToken}
                onTokenSelect={(token) =>
                  updateFormData({ stakingToken: token })
                }
                placeholder={
                  loading ? "Loading tokens..." : "Select token to stake"
                }
                disabled={loading}
              />
              <p className="text-jungle-300 text-sm">
                The token users will stake in your pool
              </p>
            </div>

            {/* Reward Token */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-xl font-bold text-white">
                  Reward Token *
                </Label>
                {formData.stakingToken && (
                  <button
                    onClick={() =>
                      updateFormData({ rewardToken: formData.stakingToken })
                    }
                    className="text-jungle-300 hover:text-yellow-400 text-sm transition-colors"
                    title="Use same as staking token"
                  >
                    📋 Same Token
                  </button>
                )}
              </div>
              <TokenSelector
                tokens={tokens}
                selectedToken={formData.rewardToken}
                onTokenSelect={(token) =>
                  updateFormData({ rewardToken: token })
                }
                placeholder={
                  loading ? "Loading tokens..." : "Select reward token"
                }
                disabled={loading}
              />
              <p className="text-jungle-300 text-sm">
                The token distributed as staking rewards
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Card */}
      {formData.stakingToken && formData.rewardToken && formData.poolName && (
        <div className="pixel-card p-8 mt-12 retro-glow max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-yellow-400 mb-6 pixel-text text-center">
            Pool Preview
          </h3>
          <div className="flex items-center gap-6 justify-center">
            <div className="flex items-center gap-3">
              <span className="text-5xl animate-pixel-pulse">
                {formData.stakingToken.emoji}
              </span>
              <div className="text-center">
                <div className="text-sm text-jungle-300">Stake</div>
                <div className="font-bold text-white">
                  {formData.stakingToken.name}
                </div>
              </div>
            </div>

            <div className="text-3xl text-yellow-400 animate-pulse">→</div>

            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-2">
                {formData.poolName}
              </div>
              <div className="text-jungle-200 text-lg">Staking Pool</div>
            </div>

            <div className="text-3xl text-yellow-400 animate-pulse">→</div>

            <div className="flex items-center gap-3">
              <div className="text-center">
                <div className="text-sm text-jungle-300">Earn</div>
                <div className="font-bold text-white">
                  {formData.rewardToken.name}
                </div>
              </div>
              <span className="text-5xl animate-pixel-pulse">
                {formData.rewardToken.emoji}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Step1TokenSettings;
