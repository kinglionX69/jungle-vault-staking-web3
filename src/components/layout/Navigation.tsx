import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

import { Wallet, ChevronDown } from "lucide-react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { WalletSelector } from "../WalletSelector";

const Navigation = () => {
  const { connected: isConnected, disconnect, account } = useWallet();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [walletMenuOpen, setWalletMenuOpen] = React.useState(false);

  const formatAddress = (addr: string) => {
    if (!addr) return "";
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <nav className="bg-card/95 backdrop-blur-sm border-b border-border sticky top-0 z-50 pixel-border-bottom">
      <div className="container mx-auto px-4 lg:px-6 py-3">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center space-x-3 group touch-target"
          >
            <span className="text-2xl group-hover:animate-pixel-pulse">🏛️</span>
            <span className="text-xl lg:text-2xl font-bold pixel-text">
              Jungle <span className="text-accent text-pixel-glow">Vault</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link
              to="/pools"
              className="text-muted-foreground hover:text-foreground transition-colors touch-target py-2 hover:text-pixel-glow pixel-text text-sm"
            >
              Pools
            </Link>
            <Link
              to="/create"
              className="text-muted-foreground hover:text-foreground transition-colors touch-target py-2 hover:text-pixel-glow pixel-text text-sm"
            >
              Create Pool
            </Link>
            {/* <Link
              to="/dashboard"
              className="text-muted-foreground hover:text-foreground transition-colors touch-target py-2 hover:text-pixel-glow pixel-text text-sm"
            >
              Dashboard
            </Link> */}
            {/* <Link
              to="/leaderboard"
              className="text-muted-foreground hover:text-foreground transition-colors touch-target py-2 hover:text-pixel-glow pixel-text text-sm"
            >
              Leaderboard
            </Link> */}
            {/* <Link
              to="/docs"
              className="text-muted-foreground hover:text-foreground transition-colors touch-target py-2 hover:text-pixel-glow pixel-text text-sm"
            >
              Docs
            </Link> */}
            {/* <Link
              to="/admin"
              className="text-muted-foreground hover:text-foreground transition-colors touch-target py-2 hover:text-pixel-glow pixel-text text-sm"
            >
              Admin
            </Link> */}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="pixel"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="touch-target"
            >
              {isMobileMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </Button>
          </div>

          {/* Desktop Wallet */}
          <div className="hidden md:flex items-center space-x-4">
            {isConnected ? (
              <div className="relative">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setWalletMenuOpen(!walletMenuOpen)}
                  className="group jungle-card border-jungle-400/50 bg-jungle-800/30 hover:bg-jungle-700/50 
                           text-jungle-100 transition-all duration-300 animate-fade-in hover:shadow-[0_0_15px_rgba(34,197,94,0.2)]
                           hover:border-jungle-300 hover:scale-105 px-3 py-1.5"
                >
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                    <Wallet className="w-3.5 h-3.5 text-jungle-300 group-hover:text-jungle-200 transition-colors" />
                    <span className="font-medium text-xs">
                      {formatAddress(account?.address?.toString())}
                    </span>
                    <ChevronDown
                      className={`w-3 h-3 transition-transform duration-200 ${
                        walletMenuOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </Button>

                {walletMenuOpen && (
                  <div
                    className="absolute right-0 top-full mt-2 w-48 jungle-card border border-jungle-400/30 
                                bg-jungle-900/95 backdrop-blur-sm animate-scale-in z-50"
                  >
                    <div className="p-3">
                      <div className="text-jungle-200 text-xs mb-2">
                        Connected Wallet
                      </div>
                      <div className="text-jungle-100 font-mono text-sm mb-3 break-all">
                        {formatAddress(account?.address?.toString())}
                      </div>
                      <Button
                        onClick={() => {
                          disconnect();
                          setWalletMenuOpen(false);
                        }}
                        variant="destructive"
                        size="sm"
                        className="w-full text-xs"
                      >
                        Disconnect
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <WalletSelector />
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border pt-4">
            <div className="flex flex-col space-y-3">
              <Link
                to="/pools"
                className="text-muted-foreground hover:text-foreground transition-colors touch-target py-3 px-2 rounded-lg hover:bg-accent/10 hover:text-pixel-glow pixel-text text-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pools
              </Link>
              <Link
                to="/create"
                className="text-muted-foreground hover:text-foreground transition-colors touch-target py-3 px-2 rounded-lg hover:bg-accent/10 hover:text-pixel-glow pixel-text text-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Create Pool
              </Link>
              <Link
                to="/dashboard"
                className="text-muted-foreground hover:text-foreground transition-colors touch-target py-3 px-2 rounded-lg hover:bg-accent/10 hover:text-pixel-glow pixel-text text-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/leaderboard"
                className="text-muted-foreground hover:text-foreground transition-colors touch-target py-3 px-2 rounded-lg hover:bg-accent/10 hover:text-pixel-glow pixel-text text-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Leaderboard
              </Link>
              <Link
                to="/docs"
                className="text-muted-foreground hover:text-foreground transition-colors touch-target py-3 px-2 rounded-lg hover:bg-accent/10 hover:text-pixel-glow pixel-text text-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Docs
              </Link>
              <Link
                to="/admin"
                className="text-muted-foreground hover:text-foreground transition-colors touch-target py-3 px-2 rounded-lg hover:bg-accent/10 hover:text-pixel-glow pixel-text text-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Admin
              </Link>
              <div className="pt-4 border-t border-border">
                {isConnected ? (
                  <div className="space-y-3">
                    <div className="jungle-card p-3 bg-jungle-800/30 border-jungle-400/30 animate-fade-in">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-jungle-200 text-xs">
                          Connected
                        </span>
                      </div>
                      <div className="text-jungle-100 font-mono text-sm break-all">
                        {account?.address?.toString()}
                      </div>
                    </div>
                    <Button
                      onClick={() => {
                        disconnect();
                        setIsMobileMenuOpen(false);
                      }}
                      variant="destructive"
                      size="sm"
                      className="w-full"
                    >
                      Disconnect
                    </Button>
                  </div>
                ) : (
                  <WalletSelector />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
