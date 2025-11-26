'use client';

import { GiveawayAdminPanel } from '@/components/GiveawayAdminPanel';
import { useAccount } from 'wagmi';
import { Button } from '@/components/ui/button';
import { Shield, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// Admin addresses (add your admin wallet addresses here)
const ADMIN_ADDRESSES = [
  '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  // Add more admin addresses as needed
];

export default function GiveawayAdminPage() {
  const { address } = useAccount();

  const isAdmin = address && ADMIN_ADDRESSES.some(
    adminAddr => adminAddr.toLowerCase() === address.toLowerCase()
  );

  return (
    <div className="min-h-screen pt-16 px-4 pb-24 bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950">
      {/* Back Button */}
      <div className="w-full max-w-7xl mx-auto mb-6">
        <Link href="/giveaway">
          <Button
            variant="outline"
            className="border-indigo-400/50 text-indigo-300 hover:bg-indigo-500/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Giveaway
          </Button>
        </Link>
      </div>

      {!address ? (
        <div className="text-center py-20">
          <Shield className="w-20 h-20 text-white/30 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-white mb-4">Authentication Required</h2>
          <p className="text-white/70 mb-6">Please connect your wallet to access the admin panel</p>
        </div>
      ) : !isAdmin ? (
        <div className="text-center py-20">
          <Shield className="w-20 h-20 text-red-400/50 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-white mb-4">Access Denied</h2>
          <p className="text-white/70 mb-2">This wallet is not authorized to access the admin panel</p>
          <p className="text-white/50 text-sm font-mono">{address}</p>
        </div>
      ) : (
        <GiveawayAdminPanel />
      )}
    </div>
  );
}
