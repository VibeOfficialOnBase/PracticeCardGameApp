use spacetimedb::{table, reducer, ReducerContext, Table, Timestamp, SpacetimeType};

#[table(name = user, public)]
#[derive(Clone)]
pub struct User {
    #[primary_key]
    wallet: String,
    username: String,
    total_xp: i64,
    level: u32,
    created_at: Timestamp,
    updated_at: Timestamp,
}

#[table(
    name = card_pull,
    public,
    index(name = card_pull_wallet_idx, btree(columns = [wallet])),
    index(name = card_pull_date_idx, btree(columns = [date_string])),
    index(name = card_pull_wallet_date_idx, btree(columns = [wallet, date_string])),
    index(name = card_pull_pack_idx, btree(columns = [pack_id])),
    index(name = card_pull_wallet_pack_idx, btree(columns = [wallet, pack_id]))
)]
#[derive(Clone)]
pub struct CardPull {
    #[primary_key]
    #[auto_inc]
    id: u64,
    wallet: String,
    card_id: u32,
    timestamp: Timestamp,
    date_string: String,
    pack_id: String,
}

#[table(
    name = achievement,
    public,
    index(name = achievement_wallet_idx, btree(columns = [wallet])),
    index(name = achievement_wallet_ach_idx, btree(columns = [wallet, achievement_id]))
)]
#[derive(Clone)]
pub struct Achievement {
    #[primary_key]
    #[auto_inc]
    id: u64,
    wallet: String,
    achievement_id: String,
    unlocked_at: Timestamp,
    seen: bool,
}

#[table(
    name = xp_transaction,
    public,
    index(name = xp_tx_wallet_idx, btree(columns = [wallet]))
)]
#[derive(Clone)]
pub struct XPTransaction {
    #[primary_key]
    #[auto_inc]
    id: u64,
    wallet: String,
    amount: i64,
    reason: String,
    timestamp: Timestamp,
}

#[table(
    name = favorite,
    public,
    index(name = favorite_wallet_card_idx, btree(columns = [wallet, card_id]))
)]
#[derive(Clone)]
pub struct Favorite {
    #[primary_key]
    #[auto_inc]
    id: u64,
    wallet: String,
    card_id: u32,
    timestamp: Timestamp,
    note: Option<String>,
}

#[table(
    name = journal_entry,
    public,
    index(name = journal_wallet_idx, btree(columns = [wallet])),
    index(name = journal_wallet_card_idx, btree(columns = [wallet, card_id]))
)]
#[derive(Clone)]
pub struct JournalEntry {
    #[primary_key]
    #[auto_inc]
    id: u64,
    wallet: String,
    card_id: u32,
    date: Timestamp,
    prompt1: String,
    prompt2: String,
    prompt3: String,
    word_count: u32,
    completed: bool,
}

#[table(name = journal_streak, public)]
#[derive(Clone)]
pub struct JournalStreak {
    #[primary_key]
    wallet: String,
    current_streak: u32,
    longest_streak: u32,
    last_entry: Timestamp,
}

#[table(
    name = referral,
    public,
    index(name = referral_referrer_idx, btree(columns = [referrer_wallet])),
    index(name = referral_referred_idx, btree(columns = [referred_wallet]))
)]
#[derive(Clone)]
pub struct Referral {
    #[primary_key]
    #[auto_inc]
    id: u64,
    referrer_wallet: String,
    referred_wallet: String,
    referred_username: String,
    timestamp: Timestamp,
    completed: bool,
}

#[table(
    name = timed_pull,
    public,
    index(name = timed_pull_wallet_idx, btree(columns = [wallet]))
)]
#[derive(Clone)]
pub struct TimedPull {
    #[primary_key]
    #[auto_inc]
    id: u64,
    wallet: String,
    card_id: u32,
    timestamp: Timestamp,
    hour: u32,         // 0-23 (UTC)
    day_of_week: u32,  // 0-6 (Sunday=0)
    is_morning: bool,
    is_evening: bool,
    is_weekend: bool,
}

#[table(name = free_pull, public)]
#[derive(Clone)]
pub struct FreePull {
    #[primary_key]
    wallet: String,
    used: bool,
    timestamp: Timestamp,
}

// ------------------------
// New: Vibe Check Pack System
// ------------------------

#[table(
    name = pack_claim,
    public,
    index(name = pack_claim_wallet_idx, btree(columns = [wallet])),
    index(name = pack_claim_wallet_pack_idx, btree(columns = [wallet, pack_id]))
)]
#[derive(Clone)]
pub struct PackClaim {
    #[primary_key]
    #[auto_inc]
    id: u64,
    wallet: String,
    pack_id: String,
    claim_timestamp: Timestamp,
}

#[table(name = active_pack, public)]
#[derive(Clone)]
pub struct ActivePack {
    #[primary_key]
    wallet: String,
    active_pack_id: String,
    last_switched: Timestamp,
}

#[table(name = pack_usage_stat, public)]
#[derive(Clone)]
pub struct PackUsageStat {
    #[primary_key]
    pack_id: String,
    usage_count: u64,
    last_used: Timestamp,
}

#[table(name = vibe_balance, public)]
#[derive(Clone)]
pub struct VibeBalance {
    #[primary_key]
    wallet: String,
    balance: i64,
    updated_at: Timestamp,
}

// ------------------------
// New: Raffle and Email Capture
// ------------------------

#[derive(SpacetimeType, Clone, Debug, PartialEq)]
pub enum ActionType {
    Signup,
    Reminder,
    Raffle,
}

#[table(
    name = raffle_entry,
    public,
    index(name = raffle_wallet_idx, btree(columns = [wallet])),
    index(name = raffle_email_idx, btree(columns = [email])),
    index(name = raffle_hash_idx, btree(columns = [entry_hash]))
)]
#[derive(Clone)]
pub struct RaffleEntry {
    #[primary_key]
    #[auto_inc]
    id: u64,
    wallet: String,
    username: String,
    email: String,
    token_balance: String,
    usd_value: f64,
    timestamp: Timestamp,
    entry_hash: String,
}

#[table(
    name = email_capture,
    public,
    index(name = email_capture_email_idx, btree(columns = [email])),
    index(name = email_capture_action_idx, btree(columns = [action])),
    index(name = email_capture_email_action_idx, btree(columns = [email, action]))
)]
#[derive(Clone)]
pub struct EmailCapture {
    #[primary_key]
    #[auto_inc]
    id: u64,
    email: String,
    username: String,
    action: ActionType,
    wallet: Option<String>,
    timestamp: Timestamp,
    notified: bool,
}

// ------------------------
// Helper functions
// ------------------------

fn normalize_wallet(wallet: &str) -> String {
    wallet.trim().to_lowercase()
}

fn normalize_email(email: &str) -> String {
    email.trim().to_lowercase()
}

fn is_blank(s: &str) -> bool {
    s.trim().is_empty()
}

// Compute the number of days since Unix epoch (UTC), based on microseconds.
fn day_number_from_timestamp(ts: Timestamp) -> i64 {
    let micros = ts.to_micros_since_unix_epoch();
    if micros <= 0 {
        0
    } else {
        micros / 86_400_000_000
    }
}

// Return (hour_0_23, day_of_week_0_sun6_sat, day_number)
fn hour_and_dow_and_day(ts: Timestamp) -> (u32, u32, i64) {
    let mut micros = ts.to_micros_since_unix_epoch();
    if micros < 0 {
        micros = 0;
    }
    let day = micros / 86_400_000_000;
    let micros_into_day = micros - day * 86_400_000_000;
    let hour = (micros_into_day / 3_600_000_000) as u32;
    // Sunday=0 mapping. Jan 1, 1970 was Thursday (=4), so:
    let dow = (((day + 4) % 7 + 7) % 7) as u32;
    (hour, dow, day)
}

fn is_morning(hour: u32) -> bool {
    hour < 12
}

fn is_evening(hour: u32) -> bool {
    hour >= 18
}

fn is_weekend(dow: u32) -> bool {
    dow == 0 || dow == 6
}

// XP leveling helpers
fn level_threshold(level: u32) -> f64 {
    // XP needed to go from `level` to `level + 1`
    let l = if level == 0 { 0 } else { level - 1 };
    100.0 * 1.5_f64.powf(l as f64)
}

fn compute_level_from_total_xp(total_xp: i64) -> u32 {
    let mut level: u32 = 1;
    let mut remaining = total_xp.max(0) as f64;
    loop {
        let needed = level_threshold(level);
        if remaining + 1e-9 >= needed {
            remaining -= needed;
            level = level.saturating_add(1);
        } else {
            break;
        }
        // Safety cap to prevent runaway in extreme cases
        if level > 10_000 {
            break;
        }
    }
    level
}

// Generate a simple deterministic hex hash for verification using FNV-1a over wallet|email|micros
fn generate_entry_hash(wallet: &str, email: &str, ts: Timestamp) -> String {
    let combined = format!("{}|{}|{}", wallet, email, ts.to_micros_since_unix_epoch());
    let mut h: u64 = 0xcbf29ce484222325; // FNV offset basis
    for b in combined.as_bytes() {
        h ^= *b as u64;
        h = h.wrapping_mul(0x100000001b3);
    }
    format!("{:016x}", h)
}

// Simple xorshift64* RNG for weighted selection
fn next_rand_u64(seed: &mut u64) -> u64 {
    let mut x = *seed;
    x ^= x >> 12;
    x ^= x << 25;
    x ^= x >> 27;
    *seed = x;
    x.wrapping_mul(0x2545F4914F6CDD1D)
}

// ------------------------
// Reducers
// ------------------------

#[reducer]
pub fn create_user(ctx: &ReducerContext, wallet: String, username: String) -> Result<(), String> {
    let wallet_norm = normalize_wallet(&wallet);
    let uname = username.trim().to_string();

    if is_blank(&wallet_norm) {
        return Err("Wallet address cannot be empty".into());
    }
    if is_blank(&uname) {
        return Err("Username cannot be empty".into());
    }

    if ctx.db.user().wallet().find(&wallet_norm).is_some() {
        return Err("User already exists".into());
    }

    let now = ctx.timestamp;
    let user = User {
        wallet: wallet_norm,
        username: uname,
        total_xp: 0,
        level: 1,
        created_at: now,
        updated_at: now,
    };

    match ctx.db.user().try_insert(user) {
        Ok(_) => Ok(()),
        Err(e) => Err(format!("Failed to create user: {}", e)),
    }
}

#[reducer]
pub fn update_username(ctx: &ReducerContext, wallet: String, username: String) -> Result<(), String> {
    let wallet_norm = normalize_wallet(&wallet);
    let new_username = username.trim().to_string();

    if is_blank(&wallet_norm) {
        return Err("Wallet address cannot be empty".into());
    }
    if is_blank(&new_username) {
        return Err("Username cannot be empty".into());
    }

    if let Some(mut user) = ctx.db.user().wallet().find(&wallet_norm) {
        user.username = new_username;
        user.updated_at = ctx.timestamp;
        ctx.db.user().wallet().update(user);
        Ok(())
    } else {
        Err("User not found".into())
    }
}

#[reducer]
pub fn record_pull(
    ctx: &ReducerContext,
    wallet: String,
    card_id: u32,
    date_string: String,
    pack_id: Option<String>,
) -> Result<(), String> {
    let wallet_norm = normalize_wallet(&wallet);
    if is_blank(&wallet_norm) {
        return Err("Wallet address cannot be empty".into());
    }
    if card_id == 0 || card_id > 365 {
        return Err("Card ID must be between 1 and 365".into());
    }
    if is_blank(&date_string) {
        return Err("Date string cannot be empty".into());
    }

    // Normalize pack_id with default for backwards compatibility
    let pack_id_val = pack_id
        .as_ref()
        .map(|s| s.trim().to_lowercase())
        .filter(|s| !s.is_empty())
        .unwrap_or_else(|| "practice_pack".to_string());

    // Ensure user exists
    if ctx.db.user().wallet().find(&wallet_norm).is_none() {
        return Err("User not found".into());
    }

    // Daily limit check: by provided date_string and by server day boundary
    let today_day = day_number_from_timestamp(ctx.timestamp);
    for pull in ctx.db.card_pull().iter() {
        if pull.wallet == wallet_norm {
            if pull.date_string == date_string {
                return Err("Daily pull already recorded for the provided date".into());
            }
            if day_number_from_timestamp(pull.timestamp) == today_day {
                return Err("Daily pull already recorded for today".into());
            }
        }
    }

    // Insert CardPull with pack_id
    let pull_row = CardPull {
        id: 0,
        wallet: wallet_norm.clone(),
        card_id,
        timestamp: ctx.timestamp,
        date_string: date_string.clone(),
        pack_id: pack_id_val.clone(),
    };

    if let Err(e) = ctx.db.card_pull().try_insert(pull_row) {
        return Err(format!("Failed to record pull: {}", e));
    }

    // Insert TimedPull (UTC-based)
    let (hour, dow, _) = hour_and_dow_and_day(ctx.timestamp);
    let timed = TimedPull {
        id: 0,
        wallet: wallet_norm.clone(),
        card_id,
        timestamp: ctx.timestamp,
        hour,
        day_of_week: dow,
        is_morning: is_morning(hour),
        is_evening: is_evening(hour),
        is_weekend: is_weekend(dow),
    };
    if let Err(e) = ctx.db.timed_pull().try_insert(timed) {
        return Err(format!("Failed to record timed pull: {}", e));
    }

    // Update per-pack usage stats
    if let Some(mut stat) = ctx.db.pack_usage_stat().pack_id().find(&pack_id_val) {
        stat.usage_count = stat.usage_count.saturating_add(1);
        stat.last_used = ctx.timestamp;
        ctx.db.pack_usage_stat().pack_id().update(stat);
    } else {
        let row = PackUsageStat {
            pack_id: pack_id_val,
            usage_count: 1,
            last_used: ctx.timestamp,
        };
        if let Err(e) = ctx.db.pack_usage_stat().try_insert(row) {
            return Err(format!("Failed to update pack usage stats: {}", e));
        }
    }

    // Optionally auto-complete referral if exists and not completed
    let mut updated_any = false;
    for r in ctx.db.referral().iter() {
        if r.referred_wallet == wallet_norm && !r.completed {
            let mut rr = r.clone();
            rr.completed = true;
            ctx.db.referral().id().update(rr);
            updated_any = true;
        }
    }
    if updated_any {
        // no-op; just informational
    }

    Ok(())
}

#[reducer]
pub fn unlock_achievement(ctx: &ReducerContext, wallet: String, achievement_id: String) -> Result<(), String> {
    let wallet_norm = normalize_wallet(&wallet);
    let ach_id = achievement_id.trim().to_string();

    if is_blank(&wallet_norm) {
        return Err("Wallet address cannot be empty".into());
    }
    if is_blank(&ach_id) {
        return Err("Achievement ID cannot be empty".into());
    }

    // Ensure user exists
    if ctx.db.user().wallet().find(&wallet_norm).is_none() {
        return Err("User not found".into());
    }

    // Prevent duplicates
    for ach in ctx.db.achievement().iter() {
        if ach.wallet == wallet_norm && ach.achievement_id == ach_id {
            return Err("Achievement already unlocked".into());
        }
    }

    let row = Achievement {
        id: 0,
        wallet: wallet_norm,
        achievement_id: ach_id,
        unlocked_at: ctx.timestamp,
        seen: false,
    };

    match ctx.db.achievement().try_insert(row) {
        Ok(_) => Ok(()),
        Err(e) => Err(format!("Failed to unlock achievement: {}", e)),
    }
}

#[reducer]
pub fn award_xp(ctx: &ReducerContext, wallet: String, amount: i64, reason: String) -> Result<(), String> {
    let wallet_norm = normalize_wallet(&wallet);
    let reason_trim = reason.trim().to_string();

    if is_blank(&wallet_norm) {
        return Err("Wallet address cannot be empty".into());
    }
    if amount <= 0 {
        return Err("XP amount must be positive".into());
    }
    if is_blank(&reason_trim) {
        return Err("Reason cannot be empty".into());
    }

    let now = ctx.timestamp;

    if let Some(mut user) = ctx.db.user().wallet().find(&wallet_norm) {
        let new_total_xp = user.total_xp.saturating_add(amount);
        let new_level = compute_level_from_total_xp(new_total_xp);
        user.total_xp = new_total_xp;
        user.level = new_level;
        user.updated_at = now;

        // Store values needed before move
        let tx = XPTransaction {
            id: 0,
            wallet: wallet_norm.clone(),
            amount,
            reason: reason_trim,
            timestamp: now,
        };

        ctx.db.user().wallet().update(user);

        if let Err(e) = ctx.db.xp_transaction().try_insert(tx) {
            return Err(format!("Failed to create XP transaction: {}", e));
        }
        Ok(())
    } else {
        Err("User not found".into())
    }
}

#[reducer]
pub fn toggle_favorite(ctx: &ReducerContext, wallet: String, card_id: u32, note: Option<String>) -> Result<(), String> {
    let wallet_norm = normalize_wallet(&wallet);
    if is_blank(&wallet_norm) {
        return Err("Wallet address cannot be empty".into());
    }
    if card_id == 0 || card_id > 365 {
        return Err("Card ID must be between 1 and 365".into());
    }

    // Ensure user exists
    if ctx.db.user().wallet().find(&wallet_norm).is_none() {
        return Err("User not found".into());
    }

    // Check if favorite exists
    let mut existing_id: Option<u64> = None;
    for fav in ctx.db.favorite().iter() {
        if fav.wallet == wallet_norm && fav.card_id == card_id {
            existing_id = Some(fav.id);
            break;
        }
    }

    if let Some(id) = existing_id {
        ctx.db.favorite().id().delete(id);
        Ok(())
    } else {
        let fav = Favorite {
            id: 0,
            wallet: wallet_norm,
            card_id,
            timestamp: ctx.timestamp,
            note: note.map(|s| s.trim().to_string()).filter(|s| !s.is_empty()),
        };
        match ctx.db.favorite().try_insert(fav) {
            Ok(_) => Ok(()),
            Err(e) => Err(format!("Failed to add favorite: {}", e)),
        }
    }
}

#[reducer]
pub fn save_journal_entry(
    ctx: &ReducerContext,
    wallet: String,
    card_id: u32,
    date: Timestamp,
    prompt1: String,
    prompt2: String,
    prompt3: String,
    word_count: u32,
    completed: bool,
) -> Result<(), String> {
    let wallet_norm = normalize_wallet(&wallet);
    if is_blank(&wallet_norm) {
        return Err("Wallet address cannot be empty".into());
    }
    if card_id == 0 || card_id > 365 {
        return Err("Card ID must be between 1 and 365".into());
    }

    // Ensure user exists
    if ctx.db.user().wallet().find(&wallet_norm).is_none() {
        return Err("User not found".into());
    }

    let entry_day = day_number_from_timestamp(date);
    let mut existing_entry_id: Option<u64> = None;

    // Find existing entry for same wallet, card_id, and same day
    for e in ctx.db.journal_entry().iter() {
        if e.wallet == wallet_norm && e.card_id == card_id {
            if day_number_from_timestamp(e.date) == entry_day {
                existing_entry_id = Some(e.id);
                break;
            }
        }
    }

    let p1 = prompt1;
    let p2 = prompt2;
    let p3 = prompt3;

    let is_new_day_entry: bool;
    if let Some(id) = existing_entry_id {
        // Update existing
        if let Some(mut row) = ctx.db.journal_entry().id().find(id) {
            row.date = date;
            row.prompt1 = p1;
            row.prompt2 = p2;
            row.prompt3 = p3;
            row.word_count = word_count;
            row.completed = completed;
            ctx.db.journal_entry().id().update(row);
        }
        is_new_day_entry = false;
    } else {
        // Insert new
        let row = JournalEntry {
            id: 0,
            wallet: wallet_norm.clone(),
            card_id,
            date,
            prompt1: p1,
            prompt2: p2,
            prompt3: p3,
            word_count,
            completed,
        };
        if let Err(e) = ctx.db.journal_entry().try_insert(row) {
            return Err(format!("Failed to save journal entry: {}", e));
        }
        is_new_day_entry = true;
    }

    // Update journal streaks if this is a new day entry
    if is_new_day_entry {
        if let Some(mut streak) = ctx.db.journal_streak().wallet().find(&wallet_norm) {
            let last_day = day_number_from_timestamp(streak.last_entry);
            let new_day = entry_day;
            if new_day > last_day {
                let delta = new_day - last_day;
                let mut new_current = if delta == 1 {
                    streak.current_streak.saturating_add(1)
                } else {
                    1
                };
                if new_current == 0 {
                    new_current = 1;
                }
                let mut new_longest = streak.longest_streak;
                if new_current > new_longest {
                    new_longest = new_current;
                }
                streak.current_streak = new_current;
                streak.longest_streak = new_longest;
                streak.last_entry = date;
                ctx.db.journal_streak().wallet().update(streak);
            } else if new_day == last_day {
                // Same day - no change
            } else {
                // Backdated entry - do not modify streak
            }
        } else {
            // Initialize streak
            let streak = JournalStreak {
                wallet: wallet_norm,
                current_streak: 1,
                longest_streak: 1,
                last_entry: date,
            };
            if let Err(e) = ctx.db.journal_streak().try_insert(streak) {
                return Err(format!("Failed to update journal streak: {}", e));
            }
        }
    }

    Ok(())
}

#[reducer]
pub fn create_referral(
    ctx: &ReducerContext,
    referrer_wallet: String,
    referred_wallet: String,
    referred_username: String,
) -> Result<(), String> {
    let referrer = normalize_wallet(&referrer_wallet);
    let referred = normalize_wallet(&referred_wallet);
    let referred_uname = referred_username.trim().to_string();

    if is_blank(&referrer) || is_blank(&referred) {
        return Err("Wallet addresses cannot be empty".into());
    }
    if referrer == referred {
        return Err("Referrer and referred wallet cannot be the same".into());
    }
    if is_blank(&referred_uname) {
        return Err("Referred username cannot be empty".into());
    }

    // Create referral record (duplicates allowed but clients can manage uniqueness)
    let row = Referral {
        id: 0,
        referrer_wallet: referrer,
        referred_wallet: referred,
        referred_username: referred_uname,
        timestamp: ctx.timestamp,
        completed: false,
    };
    match ctx.db.referral().try_insert(row) {
        Ok(_) => Ok(()),
        Err(e) => Err(format!("Failed to create referral: {}", e)),
    }
}

#[reducer]
pub fn complete_referral(ctx: &ReducerContext, referred_wallet: String) -> Result<(), String> {
    let referred = normalize_wallet(&referred_wallet);
    if is_blank(&referred) {
        return Err("Referred wallet cannot be empty".into());
    }

    let mut found = false;
    for r in ctx.db.referral().iter() {
        if r.referred_wallet == referred && !r.completed {
            let mut rr = r.clone();
            rr.completed = true;
            ctx.db.referral().id().update(rr);
            found = true;
        }
    }

    if found {
        Ok(())
    } else {
        Err("No pending referral found for this wallet".into())
    }
}

#[reducer]
pub fn record_free_pull(ctx: &ReducerContext, wallet: String) -> Result<(), String> {
    let wallet_norm = normalize_wallet(&wallet);
    if is_blank(&wallet_norm) {
        return Err("Wallet address cannot be empty".into());
    }

    if let Some(mut fp) = ctx.db.free_pull().wallet().find(&wallet_norm) {
        if fp.used {
            return Err("Free pull already used".into());
        } else {
            fp.used = true;
            fp.timestamp = ctx.timestamp;
            ctx.db.free_pull().wallet().update(fp);
            Ok(())
        }
    } else {
        let row = FreePull {
            wallet: wallet_norm,
            used: true,
            timestamp: ctx.timestamp,
        };
        match ctx.db.free_pull().try_insert(row) {
            Ok(_) => Ok(()),
            Err(e) => Err(format!("Failed to record free pull: {}", e)),
        }
    }
}

#[reducer]
pub fn check_daily_limit(ctx: &ReducerContext, wallet: String, date_string: String) -> Result<(), String> {
    let wallet_norm = normalize_wallet(&wallet);
    if is_blank(&wallet_norm) {
        return Err("Wallet address cannot be empty".into());
    }
    if is_blank(&date_string) {
        return Err("Date string cannot be empty".into());
    }

    // Check by provided date_string
    for pull in ctx.db.card_pull().iter() {
        if pull.wallet == wallet_norm && pull.date_string == date_string {
            return Err("Daily limit reached for the provided date".into());
        }
    }

    // Check by server day boundary (UTC)
    let today_day = day_number_from_timestamp(ctx.timestamp);
    for pull in ctx.db.card_pull().iter() {
        if pull.wallet == wallet_norm {
            if day_number_from_timestamp(pull.timestamp) == today_day {
                return Err("Daily limit reached for today".into());
            }
        }
    }

    Ok(())
}

// ------------------------
// New Reducers: Raffle and Email Capture
// ------------------------

#[reducer]
pub fn enter_raffle(
    ctx: &ReducerContext,
    wallet: String,
    username: String,
    email: String,
    token_balance: String,
    usd_value: f64,
) -> Result<(), String> {
    let wallet_norm = normalize_wallet(&wallet);
    let uname = username.trim().to_string();
    let email_norm = normalize_email(&email);
    let tok_bal = token_balance.trim().to_string();

    if is_blank(&wallet_norm) {
        return Err("Wallet address cannot be empty".into());
    }
    if is_blank(&uname) {
        return Err("Username cannot be empty".into());
    }
    if is_blank(&email_norm) || !email_norm.contains('@') {
        return Err("A valid email is required".into());
    }
    if is_blank(&tok_bal) {
        return Err("Token balance cannot be empty".into());
    }
    if !usd_value.is_finite() || usd_value < 0.0 {
        return Err("USD value must be a non-negative finite number".into());
    }

    // Prevent duplicate wallet entries
    for e in ctx.db.raffle_entry().iter() {
        if normalize_wallet(&e.wallet) == wallet_norm {
            return Err("This wallet has already entered the raffle".into());
        }
    }

    // Create the raffle entry
    let entry_hash = generate_entry_hash(&wallet_norm, &email_norm, ctx.timestamp);
    let row = RaffleEntry {
        id: 0,
        wallet: wallet_norm.clone(),
        username: uname.clone(),
        email: email_norm.clone(),
        token_balance: tok_bal,
        usd_value,
        timestamp: ctx.timestamp,
        entry_hash,
    };

    if let Err(e) = ctx.db.raffle_entry().try_insert(row) {
        return Err(format!("Failed to insert raffle entry: {}", e));
    }

    // Also capture the email as a raffle action (avoid duplicates)
    let mut exists = false;
    for cap in ctx.db.email_capture().iter() {
        if normalize_email(&cap.email) == email_norm
            && cap.action == ActionType::Raffle
            && cap.wallet.as_ref().map(|w| normalize_wallet(w)) == Some(wallet_norm.clone())
        {
            exists = true;
            break;
        }
    }
    if !exists {
        let cap = EmailCapture {
            id: 0,
            email: email_norm,
            username: uname,
            action: ActionType::Raffle,
            wallet: Some(wallet_norm),
            timestamp: ctx.timestamp,
            notified: false,
        };
        if let Err(e) = ctx.db.email_capture().try_insert(cap) {
            return Err(format!("Failed to capture raffle email: {}", e));
        }
    }

    Ok(())
}

#[reducer]
pub fn capture_email(
    ctx: &ReducerContext,
    email: String,
    username: String,
    action: ActionType,
    wallet: Option<String>,
) -> Result<(), String> {
    let email_norm = normalize_email(&email);
    let uname = username.trim().to_string();
    let wallet_norm_opt = wallet.as_ref().map(|w| normalize_wallet(w));

    if is_blank(&email_norm) || !email_norm.contains('@') {
        return Err("A valid email is required".into());
    }
    if is_blank(&uname) {
        return Err("Username cannot be empty".into());
    }

    // Prevent duplicates for the same (email, action, wallet_opt)
    for cap in ctx.db.email_capture().iter() {
        if normalize_email(&cap.email) == email_norm
            && cap.action == action
            && cap.wallet.as_ref().map(|w| normalize_wallet(w)) == wallet_norm_opt
        {
            return Err("Email already captured for this action".into());
        }
    }

    let row = EmailCapture {
        id: 0,
        email: email_norm,
        username: uname,
        action,
        wallet: wallet_norm_opt,
        timestamp: ctx.timestamp,
        notified: false,
    };

    match ctx.db.email_capture().try_insert(row) {
        Ok(_) => Ok(()),
        Err(e) => Err(format!("Failed to capture email: {}", e)),
    }
}

#[reducer]
pub fn get_raffle_entries(ctx: &ReducerContext) -> Result<(), String> {
    let count = ctx.db.raffle_entry().count();
    spacetimedb::log::info!("Raffle entries available: {}", count);
    Ok(())
}

#[reducer]
pub fn get_raffle_count(ctx: &ReducerContext) -> Result<(), String> {
    let count = ctx.db.raffle_entry().count();
    spacetimedb::log::info!("Raffle entry count: {}", count);
    Ok(())
}

#[reducer]
pub fn select_weighted_winner(ctx: &ReducerContext) -> Result<(), String> {
    let mut entries: Vec<RaffleEntry> = Vec::new();
    for e in ctx.db.raffle_entry().iter() {
        entries.push(e.clone());
    }

    if entries.is_empty() {
        return Err("No raffle entries available".into());
    }

    // Sum positive weights
    let mut total_weight = 0.0f64;
    for e in &entries {
        if e.usd_value.is_finite() && e.usd_value > 0.0 {
            total_weight += e.usd_value;
        }
    }

    let mut seed = (ctx.timestamp.to_micros_since_unix_epoch() as u64).wrapping_mul(0x9E3779B97F4A7C15);
    let winner = if total_weight > 0.0 {
        // Weighted by usd_value
        let r = {
            let r_u = next_rand_u64(&mut seed);
            (r_u as f64 / u64::MAX as f64) * total_weight
        };
        let mut acc = 0.0;
        let mut chosen: Option<RaffleEntry> = None;
        for e in &entries {
            let w = if e.usd_value.is_finite() && e.usd_value > 0.0 { e.usd_value } else { 0.0 };
            acc += w;
            if r <= acc {
                chosen = Some(e.clone());
                break;
            }
        }
        chosen.unwrap_or_else(|| entries[entries.len() - 1].clone())
    } else {
        // Fallback to uniform if all weights are zero/non-finite
        let idx = (next_rand_u64(&mut seed) as usize) % entries.len();
        entries[idx].clone()
    };

    spacetimedb::log::info!(
        "Weighted raffle winner: wallet={}, username={}, email={}, usd_value={}, entry_hash={}",
        winner.wallet, winner.username, winner.email, winner.usd_value, winner.entry_hash
    );

    Ok(())
}