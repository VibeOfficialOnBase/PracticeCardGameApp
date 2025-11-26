# PRACTICE App Architecture

## System Overview

**PRACTICE** is a gamified self-improvement platform built on Next.js with real-time features powered by SpacetimeDB and blockchain integration via the Base network. The app combines daily affirmations, streak tracking, achievements, and community features to create an engaging personal growth experience.

---

## Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui + Custom Components
- **State Management**: React Hooks, Context API, useReducer
- **Animations**: Framer Motion
- **Icons**: Lucide React

### Backend & Services
- **Real-time Database**: SpacetimeDB (WebSocket connections)
- **Blockchain**: Base (Ethereum L2)
- **Wallet Integration**: Coinbase OnchainKit + wagmi + viem
- **PWA**: Service Workers, Push Notifications

### Data Flow
1. **User Authentication**: Wallet (Coinbase Smart Wallet) or Email
2. **Real-time Sync**: SpacetimeDB WebSocket connection
3. **Local Storage**: Pull history, achievements, preferences
4. **Blockchain Reads**: Token balance checks (ERC-20)
5. **Global State**: Community stats, leaderboards

---

## Architecture Patterns

### Component Structure

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Main app orchestrator
│   ├── layout.tsx         # Root layout with metadata
│   ├── providers.tsx      # Context providers
│   └── api/               # API routes (proxy, auth, etc.)
│
├── components/            # React components
│   ├── ui/               # Base UI components (shadcn)
│   ├── [Feature]*.tsx    # Feature components
│   └── layout/           # Layout components
│
├── hooks/                 # Custom React hooks
│   ├── useSpacetimeDB.ts # Real-time database
│   ├── useUserPacks.ts   # Pack management
│   └── usePWA.ts         # Progressive Web App
│
├── utils/                 # Utility functions
│   ├── pullTracking.ts   # Card pull logic
│   ├── achievementsTracking.ts # Achievement system
│   ├── xpTracking.ts     # XP and level system
│   ├── streakHelpers.ts  # Streak calculations
│   ├── errorHandling.ts  # Error management
│   └── safeStorage.ts    # Type-safe localStorage
│
├── data/                  # Static data
│   ├── cards.ts          # Card definitions
│   └── achievements.ts   # Achievement definitions
│
└── spacetime_module_bindings/ # SpacetimeDB generated types
```

---

## Core Features

### 1. Card Pull System
**Flow:**
1. User clicks "Pull Card" button
2. System checks if user can pull today (`canPullToday`)
3. Generates random card from appropriate pack
4. Records pull in localStorage + SpacetimeDB
5. Awards XP based on time of day, streaks, bonuses
6. Checks for new achievements
7. Displays card with animations

**Multi-Pack System:**
- **PRACTICE Pack**: 365 free cards (default)
- **Vibe Check Pack**: 20 exclusive cards (token-gated)
- **Custom Packs**: Future expansion (LECHE, etc.)

### 2. Streak System
**Calculation:**
- Consecutive days with at least one card pull
- Breaks if 24+ hours pass without pulling
- Timezone-aware calculations

**Rewards:**
- 3 days: +50 XP
- 7 days: +100 XP
- 30 days: +500 XP
- 100 days: +2000 XP

### 3. Achievement System
**Types:**
- Streak-based (7, 30, 100 days)
- Pull-count based (10, 50, 100, 365 pulls)
- Time-based (morning, evening, weekend)
- Social (shares, referrals)
- Token-based (whale achievement)

**Unlocking:**
- `checkAndUnlockAchievements()` runs after each pull
- Awards XP for each unlock
- Saves to SpacetimeDB for global tracking

### 4. XP & Level System
**XP Sources:**
- Card pulls: 10-50 XP (varies by pack/rarity)
- Streaks: 5-50 XP per day
- Achievements: 25-500 XP
- Journaling: 15-50 XP
- Referrals: 100 XP

**Levels:**
- Level up every 1000 XP
- Unlocks achievements at levels 5, 10, 20, 50

### 5. Token Gating
**$VibeOfficial Token (Base Network):**
- **1,000+ tokens**: Access to exclusive Vibe Check pack
- **1,000,000+ tokens**: Whale achievement
- **Token holders**: 5 extra pack claims

**Balance Checking:**
- Uses viem to read ERC-20 balance
- Retry logic with exponential backoff
- Auto-refresh on network reconnection

### 6. SpacetimeDB Integration
**Tables:**
- `user`: User profiles
- `card_pull`: Pull history
- `achievement`: Unlocked achievements
- `pack_claim`: Claimed packs
- `referral`: Referral tracking

**Reducers (Server-side functions):**
- `create_user`: Create new user
- `record_pull`: Save card pull
- `unlock_achievement`: Track achievement
- `create_referral`: Referral system

**Real-time Features:**
- Global leaderboard
- Community stats (total pulls, active users)
- Live activity feed

---

## State Management

### Local State (React Hooks)
```typescript
// User state
const [username, setUsername] = useState<string | null>(null);
const [currentCard, setCurrentCard] = useState<Card | null>(null);
const [userStreak, setUserStreak] = useState(0);

// Modal state (useReducer)
const [modals, dispatchModals] = useReducer(modalReducer, initialState);

// Token state
const [tokenBalance, setTokenBalance] = useState<TokenBalance | null>(null);
```

### Global State (SpacetimeDB)
```typescript
const spacetime = useSpacetimeDB(address);
// Provides: user, pulls, achievements, connected, createUser, recordPull, etc.

const globalStats = useGlobalCommunityStats();
// Provides: totalUsers, totalPulls, activeToday
```

### Persisted State (localStorage)
```typescript
// Using safeLocalStorage utility
const username = safeLocalStorage.getItem<string>('practice_username', '');
safeLocalStorage.setItem('practice_username', username);
```

---

## Data Flow Diagrams

### Pull Card Flow
```
User Click → Check Eligibility → Generate Card ID → Record Pull
    ↓                                    ↓
  Display                           Award XP
    ↓                                    ↓
Animations                        Check Achievements
    ↓                                    ↓
Confetti                          Update Streak
    ↓                                    ↓
Scroll to Card                   Sync to SpacetimeDB
```

### Achievement Check Flow
```
Trigger Event (Pull/Share/etc.)
    ↓
Get User Stats (pulls, streak, favorites, etc.)
    ↓
checkAndUnlockAchievements()
    ↓
Compare stats against achievement requirements
    ↓
Unlock new achievements
    ↓
Award XP for each unlock
    ↓
Save to SpacetimeDB (global tracking)
    ↓
Show celebration modal + confetti
```

---

## Performance Optimizations

### Code Splitting
```typescript
// Lazy load heavy components
const Leaderboard = dynamic(() => import('@/components/Leaderboard'), { ssr: false });
const Analytics = dynamic(() => import('@/components/AnalyticsDashboard'), { ssr: false });
```

### Memoization
```typescript
// Expensive calculations
const streak = useMemo(() => calculateStreak(username), [username, pulls]);
const achievements = useMemo(() => getUserAchievements(username), [username]);
```

### Conditional Rendering
```typescript
// Only render particle effects on desktop
{!isMobile && <EnhancedParticles />}
```

---

## Security Considerations

### 1. API Keys
- Stored in environment variables
- Never exposed in client code
- Proxy endpoint for external API calls

### 2. Wallet Security
- Uses Coinbase Smart Wallet (secure by default)
- Never stores private keys
- Read-only token balance checks

### 3. Data Validation
- TypeScript strict mode
- Input sanitization
- Safe localStorage access

---

## Deployment

### Vercel (Recommended)
- Automatic deployments on push
- Environment variables configured in Vercel dashboard
- Preview deployments for PRs

### Environment Variables
```
SPACETIME_SERVER_URL=
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=
NEXT_PUBLIC_BASE_RPC_URL=
```

---

## Future Enhancements

### Planned Features
1. **React Native Mobile App**: Native iOS/Android versions
2. **Push Notifications**: Daily reminders, streak alerts
3. **Social Features**: Friend system, direct messages
4. **NFT Integration**: Mint cards as NFTs
5. **Custom Pack Creator**: Let users design packs
6. **Analytics Dashboard**: Advanced user insights

### Scalability
- Current: ~1000 DAU (daily active users)
- Target: 100,000+ DAU
- Approach: Edge caching, database sharding, CDN for assets

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for development guidelines, code style, and testing requirements.

---

## Support

- **Documentation**: [docs/](./docs/)
- **Issues**: GitHub Issues
- **Community**: Discord server (coming soon)
