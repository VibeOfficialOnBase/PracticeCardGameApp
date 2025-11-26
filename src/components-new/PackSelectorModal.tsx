'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { X, Crown, Check } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { VIBE_CHECK_PACKS } from '@/data/vibeCheckPacks';
import { useUserPacks } from '@/hooks/useUserPacks';
import { checkVibeTokenBalance } from '@/utils/tokenGating';

interface PackSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPackClaimed?: () => void;
}

export function PackSelectorModal({ isOpen, onClose, onPackClaimed }: PackSelectorModalProps) {
  const { address } = useAccount();
  const { claimedPacks } = useUserPacks();
  const [vibeBalance, setVibeBalance] = useState<number>(0);
  const [checkingBalance, setCheckingBalance] = useState<boolean>(true);

  // Load VIBE balance to display current status
  useEffect(() => {
    if (address && isOpen) {
      setCheckingBalance(true);
      checkVibeTokenBalance(address)
        .then(result => {
          setVibeBalance(result.formattedBalance);
          setCheckingBalance(false);
        })
        .catch(() => {
          setVibeBalance(0);
          setCheckingBalance(false);
        });
    } else {
      setVibeBalance(0);
      setCheckingBalance(false);
    }
  }, [address, isOpen]);

  const isHolder = vibeBalance >= 1000;
  const hasPRACTICE = claimedPacks.some(p => p.id === 'practice_pack');
  const hasVibeCheck = claimedPacks.some(p => p.id === 'vibe_check_exclusive');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-black/95 border border-purple-500/30 text-white">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                📦 Your Practice Packs
              </DialogTitle>
              <p className="text-sm text-gray-400 mt-1">
                {claimedPacks.length}/{VIBE_CHECK_PACKS.length} Packs Available
                {!checkingBalance && (
                  <>
                    {isHolder ? (
                      <span className="ml-2 text-yellow-400">
                        <Crown className="w-3 h-3 inline mr-1" />
                        Holder Status Active
                      </span>
                    ) : (
                      <span className="ml-2 text-gray-500">
                        {vibeBalance.toLocaleString()} $VibeOfficial
                      </span>
                    )}
                  </>
                )}
              </p>
            </div>
          </div>
        </DialogHeader>

        {/* Info Banner */}
        <div className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg">
          <p className="text-sm text-purple-200">
            <span className="font-semibold">📦 How it works:</span> PRACTICE pack is FREE for everyone. Holders with 1,000+ $VibeOfficial automatically get the exclusive Vibe Check pack!
          </p>
        </div>

        {/* Holder Upgrade Banner */}
        {!checkingBalance && !isHolder && (
          <div className="p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-lg">
            <p className="text-sm text-yellow-200">
              <Crown className="w-4 h-4 inline mr-2" />
              <span className="font-semibold">Unlock Exclusive Content:</span> Hold 1,000+ $VibeOfficial tokens to automatically unlock the exclusive Vibe Check pack!
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {VIBE_CHECK_PACKS.map(pack => {
            const isFree = pack.requiredVibeBalance === 0;
            const isExclusive = pack.requiredVibeBalance > 0;
            const isActive = claimedPacks.some(p => p.id === pack.id);
            const isLocked = isExclusive && !isHolder;

            return (
              <Card
                key={pack.id}
                className={`relative overflow-hidden transition-all duration-300 border-2 ${
                  isActive
                    ? 'border-green-500/50'
                    : isLocked
                    ? 'border-gray-700 opacity-70'
                    : 'border-yellow-500/50'
                }`}
                style={{
                  background: `linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.9) 100%)`,
                }}
              >
                {/* Gradient glow overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${pack.gradient} ${
                    isLocked ? 'opacity-5' : 'opacity-10'
                  }`}
                />

                {/* Lock Overlay */}
                {isLocked && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10 flex items-center justify-center">
                    <div className="text-center p-6">
                      <Crown className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                      <p className="text-lg font-bold text-white mb-2">
                        Holder Exclusive
                      </p>
                      <p className="text-sm text-gray-300 mb-2">
                        Hold {pack.requiredVibeBalance.toLocaleString()}+ $VibeOfficial
                      </p>
                      <p className="text-xs text-gray-400">
                        You have: {vibeBalance.toLocaleString()} $VibeOfficial
                      </p>
                    </div>
                  </div>
                )}

                <CardContent className="relative p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-4xl">{pack.emoji}</span>
                        <div>
                          <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            {pack.name}
                            {isExclusive && (
                              <Crown className="w-4 h-4 text-yellow-400" />
                            )}
                          </h3>
                          <p className="text-xs text-gray-400">{pack.cardCount} Cards</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      {isActive && (
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                          <Check className="w-3 h-3 mr-1" />
                          Active
                        </Badge>
                      )}
                      {!isActive && !isLocked && (
                        <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/50">
                          Available
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-300 mb-4">{pack.description}</p>

                  {/* Requirements */}
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-4 pb-4 border-b border-gray-700">
                    {isFree ? (
                      <span className="text-green-400 font-semibold">✨ Free for Everyone</span>
                    ) : (
                      <span className="text-yellow-400 font-semibold flex items-center gap-1">
                        <Crown className="w-3 h-3" />
                        Holder Exclusive
                      </span>
                    )}
                  </div>

                  {/* Status Display */}
                  <div>
                    {isActive ? (
                      <div className="text-center p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                        <p className="text-sm text-green-300 font-semibold">
                          <Check className="w-4 h-4 inline mr-2" />
                          Pack Active
                        </p>
                        <p className="text-xs text-green-200/60 mt-1">
                          Pull daily cards from this pack on the home screen
                        </p>
                      </div>
                    ) : isLocked ? (
                      <div className="text-center p-3 bg-gray-700/30 border border-gray-600/30 rounded-lg">
                        <p className="text-sm text-gray-400 font-semibold">
                          <Crown className="w-4 h-4 inline mr-2" />
                          Requires {pack.requiredVibeBalance.toLocaleString()}+ $VibeOfficial
                        </p>
                      </div>
                    ) : (
                      <div className="text-center p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                        <p className="text-sm text-purple-300 font-semibold">
                          ✨ Automatically Added
                        </p>
                        <p className="text-xs text-purple-200/60 mt-1">
                          This pack will appear on your home screen
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Summary */}
        {claimedPacks.length > 0 && (
          <div className="mt-6 p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
            <p className="text-sm text-gray-300">
              <span className="font-semibold text-purple-400">📍 Current Setup:</span> You can pull from {claimedPacks.length} {claimedPacks.length === 1 ? 'pack' : 'packs'} daily! Each pack appears side-by-side on the home screen.
            </p>
          </div>
        )}

        {/* Holder Info */}
        {!isHolder && (
          <div className="mt-4 p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-lg">
            <p className="text-sm text-yellow-200 flex items-start gap-2">
              <Crown className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <span>
                <span className="font-semibold">Become a $VibeOfficial Holder:</span> Hold 1,000+ $VibeOfficial tokens to automatically unlock the exclusive Vibe Check pack with legendary frequency prompts.
              </span>
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
