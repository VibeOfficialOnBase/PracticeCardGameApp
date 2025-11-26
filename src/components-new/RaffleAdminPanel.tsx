'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table } from '@/components/ui/table';
import { Download, Trophy, Search, TrendingUp } from 'lucide-react';
import { useAccount } from 'wagmi';
import type { RaffleEntry } from '@/spacetime_module_bindings';

interface RaffleAdminPanelProps {
  raffleEntries: RaffleEntry[];
  onSelectWinner?: () => void;
}

export function RaffleAdminPanel({ raffleEntries, onSelectWinner }: RaffleAdminPanelProps) {
  const { address } = useAccount();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'balance' | 'usd'>('date');
  const [sortDesc, setSortDesc] = useState(true);

  // Admin wallet check - replace with your actual wallet address
  const ADMIN_WALLET = '0xYourAdminWalletAddressHere'.toLowerCase();
  const isAdmin = address?.toLowerCase() === ADMIN_WALLET;

  // Calculate stats
  const totalEntries = raffleEntries.length;
  const totalUSDValue = raffleEntries.reduce((sum: number, entry: RaffleEntry) => sum + entry.usdValue, 0);
  const avgHoldings = totalEntries > 0 ? totalUSDValue / totalEntries : 0;

  // Filter and sort entries
  const filteredEntries = raffleEntries.filter((entry: RaffleEntry) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      entry.username.toLowerCase().includes(searchLower) ||
      entry.email.toLowerCase().includes(searchLower) ||
      entry.wallet.toLowerCase().includes(searchLower)
    );
  });

  const sortedEntries = [...filteredEntries].sort((a: RaffleEntry, b: RaffleEntry) => {
    let comparison = 0;
    
    if (sortBy === 'date') {
      comparison = a.timestamp.toDate().getTime() - b.timestamp.toDate().getTime();
    } else if (sortBy === 'balance') {
      const aBalance = parseFloat(a.tokenBalance.replace(/,/g, ''));
      const bBalance = parseFloat(b.tokenBalance.replace(/,/g, ''));
      comparison = aBalance - bBalance;
    } else if (sortBy === 'usd') {
      comparison = a.usdValue - b.usdValue;
    }
    
    return sortDesc ? -comparison : comparison;
  });

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['Username', 'Email', 'Wallet', 'Token Balance', 'USD Value', 'Entry Date', 'Entry Hash'];
    const rows = raffleEntries.map((entry: RaffleEntry) => [
      entry.username,
      entry.email,
      entry.wallet,
      entry.tokenBalance,
      entry.usdValue.toFixed(2),
      entry.timestamp.toDate().toISOString(),
      entry.entryHash,
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row: (string | number)[]) => row.map((cell: string | number) => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `raffle_entries_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  if (!isAdmin) {
    return (
      <Card className="backdrop-blur-lg bg-white/10 border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Access Denied</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-white/80">You do not have permission to view this panel.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 px-2 sm:px-0">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="backdrop-blur-lg bg-white/10 border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Trophy className="w-8 h-8 text-yellow-400" />
              <div>
                <p className="text-white/60 text-sm">Total Entries</p>
                <p className="text-2xl font-bold text-white">{totalEntries}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-lg bg-white/10 border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-green-400" />
              <div>
                <p className="text-white/60 text-sm">Total USD Value</p>
                <p className="text-2xl font-bold text-white">${totalUSDValue.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-lg bg-white/10 border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-blue-400" />
              <div>
                <p className="text-white/60 text-sm">Average Holdings</p>
                <p className="text-2xl font-bold text-white">${avgHoldings.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Table */}
      <Card className="backdrop-blur-lg bg-white/10 border-white/20">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="text-2xl text-white">Raffle Entries Dashboard</CardTitle>
            <div className="flex gap-2">
              <Button
                onClick={exportToCSV}
                className="bg-green-600 hover:bg-green-700"
                disabled={totalEntries === 0}
              >
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
              <Button
                onClick={onSelectWinner}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                disabled={totalEntries === 0}
              >
                <Trophy className="w-4 h-4 mr-2" />
                Select Winner
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* Search and Sort */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
              <Input
                type="text"
                placeholder="Search by username, email, or wallet..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 border-white/30 text-white placeholder:text-white/50"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setSortBy('date');
                  setSortDesc(!sortDesc);
                }}
                className={sortBy === 'date' ? 'bg-white/20' : ''}
              >
                Date {sortBy === 'date' && (sortDesc ? '↓' : '↑')}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setSortBy('balance');
                  setSortDesc(!sortDesc);
                }}
                className={sortBy === 'balance' ? 'bg-white/20' : ''}
              >
                Balance {sortBy === 'balance' && (sortDesc ? '↓' : '↑')}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setSortBy('usd');
                  setSortDesc(!sortDesc);
                }}
                className={sortBy === 'usd' ? 'bg-white/20' : ''}
              >
                USD {sortBy === 'usd' && (sortDesc ? '↓' : '↑')}
              </Button>
            </div>
          </div>

          {/* Table */}
          {totalEntries === 0 ? (
            <div className="text-center py-12">
              <Trophy className="w-16 h-16 text-white/20 mx-auto mb-4" />
              <p className="text-white/60">No raffle entries yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left p-3 text-white/80 font-semibold">Username</th>
                    <th className="text-left p-3 text-white/80 font-semibold">Email</th>
                    <th className="text-left p-3 text-white/80 font-semibold">Wallet</th>
                    <th className="text-right p-3 text-white/80 font-semibold">Balance</th>
                    <th className="text-right p-3 text-white/80 font-semibold">USD Value</th>
                    <th className="text-left p-3 text-white/80 font-semibold">Entry Date</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedEntries.map((entry: RaffleEntry) => (
                    <tr key={entry.id.toString()} className="border-b border-white/10 hover:bg-white/5">
                      <td className="p-3 text-white">{entry.username}</td>
                      <td className="p-3 text-white">{entry.email}</td>
                      <td className="p-3 text-white/70 font-mono text-xs">
                        {entry.wallet.slice(0, 6)}...{entry.wallet.slice(-4)}
                      </td>
                      <td className="p-3 text-white text-right">{entry.tokenBalance}</td>
                      <td className="p-3 text-white text-right">${entry.usdValue.toFixed(2)}</td>
                      <td className="p-3 text-white/70 text-sm">
                        {entry.timestamp.toDate().toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
