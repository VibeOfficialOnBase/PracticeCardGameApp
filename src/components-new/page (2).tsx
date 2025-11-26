'use client';

import { useState, useEffect, useRef, useReducer, useMemo, useCallback } from 'react';
import { WelcomeScreen } from '@/components/WelcomeScreen';
import { CardDisplay } from '@/components/CardDisplay';
import { PreviewModeCard } from '@/components/PreviewModeCard';
import { ReturningUserEmailLogin } from '@/components/ReturningUserEmailLogin';
import { VerificationCodeInput } from '@/components/VerificationCodeInput';
import { StreakFireDisplay } from '@/components/StreakFireDisplay';
import { ShareModal } from '@/components/ShareModal';
import { EnhancedAchievementToast } from '@/components/EnhancedAchievementToast';
import { DramaticCardReveal } from '@/components/DramaticCardReveal';
import { StreakMilestoneModal } from '@/components/StreakMilestoneModal';
import { QuickShareButton } from '@/components/QuickShareButton';
import { TutorialOverlay } from '@/components/TutorialOverlay';
import { StatsWidget } from '@/components/StatsWidget';
import { FloatingJournalButton } from '@/components/FloatingJournalButton';
import { PurchaseOptionsModal } from '@/components/PurchaseOptionsModal';
import AboutCreatorModal from '@/components/AboutCreatorModal';
import { LECHEExpansionModal } from '@/components/LECHEExpansionModal';
import { AppShareButton } from '@/components/AppShareButton';
import { AppShareModal } from '@/components/AppShareModal';
import { UnifiedNetworkWarning } from '@/components/UnifiedNetworkWarning';
import { WalletDropdown } from '@/components/WalletDropdown';
import { RefreshBalanceButton } from '@/components/RefreshBalanceButton';
import dynamic from 'next/dynamic';

// Lazy load heavy components for better performance
const Leaderboard = dynamic(() => import('@/components/Leaderboard').then(mod => ({ default: mod.Leaderboard })), { ssr: false });
const RafflePage = dynamic(() => import('@/components/RafflePage').then(mod => ({ default: mod.RafflePage })), { ssr: false });
const CardCollectionGallery = dynamic(() => import('@/components/CardCollectionGallery').then(mod => ({ default: mod.CardCollectionGallery })), { ssr: false });
const AchievementsGrid = dynamic(() => import('@/components/AchievementBadge').then(mod => ({ default: mod.AchievementsGrid })), { ssr: false });
const AnalyticsDashboard = dynamic(() => import('@/components/AnalyticsDashboard'), { ssr: false });
const CommunityFeed = dynamic(() => import('@/components/CommunityFeed'), { ssr: false });
const WellnessPage = dynamic(() => import('@/components/WellnessPage').then(mod => ({ default: mod.WellnessPage })), { ssr: false });

// Lazy load particle effects (only on desktop for performance)
const SparklesBackground = dynamic(() => import('@/components/SparklesBackground').then(mod => ({ default: mod.SparklesBackground })), { ssr: false });
const MagicalParticles = dynamic(() => import('@/components/MagicalParticles').then(mod => ({ default: mod.MagicalParticles })), { ssr: false });
const EnhancedParticles = dynamic(() => import('@/components/EnhancedParticles').then(mod => ({ default: mod.EnhancedParticles })), { ssr: false });
const FloatingOrbs = dynamic(() => import('@/components/EnhancedParticles').then(mod => ({ default: mod.FloatingOrbs })), { ssr: false });

import StreakBonusDisplay from '@/components/StreakBonusDisplay';
import ComboTracker from '@/components/ComboTracker';
import { EnhancedStreakDisplay } from '@/components/EnhancedStreakDisplay';
import { TierProgressBar } from '@/components/TierProgressBar';
import { AchievementCelebrationModal } from '@/components/AchievementCelebrationModal';
import { ReferralDashboard } from '@/components/ReferralDashboard';
import { CommunityStatsWidget } from '@/components/CommunityStatsWidget';
import { PWAInstallPrompt } from '@/components/PWAInstallPrompt';
import { PackSelectorModal } from '@/components/PackSelectorModal';
import { MilestoneTracker } from '@/components/MilestoneTracker';

import { EnhancedActivityFeed } from '@/components/EnhancedActivityFeed';
import { MobileTokenIndicator } from '@/components/MobileTokenIndicator';
import { ReferralInviteWidget } from '@/components/ReferralInviteWidget';
import { Button } from '@/components/ui/button';
import { Sparkles, AlertCircle, Wallet, Home, Trophy, Gift, BookOpen, Award, BarChart3, Users, Info, Heart, Crown } from 'lucide-react';
import { MobileNav } from '@/components/MobileNav';
import { CompactTokenBadge } from '@/components/CompactTokenBadge';
import { Footer } from '@/components/Footer';
import { ProfileSettings } from '@/components/ProfileSettings';
import { PullHistoryCalendar } from '@/components/PullHistoryCalendar';
import { ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { allCards, getCardsByPack } from '@/data/cardsWithRarity';
import { canPullToday, recordPull, getRandomCardId, getUserPulls } from '@/utils/pullTracking';
import { getFavorites } from '@/utils/favoritesTracking';
import { checkAndUnlockAchievements, getUserAchievements, type Achievement } from '@/utils/achievementsTracking';
import { awardXP, XP_REWARDS, getLevelInfo } from '@/utils/xpTracking';
import { checkAndProcessAchievements, awardStreakBonuses, refreshStatsWithRetry } from '@/utils/achievementHelpers';
import { getShareCount } from '@/utils/shareTracking';
import { getReferralCount, recordReferral } from '@/utils/referralTracking';
import { recordTimedPull, getMorningPullStreak, getEveningPullStreak, getWeekendPullStreak, hasStreakBroken } from '@/utils/timeBasedTracking';
import { LevelDisplay } from '@/components/LevelDisplay';
import { LevelUpToast } from '@/components/LevelUpToast';
import { getStreakMultiplier, getMilestoneReward, recordComboAction, getComboBonus, getCurrentCombo } from '@/utils/streakBonuses';
import { motion } from 'framer-motion';
import Image from 'next/image';
import confetti from 'canvas-confetti';
import { sdk } from "@farcaster/miniapp-sdk";
import { useAddMiniApp } from "@/hooks/useAddMiniApp";
import { useAccount, useDisconnect } from 'wagmi';
import { WalletDefault } from '@coinbase/onchainkit/wallet';
import { checkVibeTokenBalance, MIN_VIBE_FOR_CARD_PULL, VIBE_TOKEN_ADDRESS, type TokenBalance } from '@/utils/tokenGating';
import { isEligibleForPull, recordFreePull, hasUsedFreePull } from '@/utils/freePullTracking';
import { clearAllTestData } from '@/utils/resetTracking';
import type { Address } from 'viem';
import { useSpacetimeDB } from '@/hooks/useSpacetimeDB';
import { useGlobalCommunityStats } from '@/hooks/useGlobalCommunityStats';
import { ActivePackIndicator } from '@/components/ActivePackIndicator';
import { useUserPacks } from '@/hooks/useUserPacks';
import { PackBadge } from '@/components/PackBadge';
import { GoldenCardWrapper } from '@/components/GoldenCardWrapper';
import { MultiPackPullDisplay } from '@/components/MultiPackPullDisplay';
import {
  canPullFromPackToday,
  getTodaysPulledCards as getMultiPackPulledCards,
  recordPackPull,
  getRandomPracticeCard,
  getRandomVibeCheckCard,
  getRandomCardForPack,
} from '@/utils/multiPackPullTracking';

// Coinbase Wallet buy link for VIBE token on Base
const VIBE_BUY_LINK = `https://go.cb-w.com/swap?asset=${VIBE_TOKEN_ADDRESS}&network=base`;

export default function Page() {
    const { addMiniApp } = useAddMiniApp();
    useEffect(() => {
      const tryAddMiniApp = async () => {
        try {
          await addMiniApp()
        } catch (error) {
          // Silent fail - mini app addition is optional
        }

      }

    

      tryAddMiniApp()
    }, [addMiniApp])
    useEffect(() => {
      const initializeFarcaster = async () => {
        try {
          await new Promise(resolve => setTimeout(resolve, 100));
          if (document.readyState !== 'complete') {
            await new Promise(resolve => {
              if (document.readyState === 'complete') {
                resolve(void 0);
              } else {
                window.addEventListener('load', () => resolve(void 0), { once: true });
              }

            });
          }

          await sdk.actions.ready();
        } catch (error) {
          // Silent fail - Farcaster SDK initialization is optional
          setTimeout(async () => {
            try {
              await sdk.actions.ready();
            } catch (retryError) {
              // Retry failed, continue without Farcaster features
            }

          }, 1000);
        }

      };
      initializeFarcaster();
    }, []);
  const [username, setUsername] = useState<string | null>(null);
  const [currentCard, setCurrentCard] = useState<typeof allCards[0] | null>(null);
  const [pulledCards, setPulledCards] = useState<Record<string, number | null>>({});
  const [canPullFromPack, setCanPullFromPack] = useState<Record<string, boolean>>({});
  // Modal state management with useReducer
  type ModalState = {
    showShare: boolean;
    showPurchaseModal: boolean;
    showAboutModal: boolean;
    showLECHEModal: boolean;
    showAppShareModal: boolean;
    showPackSelector: boolean;
    showFullTokenBalance: boolean;
  };
  
  type ModalAction = 
    | { type: 'TOGGLE_SHARE' }
    | { type: 'TOGGLE_PURCHASE' }
    | { type: 'TOGGLE_ABOUT' }
    | { type: 'TOGGLE_LECHE' }
    | { type: 'TOGGLE_APP_SHARE' }
    | { type: 'TOGGLE_PACK_SELECTOR' }
    | { type: 'TOGGLE_FULL_TOKEN_BALANCE' }
    | { type: 'SET_SHARE'; payload: boolean }
    | { type: 'SET_PURCHASE'; payload: boolean }
    | { type: 'SET_ABOUT'; payload: boolean }
    | { type: 'SET_LECHE'; payload: boolean }
    | { type: 'SET_APP_SHARE'; payload: boolean }
    | { type: 'SET_PACK_SELECTOR'; payload: boolean }
    | { type: 'SET_FULL_TOKEN_BALANCE'; payload: boolean };
  
  function modalReducer(state: ModalState, action: ModalAction): ModalState {
    switch (action.type) {
      case 'TOGGLE_SHARE':
        return { ...state, showShare: !state.showShare };
      case 'TOGGLE_PURCHASE':
        return { ...state, showPurchaseModal: !state.showPurchaseModal };
      case 'TOGGLE_ABOUT':
        return { ...state, showAboutModal: !state.showAboutModal };
      case 'TOGGLE_LECHE':
        return { ...state, showLECHEModal: !state.showLECHEModal };
      case 'TOGGLE_APP_SHARE':
        return { ...state, showAppShareModal: !state.showAppShareModal };
      case 'TOGGLE_PACK_SELECTOR':
        return { ...state, showPackSelector: !state.showPackSelector };
      case 'TOGGLE_FULL_TOKEN_BALANCE':
        return { ...state, showFullTokenBalance: !state.showFullTokenBalance };
      case 'SET_SHARE':
        return { ...state, showShare: action.payload };
      case 'SET_PURCHASE':
        return { ...state, showPurchaseModal: action.payload };
      case 'SET_ABOUT':
        return { ...state, showAboutModal: action.payload };
      case 'SET_LECHE':
        return { ...state, showLECHEModal: action.payload };
      case 'SET_APP_SHARE':
        return { ...state, showAppShareModal: action.payload };
      case 'SET_PACK_SELECTOR':
        return { ...state, showPackSelector: action.payload };
      case 'SET_FULL_TOKEN_BALANCE':
        return { ...state, showFullTokenBalance: action.payload };
      default:
        return state;
    }
  }
  
  const [modals, dispatchModals] = useReducer(modalReducer, {
    showShare: false,
    showPurchaseModal: false,
    showAboutModal: false,
    showLECHEModal: false,
    showAppShareModal: false,
    showPackSelector: false,
    showFullTokenBalance: false,
  });
  
  // Other state
  const [canPull, setCanPull] = useState(true);
  const [userStreak, setUserStreak] = useState(0);
  const [activeTab, setActiveTab] = useState('home');
  const [tokenBalance, setTokenBalance] = useState<TokenBalance | null>(null);
  const [checkingToken, setCheckingToken] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null);
  const [levelUpLevel, setLevelUpLevel] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [aboutPracticeExpanded, setAboutPracticeExpanded] = useState(false);
  const [connectionAttempts, setConnectionAttempts] = useState(0);
  const [refreshingBalance, setRefreshingBalance] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [previewCard, setPreviewCard] = useState<typeof allCards[0] | null>(null);
  const [returningUserMode, setReturningUserMode] = useState<'email' | 'code' | null>(null);
  const [verificationEmail, setVerificationEmail] = useState('');
  const [balanceError, setBalanceError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const { address, isConnecting, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const cardRef = useRef<HTMLDivElement>(null);

  // SpacetimeDB integration for real-time community features
  const spacetime = useSpacetimeDB(address as string | undefined);
  const globalStats = useGlobalCommunityStats();
  
  // Pack management - pass tokenBalance to determine available packs
  const { claimedPacks, hasClaimedAnyPack, refreshPacks } = useUserPacks({ tokenBalance });

  // Auto-create SpacetimeDB user when username is set (even without wallet)
  useEffect(() => {
    if (!spacetime.connected || !username) return;
    
    // Check if user already exists in SpacetimeDB
    if (spacetime.user) {
      return;
    }
    
    // Create user in SpacetimeDB using wallet or username-based identifier
    const identifier = address || `0x${username.toLowerCase().padStart(40, '0')}`;
    spacetime.createUser(identifier, username);
  }, [address, spacetime.connected, spacetime.user, username, spacetime]);

  // Clear all test data on first load (runs once after publish)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const resetKey = 'practice_reset_executed_v2';
      const hasReset = localStorage.getItem(resetKey);
      
      if (!hasReset) {
        clearAllTestData();
        localStorage.setItem(resetKey, 'true');
      }
    }
  }, []);

  // Detect mobile for performance optimizations
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedUsername = localStorage.getItem('practice_username');
      if (savedUsername) {
        setUsername(savedUsername);
        checkPullStatus(savedUsername);
        
        // Load today's pulled cards for all packs
        const todaysPulls = getMultiPackPulledCards(savedUsername);
        setPulledCards(todaysPulls);
      }
    }
  }, []);

  // Re-check pull eligibility for all claimed packs
  useEffect(() => {
    if (username && claimedPacks.length > 0) {
      const pullStatus: Record<string, boolean> = {};
      claimedPacks.forEach(pack => {
        const canPull = canPullFromPackToday(username, pack.id);
        pullStatus[pack.id] = canPull;
      });
      setCanPullFromPack(pullStatus);
    } else if (username && claimedPacks.length === 0) {
      setCanPullFromPack({});
    }
  }, [username, claimedPacks]);

  useEffect(() => {
    if (username) {
      const pulls = getUserPulls(username);
      // Calculate simple streak (consecutive days)
      let streak = 0;
      if (pulls.length > 0) {
        streak = 1;
        for (let i = pulls.length - 1; i > 0; i--) {
          const current = new Date(pulls[i].date);
          const prev = new Date(pulls[i - 1].date);
          const diffTime = Math.abs(current.getTime() - prev.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          if (diffDays === 1) {
            streak++;
          } else {
            break;
          }
        }
      }
      setUserStreak(streak);
    }
  }, [username, currentCard]);

  // Consolidated balance check with retry logic and error handling
  useEffect(() => {
    let isMounted = true;
    let abortController = new AbortController();
    
    const checkToken = async () => {
      // Only check if we have an address and component is mounted
      if (!address || !isMounted) {
        if (!address && isMounted) {
          setWalletConnected(false);
          setTokenBalance(null);
          setBalanceError(null);
        }
        return;
      }
      
      setWalletConnected(true);
      setCheckingToken(true);
      setBalanceError(null);
      
      try {
        const balance = await checkVibeTokenBalance(address as Address);
        
        if (isMounted && balance) {
          setTokenBalance(balance);
          setCheckingToken(false);
          setRetryCount(0);
          setBalanceError(null);
        } else if (!balance) {
          throw new Error('No balance data returned');
        }
      } catch (error: any) {
        
        if (isMounted) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to load balance';
          const userFriendlyError = `Unable to load balance: ${errorMessage}. Tap refresh to retry.`;
          setBalanceError(userFriendlyError);
          setCheckingToken(false);
          
          // Auto-retry up to 2 times with increasing delays
          if (retryCount < 2) {
            const retryDelay = (retryCount + 1) * 2000; // 2s, 4s
            setTimeout(() => {
              if (isMounted) {
                setRetryCount(prev => prev + 1);
              }
            }, retryDelay);
          }
        }
      }
    };
    
    checkToken();
    
    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, [address, isConnected, retryCount]);

  // Manual balance refresh function
  const handleRefreshBalance = useCallback(async () => {
    if (!address || refreshingBalance) return;
    
    setRefreshingBalance(true);
    
    // Store the current balance to preserve it during refresh
    const previousBalance = tokenBalance;
    
    try {
      const balance = await checkVibeTokenBalance(address as Address);
      
      // Only update if we got a valid balance
      if (balance && balance.formattedBalance >= 0) {
        setTokenBalance(balance);
        setBalanceError(null);
        setRetryCount(0);
      } else {
        // Keep the previous balance if the new one is invalid
        if (previousBalance) {
          setTokenBalance(previousBalance);
        }
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('❌ Error refreshing balance:', error);
      }
      setBalanceError('Refresh failed. Please try again.');
      // Keep the previous balance on error
      if (previousBalance) {
        setTokenBalance(previousBalance);
      }
    } finally {
      setRefreshingBalance(false);
    }
  }, [address, refreshingBalance, tokenBalance]);

  // Handle wallet disconnect
  const handleDisconnect = useCallback(() => {
    disconnect();
    setWalletConnected(false);
    setTokenBalance(null);
    setBalanceError(null);
    setRetryCount(0);
  }, [disconnect]);

  // Auto-refresh balance when network comes back online
  useEffect(() => {
    const handleOnline = () => {
      if (address) {
        setRetryCount(prev => prev + 1);
      }
    };
    
    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, [address]);

  // Real-time achievement check based on token balance (whale achievement)
  useEffect(() => {
    // Only check if we have username, valid token balance, and balance is loaded
    if (!username || !tokenBalance || tokenBalance.formattedBalance === undefined) {
      return;
    }
    
    const currentTokenBalance = tokenBalance.formattedBalance;
    
    // Check for balance-based achievements (whale achievement)
    if (currentTokenBalance >= 1000000) {
      const pulls = getUserPulls(username);
      const favorites = getFavorites(username);
      const shares = getShareCount(username);
      const referrals = getReferralCount(username, true);
      const morningStreak = getMorningPullStreak(username);
      const eveningStreak = getEveningPullStreak(username);
      const weekendStreak = getWeekendPullStreak(username);
      const streakBroken = hasStreakBroken(username);
      const levelInfo = getLevelInfo(username);
      
      let streak = 0;
      if (pulls.length > 0) {
        streak = 1;
        for (let i = pulls.length - 1; i > 0; i--) {
          const current = new Date(pulls[i].date);
          const prev = new Date(pulls[i - 1].date);
          const diffTime = Math.abs(current.getTime() - prev.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          if (diffDays === 1) {
            streak++;
          } else {
            break;
          }
        }
      }
      
      const unlockedAchievements = checkAndUnlockAchievements(
        username,
        streak,
        pulls.length,
        favorites.length,
        shares,
        referrals,
        morningStreak,
        eveningStreak,
        weekendStreak,
        levelInfo.level,
        streakBroken,
        0, // journalEntries
        0, // journalStreak
        0, // totalJournalWords
        0, // longestJournalEntry
        0, // completedChallenges
        false, // hasRareCard
        false, // hasEpicCard
        false, // hasLegendaryCard
        false, // hasMythicCard
        currentTokenBalance // tokenBalance
      );
      
      // Show achievement toast and confetti if whale achievement was just unlocked
      if (unlockedAchievements.length > 0) {
        // Award XP for each achievement unlocked
        for (const achievement of unlockedAchievements) {
          awardXP(username, XP_REWARDS.ACHIEVEMENT_UNLOCK, `Unlocked "${achievement.name}"`);
        }
        
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.5 },
          colors: ['#00CED1', '#4169E1', '#1E90FF', '#00BFFF'],
        });
        
        setNewAchievement(unlockedAchievements[0]);
      }
    }
  }, [username, tokenBalance]);

  const checkPullStatus = useCallback((user: string) => {
    const canPullNow = canPullToday(user);
    setCanPull(canPullNow);
    
    if (!canPullNow) {
      // Load today's card if already pulled (old system for backward compatibility)
      const pulls = getUserPulls(user);
      const todaysPull = pulls[pulls.length - 1];
      if (todaysPull) {
        const card = allCards.find((c) => c.id === todaysPull.cardId);
        if (card) {
          setCurrentCard(card);
        }
      }
    }
  }, []);

  const handleStart = useCallback((user: string) => {
    setUsername(user);
    if (typeof window !== 'undefined') {
      localStorage.setItem('practice_username', user);
      
      // Check for pending referral code
      const pendingRef = sessionStorage.getItem('pending_referral_code');
      if (pendingRef) {
        localStorage.setItem('used_referral_code', pendingRef);
        sessionStorage.removeItem('pending_referral_code');
      }
    }
    checkPullStatus(user);
  }, [checkPullStatus]);

  const handlePullFromPack = (packId: string) => {
    if (!username || !canPullFromPack[packId]) return;
    
    // ✅ PRACTICE pack is 100% FREE for everyone - NO wallet needed!
    // Only check wallet/tokens for EXCLUSIVE packs (Vibe Check)
    
    const isExclusivePack = packId === 'vibe_check_exclusive';
    
    // For exclusive packs, require wallet + tokens
    if (isExclusivePack) {
      if (!address) {
        alert('Please connect your wallet to pull from exclusive packs');
        return;
      }
      
      // Check eligibility (free pull OR has tokens)
      const eligibility = isEligibleForPull(
        address,
        tokenBalance?.hasBalance || false
      );
      
      if (!eligibility.eligible) {
        alert(`You need to hold at least ${MIN_VIBE_FOR_CARD_PULL.toLocaleString()} $VibeOfficial tokens to pull from exclusive packs. You currently have ${tokenBalance ? Math.floor(tokenBalance.formattedBalance).toLocaleString() : '0'} $VibeOfficial.`);
        return;
      }
    }

    // Determine card range based on pack
    let cardId: number;
    if (packId === 'practice_pack') {
      cardId = getRandomPracticeCard(username);
    } else if (packId === 'vibe_check_exclusive') {
      cardId = getRandomVibeCheckCard(username);
    } else {
      // Generic pack handler (for future packs)
      const pack = claimedPacks.find(p => p.id === packId);
      if (!pack) return;
      cardId = getRandomCardForPack(username, packId, 1, pack.cardCount);
    }
    
    const card = allCards.find((c) => c.id === cardId);
    
    if (card) {
      // Update pulled cards state
      setPulledCards(prev => ({ ...prev, [packId]: cardId }));
      
      // Record pull
      recordPackPull(username, packId, card.id);
      recordTimedPull(username, card.id);
      
      // Save to SpacetimeDB (for ALL users, even without wallet)
      if (spacetime.connected) {
        const dateString = new Date().toISOString().split('T')[0];
        // Use wallet address if available, otherwise use a deterministic address from username
        const identifier = address || `0x${username.toLowerCase().padStart(40, '0')}`;
        spacetime.recordPull(identifier, card.id, dateString, packId);
        refreshStatsWithRetry(() => globalStats.refresh(), 2, 2000);
      }
      
      // Update can pull status for this pack
      setCanPullFromPack(prev => ({ ...prev, [packId]: false }));
      
      // If this was a free pull from an exclusive pack, record it
      if (isExclusivePack && address) {
        const eligibility = isEligibleForPull(
          address,
          tokenBalance?.hasBalance || false
        );
        if (eligibility.reason === 'free_pull') {
          recordFreePull(address);
        }
      }
      
      // Award XP with bonus for exclusive packs
      const xpAmount = isExclusivePack ? XP_REWARDS.PULL_CARD + 50 : XP_REWARDS.PULL_CARD;
      const xpResult = awardXP(username, xpAmount, `Pulled ${packId === 'practice_pack' ? 'PRACTICE' : 'exclusive'} card`);
      recordComboAction(username, 'pull');
      
      // Time-based bonuses
      const hour = new Date().getHours();
      const dayOfWeek = new Date().getDay();
      
      if (hour >= 5 && hour < 12) {
        awardXP(username, XP_REWARDS.MORNING_PULL, 'Morning pull bonus');
      } else if (hour >= 21 || hour < 5) {
        awardXP(username, XP_REWARDS.EVENING_PULL, 'Evening pull bonus');
      }
      
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        awardXP(username, XP_REWARDS.WEEKEND_PULL, 'Weekend pull bonus');
      }
      
      // Check achievements
      setTimeout(() => {
        const pulls = getUserPulls(username);
        const favorites = getFavorites(username);
        const shares = getShareCount(username);
        const referrals = getReferralCount(username, true);
        const morningStreak = getMorningPullStreak(username);
        const eveningStreak = getEveningPullStreak(username);
        const weekendStreak = getWeekendPullStreak(username);
        const streakBroken = hasStreakBroken(username);
        const levelInfo = getLevelInfo(username);
        
        let streak = 0;
        if (pulls.length > 0) {
          streak = 1;
          for (let i = pulls.length - 1; i > 0; i--) {
            const current = new Date(pulls[i].date);
            const prev = new Date(pulls[i - 1].date);
            const diffTime = Math.abs(current.getTime() - prev.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            if (diffDays === 1) {
              streak++;
            } else {
              break;
            }
          }
        }
        
        if (streak > 0) {
          awardXP(username, XP_REWARDS.STREAK_DAY, `Maintained ${streak}-day streak`);
          
          if (streak === 7) {
            awardXP(username, XP_REWARDS.STREAK_7, '7-day streak milestone!');
          } else if (streak === 30) {
            awardXP(username, XP_REWARDS.STREAK_30, '30-day streak milestone!');
          } else if (streak === 100) {
            awardXP(username, XP_REWARDS.STREAK_100, '100-day streak milestone!');
          }
        }
        
        const currentTokenBalance = tokenBalance ? tokenBalance.formattedBalance : 0;
        
        const unlockedAchievements = checkAndUnlockAchievements(
          username,
          streak,
          pulls.length,
          favorites.length,
          shares,
          referrals,
          morningStreak,
          eveningStreak,
          weekendStreak,
          levelInfo.level,
          streakBroken,
          0, 0, 0, 0, 0,
          false, false, false, false,
          currentTokenBalance
        );
        
        if (unlockedAchievements.length > 0) {
          for (const achievement of unlockedAchievements) {
            awardXP(username, XP_REWARDS.ACHIEVEMENT_UNLOCK, `Unlocked "${achievement.name}"`);
            
            if (spacetime.connected) {
              const identifier = address || `0x${username.toLowerCase().padStart(40, '0')}`;
              spacetime.unlockAchievement(identifier, achievement.id);
              setTimeout(() => globalStats.refresh(), 2000);
              setTimeout(() => globalStats.refresh(), 4000);
            }
          }
        }
        
        if (xpResult.leveledUp) {
          setLevelUpLevel(xpResult.newLevel);
          confetti({
            particleCount: 200,
            spread: 100,
            origin: { y: 0.5 },
            colors: ['#FFD700', '#FFA500', '#FF69B4', '#9370DB'],
          });
        }
        
        if (unlockedAchievements.length > 0) {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          });
          setNewAchievement(unlockedAchievements[0]);
        }
        
        setUserStreak(streak);
      }, 500);
      
      // Special confetti for exclusive packs
      if (isExclusivePack) {
        confetti({
          particleCount: 150,
          spread: 90,
          origin: { y: 0.5 },
          colors: ['#FFD700', '#FFA500', '#FF8C00', '#FF6347'],
        });
      }
      
      setTimeout(() => {
        cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    }
  };

  const handlePullCard = () => {
    if (!username || !canPull) return;
    
    // ✅ PRACTICE deck is 100% FREE for everyone - NO wallet needed!
    // Web3 features (exclusive packs, SpacetimeDB leaderboard) are OPTIONAL bonuses

    // Pull from base 365 PRACTICE cards (free for all)
    const currentPackCards = getCardsByPack(false);
    const maxCardId = 365;
    
    const cardId = getRandomCardId(username, maxCardId);
    const card = currentPackCards.find((c) => c.id === cardId);
    
    if (card) {
      setCurrentCard(card);
      
      // Save to localStorage (for local tracking)
      recordPull(username, card.id);
      recordTimedPull(username, card.id);
      
      // Save to SpacetimeDB (for global community stats) - Track ALL users!
      if (spacetime.connected) {
        const dateString = new Date().toISOString().split('T')[0];
        // Use wallet address if available, otherwise use a deterministic address from username
        const identifier = address || `0x${username.toLowerCase().padStart(40, '0')}`;
        spacetime.recordPull(identifier, card.id, dateString, 'practice_pack');
        
        // Refresh global stats with retry logic
        refreshStatsWithRetry(() => globalStats.refresh(), 3, 2000);
      }
      
      setCanPull(false);
      
      // Award XP for pulling card
      const xpResult = awardXP(username, XP_REWARDS.PULL_CARD, 'Pulled daily card');
      
      // Record combo action
      recordComboAction(username, 'pull');
      
      // Check for bonus XP based on time
      const hour = new Date().getHours();
      const dayOfWeek = new Date().getDay();
      
      if (hour >= 5 && hour < 12) {
        // Morning pull bonus
        awardXP(username, XP_REWARDS.MORNING_PULL, 'Morning pull bonus');
      } else if (hour >= 21 || hour < 5) {
        // Evening pull bonus
        awardXP(username, XP_REWARDS.EVENING_PULL, 'Evening pull bonus');
      }
      
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        // Weekend pull bonus
        awardXP(username, XP_REWARDS.WEEKEND_PULL, 'Weekend pull bonus');
      }
      
      // Check for achievements and level up after pull
      setTimeout(() => {
        const pulls = getUserPulls(username);
        const favorites = getFavorites(username);
        const shares = getShareCount(username);
        const referrals = getReferralCount(username, true);
        const morningStreak = getMorningPullStreak(username);
        const eveningStreak = getEveningPullStreak(username);
        const weekendStreak = getWeekendPullStreak(username);
        const streakBroken = hasStreakBroken(username);
        const levelInfo = getLevelInfo(username);
        
        let streak = 0;
        if (pulls.length > 0) {
          streak = 1;
          for (let i = pulls.length - 1; i > 0; i--) {
            const current = new Date(pulls[i].date);
            const prev = new Date(pulls[i - 1].date);
            const diffTime = Math.abs(current.getTime() - prev.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            if (diffDays === 1) {
              streak++;
            } else {
              break;
            }
          }
        }
        
        // Award streak bonus XP
        if (streak > 0) {
          awardXP(username, XP_REWARDS.STREAK_DAY, `Maintained ${streak}-day streak`);
          
          if (streak === 7) {
            awardXP(username, XP_REWARDS.STREAK_7, '7-day streak milestone!');
          } else if (streak === 30) {
            awardXP(username, XP_REWARDS.STREAK_30, '30-day streak milestone!');
          } else if (streak === 100) {
            awardXP(username, XP_REWARDS.STREAK_100, '100-day streak milestone!');
          }
        }
        
        const currentTokenBalance = tokenBalance ? tokenBalance.formattedBalance : 0;
        
        const unlockedAchievements = checkAndUnlockAchievements(
          username,
          streak,
          pulls.length,
          favorites.length,
          shares,
          referrals,
          morningStreak,
          eveningStreak,
          weekendStreak,
          levelInfo.level,
          streakBroken,
          0, // journalEntries
          0, // journalStreak
          0, // totalJournalWords
          0, // longestJournalEntry
          0, // completedChallenges
          false, // hasRareCard
          false, // hasEpicCard
          false, // hasLegendaryCard
          false, // hasMythicCard
          currentTokenBalance // tokenBalance
        );
        
        // Award XP for each achievement unlocked
        if (unlockedAchievements.length > 0) {
          for (const achievement of unlockedAchievements) {
            awardXP(username, XP_REWARDS.ACHIEVEMENT_UNLOCK, `Unlocked "${achievement.name}"`);
            
            // Save achievement to SpacetimeDB for global tracking (all users)
            if (spacetime.connected) {
              const identifier = address || `0x${username.toLowerCase().padStart(40, '0')}`;
              spacetime.unlockAchievement(identifier, achievement.id);
              
              // Refresh global stats multiple times to catch the update
              setTimeout(() => globalStats.refresh(), 2000);
              setTimeout(() => globalStats.refresh(), 4000);
            }
          }
        }
        
        // Check if user leveled up from XP gains
        const finalLevelInfo = getLevelInfo(username);
        if (xpResult.leveledUp) {
          setLevelUpLevel(xpResult.newLevel);
          // Trigger extra confetti for level up
          confetti({
            particleCount: 200,
            spread: 100,
            origin: { y: 0.5 },
            colors: ['#FFD700', '#FFA500', '#FF69B4', '#9370DB'],
          });
        }
        
        // Show confetti and toast for new achievements
        if (unlockedAchievements.length > 0) {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          });
          setNewAchievement(unlockedAchievements[0]);
        }
        
        setUserStreak(streak);
      }, 500);
      
      // Scroll to card after a brief delay to allow animation
      setTimeout(() => {
        cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    }
  };

  // Handle preview mode - show free preview card before wallet connection
  const handlePreviewPull = () => {
    const randomCardId = Math.floor(Math.random() * 365) + 1;
    const card = allCards.find((c) => c.id === randomCardId);
    if (card) {
      setPreviewCard(card);
      setPreviewMode(true);
    }
  };

  const handleConnectFromPreview = () => {
    setPreviewMode(false);
    // Scroll to top to show wallet connection
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Show preview mode FIRST (even without username) if user wants to try before connecting
  if (previewMode && previewCard) {
    return (
      <div className="min-h-screen whimsical-gradient-backdrop relative overflow-hidden">
        {!isMobile && <EnhancedParticles />}
        {!isMobile && <FloatingOrbs />}
        {!isMobile && <SparklesBackground />}
        {!isMobile && <MagicalParticles />}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        
        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <div className="container mx-auto px-4 py-20 max-w-2xl">
            <PreviewModeCard 
              card={previewCard} 
              onConnectWallet={handleConnectFromPreview}
              onStart={handleStart}
            />
          </div>
        </div>
      </div>
    );
  }

  // Returning user email login flow
  if (returningUserMode === 'email') {
    return (
      <ReturningUserEmailLogin
        onBack={() => setReturningUserMode(null)}
        onCodeSent={(email) => {
          setVerificationEmail(email);
          setReturningUserMode('code');
        }}
      />
    );
  }

  // Verification code input
  if (returningUserMode === 'code' && verificationEmail) {
    return (
      <VerificationCodeInput
        email={verificationEmail}
        onBack={() => setReturningUserMode('email')}
        onVerified={(email) => {
          // Email verified! Now load the username from localStorage
          // In production, you would fetch this from SpacetimeDB
          const savedUsername = localStorage.getItem('practice_username');
          if (savedUsername) {
            handleStart(savedUsername);
          } else {
            // No username found, ask user to create one
            alert('No account found with this email. Please create a new account.');
            setReturningUserMode(null);
          }
        }}
      />
    );
  }

  // Show welcome screen if no username
  if (!username) {
    return (
      <WelcomeScreen
        onStart={handleStart}
        onPreviewPull={handlePreviewPull}
        onReturningUser={() => setReturningUserMode('email')}
      />
    );
  }

  // NO LONGER BLOCK APP ACCESS - Just show reconnect prompt in header
  // Users can now access their collection, profile, etc. even without wallet connected

  // Main app interface (only shown if wallet is connected)
  return (
    <div className="min-h-screen whimsical-gradient-backdrop relative overflow-hidden">
      {!isMobile && <EnhancedParticles />}
      {!isMobile && <FloatingOrbs />}
      {!isMobile && <SparklesBackground />}
      {!isMobile && <MagicalParticles />}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
      
      {/* Fixed Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-indigo-950/95 via-purple-900/95 to-slate-900/95 backdrop-blur-lg border-b border-white/10 shadow-2xl">
        <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-2.5">
          <nav className="flex items-center justify-between gap-1 sm:gap-2">
            {/* Logo and Brand */}
            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              <a 
                href="https://dexscreener.com/base/0xd562ecf42d492b24b83a1661782f6674e3f5eda3702610379c282b922a54a234"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-110 cursor-pointer"
              >
                <Image
                  src="https://usdozf7pplhxfvrl.public.blob.vercel-storage.com/7c5f1896-f11b-4229-b9b9-2e9aea5bb543-USUKADwyIN8ZDriizlUoypra0FvUWW"
                  alt="VibeOfficial"
                  width={28}
                  height={28}
                  className="object-contain rounded-full shadow-lg border-2 border-purple-400/50 animate-logo-glow image-ultra-hd sm:w-[32px] sm:h-[32px]"
                  quality={100}
                  priority
                />
              </a>
              <span className="text-white font-practice text-xs sm:text-base bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent whitespace-nowrap">PRACTICE</span>
            </div>

            {/* Token Badge & Wallet Controls (Desktop Only - Hidden on Mobile) */}
            {address && tokenBalance && (
              <div className="hidden md:flex items-center gap-2 flex-shrink-0">
                <CompactTokenBadge tokenBalance={tokenBalance} />
                <WalletDropdown 
                  address={address as Address}
                  onDisconnect={handleDisconnect}
                  onRefreshBalance={handleRefreshBalance}
                  isRefreshing={refreshingBalance}
                  hasBalance={tokenBalance?.hasBalance || false}
                />
              </div>
            )}
            
            {/* Wallet Dropdown Only (For when token balance is loading - Desktop Only) */}
            {address && !tokenBalance && (
              <div className="hidden md:flex flex-shrink-0">
                <WalletDropdown 
                  address={address as Address}
                  onDisconnect={handleDisconnect}
                  onRefreshBalance={handleRefreshBalance}
                  isRefreshing={refreshingBalance}
                  hasBalance={false}
                />
              </div>
            )}

            {/* Wallet Connection Prompt (when username exists but no wallet) - OPTIONAL */}
            {username && !walletConnected && (
              <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
                <div className="glass-card px-3 py-1.5 rounded-lg border border-yellow-400/50">
                  <span className="text-yellow-300 text-xs font-semibold">⚡ Optional: Connect Wallet for Holder Perks</span>
                </div>
                <WalletDefault />
              </div>
            )}

            {/* Desktop Navigation - All Tabs */}
            <div className="hidden lg:flex items-center gap-1.5">
              <button
                onClick={() => setActiveTab('home')}
                className={`flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-200 min-w-[44px] min-h-[40px] ${
                  activeTab === 'home'
                    ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
                aria-label="Home - Pull cards"
              >
                <Home className="w-4 h-4" />
                <span className="text-xs font-semibold">Pull</span>
              </button>
              <button
                onClick={() => setActiveTab('collection')}
                className={`flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-200 min-w-[44px] min-h-[40px] ${
                  activeTab === 'collection'
                    ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
                aria-label="Card collection"
              >
                <BookOpen className="w-4 h-4" />
                <span className="text-xs font-semibold">Cards</span>
              </button>
              <button
                onClick={() => setActiveTab('achievements')}
                className={`flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-200 min-w-[44px] min-h-[40px] ${
                  activeTab === 'achievements'
                    ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
                aria-label="Achievements and wins"
              >
                <Award className="w-4 h-4" />
                <span className="text-xs font-semibold">Wins</span>
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-200 min-w-[44px] min-h-[40px] ${
                  activeTab === 'analytics'
                    ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
                aria-label="Analytics and stats"
              >
                <BarChart3 className="w-4 h-4" />
                <span className="text-xs font-semibold">Stats</span>
              </button>
              <button
                onClick={() => setActiveTab('raffle')}
                className={`flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-200 min-w-[44px] min-h-[40px] ${
                  activeTab === 'raffle'
                    ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
                aria-label="Giveaway and raffles"
              >
                <Gift className="w-4 h-4" />
                <span className="text-xs font-semibold">Giveaway</span>
              </button>
              <button
                onClick={() => setActiveTab('leaderboard')}
                className={`flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-200 min-w-[44px] min-h-[40px] ${
                  activeTab === 'leaderboard'
                    ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
                aria-label="Leaderboard"
              >
                <Trophy className="w-4 h-4" />
                <span className="text-xs font-semibold">Board</span>
              </button>
              <button
                onClick={() => setActiveTab('community')}
                className={`flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-200 min-w-[44px] min-h-[40px] ${
                  activeTab === 'community'
                    ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
                aria-label="Community feed"
              >
                <Users className="w-4 h-4" />
                <span className="text-xs font-semibold">Social</span>
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-200 min-w-[44px] min-h-[40px] ${
                  activeTab === 'profile'
                    ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
                aria-label="Profile settings"
              >
                <Heart className="w-4 h-4" />
                <span className="text-xs font-semibold">Profile</span>
              </button>
              <button
                onClick={() => setActiveTab('calendar')}
                className={`flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-200 min-w-[44px] min-h-[40px] ${
                  activeTab === 'calendar'
                    ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
                aria-label="Pull history calendar"
              >
                <BarChart3 className="w-4 h-4" />
                <span className="text-xs font-semibold">Calendar</span>
              </button>
              <button
                onClick={() => dispatchModals({ type: 'SET_ABOUT', payload: true })}
                className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-200 min-w-[44px] min-h-[40px] text-white/60 hover:text-white hover:bg-white/10"
                aria-label="About PRACTICE"
              >
                <Info className="w-4 h-4" />
                <span className="text-xs font-semibold">About</span>
              </button>
            </div>

            {/* Mobile Navigation */}
            <div className="lg:hidden">
              <MobileNav 
                activeTab={activeTab} 
                onTabChange={setActiveTab}
                onAboutClick={() => dispatchModals({ type: 'SET_ABOUT', payload: true })}
                address={address as Address | undefined}
                onDisconnect={handleDisconnect}
                onRefreshBalance={handleRefreshBalance}
                isRefreshing={refreshingBalance}
              />

            </div>
          </nav>
        </div>
      </header>

      {/* Main Content - with top padding to account for fixed header and mobile safe area */}
      <main id="main-content" className="relative z-10 container mx-auto px-4 pt-20 sm:pt-24 pb-20 sm:pb-8 max-w-6xl safe-top">
        {/* Home Tab Content */}
        {activeTab === 'home' && (
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center mb-8 sm:mb-12">
              <motion.h1 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-5xl sm:text-6xl md:text-7xl font-bold mb-3 font-practice text-ultra-hd"
              >
                <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-practice-glow" style={{ color: 'white' }}>PRACTICE</span>
              </motion.h1>
              <motion.p 
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-indigo-200 text-xs sm:text-sm mb-4 max-w-2xl mx-auto px-4 text-ultra-hd animate-subtle-text-glow"
              >
                Patiently Repeating Altruistic Challenges To Inspire Core Excellence
              </motion.p>
              <motion.p 
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-indigo-200 mb-6 text-sm sm:text-base text-ultra-hd"
              >
                Welcome back, <span className="font-bold text-white text-lg gradient-text text-ultra-hd">{username}</span>
              </motion.p>
              {userStreak > 0 && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                  className="inline-flex items-center gap-3 glass-card glass-card-glow px-6 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover-scale"
                >
                  <Sparkles className="w-5 h-5 text-yellow-400 animate-bounce-subtle" />
                  <span className="text-white font-bold text-lg gradient-text">{userStreak} Day Streak!</span>
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                </motion.div>
              )}
            </div>

            {/* Enhanced Streak Display */}
            {userStreak > 0 && (
              <div className="mb-6">
                <EnhancedStreakDisplay streak={userStreak} username={username} />
              </div>
            )}
            
            {/* Tier Progress Bar */}
            {tokenBalance && (
              <div className="mb-6 max-w-md mx-auto">
                <TierProgressBar currentBalance={tokenBalance.formattedBalance} />
              </div>
            )}
            
            {/* Stats Widget */}
            <div className="mb-8">
              <StatsWidget username={username} />
            </div>

            {/* Community Stats Widget */}
            <div className="mb-8">
              <CommunityStatsWidget />
            </div>

            {/* Pack Claim Banner - Prominent Call-to-Action for Holders */}
            {address && tokenBalance && !checkingToken && (
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="mb-8"
              >
                {tokenBalance.formattedBalance >= 1000 ? (
                  // Holder CTA - Show exclusive pack claim
                  <div className="glass-card p-6 rounded-2xl shadow-xl border-2 border-yellow-400/50 bg-gradient-to-br from-yellow-900/30 to-orange-900/30 backdrop-blur-lg">
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg flex-shrink-0">
                        <span className="text-3xl">👑</span>
                      </div>
                      <div className="flex-1 text-center sm:text-left">
                        <h3 className="text-xl font-bold text-white mb-1 flex items-center justify-center sm:justify-start gap-2">
                          <Crown className="w-5 h-5 text-yellow-400" />
                          Holder Exclusive Pack Available!
                        </h3>
                        <p className="text-yellow-100/90 text-sm">
                          You're a $VibeOfficial holder! Claim your exclusive Vibe Check pack with 20 legendary frequency prompts.
                        </p>
                      </div>
                      <Button
                        onClick={() => dispatchModals({ type: 'SET_PACK_SELECTOR', payload: true })}
                        size="lg"
                        className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold shadow-lg hover-scale flex-shrink-0"
                      >
                        <Crown className="w-5 h-5 mr-2" />
                        Claim Exclusive Pack
                      </Button>
                    </div>
                  </div>
                ) : (
                  // Non-holder CTA - Show pack management with upgrade prompt
                  <div className="glass-card p-6 rounded-2xl shadow-xl border-2 border-purple-400/50 bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-lg">
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg flex-shrink-0">
                        <span className="text-3xl">📦</span>
                      </div>
                      <div className="flex-1 text-center sm:text-left">
                        <h3 className="text-xl font-bold text-white mb-1">
                          Manage Your Practice Packs
                        </h3>
                        <p className="text-purple-100/90 text-sm">
                          View available packs and unlock exclusive content by becoming a $VibeOfficial holder (1,000+ $VIBE).
                        </p>
                      </div>
                      <Button
                        onClick={() => dispatchModals({ type: 'SET_PACK_SELECTOR', payload: true })}
                        size="lg"
                        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold shadow-lg hover-scale flex-shrink-0"
                      >
                        View Packs
                      </Button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}



            {/* Enhanced Live Activity Feed - VIRAL FEATURE */}
            <div className="mb-8">
              <EnhancedActivityFeed />
            </div>

            {/* Referral Invite Widget - GROWTH FEATURE */}
            <div className="mb-8">
              <ReferralInviteWidget username={username} compact={false} />
            </div>

            {/* Community Milestones */}
            <div className="mb-8">
              <MilestoneTracker />
            </div>

            <div className="flex flex-col items-center">
              {/* Logo */}
              <div className="flex flex-col items-center justify-center gap-3 mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-white/80 text-sm animate-subtle-text-glow">Powered By</span>
                  <a 
                    href="https://dexscreener.com/base/0xd562ecf42d492b24b83a1661782f6674e3f5eda3702610379c282b922a54a234"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-transform hover:scale-110 cursor-pointer"
                  >
                    <Image
                      src="https://usdozf7pplhxfvrl.public.blob.vercel-storage.com/7c5f1896-f11b-4229-b9b9-2e9aea5bb543-USUKADwyIN8ZDriizlUoypra0FvUWW"
                      alt="VibeOfficial"
                      width={40}
                      height={40}
                      className="object-contain rounded-full shadow-lg border-2 border-purple-300/50 image-ultra-hd"
                      quality={100}
                    />
                  </a>
                  <span className="text-white font-bold animate-subtle-text-glow">$VibeOfficial</span>
                </div>
                
                {/* LECHE Expansion Pack Button */}
                <Button
                  onClick={() => dispatchModals({ type: 'SET_LECHE', payload: true })}
                  variant="outline"
                  size="sm"
                  className="glass-card border-2 border-pink-400/50 text-white hover:bg-pink-500/20 hover:border-pink-400 font-semibold transition-all hover-scale"
                >
                  🥛 Get LECHE Expansion (365 Cards)
                </Button>
              </div>

              {/* Unified Network Warning - Smart detection */}
              {address && (
                <UnifiedNetworkWarning 
                  address={address as Address} 
                  tokenBalance={tokenBalance}
                />
              )}
              
              {/* Token Balance Display */}
              {address && tokenBalance && (
                <motion.div 
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="mb-8 glass-card glass-card-hover glass-card-glow p-6 rounded-2xl shadow-xl max-w-md mx-auto"
                >
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <Wallet className="w-6 h-6 text-purple-300" />
                    <span className="text-white font-bold text-lg">Your $VibeOfficial Balance</span>
                    <RefreshBalanceButton 
                      onRefresh={handleRefreshBalance}
                      isRefreshing={refreshingBalance}
                    />
                  </div>
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <p className="text-center text-3xl font-bold gradient-text">
                      {Math.floor(tokenBalance.formattedBalance).toLocaleString()} $VibeOfficial
                    </p>
                    {username && getUserAchievements(username).some((ach) => ach.achievementId === 'vibe_whale') && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                        className="text-4xl"
                        title="VibeOfficial Whale 🐋 - You hold 1M+ $VibeOfficial!"
                      >
                        🐋
                      </motion.div>
                    )}
                  </div>
                  {tokenBalance.hasBalance ? (
                    <div className="flex items-center justify-center gap-2 glass-card px-4 py-2 rounded-full mx-auto w-fit">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-green-300 text-sm font-semibold">Eligible to pull cards</span>
                    </div>
                  ) : !hasUsedFreePull(address) ? (
                    <div className="flex items-center justify-center gap-2 glass-card px-4 py-2 rounded-full mx-auto w-fit">
                      <span className="text-xl">🎁</span>
                      <span className="text-green-300 text-sm font-semibold">Daily pulls free for everyone!</span>
                    </div>
                  ) : (
                    <div className="text-center mt-3 space-y-3">
                      <p className="text-yellow-300 text-sm font-semibold">
                        Need {MIN_VIBE_FOR_CARD_PULL.toLocaleString()} $VibeOfficial to pull cards
                      </p>
                      <Button
                        onClick={() => window.open(VIBE_BUY_LINK, '_blank')}
                        size="sm"
                        variant="success"
                        className="w-full"
                      >
                        💰 Get More $VibeOfficial
                      </Button>
                    </div>
                  )}
                </motion.div>
              )}

              {address && tokenBalance && !tokenBalance.hasBalance && !checkingToken && hasUsedFreePull(address) && (
                <div className="mb-6 p-4 bg-yellow-900/30 border-2 border-yellow-400/50 rounded-lg text-center backdrop-blur-sm max-w-md shadow-lg">
                  <AlertCircle className="w-6 h-6 text-yellow-300 mx-auto mb-3" />
                  <p className="text-yellow-100 font-semibold mb-2">
                    Need More $VibeOfficial Tokens
                  </p>
                  <p className="text-yellow-200/80 text-sm mb-2">
                    You need at least {MIN_VIBE_FOR_CARD_PULL.toLocaleString()} $VibeOfficial tokens to pull cards.
                  </p>
                  <p className="text-yellow-200 text-xs mb-4">
                    Current Balance: <span className="font-bold">{Math.floor(tokenBalance.formattedBalance).toLocaleString()} $VibeOfficial</span>
                  </p>
                  
                  {/* Wrong Wallet Warning */}
                  <div className="mb-4 p-3 bg-orange-900/30 border border-orange-400/30 rounded-lg">
                    <p className="text-orange-200 text-xs font-semibold mb-2">🔄 Connected to the wrong wallet?</p>
                    <p className="text-orange-200/80 text-xs mb-3 leading-relaxed">
                      If your $VibeOfficial tokens are in a different Smart Wallet, disconnect and reconnect to switch wallets.
                    </p>
                    <Button
                      onClick={handleDisconnect}
                      size="sm"
                      variant="outline"
                      className="w-full border-orange-400/50 text-orange-200 hover:bg-orange-500/20 font-semibold"
                    >
                      🔌 Switch Wallet
                    </Button>
                  </div>
                  
                  <Button
                    onClick={() => window.open(VIBE_BUY_LINK, '_blank')}
                    size="sm"
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold"
                  >
                    💰 Buy $VibeOfficial
                  </Button>
                </div>
              )}
              

              {checkingToken && (
                <div className="mb-6 p-6 bg-blue-900/30 border border-blue-400/30 rounded-lg text-center backdrop-blur-sm max-w-md shadow-lg">
                  <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-3 border-blue-400 mb-3"></div>
                  <p className="text-white font-semibold text-base mb-2">Checking your token balance...</p>
                  
                  {/* Helpful tips during loading */}
                  <div className="mb-3 space-y-2">
                    <p className="text-blue-200 text-sm">💡 <span className="font-semibold">Did you know?</span></p>
                    <p className="text-white/70 text-xs leading-relaxed">
                      We're checking the Base blockchain for your $VibeOfficial tokens. This can take up to 30 seconds depending on network conditions.
                    </p>
                  </div>
                  
                  {retryCount > 0 && (
                    <div className="mt-3 space-y-1">
                      <p className="text-blue-300 text-sm font-semibold">Auto-retry {retryCount}/2</p>
                      <p className="text-white/50 text-xs">Trying different RPC endpoints for better connectivity...</p>
                    </div>
                  )}
                  
                  <div className="mt-4 pt-3 border-t border-blue-400/20 space-y-2">
                    <p className="text-white/60 text-xs font-semibold">✅ What we're checking:</p>
                    <ul className="text-white/50 text-xs space-y-1">
                      <li>• Your $VibeOfficial balance on Base</li>
                      <li>• Eligibility for exclusive packs</li>
                      <li>• Holder perks and benefits</li>
                    </ul>
                  </div>
                </div>
              )}
              
              {balanceError && !checkingToken && (
                <div className="mb-6 p-6 bg-red-900/30 border-2 border-red-400/50 rounded-lg text-center backdrop-blur-sm max-w-md shadow-lg">
                  <AlertCircle className="w-8 h-8 text-red-300 mx-auto mb-3 animate-pulse" />
                  <p className="text-white font-bold text-lg mb-2">Balance Loading Failed</p>
                  <p className="text-red-200 text-sm mb-4 leading-relaxed">{balanceError}</p>
                  <div className="space-y-3">
                    <Button
                      onClick={() => {

                        setRetryCount(prev => prev + 1);
                      }}
                      size="default"
                      className="w-full bg-red-500/30 hover:bg-red-500/40 text-white border-2 border-red-400/50 font-bold"
                    >
                      🔄 Retry Balance Check
                    </Button>
                    <div className="pt-3 border-t border-red-400/20 space-y-2">
                      <p className="text-white/70 text-xs font-semibold">Troubleshooting Tips:</p>
                      <ul className="text-white/50 text-xs space-y-1 text-left">
                        <li>• Check your internet connection</li>
                        <li>• Make sure you're on Base network</li>
                        <li>• Try refreshing the page</li>
                        <li>• Check browser console for details</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Multi-Pack Pull System */}
              {hasClaimedAnyPack && claimedPacks.length > 0 ? (
                <div ref={cardRef} className="mb-8">
                  <MultiPackPullDisplay
                    claimedPacks={claimedPacks}
                    pulledCards={pulledCards}
                    canPullFromPack={canPullFromPack}
                    onPullCard={handlePullFromPack}
                    checkingToken={checkingToken}
                    username={username}
                    streakDay={userStreak}
                    onShare={(card) => {
                      setCurrentCard(card);
                      dispatchModals({ type: 'SET_SHARE', payload: true });
                    }}
                    onJournalSave={(wordCount) => {
                      // Award XP for journaling
                      const xpResult = awardXP(username, XP_REWARDS.JOURNAL_ENTRY, `Journaled ${wordCount} words`);
                      
                      // Extra XP for detailed entries (100+ words)
                      if (wordCount >= 100) {
                        awardXP(username, XP_REWARDS.DETAILED_JOURNAL, 'Detailed journal entry');
                      }
                      
                      // Check if user leveled up
                      if (xpResult.leveledUp) {
                        setLevelUpLevel(xpResult.newLevel);
                        confetti({
                          particleCount: 150,
                          spread: 80,
                          origin: { y: 0.5 },
                          colors: ['#FFD700', '#FFA500', '#FF69B4', '#9370DB'],
                        });
                      }
                    }}
                  />
                </div>
              ) : currentCard ? (
                <div ref={cardRef} className="space-y-4">
                  <CardDisplay 
                    card={currentCard} 
                    onShare={() => dispatchModals({ type: 'SET_SHARE', payload: true })}
                    username={username}
                    streakDay={userStreak}
                    onJournalSave={(wordCount) => {
                      // Award XP for journaling
                      const xpResult = awardXP(username, XP_REWARDS.JOURNAL_ENTRY, `Journaled ${wordCount} words`);
                      
                      // Extra XP for detailed entries (100+ words)
                      if (wordCount >= 100) {
                        awardXP(username, XP_REWARDS.DETAILED_JOURNAL, 'Detailed journal entry');
                      }
                      
                      // Check if user leveled up
                      if (xpResult.leveledUp) {
                        setLevelUpLevel(xpResult.newLevel);
                        confetti({
                          particleCount: 150,
                          spread: 80,
                          origin: { y: 0.5 },
                          colors: ['#FFD700', '#FFA500', '#FF69B4', '#9370DB'],
                        });
                      }
                      
                      // Check for journal achievements
                      const pulls = getUserPulls(username);
                      const favorites = getFavorites(username);
                      const shares = getShareCount(username);
                      const referrals = getReferralCount(username, true);
                      const morningStreak = getMorningPullStreak(username);
                      const eveningStreak = getEveningPullStreak(username);
                      const weekendStreak = getWeekendPullStreak(username);
                      const streakBroken = hasStreakBroken(username);
                      const levelInfo = getLevelInfo(username);
                      
                      const currentTokenBalance = tokenBalance ? tokenBalance.formattedBalance : 0;
                      
                      const unlockedAchievements = checkAndUnlockAchievements(
                        username,
                        userStreak,
                        pulls.length,
                        favorites.length,
                        shares,
                        referrals,
                        morningStreak,
                        eveningStreak,
                        weekendStreak,
                        levelInfo.level,
                        streakBroken,
                        0, // journalEntries
                        0, // journalStreak
                        0, // totalJournalWords
                        0, // longestJournalEntry
                        0, // completedChallenges
                        false, // hasRareCard
                        false, // hasEpicCard
                        false, // hasLegendaryCard
                        false, // hasMythicCard
                        currentTokenBalance // tokenBalance
                      );
                      
                      if (unlockedAchievements.length > 0) {
                        confetti({
                          particleCount: 100,
                          spread: 70,
                          origin: { y: 0.6 },
                        });
                        setNewAchievement(unlockedAchievements[0]);
                      }
                    }}
                  />
                </div>
              ) : (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-full max-w-md"
                >
                  <div className="relative w-full aspect-[2/3] rounded-2xl shadow-2xl overflow-hidden">
                    {/* Card Back Image */}
                    <Image
                      src="https://usdozf7pplhxfvrl.public.blob.vercel-storage.com/26181beb-d34c-4402-b78d-678a67d83bfb-YLQa6lpN5X6aRBgIQSRl9nVNSjS5OS"
                      alt="PRACTICE Card Back"
                      fill
                      className="object-cover"
                      priority
                    />
                    
                    {/* VibeOfficial Logo - Centered at Bottom */}
                    <div className="absolute bottom-8 left-0 right-0 flex justify-center">
                      <Image
                        src="https://usdozf7pplhxfvrl.public.blob.vercel-storage.com/7c5f1896-f11b-4229-b9b9-2e9aea5bb543-USUKADwyIN8ZDriizlUoypra0FvUWW"
                        alt="VibeOfficial"
                        width={80}
                        height={80}
                        className="object-contain rounded-full shadow-2xl border-4 border-white/30"
                        quality={100}
                      />
                    </div>
                    
                    {/* Overlay Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-black/20">
                      <Sparkles className="w-16 h-16 text-white mb-4 drop-shadow-lg" />
                      <h2 className="text-3xl font-bold text-white mb-4 drop-shadow-lg">
                        Ready for Today's PRACTICE?
                      </h2>
                      <p className="text-white/90 mb-8 drop-shadow-lg font-semibold">
                        Pull your daily card to receive your affirmation, mission, and inspiration
                      </p>
                      <Button
                        onClick={handlePullCard}
                        disabled={!canPull}
                        variant="gradient"
                        size="lg"
                        className="shadow-2xl animate-smooth-pulse disabled:opacity-50 disabled:cursor-not-allowed disabled:animate-none"
                      >
                        {!canPull 
                          ? '✨ Come Back Tomorrow ✨'
                          : '🎴 Pull Your Daily Card 🎴'}
                      </Button>
                      {!canPull && (
                        <p className="text-white/90 text-sm mt-4 drop-shadow-lg font-semibold">
                          You've already pulled today's card. Keep your streak going!
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Info Section - Collapsible */}
              <Collapsible 
                open={aboutPracticeExpanded} 
                onOpenChange={setAboutPracticeExpanded}
                className="mt-12 text-center max-w-3xl mx-auto"
              >
                <CollapsibleTrigger className="flex items-center justify-center gap-2 text-white/80 hover:text-white transition-colors group w-full">
                  <h3 className="text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    About PRACTICE
                  </h3>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${aboutPracticeExpanded ? 'rotate-180' : ''}`} />
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-6 space-y-6">
                  {/* Main Description */}
                  <div className="glass-card p-6 rounded-2xl border border-white/20 backdrop-blur-lg">
                    <p className="text-white/80 text-sm leading-relaxed mb-4">
                      PRACTICE is a daily card game designed by <span className="font-bold text-white">Eddie Pabon</span>, Author, Breathwork Coach, 
                      and Creator of the <span className="font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">$VibeOfficial Token</span> on Base. 
                      Each card provides an affirmation, mission, and inspiration to help you cultivate excellence through patience, 
                      altruism, and consistent practice.
                    </p>
                    
                    {/* Social Links */}
                    <div className="flex items-center justify-center gap-3 pt-4 border-t border-white/10">
                      <a
                        href="https://www.linkedin.com/in/eddiepabon?trk=people-guest_people_search-card"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 border border-blue-400/30 text-blue-300 hover:text-blue-200 transition-all hover-scale text-xs font-semibold"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                        LinkedIn
                      </a>
                      <a
                        href="https://x.com/havehonorfaith"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/40 hover:bg-slate-800/60 border border-slate-600/30 text-slate-300 hover:text-white transition-all hover-scale text-xs font-semibold"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                        X (Twitter)
                      </a>
                      <a
                        href="https://zora.co/vibeofficial"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 border border-purple-400/30 text-purple-300 hover:text-purple-200 transition-all hover-scale text-xs font-semibold"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                        </svg>
                        Zora
                      </a>
                    </div>
                  </div>

                  {/* LECHE Principles */}
                  <div className="glass-card p-6 rounded-2xl border border-pink-400/30 backdrop-blur-lg bg-gradient-to-br from-purple-900/40 to-pink-900/40">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <span className="text-2xl">🥛</span>
                      <h4 className="text-white font-bold text-lg">Practice to Get LECHE</h4>
                    </div>
                    <p className="text-purple-200 text-sm mb-4 leading-relaxed">
                      <span className="font-bold text-purple-300">PRACTICE</span> (the daily work) leads to <span className="font-bold text-pink-300">LECHE</span> — 
                      the five core principles of transformation:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                        <span className="text-2xl">❤️</span>
                        <div className="text-left">
                          <p className="text-white font-bold text-sm">Love</p>
                          <p className="text-white/60 text-xs">Compassion for self & others</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                        <span className="text-2xl">🤝</span>
                        <div className="text-left">
                          <p className="text-white font-bold text-sm">Empathy</p>
                          <p className="text-white/60 text-xs">Understanding & connection</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                        <span className="text-2xl">👥</span>
                        <div className="text-left">
                          <p className="text-white font-bold text-sm">Community</p>
                          <p className="text-white/60 text-xs">Building together</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                        <span className="text-2xl">🌱</span>
                        <div className="text-left">
                          <p className="text-white font-bold text-sm">Healing</p>
                          <p className="text-white/60 text-xs">Growth & restoration</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 sm:col-span-2">
                        <span className="text-2xl">💪</span>
                        <div className="text-left">
                          <p className="text-white font-bold text-sm">Empowerment</p>
                          <p className="text-white/60 text-xs">Strength to create change</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Why Base? */}
                  <div className="glass-card p-6 rounded-2xl border border-blue-400/30 backdrop-blur-lg bg-gradient-to-br from-blue-900/40 to-indigo-900/40">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <span className="text-2xl">⚡</span>
                      <h4 className="text-white font-bold text-lg">Why Base Blockchain?</h4>
                    </div>
                    <div className="space-y-3 text-left">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-lg">💨</span>
                        </div>
                        <div>
                          <p className="text-white font-semibold text-sm">Lightning Fast</p>
                          <p className="text-white/60 text-xs">Instant transactions with minimal gas fees, making daily practice accessible to everyone</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-lg">🔒</span>
                        </div>
                        <div>
                          <p className="text-white font-semibold text-sm">Secure & Reliable</p>
                          <p className="text-white/60 text-xs">Built on Ethereum's proven security with Coinbase's trusted infrastructure</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-lg">🌐</span>
                        </div>
                        <div>
                          <p className="text-white font-semibold text-sm">Open Ecosystem</p>
                          <p className="text-white/60 text-xs">Part of the vibrant Base ecosystem, connecting you to a global community of builders</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-lg">🚀</span>
                        </div>
                        <div>
                          <p className="text-white font-semibold text-sm">Built for Everyone</p>
                          <p className="text-white/60 text-xs">Simple wallet setup and seamless onboarding — no crypto expertise required</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>
        )}

        {/* Collection Tab Content */}
        {activeTab === 'collection' && (
          <CardCollectionGallery 
            username={username} 
            onCardClick={(card) => {
              setCurrentCard(card);
              setActiveTab('home');
            }}
          />
        )}

        {/* Achievements Tab Content */}
        {activeTab === 'achievements' && (
          <AchievementsGrid username={username} />
        )}

        {/* Analytics Tab Content */}
        {activeTab === 'analytics' && (
          <AnalyticsDashboard username={username} />
        )}

        {/* Community Tab Content */}
        {activeTab === 'community' && (
          <CommunityFeed currentUser={username} />
        )}

        {/* Leaderboard Tab Content */}
        {activeTab === 'leaderboard' && (
          <Leaderboard />
        )}

        {/* Raffle Tab Content */}
        {activeTab === 'raffle' && (
          <RafflePage />
        )}

        {/* Profile Tab Content */}
        {activeTab === 'profile' && (
          <ProfileSettings 
            username={username}
            onUsernameChange={(newUsername) => setUsername(newUsername)}
            address={address as Address | undefined}
            tokenBalance={tokenBalance}
            onDisconnect={handleDisconnect}
            onRefreshBalance={handleRefreshBalance}
            isRefreshing={refreshingBalance}
          />
        )}

        {/* Calendar Tab Content */}
        {activeTab === 'calendar' && (
          <PullHistoryCalendar 
            username={username}
            onCardClick={(cardId) => {
              const card = allCards.find(c => c.id === cardId);
              if (card) {
                setCurrentCard(card);
                setActiveTab('home');
              }
            }}
          />
        )}

        {/* Combo Tracker */}
        <ComboTracker userId={username} />

        {/* Footer */}
        <Footer />
      </main>

      {/* Share Modal */}
      {currentCard && (
        <ShareModal
          open={modals.showShare}
          onClose={() => dispatchModals({ type: 'SET_SHARE', payload: false })}
          card={currentCard}
          username={username}
          streak={userStreak}
        />
      )}
      
      {/* Achievement Celebration Modal */}
      <AchievementCelebrationModal
        achievement={newAchievement}
        onClose={() => setNewAchievement(null)}
      />
      
      {/* Tutorial Overlay for first-time users */}
      <TutorialOverlay />
      
      {/* Floating Journal Button */}
      <FloatingJournalButton
        card={currentCard}
        username={username}
        streakDay={userStreak}
        onJournalSave={(wordCount) => {
          const xpResult = awardXP(username, XP_REWARDS.JOURNAL_ENTRY, `Journaled ${wordCount} words`);
          if (wordCount >= 100) {
            awardXP(username, XP_REWARDS.DETAILED_JOURNAL, 'Detailed journal entry');
          }
          if (xpResult.leveledUp) {
            setLevelUpLevel(xpResult.newLevel);
            confetti({
              particleCount: 150,
              spread: 80,
              origin: { y: 0.5 },
              colors: ['#FFD700', '#FFA500', '#FF69B4', '#9370DB'],
            });
          }
        }}
      />
      
      {/* Level Up Toast */}
      <LevelUpToast
        level={levelUpLevel}
        onClose={() => setLevelUpLevel(null)}
      />
      
      {/* Purchase Options Modal */}
      <PurchaseOptionsModal
        open={modals.showPurchaseModal}
        onClose={() => dispatchModals({ type: 'SET_PURCHASE', payload: false })}
        tokenAddress={VIBE_TOKEN_ADDRESS}
      />
      
      {/* About Creator Modal */}
      <AboutCreatorModal
        isOpen={modals.showAboutModal}
        onClose={() => dispatchModals({ type: 'SET_ABOUT', payload: false })}
      />
      
      {/* LECHE Expansion Modal */}
      <LECHEExpansionModal
        open={modals.showLECHEModal}
        onClose={() => dispatchModals({ type: 'SET_LECHE', payload: false })}
      />
      
      {/* App Share Button (Floating) */}
      <AppShareButton onClick={() => dispatchModals({ type: 'SET_APP_SHARE', payload: true })} />
      
      {/* App Share Modal */}
      <AppShareModal
        open={modals.showAppShareModal}
        onClose={() => dispatchModals({ type: 'SET_APP_SHARE', payload: false })}
        username={username}
      />

      {/* PWA Install Prompt */}
      <PWAInstallPrompt />

      {/* Mobile Token Indicator - Always visible on mobile */}
      {address && tokenBalance && (
        <MobileTokenIndicator 
          tokenBalance={tokenBalance}
          onBuyClick={() => window.open(VIBE_BUY_LINK, '_blank')}
        />
      )}

      {/* Pack Selector Modal */}
      <PackSelectorModal
        isOpen={modals.showPackSelector}
        onClose={() => dispatchModals({ type: 'SET_PACK_SELECTOR', payload: false })}
        onPackClaimed={() => {
          // Refresh pack state
          refreshPacks();
          
          // Force re-check pull eligibility after a short delay to ensure state updates
          setTimeout(() => {
            if (username && claimedPacks.length > 0) {
              const pullStatus: Record<string, boolean> = {};
              claimedPacks.forEach(pack => {
                pullStatus[pack.id] = canPullFromPackToday(username, pack.id);
              });
              setCanPullFromPack(pullStatus);
              
              // Also refresh today's pulled cards
              const todaysPulls = getMultiPackPulledCards(username);
              setPulledCards(todaysPulls);
            }
          }, 500);
        }}
      />
    </div>
  );
}
