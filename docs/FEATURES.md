# PRACTICE App Features

Complete documentation of all features in the PRACTICE app, including usage, benefits, and technical implementation details.

---

## Core Features

### 1. Daily Card Pulls 🎴

**Description:**
Pull a daily affirmation card with an affirmation, mission, and inspiration to guide your day.

**How it Works:**
1. User clicks "Pull Your Daily Card" button
2. System validates pull eligibility (once per day per pack)
3. Random card generated from available packs
4. Card displayed with dramatic reveal animation
5. XP awarded based on timing and streaks
6. Pull recorded in local storage + SpacetimeDB

**User Benefits:**
- Daily dose of motivation and guidance
- Gamified personal growth journey
- Build consistency through streaks
- Earn XP and unlock achievements

**Technical Details:**
- Card selection: Weighted random from 365-card deck
- Pull tracking: localStorage + SpacetimeDB sync
- Cooldown: 24-hour per pack (UTC-based)
- Animation: Framer Motion + canvas-confetti

---

### 2. Multi-Pack System 📦

**Description:**
Access multiple card collections, each with unique themes and frequencies.

**Available Packs:**

#### PRACTICE Pack (Free)
- **Cards**: 365 daily affirmations
- **Access**: Free for all users
- **Theme**: General personal growth
- **Pull Frequency**: 1 per day

#### Vibe Check Exclusive Pack (Token-Gated)
- **Cards**: 20 high-frequency affirmations
- **Access**: 1,000+ $VibeOfficial tokens
- **Theme**: Energetic alignment
- **Pull Frequency**: 1 per day
- **Bonus**: +50 XP per pull

#### LECHE Expansion Pack (Coming Soon)
- **Cards**: 365 advanced affirmations
- **Access**: One-time purchase
- **Theme**: LECHE principles (Love, Empathy, Community, Healing, Empowerment)
- **Pull Frequency**: 1 per day

**Pack Management:**
- View all available packs in Pack Selector Modal
- Claim packs (token holders get 5 claims)
- Track pull status per pack
- Beautiful card-specific animations

---

### 3. Streak System 🔥

**Description:**
Build momentum by pulling cards consecutively each day.

**How Streaks Work:**
- Pull at least one card per day
- Streak breaks if you miss a day (24-hour window)
- Timezone-aware calculations
- Visual fire animation grows with streak

**Streak Milestones:**
- **3 Days**: +50 XP - "3-Day Dedication"
- **7 Days**: +100 XP - "Week Warrior" 
- **14 Days**: +200 XP - "Fortnight Champion"
- **30 Days**: +500 XP - "Monthly Master"
- **60 Days**: +1000 XP - "Two-Month Titan"
- **100 Days**: +2000 XP - "Century Legend"
- **365 Days**: +10000 XP - "Year of Excellence"

**Streak Protection:**
- FOMO notifications when streak at risk
- Streak recovery option (1x per month)
- Morning/evening reminder notifications
- Calendar view to track history

**XP Multipliers:**
- 3+ days: 1.1x XP
- 7+ days: 1.25x XP
- 14+ days: 1.5x XP
- 30+ days: 2.0x XP
- 100+ days: 3.0x XP

---

### 4. Achievement System 🏆

**Description:**
Unlock badges and rewards for completing challenges and reaching milestones.

**Achievement Categories:**

#### Streak Achievements
- **Consistent Creator** (3-day streak)
- **Week Warrior** (7-day streak)
- **Monthly Master** (30-day streak)
- **Century Legend** (100-day streak)

#### Pull Count Achievements
- **Getting Started** (10 pulls)
- **Dedicated Practitioner** (50 pulls)
- **Century Club** (100 pulls)
- **Completion Master** (365 pulls)

#### Time-Based Achievements
- **Morning Person** (7 morning pulls)
- **Night Owl** (7 evening pulls)
- **Weekend Warrior** (7 weekend pulls)

#### Social Achievements
- **First Share** (Share 1 card)
- **Social Butterfly** (Share 10 cards)
- **Referral Champion** (Refer 5 friends)

#### Token Achievements
- **$VibeOfficial Whale** (1M+ tokens)

**Rewards:**
- XP bonuses (25-500 XP per achievement)
- Exclusive badges
- Profile display
- Global leaderboard boosts

---

### 5. XP & Level System ⚡

**Description:**
Earn experience points (XP) and level up to unlock new achievements and features.

**XP Sources:**

| Action | XP Reward |
|--------|-----------|
| Pull card (base) | 10 XP |
| Pull exclusive pack | 60 XP |
| Morning pull bonus | 5 XP |
| Evening pull bonus | 5 XP |
| Weekend pull bonus | 10 XP |
| Streak day bonus | 10 XP |
| Favorite a card | 5 XP |
| Share a card | 15 XP |
| Journal entry | 15 XP |
| Detailed journal (100+ words) | 35 XP |
| Refer a friend | 100 XP |
| Unlock achievement | 25-500 XP |

**Level Progression:**
- 1000 XP per level
- Level-based achievements at 5, 10, 20, 50
- XP multiplier increases with streak
- Visual level-up animations with confetti

**Level Benefits:**
- Unlock advanced features
- Achievement eligibility
- Leaderboard ranking boosts
- Exclusive badges

---

### 6. Token Gating (Base Network) 💎

**Description:**
Hold $VibeOfficial tokens on the Base blockchain to unlock exclusive features.

**Token Benefits:**

#### 1,000+ Tokens
- Access to Vibe Check exclusive pack
- 5 additional pack claims
- Exclusive card designs
- Holder badge on profile

#### 1,000,000+ Tokens
- Whale achievement
- Whale emoji on leaderboard
- Special recognition in community

**Token Integration:**
- **Network**: Base (Ethereum L2)
- **Standard**: ERC-20
- **Wallet**: Coinbase Smart Wallet
- **Balance Check**: Auto-refresh with retry logic
- **Buy Link**: Direct Coinbase Wallet swap integration

**User Experience:**
- Non-holders can still access PRACTICE pack (free)
- Optional wallet connection (not required)
- Clear upgrade paths with buy buttons
- Balance displayed in header

---

### 7. SpacetimeDB Real-Time Features 🌐

**Description:**
Connect to the global PRACTICE community with real-time data synchronization.

**Real-Time Features:**

#### Global Leaderboard
- Top users by XP
- Top users by streak
- Whale badge indicators
- Live updates (no refresh needed)

#### Community Stats
- Total users
- Total pulls today
- Active users in last 24h
- Community achievements

#### Activity Feed
- Recent card pulls
- Achievement unlocks
- Milestones reached
- Social proof notifications

**Technical Implementation:**
- WebSocket connection to SpacetimeDB
- Automatic reconnection on network loss
- Optimistic UI updates
- Cached data for offline access

---

### 8. Social Features 👥

#### Card Sharing
- Generate beautiful card images
- Share to Twitter, Facebook, Instagram
- Include streak badge on share
- Track shares for achievements

#### Referral System
- Unique referral links per user
- 100 XP per successful referral
- Referral dashboard with stats
- Leaderboard for top referrers

#### Community Challenges
- Daily group challenges
- Shared progress tracking
- Bonus XP for participation
- Global milestone celebrations

---

### 9. Journaling 📝

**Description:**
Reflect on your daily card with guided journaling prompts.

**Features:**
- Prompt-based journaling
- Word count tracking
- Journal history view
- XP rewards for entries
- Bonus XP for detailed entries (100+ words)

**Benefits:**
- Deeper reflection on affirmations
- Track personal growth over time
- Unlock journal-related achievements
- Export journal entries

---

### 10. Analytics Dashboard 📊

**Description:**
Visualize your PRACTICE journey with comprehensive analytics.

**Metrics:**
- Total pulls over time
- Streak history calendar
- XP growth chart
- Achievement progress
- Most pulled cards
- Favorite cards
- Best pull times
- Engagement trends

**Insights:**
- AI-powered suggestions
- Optimal pull times
- Pattern recognition
- Personalized recommendations

---

### 11. Progressive Web App (PWA) 📱

**Description:**
Install PRACTICE as a native app on any device.

**Features:**
- Offline access to pulled cards
- Home screen icon
- Standalone app experience
- Background sync
- Fast loading with service workers

**Push Notifications:**
- Daily pull reminders
- Streak protection alerts
- Achievement celebrations
- Community challenges
- Personalized timing

---

### 12. Mobile-First Design 📱

**Description:**
Optimized experience for mobile devices.

**Mobile Features:**
- Touch-optimized UI
- Pull-to-refresh
- Bottom navigation
- Compact token indicator
- Gesture controls
- Haptic feedback
- Safe area padding

---

### 13. Collection Gallery 🎨

**Description:**
View all cards you've collected over time.

**Features:**
- Grid view of all 365 cards
- Filter by collected/uncollected
- Search by keyword
- Sort by date, rarity, favorites
- Click to view full card
- Progress tracking (% collected)

---

### 14. Profile Settings ⚙️

**Description:**
Customize your PRACTICE experience.

**Settings:**
- Username management
- Notification preferences
- Theme settings
- Privacy controls
- Data export
- Account deletion

---

## Upcoming Features 🚀

### Phase 1 (Q1 2024)
- [ ] Streak recovery system
- [ ] Weekly digest emails
- [ ] Tomorrow preview feature
- [ ] Social proof notifications

### Phase 2 (Q2 2024)
- [ ] React Native mobile apps
- [ ] Advanced push notifications
- [ ] Accountability partners
- [ ] Friend system

### Phase 3 (Q3 2024)
- [ ] NFT minting
- [ ] Custom pack creator
- [ ] Marketplace
- [ ] Cross-chain support

---

## Feature Comparison

| Feature | Free Users | Token Holders (1,000+) | Whale (1M+) |
|---------|------------|------------------------|-------------|
| PRACTICE Pack | ✅ | ✅ | ✅ |
| Vibe Check Pack | ❌ | ✅ | ✅ |
| Pack Claims | 1 | 6 (1 + 5 bonus) | 6 |
| Achievements | ✅ | ✅ + Exclusive | ✅ + Whale Badge |
| Leaderboard | ✅ | ✅ | ✅ + Whale Emoji |
| Analytics | ✅ | ✅ | ✅ |
| Social Features | ✅ | ✅ | ✅ |

---

## Support

For feature requests or bug reports, please contact support or submit an issue on GitHub.
