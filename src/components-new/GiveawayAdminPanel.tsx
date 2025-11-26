'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, Users, Mail, Wallet, DollarSign, Download, RefreshCw, Sparkles } from 'lucide-react';
import { useSpacetimeDB } from '@/hooks/useSpacetimeDB';
import { useAccount } from 'wagmi';
import type { RaffleEntry } from '@/spacetime_module_bindings';
import { WinnerSelector } from '@/components/WinnerSelector';
import { toast } from 'sonner';

export function GiveawayAdminPanel() {
  const { address } = useAccount();
  const spacetimeState = useSpacetimeDB(address);
  const { connected, raffleEntries: spaceRaffleEntries, selectWeightedWinner } = spacetimeState;
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalEntries: 0,
    totalUsdValue: 0,
    uniqueEmails: 0,
    avgTokenBalance: 0
  });

  useEffect(() => {
    loadRaffleEntries();
  }, [connected, spaceRaffleEntries]);

  const loadRaffleEntries = () => {
    if (!connected) return;

    try {
      setLoading(true);
      const entries = spaceRaffleEntries;
      const emailSet = new Set<string>();
      let totalUsd = 0;
      let totalTokens = 0;

      for (const entry of entries) {
        emailSet.add(entry.email.toLowerCase());
        totalUsd += entry.usdValue;
        totalTokens += parseFloat(entry.tokenBalance) || 0;
      }

      setStats({
        totalEntries: entries.length,
        totalUsdValue: totalUsd,
        uniqueEmails: emailSet.size,
        avgTokenBalance: entries.length > 0 ? totalTokens / entries.length : 0
      });

      toast.success('Entries loaded', {
        description: `Found ${entries.length} entries`
      });
    } catch (error) {
      console.error('Error loading raffle entries:', error);
      toast.error('Failed to load entries');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectWinner = async () => {
    if (!connected) {
      toast.error('Database not connected');
      return;
    }

    try {
      selectWeightedWinner();
      toast.success('Winner selected!', {
        description: 'Check the console logs for winner details'
      });
    } catch (error) {
      console.error('Error selecting winner:', error);
      toast.error('Failed to select winner');
    }
  };

  const exportToCSV = () => {
    if (spaceRaffleEntries.length === 0) {
      toast.error('No entries to export');
      return;
    }

    const headers = ['Wallet', 'Username', 'Email', 'Token Balance', 'USD Value', 'Timestamp', 'Entry Hash'];
    const rows = spaceRaffleEntries.map(entry => [
      entry.wallet,
      entry.username,
      entry.email,
      entry.tokenBalance,
      entry.usdValue.toFixed(2),
      entry.timestamp.toDate().toISOString(),
      entry.entryHash
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `giveaway-entries-${Date.now()}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast.success('Exported to CSV');
  };

  if (!connected) {
    return (
      <Card className="backdrop-blur-lg bg-white/10 border-white/20">
        <CardContent className="p-12 text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mb-4"></div>
          <p className="text-white/80">Connecting to database...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 px-4 pb-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold gradient-text mb-2">Giveaway Admin Panel</h1>
          <p className="text-indigo-200">Manage entries and select winners</p>
        </div>
        <Button
          onClick={loadRaffleEntries}
          disabled={loading}
          variant="outline"
          className="border-indigo-400/50 text-indigo-300 hover:bg-indigo-500/20"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="backdrop-blur-lg bg-white/10 border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm mb-1">Total Entries</p>
                <p className="text-3xl font-bold text-white">{stats.totalEntries}</p>
              </div>
              <Users className="w-12 h-12 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-lg bg-white/10 border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm mb-1">Unique Emails</p>
                <p className="text-3xl font-bold text-white">{stats.uniqueEmails}</p>
              </div>
              <Mail className="w-12 h-12 text-pink-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-lg bg-white/10 border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm mb-1">Total USD Value</p>
                <p className="text-3xl font-bold text-white">${stats.totalUsdValue.toFixed(2)}</p>
              </div>
              <DollarSign className="w-12 h-12 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-lg bg-white/10 border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm mb-1">Avg Token Balance</p>
                <p className="text-3xl font-bold text-white">{Math.floor(stats.avgTokenBalance).toLocaleString()}</p>
              </div>
              <Sparkles className="w-12 h-12 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Winner Selector */}
      <WinnerSelector 
        raffleEntries={spaceRaffleEntries}
        onSelectWeightedWinner={handleSelectWinner}
      />

      {/* Entries List */}
      <Card className="backdrop-blur-lg bg-white/10 border-white/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl text-white">All Entries</CardTitle>
              <CardDescription className="text-indigo-200">
                Verified entries with token balances
              </CardDescription>
            </div>
            <Button
              onClick={exportToCSV}
              disabled={spaceRaffleEntries.length === 0}
              className="bg-green-600 hover:bg-green-700"
            >
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {spaceRaffleEntries.length === 0 ? (
            <div className="text-center py-12 text-white/70">
              <Trophy className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>No entries yet</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {spaceRaffleEntries.map((entry, index) => (
                <div
                  key={entry.id.toString()}
                  className="bg-white/5 p-4 rounded-lg border border-white/10 hover:border-white/20 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-purple-500/20 text-purple-300 border-purple-400/50">
                        #{index + 1}
                      </Badge>
                      <div>
                        <p className="text-white font-semibold">{entry.username}</p>
                        <p className="text-white/60 text-sm">{entry.email}</p>
                      </div>
                    </div>
                    <Badge className="bg-green-500/20 text-green-300 border-green-400/50">
                      ${entry.usdValue.toFixed(2)}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-2 text-white/70">
                      <Wallet className="w-4 h-4" />
                      <span className="font-mono text-xs">{entry.wallet.slice(0, 10)}...{entry.wallet.slice(-8)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/70">
                      <Sparkles className="w-4 h-4" />
                      <span>{entry.tokenBalance} $VibeOfficial</span>
                    </div>
                  </div>

                  <p className="text-white/50 text-xs mt-2 font-mono">
                    Hash: {entry.entryHash}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
