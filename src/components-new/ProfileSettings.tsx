'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { User, Save, AlertCircle, CheckCircle, BookOpen, Wallet, RefreshCw, Crown, Gift, Trophy, Copy, Check } from 'lucide-react';
import { getLevelInfo } from '@/utils/xpTracking';
import { getUserPulls } from '@/utils/pullTracking';
import { getFavorites } from '@/utils/favoritesTracking';
import { getUserAchievements } from '@/utils/achievementsTracking';
import { JournalHistoryView } from '@/components/JournalHistoryView';
import type { Address } from 'viem';
import type { TokenBalance } from '@/utils/tokenGating';
import { WalletDefault } from '@coinbase/onchainkit/wallet';
import { MIN_VIBE_FOR_CARD_PULL, VIBE_TOKEN_ADDRESS } from '@/utils/tokenGating';

interface ProfileSettingsProps {
  username: string;
  onUsernameChange: (newUsername: string) => void;
  address?: Address;
  tokenBalance?: TokenBalance | null;
  onDisconnect?: () => void;
  onRefreshBalance?: () => void;
  isRefreshing?: boolean;
}

export function ProfileSettings({ username, onUsernameChange, address, tokenBalance, onDisconnect, onRefreshBalance, isRefreshing }: ProfileSettingsProps) {
  const [newUsername, setNewUsername] = useState(username);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  // Get user stats
  const levelInfo = getLevelInfo(username);
  const pulls = getUserPulls(username);
  const favorites = getFavorites(username);
  const achievements = getUserAchievements(username);

  // Copy address to clipboard
  const handleCopyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Determine tier status
  const isHolder = tokenBalance && tokenBalance.formattedBalance >= 1000;
  const tierStatus = isHolder ? 'Holder' : 'Standard';
  const VIBE_BUY_LINK = `https://go.cb-w.com/swap?asset=${VIBE_TOKEN_ADDRESS}&network=base`;

  const handleUsernameChange = () => {
    setError(null);
    setSuccess(false);

    // Validation
    if (!newUsername.trim()) {
      setError('Username cannot be empty');
      return;
    }

    if (newUsername.trim() === username) {
      setError('New username is the same as current username');
      return;
    }

    if (newUsername.trim().length < 3) {
      setError('Username must be at least 3 characters');
      return;
    }

    if (newUsername.trim().length > 20) {
      setError('Username must be less than 20 characters');
      return;
    }

    // Check if username is already taken
    const existingUsername = localStorage.getItem('practice_username');
    if (existingUsername && existingUsername !== username && existingUsername === newUsername.trim()) {
      setError('Username is already taken');
      return;
    }

    // Migrate all user data
    try {
      const oldUsername = username;
      const newUsernameValue = newUsername.trim();

      // Get all localStorage keys
      const allKeys = Object.keys(localStorage);
      const userDataKeys = allKeys.filter(key => key.startsWith('practice_'));

      // Migrate each data type
      userDataKeys.forEach(key => {
        try {
          const data = localStorage.getItem(key);
          if (!data) return;

          const parsedData = JSON.parse(data);

          // Handle different data structures
          if (Array.isArray(parsedData)) {
            // For arrays of objects with username field
            const updated = parsedData.map((item: { username?: string }) => {
              if (item.username === oldUsername) {
                return { ...item, username: newUsernameValue };
              }
              return item;
            });
            localStorage.setItem(key, JSON.stringify(updated));
          } else if (typeof parsedData === 'object' && parsedData !== null) {
            // For objects with nested user data
            if (parsedData[oldUsername]) {
              const userData = parsedData[oldUsername];
              delete parsedData[oldUsername];
              parsedData[newUsernameValue] = userData;
              localStorage.setItem(key, JSON.stringify(parsedData));
            }
          }
        } catch (err) {
          console.error(`Error migrating data for key ${key}:`, err);
        }
      });

      // Update the main username key
      localStorage.setItem('practice_username', newUsernameValue);

      // Notify parent component
      onUsernameChange(newUsernameValue);

      setSuccess(true);
      setIsEditing(false);
      
      // Reset success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Error changing username:', err);
      setError('Failed to change username. Please try again.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">👤 Profile & Journal</h2>
        <p className="text-gray-300">
          Manage your PRACTICE profile, stats, and journal entries
        </p>
      </div>

      {/* Tabs for Profile and Journal */}
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-white/10">
          <TabsTrigger value="profile" className="data-[state=active]:bg-purple-500">
            <User className="w-4 h-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="journal" className="data-[state=active]:bg-purple-500">
            <BookOpen className="w-4 h-4 mr-2" />
            Journal
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6 mt-6">

      {/* Profile Card */}
      <Card className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 border-purple-500/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <User className="w-5 h-5" />
            Your Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Username Section */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="username" className="text-white text-base mb-2 block">
                Username
              </Label>
              {isEditing ? (
                <div className="space-y-3">
                  <Input
                    id="username"
                    type="text"
                    value={newUsername}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewUsername(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    placeholder="Enter new username"
                    maxLength={20}
                  />
                  <div className="flex gap-2">
                    <Button
                      onClick={handleUsernameChange}
                      className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                    <Button
                      onClick={() => {
                        setIsEditing(false);
                        setNewUsername(username);
                        setError(null);
                      }}
                      variant="outline"
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between bg-white/5 rounded-lg p-4">
                  <span className="text-white font-bold text-lg">{username}</span>
                  <Button
                    onClick={() => setIsEditing(true)}
                    size="sm"
                    variant="outline"
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    Edit
                  </Button>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-red-300 text-sm mt-2 bg-red-900/20 border border-red-500/30 rounded-lg p-3"
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}

              {/* Success Message */}
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-green-300 text-sm mt-2 bg-green-900/20 border border-green-500/30 rounded-lg p-3"
                >
                  <CheckCircle className="w-4 h-4 flex-shrink-0" />
                  <span>Username changed successfully!</span>
                </motion.div>
              )}

              <p className="text-gray-400 text-xs mt-2">
                Changing your username will update all your data (pulls, achievements, journals, etc.)
              </p>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-white/60 text-sm mb-1">Level</p>
              <p className="text-white font-bold text-2xl">{levelInfo.level}</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-white/60 text-sm mb-1">Total XP</p>
              <p className="text-white font-bold text-2xl">{levelInfo.currentXP.toLocaleString()}</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-white/60 text-sm mb-1">Cards Pulled</p>
              <p className="text-white font-bold text-2xl">{pulls.length}</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-white/60 text-sm mb-1">Achievements</p>
              <p className="text-white font-bold text-2xl">{achievements.length}</p>
            </div>
          </div>
        </CardContent>
      </Card>

          {/* Wallet & Web3 Features Card */}
          <Card className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-blue-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Wallet className="w-5 h-5" />
                Wallet & Web3 Features
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Wallet Connection Status */}
              {address ? (
                <div className="space-y-4">
                  {/* Connected Status */}
                  <div className="bg-white/5 rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-green-300 font-semibold text-sm">Wallet Connected</span>
                      </div>
                      {tokenBalance && (
                        <button
                          onClick={onRefreshBalance}
                          disabled={isRefreshing}
                          className="flex items-center gap-1 text-purple-300 hover:text-purple-200 transition-colors disabled:opacity-50"
                          title="Refresh balance"
                        >
                          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                          <span className="text-xs">Refresh</span>
                        </button>
                      )}
                    </div>
                    
                    {/* Address Display */}
                    <div className="flex items-center justify-between bg-black/20 rounded-lg p-3">
                      <code className="text-white/80 text-xs font-mono truncate flex-1">
                        {address.slice(0, 6)}...{address.slice(-4)}
                      </code>
                      <button
                        onClick={handleCopyAddress}
                        className="ml-2 text-purple-300 hover:text-purple-200 transition-colors flex-shrink-0"
                        title="Copy address"
                      >
                        {copied ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    {/* Balance Display */}
                    {tokenBalance && (
                      <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg p-4 border border-purple-400/30">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white/80 text-sm">$VibeOfficial Balance</span>
                          <div className="flex items-center gap-2">
                            {isHolder && <Crown className="w-4 h-4 text-yellow-400" />}
                            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${isHolder ? 'bg-yellow-400/20 text-yellow-300' : 'bg-gray-500/20 text-gray-300'}`}>
                              {tierStatus}
                            </span>
                          </div>
                        </div>
                        <p className="text-white font-bold text-2xl">
                          {Math.floor(tokenBalance.formattedBalance).toLocaleString()} $VibeOfficial
                        </p>
                        {!tokenBalance.hasBalance && (
                          <p className="text-yellow-300 text-xs mt-2">
                            Need {MIN_VIBE_FOR_CARD_PULL.toLocaleString()} $VibeOfficial for exclusive pack pulls
                          </p>
                        )}
                      </div>
                    )}

                    {/* Tier Benefits */}
                    <div className="space-y-3 pt-3 border-t border-white/10">
                      <p className="text-white/80 text-sm font-semibold">Your Benefits:</p>
                      {isHolder ? (
                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <Crown className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                            <p className="text-white/70 text-xs">Access to exclusive Vibe Check pack (20 legendary cards)</p>
                          </div>
                          <div className="flex items-start gap-2">
                            <Trophy className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                            <p className="text-white/70 text-xs">Appear on global leaderboard with holder badge</p>
                          </div>
                          <div className="flex items-start gap-2">
                            <Gift className="w-4 h-4 text-pink-400 mt-0.5 flex-shrink-0" />
                            <p className="text-white/70 text-xs">Eligible for special giveaways and community raffles</p>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                            <p className="text-white/70 text-xs">Access to PRACTICE pack (365 daily cards)</p>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                            <p className="text-white/70 text-xs">Full journal and achievement system</p>
                          </div>
                          <div className="bg-yellow-900/20 border border-yellow-400/30 rounded-lg p-3 mt-3">
                            <p className="text-yellow-200 text-xs font-semibold mb-2">💎 Upgrade to Holder (1,000+ $VibeOfficial)</p>
                            <p className="text-yellow-200/80 text-xs mb-3">Unlock exclusive packs, leaderboard access, and special perks</p>
                            <button
                              onClick={() => window.open(VIBE_BUY_LINK, '_blank')}
                              className="w-full px-3 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold text-xs rounded-lg transition-all"
                            >
                              Get $VibeOfficial Tokens
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Disconnect Button */}
                    <button
                      onClick={onDisconnect}
                      className="w-full px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-300 rounded-lg transition-all text-sm font-semibold"
                    >
                      Disconnect Wallet
                    </button>
                  </div>
                </div>
              ) : (
                /* Not Connected State */
                <div className="space-y-4">
                  <div className="bg-white/5 rounded-lg p-6 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto">
                      <Wallet className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg mb-2">Connect Your Wallet</h3>
                      <p className="text-white/70 text-sm mb-4">
                        Connect your wallet to unlock holder perks and access exclusive packs
                      </p>
                    </div>

                    {/* Benefits List */}
                    <div className="space-y-2 text-left">
                      <p className="text-white/80 text-sm font-semibold mb-3 text-center">What You'll Get:</p>
                      <div className="flex items-start gap-2">
                        <Crown className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <p className="text-white/70 text-xs">Exclusive Vibe Check pack with 20 legendary frequency prompts (requires 1,000+ $VibeOfficial)</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <Trophy className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                        <p className="text-white/70 text-xs">Global leaderboard access with holder badge</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <Gift className="w-4 h-4 text-pink-400 mt-0.5 flex-shrink-0" />
                        <p className="text-white/70 text-xs">Special community raffles and giveaway eligibility</p>
                      </div>
                    </div>

                    {/* Connect Button */}
                    <div className="pt-4">
                      <WalletDefault />
                    </div>
                  </div>

                  {/* Why Base Section */}
                  <div className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 rounded-lg p-4 border border-blue-400/30">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl">⚡</span>
                      <h4 className="text-white font-bold text-sm">Why Base Blockchain?</h4>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs">💨</span>
                        </div>
                        <p className="text-white/70 text-xs"><span className="font-semibold text-white">Lightning Fast:</span> Instant transactions with minimal gas fees</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs">🔒</span>
                        </div>
                        <p className="text-white/70 text-xs"><span className="font-semibold text-white">Secure:</span> Built on Ethereum with Coinbase infrastructure</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs">🚀</span>
                        </div>
                        <p className="text-white/70 text-xs"><span className="font-semibold text-white">Easy to Use:</span> Simple wallet setup, no crypto expertise needed</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="bg-gradient-to-br from-red-900/30 to-pink-900/30 border-red-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">⚠️ Danger Zone</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-white/5 rounded p-4">
                <p className="text-gray-300 text-sm mb-2">
                  Clear all app data? This will permanently delete all your progress, achievements, and journal entries.
                </p>
                <p className="text-gray-400 text-xs mb-3">
                  This action cannot be undone!
                </p>
              </div>

              <Button
                variant="outline"
                className="w-full bg-red-500/20 border-red-500/50 text-red-300 hover:bg-red-500/30"
                onClick={() => {
                  if (confirm('Are you sure you want to clear ALL app data? This cannot be undone!')) {
                    localStorage.clear();
                    window.location.reload();
                  }
                }}
              >
                🗑️ Clear All Data
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="journal" className="mt-6">
          <JournalHistoryView username={username} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
