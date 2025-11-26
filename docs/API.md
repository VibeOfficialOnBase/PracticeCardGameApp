# PRACTICE API Documentation

Complete API reference for SpacetimeDB reducers, API routes, and utility functions.

---

## SpacetimeDB Reducers

SpacetimeDB reducers are server-side functions that modify the database. They run atomically and can be called from the client.

### User Management

#### `create_user`
Creates a new user in the database.

**Parameters:**
- `identity: String` - User's wallet address or identifier (hex format)
- `username: String` - Display username (3-20 characters)

**Returns:** `void`

**Side Effects:**
- Inserts new row in `user` table
- Initializes XP to 0
- Sets creation timestamp

**Example:**
```typescript
spacetime.createUser(
  '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb', 
  'johndoe'
);
```

**Errors:**
- User already exists with this identity
- Invalid username format

---

#### `update_username`
Updates an existing user's username.

**Parameters:**
- `identity: String` - User's identity
- `new_username: String` - New username

**Returns:** `void`

**Example:**
```typescript
spacetime.updateUsername(address, 'newusername');
```

---

### Card Pull Tracking

#### `record_pull`
Records a card pull in the database.

**Parameters:**
- `identity: String` - User's identity
- `card_id: i32` - ID of the pulled card (1-385)
- `date_string: String` - Date in YYYY-MM-DD format
- `pack_id: String` - Pack identifier ('practice_pack', 'vibe_check_exclusive', etc.)

**Returns:** `void`

**Side Effects:**
- Inserts row in `card_pull` table
- Updates user's `total_pulls` count
- Updates user's `last_pull_time`
- May trigger achievement checks server-side

**Example:**
```typescript
const dateString = new Date().toISOString().split('T')[0];
spacetime.recordPull(address, 42, dateString, 'practice_pack');
```

**Notes:**
- Duplicates are allowed (e.g., same card different days)
- Used for streak calculations and statistics

---

#### `check_daily_limit`
Checks if user has already pulled from a specific pack today.

**Parameters:**
- `identity: String` - User's identity
- `pack_id: String` - Pack to check

**Returns:** `bool` - true if can pull, false if already pulled today

**Example:**
```typescript
const canPull = await spacetime.checkDailyLimit(address, 'practice_pack');
```

---

### Achievement System

#### `unlock_achievement`
Unlocks an achievement for a user.

**Parameters:**
- `identity: String` - User's identity
- `achievement_id: String` - Achievement identifier (e.g., 'week_warrior')

**Returns:** `void`

**Side Effects:**
- Inserts row in `achievement` table
- Awards XP to user
- Updates global achievement counter

**Example:**
```typescript
spacetime.unlockAchievement(address, 'week_warrior');
```

**Notes:**
- Idempotent: Won't duplicate if already unlocked
- Achievement definitions are client-side

---

### XP System

#### `award_xp`
Awards experience points to a user.

**Parameters:**
- `identity: String` - User's identity
- `amount: i32` - XP amount to award
- `reason: String` - Description of XP source

**Returns:** `void`

**Side Effects:**
- Adds XP to user's total
- Creates `xp_transaction` record
- May trigger level-up events

**Example:**
```typescript
spacetime.awardXP(address, 50, 'Pulled daily card');
```

---

### Pack Management

#### `claim_pack`
Claims a pack for a user (for token holders).

**Parameters:**
- `identity: String` - User's identity
- `pack_id: String` - Pack identifier
- `token_balance: f64` - User's token balance (for verification)

**Returns:** `void`

**Side Effects:**
- Creates `pack_claim` record
- Validates token balance
- Updates pack usage stats

**Example:**
```typescript
spacetime.claimPack(address, 'vibe_check_exclusive', tokenBalance);
```

---

### Referral System

#### `create_referral`
Creates a referral relationship.

**Parameters:**
- `referrer_identity: String` - Referrer's identity
- `referred_identity: String` - New user's identity
- `referral_code: String` - Unique referral code

**Returns:** `void`

**Example:**
```typescript
spacetime.createReferral(referrerAddress, newUserAddress, 'ABC123');
```

---

#### `complete_referral`
Marks a referral as completed (after referred user pulls first card).

**Parameters:**
- `referred_identity: String` - Referred user's identity

**Returns:** `void`

**Side Effects:**
- Awards XP to referrer
- Marks referral as completed
- Triggers referral achievement checks

---

### Journal System

#### `save_journal_entry`
Saves a journal entry for a card pull.

**Parameters:**
- `identity: String` - User's identity
- `card_id: i32` - Card being journaled about
- `entry_text: String` - Journal content
- `word_count: i32` - Number of words

**Returns:** `void`

**Side Effects:**
- Creates `journal_entry` record
- Updates journal streak
- Awards XP based on word count

---

### Raffle System

#### `enter_raffle`
Enters user into a community raffle/giveaway.

**Parameters:**
- `identity: String` - User's identity
- `raffle_id: String` - Raffle identifier
- `entry_multiplier: i32` - Number of entries (based on streak, tokens, etc.)

**Returns:** `void`

---

#### `get_raffle_entries`
Gets all entries for a raffle (admin only).

**Parameters:**
- `raffle_id: String` - Raffle identifier

**Returns:** `List<RaffleEntry>` - All entries

---

#### `select_weighted_winner`
Selects a weighted random winner from raffle entries.

**Parameters:**
- `raffle_id: String` - Raffle identifier

**Returns:** `String` - Winner's identity

---

## API Routes

### Authentication

#### POST `/api/auth/send-code`
Sends a verification code to user's email.

**Request Body:**
```typescript
{
  email: string;
}
```

**Response:**
```typescript
{
  success: boolean;
  message: string;
}
```

---

#### POST `/api/auth/verify-code`
Verifies an email verification code.

**Request Body:**
```typescript
{
  email: string;
  code: string;
}
```

**Response:**
```typescript
{
  success: boolean;
  token?: string;
}
```

---

### Notifications

#### POST `/api/notifications/subscribe`
Subscribes user to push notifications.

**Request Body:**
```typescript
{
  subscription: PushSubscription;
  userIdentifier: string;
}
```

**Response:**
```typescript
{
  success: boolean;
}
```

---

### Email

#### POST `/api/email`
Sends an email (system use only).

**Request Body:**
```typescript
{
  to: string;
  subject: string;
  html: string;
}
```

---

#### POST `/api/email/retention`
Sends retention emails to inactive users.

**Query Params:**
- `daysInactive: number` - Days since last pull

---

### Health Check

#### GET `/api/health`
Health check endpoint for monitoring.

**Response:**
```typescript
{
  status: 'ok' | 'error';
  timestamp: string;
  spacetimeConnected: boolean;
}
```

---

### Proxy

#### POST `/api/proxy`
Proxies external API requests (client-side only).

**Request Body:**
```typescript
{
  protocol: 'https' | 'http';
  origin: string;
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers: Record<string, string>;
  body?: any;
}
```

**Example:**
```typescript
const response = await fetch('/api/proxy', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    protocol: 'https',
    origin: 'api.example.com',
    path: '/data',
    method: 'GET',
    headers: {},
  }),
});
```

---

## Client-Side Utility Functions

### Pull Tracking

#### `canPullToday(username: string): boolean`
Checks if user can pull from the base PRACTICE pack today.

**Example:**
```typescript
if (canPullToday('johndoe')) {
  // Show pull button
}
```

---

#### `recordPull(username: string, cardId: number): void`
Records a card pull in localStorage.

**Example:**
```typescript
recordPull('johndoe', 42);
```

---

#### `getUserPulls(username: string): UserPull[]`
Gets all pulls for a user from localStorage.

**Returns:**
```typescript
{
  cardId: number;
  date: string; // ISO format
  packId?: string;
}[]
```

---

### Achievement Tracking

#### `checkAndUnlockAchievements(...): Achievement[]`
Checks user stats and unlocks eligible achievements.

**Parameters:**
- `username: string`
- `streak: number`
- `totalPulls: number`
- `favorites: number`
- `shares: number`
- `referrals: number`
- `morningStreak: number`
- `eveningStreak: number`
- `weekendStreak: number`
- `level: number`
- `streakBroken: boolean`
- `journalEntries: number`
- `journalStreak: number`
- `totalJournalWords: number`
- `longestJournalEntry: number`
- `completedChallenges: number`
- `hasRareCard: boolean`
- `hasEpicCard: boolean`
- `hasLegendaryCard: boolean`
- `hasMythicCard: boolean`
- `tokenBalance: number`

**Returns:** `Achievement[]` - Newly unlocked achievements

---

### XP Tracking

#### `awardXP(username: string, amount: number, reason: string): XPResult`
Awards XP to a user and checks for level-up.

**Returns:**
```typescript
{
  leveledUp: boolean;
  newLevel?: number;
  oldXP: number;
  newXP: number;
}
```

---

#### `getLevelInfo(username: string): LevelInfo`
Gets user's current level and XP progress.

**Returns:**
```typescript
{
  level: number;
  currentXP: number;
  xpForNextLevel: number;
  totalXP: number;
  progressPercent: number;
}
```

---

### Token Gating

#### `checkVibeTokenBalance(address: Address): Promise<TokenBalance>`
Checks user's $VibeOfficial token balance on Base.

**Returns:**
```typescript
{
  formattedBalance: number;
  rawBalance: bigint;
  hasBalance: boolean; // >= 1,000 tokens
}
```

**Example:**
```typescript
const balance = await checkVibeTokenBalance(address);
if (balance.hasBalance) {
  // Show exclusive features
}
```

---

### Streak Calculations

#### `calculateStreak(username: string): number`
Calculates current streak from pull history.

**Returns:** Number of consecutive days with pulls

---

#### `getStreakRisk(username: string): 'none' | 'low' | 'medium' | 'high'`
Determines risk level of losing current streak.

**Example:**
```typescript
const risk = getStreakRisk('johndoe');
if (risk === 'high') {
  sendPushNotification('Your streak is at risk!');
}
```

---

## Error Codes

| Code | Description | User Action |
|------|-------------|-------------|
| `NETWORK_ERROR` | Network request failed | Check connection, retry |
| `AUTH_ERROR` | Authentication failed | Reconnect wallet |
| `WEB3_ERROR` | Blockchain error | Check network, retry |
| `VALIDATION_ERROR` | Invalid input | Correct input and retry |
| `DATABASE_ERROR` | SpacetimeDB error | Wait and retry |

---

## Rate Limits

- **API Routes**: 100 requests/minute per IP
- **SpacetimeDB Reducers**: 1000 requests/minute per user
- **Push Notifications**: 10 notifications/hour per user

---

## Webhooks (Coming Soon)

Future webhook support for:
- Achievement unlocks
- Level-ups
- Streak milestones
- Referral completions

---

## Support

For API questions or issues, please contact the development team or open a GitHub issue.
