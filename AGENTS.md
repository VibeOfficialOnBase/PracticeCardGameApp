# AGENTS.md

## Core Purpose
The app exists to create a global positive-energy engine. Every user interaction contributes to a Global Vibe Pulse.

### The 3 Pillars
1. **Daily Vibe Check** (mood tracking -> contributes to global vibe)
2. **Daily Practice Card Pull**
3. **Daily Journaling / Reflection**

Everything else (achievements, wallets, leaderboards, games) should support or celebrate these actions.

## UX / Flow Rules
*   **NO** mood tracker before pulling a card.
*   **Home/Root Screen Elements:**
    *   Daily Vibe Check
    *   Pull Today's Practice Card
    *   Journal Reflection
    *   Global Vibe Pulse meter
*   All achievements, celebrations, and streaks revolve around the 3 pillars.
*   **UI Style:** Clean, readable, modern, simple, and emotionally positive.
*   **Wallet Connection:**
    *   Reduce friction. One clear "Connect Wallet" option (Base/Coinbase default).
    *   Allow Algorand under advanced settings.
    *   Modal must be fully readable on all screens and responsive.

## Wallet + Auth Requirements
*   **Remove** all "demo user" or "demo data" - make app public-ready.
*   **Wallet Connect:** Must work, with proper error handling.
*   **Profile:**
    *   Set display name
    *   Upload profile picture
    *   Working notifications toggle

## Game Requirements
*   **Keep Code (Archive):** VibeAGotchi, Chakra Blaster.
*   **Live Game:** Affirmations Memory (formerly Memory Match).
*   **Theme:** Calming, positive, encouraging, not childish.

## Data + LECHE Values
All practice cards and analytics must use these 5 values:
*   **L**ove
*   **E**mpathy
*   **C**ommunity
*   **H**ealing
*   **E**mpowerment

(365 cards, 73 of each value.)

## Global Vibe Engine
Every user action contributes points to the global vibe:
*   Mood check
*   Card pull
*   Journal entry
*   Sharing
*   Achievements

**Supabase Tables:**
*   `user_activity`
*   `global_vibe_pulse`
*   `vibe_points`
*   `vibe_shares`
*   `user_practice_history`

## Development Guidelines
*   Maintain strict UI/UX consistency.
*   Audit and fix broken flows automatically.
*   Identify performance risks.
*   Keep code modular and documented.
*   **PR Requirements:**
    *   What changed
    *   Why it matters
    *   Any migrations
    *   How to test
