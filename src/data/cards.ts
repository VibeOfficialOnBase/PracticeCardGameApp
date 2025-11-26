export type CardRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

export interface PracticeCard {
  id: number;
  affirmation: string;
  mission: string;
  inspiration: string;
  rarity: CardRarity;
  // Optional deeper content fields (to be filled later)
  reflectionPrompt?: string;
  teaching?: string;
  breathwork?: string;
  integration?: string;
}

// Rarity assignment function
function getCardRarity(cardId: number): CardRarity {
  if (cardId <= 183) return 'common';      // 50%
  if (cardId <= 292) return 'uncommon';    // 30%
  if (cardId <= 347) return 'rare';        // 15%
  if (cardId <= 362) return 'epic';        // 4%
  return 'legendary';                       // 1%
}

export const rarityConfig = {
  common: {
    label: 'Common',
    color: '#9CA3AF', // gray-400
    glow: 'rgba(156, 163, 175, 0.3)',
    probability: 0.50, // 50%
  },
  uncommon: {
    label: 'Uncommon',
    color: '#10B981', // green-500
    glow: 'rgba(16, 185, 129, 0.4)',
    probability: 0.30, // 30%
  },
  rare: {
    label: 'Rare',
    color: '#3B82F6', // blue-500
    glow: 'rgba(59, 130, 246, 0.5)',
    probability: 0.15, // 15%
  },
  epic: {
    label: 'Epic',
    color: '#A855F7', // purple-500
    glow: 'rgba(168, 85, 247, 0.6)',
    probability: 0.04, // 4%
  },
  legendary: {
    label: 'Legendary',
    color: '#F59E0B', // amber-500
    glow: 'rgba(245, 158, 11, 0.8)',
    probability: 0.01, // 1%
  },
} as const;

export const practiceCardsRaw = [
  {
    id: 1,
    affirmation: "I am patiently building excellence today",
    mission: "Complete one task mindfully without rushing",
    inspiration: "Excellence is not a destination, it's a daily practice"
  },
  {
    id: 2,
    affirmation: "My altruistic actions create positive ripples",
    mission: "Help someone without expecting anything in return",
    inspiration: "The best way to find yourself is to lose yourself in service of others"
  },
  {
    id: 3,
    affirmation: "I embrace challenges as opportunities for growth",
    mission: "Face one fear or difficulty head-on today",
    inspiration: "Growth begins at the edge of your comfort zone"
  },
  {
    id: 4,
    affirmation: "I inspire others through my authentic actions",
    mission: "Share your journey with someone who needs encouragement",
    inspiration: "Your story could be the key that unlocks someone else's prison"
  },
  {
    id: 5,
    affirmation: "My core values guide every decision I make",
    mission: "Identify and honor your top three values today",
    inspiration: "When your values are clear, decisions become easier"
  },
  {
    id: 6,
    affirmation: "I practice patience in moments of frustration",
    mission: "Take three deep breaths before reacting to challenges",
    inspiration: "Patience is not the ability to wait, but how you act while waiting"
  },
  {
    id: 7,
    affirmation: "I choose compassion over judgment",
    mission: "Practice empathy with someone you disagree with",
    inspiration: "Be kind, for everyone you meet is fighting a hard battle"
  },
  {
    id: 8,
    affirmation: "I am worthy of the excellence I seek",
    mission: "Celebrate one accomplishment, no matter how small",
    inspiration: "You are capable of more than you know"
  },
  {
    id: 9,
    affirmation: "I repeat positive habits that serve my highest good",
    mission: "Perform your morning routine with full presence",
    inspiration: "We are what we repeatedly do; excellence is not an act but a habit"
  },
  {
    id: 10,
    affirmation: "I contribute to the collective good",
    mission: "Make a positive impact in your community today",
    inspiration: "Alone we can do so little; together we can do so much"
  },
  {
    id: 11,
    affirmation: "I transform obstacles into stepping stones",
    mission: "Reframe one problem as an opportunity",
    inspiration: "The obstacle is the way"
  },
  {
    id: 12,
    affirmation: "I am a beacon of positive energy",
    mission: "Uplift three people with genuine compliments",
    inspiration: "Your vibe attracts your tribe"
  },
  {
    id: 13,
    affirmation: "My core strength grows with each challenge",
    mission: "Push beyond your comfort zone in one area today",
    inspiration: "Strength doesn't come from what you can do, it comes from overcoming what you thought you couldn't"
  },
  {
    id: 14,
    affirmation: "I practice gratitude for life's gifts",
    mission: "Write down five things you're grateful for",
    inspiration: "Gratitude turns what we have into enough"
  },
  {
    id: 15,
    affirmation: "I approach each moment with fresh eyes",
    mission: "Experience something familiar as if for the first time",
    inspiration: "The real voyage of discovery consists not in seeking new landscapes but in having new eyes"
  },
  {
    id: 16,
    affirmation: "I am aligned with my purpose",
    mission: "Take one action toward your biggest dream",
    inspiration: "The purpose of life is to discover your gift; the meaning of life is to give it away"
  },
  {
    id: 17,
    affirmation: "I choose courage over comfort",
    mission: "Do one thing that scares you today",
    inspiration: "Courage is not the absence of fear, but action in the face of it"
  },
  {
    id: 18,
    affirmation: "I honor my body as my temple",
    mission: "Move your body with intention for 20 minutes",
    inspiration: "Take care of your body; it's the only place you have to live"
  },
  {
    id: 19,
    affirmation: "I listen deeply to understand, not to respond",
    mission: "Have one conversation with complete presence",
    inspiration: "The greatest gift you can give someone is the purity of your attention"
  },
  {
    id: 20,
    affirmation: "I release what no longer serves me",
    mission: "Let go of one limiting belief or negative thought",
    inspiration: "Letting go doesn't mean giving up, but rather accepting that there are things that cannot be"
  },
  {
    id: 21,
    affirmation: "I am the architect of my reality",
    mission: "Consciously create one positive experience today",
    inspiration: "Your thoughts become things; choose the good ones"
  },
  {
    id: 22,
    affirmation: "I practice self-compassion always",
    mission: "Forgive yourself for one past mistake",
    inspiration: "You yourself, as much as anybody in the entire universe, deserve your love and affection"
  },
  {
    id: 23,
    affirmation: "I am open to receiving abundance",
    mission: "Accept help or a compliment graciously today",
    inspiration: "The universe is always speaking to us; we just need to listen"
  },
  {
    id: 24,
    affirmation: "I trust the timing of my life",
    mission: "Surrender one outcome you've been trying to control",
    inspiration: "Everything happens for a reason at the perfect time"
  },
  {
    id: 25,
    affirmation: "I am a student of life, always learning",
    mission: "Learn something new that interests you",
    inspiration: "The more I learn, the more I realize how much I don't know"
  },
  {
    id: 26,
    affirmation: "I spread joy wherever I go",
    mission: "Make someone smile or laugh today",
    inspiration: "Joy is contagious; be a carrier"
  },
  {
    id: 27,
    affirmation: "I am grounded in the present moment",
    mission: "Practice 5 minutes of mindful breathing",
    inspiration: "The present moment is all we truly have"
  },
  {
    id: 28,
    affirmation: "I celebrate others' successes as my own",
    mission: "Genuinely congratulate someone on their achievement",
    inspiration: "A rising tide lifts all boats"
  },
  {
    id: 29,
    affirmation: "I am resilient and bounce back stronger",
    mission: "Reflect on how you've overcome past challenges",
    inspiration: "What doesn't kill you makes you stronger"
  },
  {
    id: 30,
    affirmation: "I create space for creativity to flow",
    mission: "Engage in a creative activity for 15 minutes",
    inspiration: "Creativity is intelligence having fun"
  },
  {
    id: 31,
    affirmation: "I speak my truth with love and clarity",
    mission: "Express your authentic feelings to someone",
    inspiration: "Your voice matters; don't be afraid to use it"
  },
  {
    id: 32,
    affirmation: "I am enough exactly as I am",
    mission: "List five qualities you love about yourself",
    inspiration: "You are not a drop in the ocean; you are the entire ocean in a drop"
  },
  {
    id: 33,
    affirmation: "I choose peace over chaos",
    mission: "Create a calm environment in your space",
    inspiration: "Peace begins with a smile"
  },
  {
    id: 34,
    affirmation: "I am magnetic to opportunities",
    mission: "Say yes to one unexpected invitation",
    inspiration: "Opportunities don't happen; you create them"
  },
  {
    id: 35,
    affirmation: "I nourish my mind with positive thoughts",
    mission: "Replace one negative thought pattern today",
    inspiration: "Watch your thoughts; they become words"
  },
  {
    id: 36,
    affirmation: "I am connected to all living beings",
    mission: "Spend time in nature and feel the connection",
    inspiration: "We are all made of stars"
  },
  {
    id: 37,
    affirmation: "I practice radical acceptance",
    mission: "Accept one situation completely without judgment",
    inspiration: "What you resist persists; what you accept transforms"
  },
  {
    id: 38,
    affirmation: "I am the change I wish to see",
    mission: "Model one behavior you want to see more of",
    inspiration: "Be the change you wish to see in the world"
  },
  {
    id: 39,
    affirmation: "I cultivate inner wisdom daily",
    mission: "Sit in silence and listen to your intuition",
    inspiration: "The quieter you become, the more you can hear"
  },
  {
    id: 40,
    affirmation: "I am abundant in all areas of life",
    mission: "Notice abundance around you in unexpected places",
    inspiration: "Abundance is not something we acquire; it's something we tune into"
  },
  {
    id: 41,
    affirmation: "I honor my commitments to myself and others",
    mission: "Follow through on one promise you made",
    inspiration: "Integrity is doing the right thing even when no one is watching"
  },
  {
    id: 42,
    affirmation: "I am a channel for divine energy",
    mission: "Practice one act of kindness anonymously",
    inspiration: "We are not human beings having a spiritual experience; we are spiritual beings having a human experience"
  },
  {
    id: 43,
    affirmation: "I release perfectionism and embrace progress",
    mission: "Complete one task at 80% instead of perfect",
    inspiration: "Done is better than perfect"
  },
  {
    id: 44,
    affirmation: "I am worthy of love and belonging",
    mission: "Reach out to someone you care about",
    inspiration: "You belong here, exactly as you are"
  },
  {
    id: 45,
    affirmation: "I trust my inner guidance system",
    mission: "Make one decision based purely on intuition",
    inspiration: "Your intuition is your superpower"
  },
  {
    id: 46,
    affirmation: "I am present and fully alive",
    mission: "Engage all five senses in one activity",
    inspiration: "Life is available only in the present moment"
  },
  {
    id: 47,
    affirmation: "I create healthy boundaries with love",
    mission: "Say no to something that doesn't serve you",
    inspiration: "Boundaries are a sign of self-respect"
  },
  {
    id: 48,
    affirmation: "I am infinite potential in motion",
    mission: "Visualize your ideal future for 10 minutes",
    inspiration: "Your only limit is you"
  },
  {
    id: 49,
    affirmation: "I practice non-attachment to outcomes",
    mission: "Do your best and release expectations",
    inspiration: "Surrender the outcome and you'll find peace in the process"
  },
  {
    id: 50,
    affirmation: "I am worthy of rest and rejuvenation",
    mission: "Take a 20-minute break for pure relaxation",
    inspiration: "Rest is not a luxury; it's a necessity"
  },
  {
    id: 51,
    affirmation: "I see challenges as adventures in disguise",
    mission: "Approach one difficult task with curiosity",
    inspiration: "Life is either a daring adventure or nothing at all"
  },
  {
    id: 52,
    affirmation: "I am a force for good in the world",
    mission: "Contribute to a cause you believe in",
    inspiration: "Never doubt that a small group of thoughtful committed citizens can change the world"
  },
  {
    id: 53,
    affirmation: "I honor my emotions as messengers",
    mission: "Feel one emotion fully without judgment",
    inspiration: "Emotions are energy in motion; let them flow"
  },
  {
    id: 54,
    affirmation: "I am co-creating my reality with the universe",
    mission: "Set a clear intention for something you desire",
    inspiration: "Ask, believe, receive"
  },
  {
    id: 55,
    affirmation: "I practice loving-kindness toward all",
    mission: "Send loving thoughts to someone difficult",
    inspiration: "Love is the bridge between you and everything"
  },
  {
    id: 56,
    affirmation: "I am adaptable and flow with change",
    mission: "Embrace one unexpected change gracefully",
    inspiration: "The only constant in life is change"
  },
  {
    id: 57,
    affirmation: "I celebrate my unique journey",
    mission: "Acknowledge how far you've come",
    inspiration: "Don't compare your chapter 1 to someone else's chapter 20"
  },
  {
    id: 58,
    affirmation: "I am a lighthouse in the storm",
    mission: "Be a source of calm for someone in chaos",
    inspiration: "In a world where you can be anything, be kind"
  },
  {
    id: 59,
    affirmation: "I trust in divine timing",
    mission: "Practice patience with one unfolding situation",
    inspiration: "Good things come to those who wait, but better things come to those who work"
  },
  {
    id: 60,
    affirmation: "I am the author of my own story",
    mission: "Write one page of your ideal life story",
    inspiration: "Your life is your story; write well, edit often"
  },
  {
    id: 61,
    affirmation: "I cultivate inner peace daily",
    mission: "Create a peaceful morning ritual",
    inspiration: "Peace comes from within; do not seek it without"
  },
  {
    id: 62,
    affirmation: "I am a magnet for miracles",
    mission: "Notice and acknowledge one miracle today",
    inspiration: "Miracles happen every day; open your eyes"
  },
  {
    id: 63,
    affirmation: "I speak words that heal and uplift",
    mission: "Use only positive language for one hour",
    inspiration: "Words have power; choose them wisely"
  },
  {
    id: 64,
    affirmation: "I am perfectly imperfect",
    mission: "Embrace one flaw as a unique feature",
    inspiration: "Your imperfections make you beautiful"
  },
  {
    id: 65,
    affirmation: "I trust the process of life",
    mission: "Surrender worry about one situation",
    inspiration: "Everything is always working out for me"
  },
  {
    id: 66,
    affirmation: "I am a vessel of divine love",
    mission: "Love yourself as deeply as you love others",
    inspiration: "You can't pour from an empty cup"
  },
  {
    id: 67,
    affirmation: "I choose faith over fear",
    mission: "Replace one fear-based thought with faith",
    inspiration: "Fear is False Evidence Appearing Real"
  },
  {
    id: 68,
    affirmation: "I am expanding my consciousness",
    mission: "Learn about a perspective different from yours",
    inspiration: "The mind is like a parachute; it only works when open"
  },
  {
    id: 69,
    affirmation: "I honor the sacred in everyday moments",
    mission: "Find the extraordinary in one ordinary task",
    inspiration: "Life is not measured by the breaths we take but by the moments that take our breath away"
  },
  {
    id: 70,
    affirmation: "I am becoming my highest self",
    mission: "Take one action your future self will thank you for",
    inspiration: "The best time to plant a tree was 20 years ago; the second best time is now"
  },
  {
    id: 71,
    affirmation: "I radiate confidence and self-assurance",
    mission: "Walk with your head high and shoulders back",
    inspiration: "Confidence is not 'they will like me,' it's 'I'll be fine if they don't'"
  },
  {
    id: 72,
    affirmation: "I am grateful for my breath and life force",
    mission: "Practice breathwork for 10 minutes",
    inspiration: "Breath is the bridge between body and mind"
  },
  {
    id: 73,
    affirmation: "I create beauty in all I do",
    mission: "Make something beautiful today",
    inspiration: "Beauty is not in the face; beauty is a light in the heart"
  },
  {
    id: 74,
    affirmation: "I am divinely guided and protected",
    mission: "Trust one decision to your higher power",
    inspiration: "When you let go of what you are, you become what you might be"
  },
  {
    id: 75,
    affirmation: "I practice radical honesty with myself",
    mission: "Face one truth you've been avoiding",
    inspiration: "The truth will set you free, but first it will piss you off"
  },
  {
    id: 76,
    affirmation: "I am a conscious creator",
    mission: "Create something from nothing today",
    inspiration: "Every creation begins with imagination"
  },
  {
    id: 77,
    affirmation: "I honor my body's wisdom",
    mission: "Listen to what your body needs today",
    inspiration: "Your body is your most priceless possession; take care of it"
  },
  {
    id: 78,
    affirmation: "I am whole and complete",
    mission: "Meditate on your wholeness for 10 minutes",
    inspiration: "You are not broken; you're breaking through"
  },
  {
    id: 79,
    affirmation: "I choose love in every situation",
    mission: "Respond with love to one challenging person",
    inspiration: "Love is the answer, no matter the question"
  },
  {
    id: 80,
    affirmation: "I am aligned with my soul's purpose",
    mission: "Do one thing that makes your soul sing",
    inspiration: "Your purpose is to be you"
  },
  {
    id: 81,
    affirmation: "I practice forgiveness as a gift to myself",
    mission: "Forgive someone who hurt you",
    inspiration: "Forgiveness is not about them; it's about your peace"
  },
  {
    id: 82,
    affirmation: "I am open to receiving miracles",
    mission: "Expect something wonderful to happen today",
    inspiration: "Expect miracles and they will appear"
  },
  {
    id: 83,
    affirmation: "I celebrate small victories",
    mission: "Acknowledge three small wins from today",
    inspiration: "Success is the sum of small efforts repeated day in and day out"
  },
  {
    id: 84,
    affirmation: "I am a beacon of hope",
    mission: "Give hope to someone who's lost it",
    inspiration: "Hope is being able to see that there is light despite all the darkness"
  },
  {
    id: 85,
    affirmation: "I trust in my unlimited potential",
    mission: "Do something you thought was impossible",
    inspiration: "The only impossible journey is the one you never begin"
  },
  {
    id: 86,
    affirmation: "I am present with those I love",
    mission: "Give someone your undivided attention",
    inspiration: "Presence is the greatest present"
  },
  {
    id: 87,
    affirmation: "I practice self-care as self-love",
    mission: "Do one thing purely for your well-being",
    inspiration: "Self-care is not selfish; it's essential"
  },
  {
    id: 88,
    affirmation: "I am a warrior of light",
    mission: "Stand up for something you believe in",
    inspiration: "The world needs your light; don't dim it"
  },
  {
    id: 89,
    affirmation: "I create my reality through my thoughts",
    mission: "Monitor your thoughts for one hour",
    inspiration: "You are today where your thoughts have brought you"
  },
  {
    id: 90,
    affirmation: "I am deserving of all good things",
    mission: "Accept something good without guilt",
    inspiration: "You are worthy of everything you desire"
  },
  {
    id: 91,
    affirmation: "I practice presence over perfection",
    mission: "Be fully present in one activity",
    inspiration: "Wherever you are, be all there"
  },
  {
    id: 92,
    affirmation: "I am a student of the universe",
    mission: "Find a lesson in one challenge",
    inspiration: "Every experience is a teacher if you're willing to learn"
  },
  {
    id: 93,
    affirmation: "I radiate positive energy",
    mission: "Be the most positive person in the room",
    inspiration: "Your energy introduces you before you speak"
  },
  {
    id: 94,
    affirmation: "I am grateful for this moment",
    mission: "Find gratitude in your current circumstance",
    inspiration: "This too shall pass, so be grateful for this moment"
  },
  {
    id: 95,
    affirmation: "I trust my journey is unfolding perfectly",
    mission: "Accept where you are right now",
    inspiration: "You are exactly where you need to be"
  },
  {
    id: 96,
    affirmation: "I am a channel for creativity",
    mission: "Create without judgment for 20 minutes",
    inspiration: "Creativity is allowing yourself to make mistakes; art is knowing which ones to keep"
  },
  {
    id: 97,
    affirmation: "I speak my truth with courage",
    mission: "Share your authentic opinion on something",
    inspiration: "Your voice is your power; use it"
  },
  {
    id: 98,
    affirmation: "I am worthy of my dreams",
    mission: "Take one step toward a big dream",
    inspiration: "Dream big, start small, act now"
  },
  {
    id: 99,
    affirmation: "I practice non-judgment of myself and others",
    mission: "Notice judgments and release them",
    inspiration: "Be curious, not judgmental"
  },
  {
    id: 100,
    affirmation: "I am the master of my mindset",
    mission: "Choose your attitude deliberately today",
    inspiration: "Happiness is an inside job"
  },
  {
    id: 101,
    affirmation: "I honor my need for balance",
    mission: "Create balance in one area of life",
    inspiration: "Balance is not something you find; it's something you create"
  },
  {
    id: 102,
    affirmation: "I am a living example of possibility",
    mission: "Show someone what's possible through action",
    inspiration: "Be the inspiration you wish you had"
  },
  {
    id: 103,
    affirmation: "I trust in the abundance of the universe",
    mission: "Give generously without worrying about lack",
    inspiration: "The more you give, the more you receive"
  },
  {
    id: 104,
    affirmation: "I am resilient beyond measure",
    mission: "Reflect on your resilience in past challenges",
    inspiration: "You've survived 100% of your worst days"
  },
  {
    id: 105,
    affirmation: "I practice patience with the process",
    mission: "Let something unfold naturally without forcing",
    inspiration: "Patience is not about waiting; it's about keeping a good attitude while working"
  },
  {
    id: 106,
    affirmation: "I am connected to infinite wisdom",
    mission: "Seek guidance from your inner wisdom",
    inspiration: "The answers you seek are already within you"
  },
  {
    id: 107,
    affirmation: "I choose joy regardless of circumstances",
    mission: "Find joy in one unexpected place today",
    inspiration: "Joy is not in things; it is in us"
  },
  {
    id: 108,
    affirmation: "I am powerful beyond measure",
    mission: "Use your power for good today",
    inspiration: "Our deepest fear is not that we are inadequate; our deepest fear is that we are powerful beyond measure"
  },
  {
    id: 109,
    affirmation: "I practice compassion for all beings",
    mission: "Extend compassion to someone suffering",
    inspiration: "Compassion is the ultimate expression of your highest self"
  },
  {
    id: 110,
    affirmation: "I am open to new possibilities",
    mission: "Say yes to something outside your routine",
    inspiration: "Life begins at the end of your comfort zone"
  },
  {
    id: 111,
    affirmation: "I trust my inner voice above all others",
    mission: "Follow your intuition on one decision",
    inspiration: "Your intuition knows what to do; the challenge is getting your head to shut up"
  },
  {
    id: 112,
    affirmation: "I am grateful for my unique gifts",
    mission: "Use one of your talents to serve others",
    inspiration: "Everyone has a gift; the question is whether you're willing to open it"
  },
  {
    id: 113,
    affirmation: "I practice self-love unconditionally",
    mission: "Do something loving for yourself",
    inspiration: "Love yourself first and everything else falls into line"
  },
  {
    id: 114,
    affirmation: "I am worthy of infinite blessings",
    mission: "Count your blessings instead of your problems",
    inspiration: "Blessed is the person who sees blessings in every moment"
  },
  {
    id: 115,
    affirmation: "I choose growth over comfort",
    mission: "Stretch yourself in one area today",
    inspiration: "If it doesn't challenge you, it doesn't change you"
  },
  {
    id: 116,
    affirmation: "I am a magnet for abundance",
    mission: "Notice abundance in unexpected forms",
    inspiration: "What you focus on expands"
  },
  {
    id: 117,
    affirmation: "I practice radical self-acceptance",
    mission: "Accept yourself completely in this moment",
    inspiration: "You are allowed to be both a masterpiece and a work in progress"
  },
  {
    id: 118,
    affirmation: "I am the creator of my experience",
    mission: "Take full responsibility for one outcome",
    inspiration: "You are responsible for your life; no one else is"
  },
  {
    id: 119,
    affirmation: "I trust the wisdom of my heart",
    mission: "Make one decision from the heart, not the head",
    inspiration: "The heart knows what the mind cannot comprehend"
  },
  {
    id: 120,
    affirmation: "I am divinely supported always",
    mission: "Notice signs of support from the universe",
    inspiration: "You are never alone; the universe is always conspiring in your favor"
  },
  {
    id: 121,
    affirmation: "I practice presence in every breath",
    mission: "Focus on your breath for one full minute",
    inspiration: "Life is available only in the present moment"
  },
  {
    id: 122,
    affirmation: "I am evolving into my best self",
    mission: "Reflect on how you've grown this month",
    inspiration: "You are not who you were a year ago, and that's beautiful"
  },
  {
    id: 123,
    affirmation: "I choose faith over doubt",
    mission: "Replace one doubt with faith today",
    inspiration: "Faith is taking the first step even when you can't see the whole staircase"
  },
  {
    id: 124,
    affirmation: "I am worthy of extraordinary love",
    mission: "Show yourself extraordinary love today",
    inspiration: "The most important relationship is the one you have with yourself"
  },
  {
    id: 125,
    affirmation: "I practice non-attachment with grace",
    mission: "Release attachment to one outcome",
    inspiration: "Let go of what was, trust in what will be"
  },
  {
    id: 126,
    affirmation: "I am aligned with my highest good",
    mission: "Make one choice aligned with your values",
    inspiration: "When you're aligned, life flows"
  },
  {
    id: 127,
    affirmation: "I trust in perfect divine timing",
    mission: "Surrender the timeline of one goal",
    inspiration: "Trust the timing of your life; you're right on schedule"
  },
  {
    id: 128,
    affirmation: "I am a vessel for transformation",
    mission: "Transform one area of your life today",
    inspiration: "Change is the only constant; embrace it"
  },
  {
    id: 129,
    affirmation: "I practice gratitude for challenges",
    mission: "Find the gift in one difficulty",
    inspiration: "Every challenge is an opportunity for growth"
  },
  {
    id: 130,
    affirmation: "I am worthy of peace and tranquility",
    mission: "Create a peaceful moment for yourself",
    inspiration: "Peace is your natural state"
  },
  {
    id: 131,
    affirmation: "I choose love over fear every time",
    mission: "Notice when fear arises and choose love instead",
    inspiration: "Love and fear cannot coexist; choose love"
  },
  {
    id: 132,
    affirmation: "I am a powerful manifestor",
    mission: "Visualize one thing you want to manifest",
    inspiration: "What you think, you create; what you feel, you attract"
  },
  {
    id: 133,
    affirmation: "I practice kindness toward myself",
    mission: "Speak to yourself as you would a best friend",
    inspiration: "Be gentle with yourself; you're doing the best you can"
  },
  {
    id: 134,
    affirmation: "I am open to receiving guidance",
    mission: "Ask for guidance and listen for the answer",
    inspiration: "Ask and it is given"
  },
  {
    id: 135,
    affirmation: "I trust my path is uniquely mine",
    mission: "Stop comparing yourself to others today",
    inspiration: "Your only competition is who you were yesterday"
  },
  {
    id: 136,
    affirmation: "I am worthy of rest and renewal",
    mission: "Give yourself permission to rest guilt-free",
    inspiration: "Rest and self-care are so important; when you take time to replenish your spirit, it allows you to serve others from the overflow"
  },
  {
    id: 137,
    affirmation: "I practice acceptance of what is",
    mission: "Accept one situation without trying to change it",
    inspiration: "Acceptance is not submission; it's acknowledgment of the facts"
  },
  {
    id: 138,
    affirmation: "I am connected to all that is",
    mission: "Feel your connection to everything around you",
    inspiration: "We are all one; separation is an illusion"
  },
  {
    id: 139,
    affirmation: "I choose empowerment over victimhood",
    mission: "Take your power back in one situation",
    inspiration: "You are not a victim of circumstance; you are a victor of choice"
  },
  {
    id: 140,
    affirmation: "I am worthy of all my desires",
    mission: "Acknowledge one desire without shame",
    inspiration: "Your desires are sacred; honor them"
  },
  {
    id: 141,
    affirmation: "I practice patience with myself",
    mission: "Be patient with your progress today",
    inspiration: "Be patient with yourself; nothing in nature blooms all year"
  },
  {
    id: 142,
    affirmation: "I am a conduit for healing energy",
    mission: "Send healing energy to someone in need",
    inspiration: "Healing is a matter of time, but it is sometimes also a matter of opportunity"
  },
  {
    id: 143,
    affirmation: "I trust in the journey, not just the destination",
    mission: "Enjoy the process of one task today",
    inspiration: "The journey is the reward"
  },
  {
    id: 144,
    affirmation: "I am worthy of taking up space",
    mission: "Assert yourself in one situation today",
    inspiration: "You are enough; you are worthy; you matter"
  },
  {
    id: 145,
    affirmation: "I practice forgiveness as freedom",
    mission: "Forgive yourself or someone else",
    inspiration: "Forgiveness is the key to action and freedom"
  },
  {
    id: 146,
    affirmation: "I am aligned with universal flow",
    mission: "Go with the flow in one situation today",
    inspiration: "When you're in the flow, life is effortless"
  },
  {
    id: 147,
    affirmation: "I choose authenticity over approval",
    mission: "Be your authentic self, even if it's uncomfortable",
    inspiration: "Be yourself; everyone else is already taken"
  },
  {
    id: 148,
    affirmation: "I am worthy of deep, meaningful connections",
    mission: "Have a vulnerable conversation with someone",
    inspiration: "Connection is why we're here; it gives purpose and meaning to our lives"
  },
  {
    id: 149,
    affirmation: "I practice mindfulness in all I do",
    mission: "Do one task with complete mindfulness",
    inspiration: "Mindfulness is the aware, balanced acceptance of the present experience"
  },
  {
    id: 150,
    affirmation: "I am a beacon of possibility",
    mission: "Show someone what's possible through your example",
    inspiration: "When we show possibility, we inspire hope"
  },
  {
    id: 151,
    affirmation: "I trust my body's innate intelligence",
    mission: "Listen to and honor your body's signals",
    inspiration: "Your body is wise; trust its messages"
  },
  {
    id: 152,
    affirmation: "I am worthy of celebrating myself",
    mission: "Celebrate yourself for no reason at all",
    inspiration: "Celebrate who you are, not just what you do"
  },
  {
    id: 153,
    affirmation: "I practice surrender with trust",
    mission: "Surrender control of one outcome",
    inspiration: "Sometimes surrender is the most powerful thing you can do"
  },
  {
    id: 154,
    affirmation: "I am open to miracles and magic",
    mission: "Look for magic in everyday moments",
    inspiration: "The world is full of magic for those who believe"
  },
  {
    id: 155,
    affirmation: "I choose optimism as my default",
    mission: "Find the positive in one challenging situation",
    inspiration: "Optimism is the faith that leads to achievement"
  },
  {
    id: 156,
    affirmation: "I am worthy of grace and ease",
    mission: "Allow something to be easy today",
    inspiration: "Life doesn't have to be hard; allow it to be easy"
  },
  {
    id: 157,
    affirmation: "I practice radical honesty with love",
    mission: "Tell the truth in one situation with kindness",
    inspiration: "The truth spoken with love is the highest form of communication"
  },
  {
    id: 158,
    affirmation: "I am connected to infinite possibilities",
    mission: "Brainstorm possibilities for one situation",
    inspiration: "When you change the way you look at things, the things you look at change"
  },
  {
    id: 159,
    affirmation: "I trust in my unique timing",
    mission: "Honor your own pace today",
    inspiration: "You're not behind; you're on your own timeline"
  },
  {
    id: 160,
    affirmation: "I am worthy of unconditional love",
    mission: "Love yourself without conditions today",
    inspiration: "Love is what we are born with; fear is what we learn"
  },
  {
    id: 161,
    affirmation: "I practice seeing the divine in others",
    mission: "See the light in everyone you encounter",
    inspiration: "Namaste: the light in me honors the light in you"
  },
  {
    id: 162,
    affirmation: "I am a creator of beauty and joy",
    mission: "Create beauty or joy for someone else",
    inspiration: "Spread love everywhere you go"
  },
  {
    id: 163,
    affirmation: "I choose curiosity over judgment",
    mission: "Approach one situation with curiosity",
    inspiration: "Be curious, not judgmental"
  },
  {
    id: 164,
    affirmation: "I am worthy of receiving support",
    mission: "Ask for help when you need it",
    inspiration: "Asking for help is a sign of strength, not weakness"
  },
  {
    id: 165,
    affirmation: "I practice presence over productivity",
    mission: "Be present rather than productive for one hour",
    inspiration: "You are a human being, not a human doing"
  },
  {
    id: 166,
    affirmation: "I am aligned with abundance in all forms",
    mission: "Notice abundance in unexpected ways",
    inspiration: "Abundance is not something we acquire; it is something we tune into"
  },
  {
    id: 167,
    affirmation: "I trust in the perfection of my journey",
    mission: "Accept one imperfection as perfect",
    inspiration: "Everything is perfect in its own way"
  },
  {
    id: 168,
    affirmation: "I am worthy of living my dreams",
    mission: "Live as if your dream is already real",
    inspiration: "Dream as if you'll live forever; live as if you'll die today"
  },
  {
    id: 169,
    affirmation: "I practice loving myself fiercely",
    mission: "Defend yourself against your inner critic",
    inspiration: "You are your own best advocate"
  },
  {
    id: 170,
    affirmation: "I am open to receiving wisdom",
    mission: "Learn from an unexpected source today",
    inspiration: "Wisdom comes from the most unexpected places"
  },
  {
    id: 171,
    affirmation: "I choose peace in all circumstances",
    mission: "Choose peaceful thoughts for one hour",
    inspiration: "Peace is not absence of conflict; it is the ability to handle conflict by peaceful means"
  },
  {
    id: 172,
    affirmation: "I am worthy of thriving, not just surviving",
    mission: "Do something that helps you thrive today",
    inspiration: "Don't just exist; live"
  },
  {
    id: 173,
    affirmation: "I practice gratitude as my superpower",
    mission: "Express gratitude to three people today",
    inspiration: "Gratitude is the open door to abundance"
  },
  {
    id: 174,
    affirmation: "I am connected to my higher purpose",
    mission: "Align one action with your purpose",
    inspiration: "Purpose is the reason you journey; passion is the fire that lights the way"
  },
  {
    id: 175,
    affirmation: "I trust in my resilience",
    mission: "Recall a time you overcame adversity",
    inspiration: "You are stronger than you think"
  },
  {
    id: 176,
    affirmation: "I am worthy of expressing my truth",
    mission: "Share your truth in one conversation",
    inspiration: "Your truth is your power"
  },
  {
    id: 177,
    affirmation: "I practice self-compassion always",
    mission: "Be gentle with yourself in one situation",
    inspiration: "Self-compassion is simply giving the same kindness to ourselves that we would give to others"
  },
  {
    id: 178,
    affirmation: "I am open to transformation",
    mission: "Welcome change in one area of life",
    inspiration: "Change is not something that we should fear; rather, it is something we should welcome"
  },
  {
    id: 179,
    affirmation: "I choose love as my default response",
    mission: "Respond with love to one difficult situation",
    inspiration: "When in doubt, choose love"
  },
  {
    id: 180,
    affirmation: "I am worthy of my wildest dreams",
    mission: "Take one bold action toward a dream",
    inspiration: "Shoot for the moon; even if you miss, you'll land among the stars"
  },
  {
    id: 181,
    affirmation: "I practice acceptance of uncertainty",
    mission: "Embrace not knowing in one situation",
    inspiration: "Uncertainty is the only certainty; knowing how to live with insecurity is the only security"
  },
  {
    id: 182,
    affirmation: "I am a channel for divine inspiration",
    mission: "Create something inspired today",
    inspiration: "When we are inspired, we are in spirit"
  },
  {
    id: 183,
    affirmation: "I trust my intuition implicitly",
    mission: "Follow your gut on one decision",
    inspiration: "Your intuition is your soul's GPS"
  },
  {
    id: 184,
    affirmation: "I am worthy of extraordinary experiences",
    mission: "Create or seek one extraordinary moment",
    inspiration: "Life is meant to be lived extraordinarily"
  },
  {
    id: 185,
    affirmation: "I practice patience with divine unfolding",
    mission: "Trust the timing of one situation",
    inspiration: "Everything happens at the right time"
  },
  {
    id: 186,
    affirmation: "I am aligned with my soul's calling",
    mission: "Listen to what your soul is calling you to do",
    inspiration: "Your soul knows the way; follow its whisper"
  },
  {
    id: 187,
    affirmation: "I choose empowerment in every moment",
    mission: "Empower yourself in one decision today",
    inspiration: "You have power over your mind, not outside events"
  },
  {
    id: 188,
    affirmation: "I am worthy of receiving blessings",
    mission: "Open yourself to receive one blessing",
    inspiration: "Blessings come in many forms; be open to receiving"
  },
  {
    id: 189,
    affirmation: "I practice living in alignment",
    mission: "Align your actions with your values today",
    inspiration: "Alignment is when what you think, say, and do are in harmony"
  },
  {
    id: 190,
    affirmation: "I am open to infinite potential",
    mission: "Explore your potential in one area",
    inspiration: "You have infinite potential; you just need to believe it"
  },
  {
    id: 191,
    affirmation: "I trust in universal support",
    mission: "Notice how the universe is supporting you",
    inspiration: "The universe has your back"
  },
  {
    id: 192,
    affirmation: "I am worthy of inner peace",
    mission: "Cultivate peace within for 15 minutes",
    inspiration: "Inner peace begins the moment you choose not to allow another person or event to control your emotions"
  },
  {
    id: 193,
    affirmation: "I practice radical responsibility",
    mission: "Take responsibility for one outcome",
    inspiration: "When you take responsibility, you take your power back"
  },
  {
    id: 194,
    affirmation: "I am connected to source energy",
    mission: "Feel your connection to source today",
    inspiration: "You are an extension of source energy"
  },
  {
    id: 195,
    affirmation: "I choose joy as my birthright",
    mission: "Claim your right to joy today",
    inspiration: "Joy is not optional; it's your natural state"
  },
  {
    id: 196,
    affirmation: "I am worthy of miraculous outcomes",
    mission: "Expect a miracle today",
    inspiration: "Miracles are a natural part of life"
  },
  {
    id: 197,
    affirmation: "I practice trust in the unknown",
    mission: "Trust one unknown outcome",
    inspiration: "The unknown is where all possibilities exist"
  },
  {
    id: 198,
    affirmation: "I am a living prayer",
    mission: "Live as a prayer in action today",
    inspiration: "Your life is your prayer"
  },
  {
    id: 199,
    affirmation: "I choose faith over control",
    mission: "Release control in one situation",
    inspiration: "Faith is letting go and trusting"
  },
  {
    id: 200,
    affirmation: "I am worthy of unconditional joy",
    mission: "Find joy independent of circumstances",
    inspiration: "Joy is an inside job"
  },
  {
    id: 201,
    affirmation: "I practice seeing perfection in imperfection",
    mission: "Find beauty in one flaw today",
    inspiration: "Imperfection is beauty, madness is genius"
  },
  {
    id: 202,
    affirmation: "I am aligned with my highest expression",
    mission: "Express yourself authentically today",
    inspiration: "Your highest expression is your true self"
  },
  {
    id: 203,
    affirmation: "I trust in divine orchestration",
    mission: "Trust that everything is working out",
    inspiration: "Everything is always working out for your highest good"
  },
  {
    id: 204,
    affirmation: "I am worthy of speaking my desires",
    mission: "Speak one desire out loud today",
    inspiration: "Speaking your desires gives them power"
  },
  {
    id: 205,
    affirmation: "I practice living from my heart",
    mission: "Make one decision from your heart",
    inspiration: "The heart is wiser than the head"
  },
  {
    id: 206,
    affirmation: "I am open to divine guidance",
    mission: "Ask for guidance and listen",
    inspiration: "Divine guidance is always available"
  },
  {
    id: 207,
    affirmation: "I choose expansion over contraction",
    mission: "Expand in one area of your life today",
    inspiration: "Expansion is the path to growth"
  },
  {
    id: 208,
    affirmation: "I am worthy of living fully",
    mission: "Live fully in one moment today",
    inspiration: "Life is meant to be lived, not endured"
  },
  {
    id: 209,
    affirmation: "I practice trust in my becoming",
    mission: "Trust who you are becoming",
    inspiration: "You are always in the process of becoming"
  },
  {
    id: 210,
    affirmation: "I am connected to universal love",
    mission: "Feel universal love flowing through you",
    inspiration: "Love is the fabric of the universe"
  },
  {
    id: 211,
    affirmation: "I choose presence over distraction",
    mission: "Be fully present for one activity",
    inspiration: "Presence is the greatest gift you can give"
  },
  {
    id: 212,
    affirmation: "I am worthy of divine love",
    mission: "Accept divine love fully today",
    inspiration: "You are loved beyond measure"
  },
  {
    id: 213,
    affirmation: "I practice surrender to what is",
    mission: "Surrender to the present moment",
    inspiration: "Surrender is not giving up; it's letting go"
  },
  {
    id: 214,
    affirmation: "I am aligned with infinite wisdom",
    mission: "Access your inner wisdom today",
    inspiration: "All wisdom lies within"
  },
  {
    id: 215,
    affirmation: "I trust in the magic of beginnings",
    mission: "Begin something new today",
    inspiration: "Every moment is a fresh beginning"
  },
  {
    id: 216,
    affirmation: "I am worthy of my highest good",
    mission: "Choose what serves your highest good",
    inspiration: "Your highest good is always available"
  },
  {
    id: 217,
    affirmation: "I practice loving what is",
    mission: "Love your current reality",
    inspiration: "Love what is and watch it transform"
  },
  {
    id: 218,
    affirmation: "I am open to receiving abundance",
    mission: "Open your hands and heart to receive",
    inspiration: "You must be open to receive"
  },
  {
    id: 219,
    affirmation: "I choose alignment over resistance",
    mission: "Align with what is rather than resist",
    inspiration: "What you resist persists; what you align with flows"
  },
  {
    id: 220,
    affirmation: "I am worthy of expressing my gifts",
    mission: "Share one of your gifts with the world",
    inspiration: "Your gifts are meant to be shared"
  },
  {
    id: 221,
    affirmation: "I practice trust in divine timing",
    mission: "Trust the timing of one situation",
    inspiration: "Divine timing is always perfect"
  },
  {
    id: 222,
    affirmation: "I am connected to all possibilities",
    mission: "Open to new possibilities today",
    inspiration: "In the realm of possibility, anything is possible"
  },
  {
    id: 223,
    affirmation: "I choose faith in the unseen",
    mission: "Have faith in something you can't see",
    inspiration: "Faith is believing before seeing"
  },
  {
    id: 224,
    affirmation: "I am worthy of living authentically",
    mission: "Be authentic in all interactions today",
    inspiration: "Authenticity is your superpower"
  },
  {
    id: 225,
    affirmation: "I practice acceptance of my shadow",
    mission: "Accept one part of yourself you usually reject",
    inspiration: "The shadow is just asking to be loved"
  },
  {
    id: 226,
    affirmation: "I am aligned with universal flow",
    mission: "Flow with life rather than against it",
    inspiration: "Go with the flow and trust the process"
  },
  {
    id: 227,
    affirmation: "I trust in my soul's evolution",
    mission: "Honor your soul's growth today",
    inspiration: "Your soul is always evolving"
  },
  {
    id: 228,
    affirmation: "I am worthy of cosmic support",
    mission: "Feel the support of the cosmos",
    inspiration: "The entire cosmos is supporting your evolution"
  },
  {
    id: 229,
    affirmation: "I practice living in wonder",
    mission: "Approach one thing with childlike wonder",
    inspiration: "Wonder is the beginning of wisdom"
  },
  {
    id: 230,
    affirmation: "I am open to quantum leaps",
    mission: "Take a quantum leap in one area",
    inspiration: "Growth doesn't have to be linear"
  },
  {
    id: 231,
    affirmation: "I choose love over everything",
    mission: "Let love guide every decision today",
    inspiration: "Love is the answer to every question"
  },
  {
    id: 232,
    affirmation: "I am worthy of infinite grace",
    mission: "Accept grace in one situation",
    inspiration: "Grace is always available"
  },
  {
    id: 233,
    affirmation: "I practice being the observer",
    mission: "Observe your thoughts without judgment",
    inspiration: "You are not your thoughts; you are the observer"
  },
  {
    id: 234,
    affirmation: "I am connected to my divine purpose",
    mission: "Align with your purpose today",
    inspiration: "Your purpose is woven into your being"
  },
  {
    id: 235,
    affirmation: "I trust in the perfection of now",
    mission: "Accept this moment as perfect",
    inspiration: "This moment is exactly as it should be"
  },
  {
    id: 236,
    affirmation: "I am worthy of miracles",
    mission: "Believe in miracles today",
    inspiration: "Miracles happen when you believe"
  },
  {
    id: 237,
    affirmation: "I practice gratitude for my journey",
    mission: "Thank yourself for how far you've come",
    inspiration: "Your journey is a miracle in itself"
  },
  {
    id: 238,
    affirmation: "I am aligned with source consciousness",
    mission: "Connect with source for 10 minutes",
    inspiration: "You are source experiencing itself"
  },
  {
    id: 239,
    affirmation: "I choose expansion in all areas",
    mission: "Expand your comfort zone today",
    inspiration: "Life is about expansion, not contraction"
  },
  {
    id: 240,
    affirmation: "I am worthy of divine abundance",
    mission: "Notice divine abundance everywhere",
    inspiration: "Divine abundance is your natural state"
  },
  {
    id: 241,
    affirmation: "I practice living as love",
    mission: "Be love in action today",
    inspiration: "Love is not something you do; it's what you are"
  },
  {
    id: 242,
    affirmation: "I am open to transformation",
    mission: "Welcome transformation in one area",
    inspiration: "Transformation is always happening"
  },
  {
    id: 243,
    affirmation: "I trust in universal intelligence",
    mission: "Trust the intelligence of the universe",
    inspiration: "The universe is infinitely intelligent"
  },
  {
    id: 244,
    affirmation: "I am worthy of transcendence",
    mission: "Transcend one limitation today",
    inspiration: "You are limitless"
  },
  {
    id: 245,
    affirmation: "I practice surrender to flow",
    mission: "Surrender to the flow of life",
    inspiration: "When you surrender, you enter the flow"
  },
  {
    id: 246,
    affirmation: "I am connected to cosmic consciousness",
    mission: "Feel your connection to all consciousness",
    inspiration: "Consciousness is all that is"
  },
  {
    id: 247,
    affirmation: "I choose awakening in every moment",
    mission: "Wake up to the present moment",
    inspiration: "Every moment is an opportunity to awaken"
  },
  {
    id: 248,
    affirmation: "I am worthy of enlightenment",
    mission: "Seek enlightenment in ordinary moments",
    inspiration: "Enlightenment is your natural state"
  },
  {
    id: 249,
    affirmation: "I practice being present",
    mission: "Be fully present for one full hour",
    inspiration: "The present moment is all there is"
  },
  {
    id: 250,
    affirmation: "I am aligned with universal truth",
    mission: "Live your truth today",
    inspiration: "Truth is always available"
  },
  {
    id: 251,
    affirmation: "I trust in my infinite nature",
    mission: "Connect with your infinite self",
    inspiration: "You are infinite"
  },
  {
    id: 252,
    affirmation: "I am worthy of universal love",
    mission: "Feel universal love flowing through you",
    inspiration: "Love is the only truth"
  },
  {
    id: 253,
    affirmation: "I practice living consciously",
    mission: "Be conscious of every action today",
    inspiration: "Consciousness is the key to everything"
  },
  {
    id: 254,
    affirmation: "I am open to divine downloads",
    mission: "Receive divine inspiration today",
    inspiration: "You are always receiving divine guidance"
  },
  {
    id: 255,
    affirmation: "I choose unity over separation",
    mission: "See unity in all things today",
    inspiration: "Separation is an illusion"
  },
  {
    id: 256,
    affirmation: "I am worthy of cosmic alignment",
    mission: "Align with the cosmos today",
    inspiration: "You are one with the cosmos"
  },
  {
    id: 257,
    affirmation: "I practice being the witness",
    mission: "Witness your experience without attachment",
    inspiration: "The witness is your true nature"
  },
  {
    id: 258,
    affirmation: "I am connected to eternal wisdom",
    mission: "Access eternal wisdom within",
    inspiration: "All wisdom is eternal and within you"
  },
  {
    id: 259,
    affirmation: "I trust in the sacred journey",
    mission: "Honor the sacredness of your path",
    inspiration: "Every journey is sacred"
  },
  {
    id: 260,
    affirmation: "I am worthy of divine grace",
    mission: "Accept divine grace today",
    inspiration: "Grace is always flowing"
  },
  {
    id: 261,
    affirmation: "I practice radical presence",
    mission: "Be radically present for one activity",
    inspiration: "Radical presence is radical love"
  },
  {
    id: 262,
    affirmation: "I am aligned with divine will",
    mission: "Align your will with divine will",
    inspiration: "Divine will is always for your highest good"
  },
  {
    id: 263,
    affirmation: "I choose oneness over duality",
    mission: "See beyond duality today",
    inspiration: "All is one"
  },
  {
    id: 264,
    affirmation: "I am worthy of spiritual awakening",
    mission: "Awaken to your spiritual nature",
    inspiration: "Awakening is your birthright"
  },
  {
    id: 265,
    affirmation: "I practice surrender to love",
    mission: "Surrender to love in all forms",
    inspiration: "Love is the ultimate surrender"
  },
  {
    id: 266,
    affirmation: "I am connected to source light",
    mission: "Feel source light illuminating you",
    inspiration: "You are light"
  },
  {
    id: 267,
    affirmation: "I trust in sacred timing",
    mission: "Trust the sacredness of timing",
    inspiration: "All timing is sacred"
  },
  {
    id: 268,
    affirmation: "I am worthy of cosmic consciousness",
    mission: "Expand into cosmic consciousness",
    inspiration: "Consciousness is infinite"
  },
  {
    id: 269,
    affirmation: "I practice living from source",
    mission: "Let source energy guide you today",
    inspiration: "You are an expression of source"
  },
  {
    id: 270,
    affirmation: "I am open to infinite love",
    mission: "Open to infinite love today",
    inspiration: "Love is infinite"
  },
  {
    id: 271,
    affirmation: "I choose enlightenment now",
    mission: "Choose enlightenment in this moment",
    inspiration: "Enlightenment is always now"
  },
  {
    id: 272,
    affirmation: "I am worthy of divine presence",
    mission: "Feel divine presence with you",
    inspiration: "Divine presence is always here"
  },
  {
    id: 273,
    affirmation: "I practice being awareness",
    mission: "Rest as pure awareness today",
    inspiration: "You are awareness itself"
  },
  {
    id: 274,
    affirmation: "I am aligned with universal purpose",
    mission: "Align with universal purpose",
    inspiration: "You are part of a universal purpose"
  },
  {
    id: 275,
    affirmation: "I trust in divine perfection",
    mission: "See divine perfection in everything",
    inspiration: "All is divinely perfect"
  },
  {
    id: 276,
    affirmation: "I am worthy of sacred union",
    mission: "Unite with your higher self today",
    inspiration: "Sacred union is within"
  },
  {
    id: 277,
    affirmation: "I practice being still",
    mission: "Be completely still for 15 minutes",
    inspiration: "In stillness, you find everything"
  },
  {
    id: 278,
    affirmation: "I am connected to divine source",
    mission: "Connect deeply with source today",
    inspiration: "You are never separate from source"
  },
  {
    id: 279,
    affirmation: "I choose love as my essence",
    mission: "Recognize love as your essence",
    inspiration: "Love is what you are"
  },
  {
    id: 280,
    affirmation: "I am worthy of eternal peace",
    mission: "Rest in eternal peace today",
    inspiration: "Peace is eternal"
  },
  {
    id: 281,
    affirmation: "I practice surrendering to now",
    mission: "Surrender completely to this moment",
    inspiration: "Now is all there is"
  },
  {
    id: 282,
    affirmation: "I am aligned with cosmic love",
    mission: "Align with the love of the cosmos",
    inspiration: "Cosmic love flows through all"
  },
  {
    id: 283,
    affirmation: "I trust in the eternal now",
    mission: "Experience the eternal now",
    inspiration: "The eternal now is always here"
  },
  {
    id: 284,
    affirmation: "I am worthy of divine realization",
    mission: "Realize your divine nature today",
    inspiration: "You are divine"
  },
  {
    id: 285,
    affirmation: "I practice being nothing and everything",
    mission: "Rest as nothing and everything",
    inspiration: "You are both nothing and everything"
  },
  {
    id: 286,
    affirmation: "I am connected to all that exists",
    mission: "Feel your connection to all existence",
    inspiration: "You are connected to everything"
  },
  {
    id: 287,
    affirmation: "I choose presence as my practice",
    mission: "Make presence your constant practice",
    inspiration: "Presence is the ultimate practice"
  },
  {
    id: 288,
    affirmation: "I am worthy of infinite being",
    mission: "Be infinite today",
    inspiration: "Your being is infinite"
  },
  {
    id: 289,
    affirmation: "I practice seeing God in all",
    mission: "See the divine in everyone",
    inspiration: "God is in everything"
  },
  {
    id: 290,
    affirmation: "I am aligned with eternal truth",
    mission: "Know eternal truth today",
    inspiration: "Truth is eternal"
  },
  {
    id: 291,
    affirmation: "I trust in the sacred mystery",
    mission: "Embrace the sacred mystery of life",
    inspiration: "Mystery is sacred"
  },
  {
    id: 292,
    affirmation: "I am worthy of cosmic awakening",
    mission: "Awaken to cosmic consciousness",
    inspiration: "Awakening is cosmic"
  },
  {
    id: 293,
    affirmation: "I practice being love itself",
    mission: "Be love in every moment",
    inspiration: "Love is all there is"
  },
  {
    id: 294,
    affirmation: "I am open to divine revelation",
    mission: "Receive divine revelation today",
    inspiration: "Revelation comes when you're open"
  },
  {
    id: 295,
    affirmation: "I choose unity consciousness",
    mission: "Live from unity consciousness",
    inspiration: "Unity is the truth"
  },
  {
    id: 296,
    affirmation: "I am worthy of spiritual liberation",
    mission: "Experience liberation today",
    inspiration: "Liberation is your nature"
  },
  {
    id: 297,
    affirmation: "I practice being the infinite",
    mission: "Experience yourself as infinite",
    inspiration: "You are the infinite"
  },
  {
    id: 298,
    affirmation: "I am connected to universal mind",
    mission: "Connect with universal mind",
    inspiration: "One mind connects all"
  },
  {
    id: 299,
    affirmation: "I trust in divine intelligence",
    mission: "Trust the intelligence of the divine",
    inspiration: "Divine intelligence guides all"
  },
  {
    id: 300,
    affirmation: "I am worthy of sacred knowing",
    mission: "Know yourself as sacred",
    inspiration: "You are sacred"
  },
  {
    id: 301,
    affirmation: "I practice radical awakening",
    mission: "Awaken radically today",
    inspiration: "Awakening is radical"
  },
  {
    id: 302,
    affirmation: "I am aligned with source energy",
    mission: "Align with pure source energy",
    inspiration: "Source energy is pure"
  },
  {
    id: 303,
    affirmation: "I choose divine remembrance",
    mission: "Remember your divine nature",
    inspiration: "Remembering is awakening"
  },
  {
    id: 304,
    affirmation: "I am worthy of eternal love",
    mission: "Feel eternal love today",
    inspiration: "Love is eternal"
  },
  {
    id: 305,
    affirmation: "I practice being consciousness",
    mission: "Be pure consciousness today",
    inspiration: "Consciousness is what you are"
  },
  {
    id: 306,
    affirmation: "I am connected to divine essence",
    mission: "Connect with your divine essence",
    inspiration: "Your essence is divine"
  },
  {
    id: 307,
    affirmation: "I trust in sacred unfolding",
    mission: "Trust life's sacred unfolding",
    inspiration: "All unfolds sacredly"
  },
  {
    id: 308,
    affirmation: "I am worthy of infinite consciousness",
    mission: "Experience infinite consciousness",
    inspiration: "Consciousness is infinite"
  },
  {
    id: 309,
    affirmation: "I practice living as spirit",
    mission: "Live as pure spirit today",
    inspiration: "You are spirit"
  },
  {
    id: 310,
    affirmation: "I am open to cosmic grace",
    mission: "Receive cosmic grace",
    inspiration: "Grace is cosmic"
  },
  {
    id: 311,
    affirmation: "I choose presence over form",
    mission: "Choose presence beyond form",
    inspiration: "Presence is beyond form"
  },
  {
    id: 312,
    affirmation: "I am worthy of divine union",
    mission: "Experience divine union",
    inspiration: "Union with the divine is natural"
  },
  {
    id: 313,
    affirmation: "I practice being eternal",
    mission: "Experience your eternal nature",
    inspiration: "You are eternal"
  },
  {
    id: 314,
    affirmation: "I am aligned with sacred purpose",
    mission: "Align with sacred purpose",
    inspiration: "Purpose is sacred"
  },
  {
    id: 315,
    affirmation: "I trust in universal oneness",
    mission: "Experience universal oneness",
    inspiration: "All is one"
  },
  {
    id: 316,
    affirmation: "I am worthy of spiritual mastery",
    mission: "Master one spiritual practice",
    inspiration: "Mastery comes through practice"
  },
  {
    id: 317,
    affirmation: "I practice surrendering to being",
    mission: "Surrender to pure being",
    inspiration: "Being is enough"
  },
  {
    id: 318,
    affirmation: "I am connected to infinite source",
    mission: "Connect with infinite source",
    inspiration: "Source is infinite"
  },
  {
    id: 319,
    affirmation: "I choose awakened living",
    mission: "Live from awakened consciousness",
    inspiration: "Awakened living is freedom"
  },
  {
    id: 320,
    affirmation: "I am worthy of cosmic love",
    mission: "Feel cosmic love flowing",
    inspiration: "Love is cosmic"
  },
  {
    id: 321,
    affirmation: "I practice being the divine",
    mission: "Recognize yourself as divine",
    inspiration: "You are divine"
  },
  {
    id: 322,
    affirmation: "I am aligned with universal consciousness",
    mission: "Align with universal consciousness",
    inspiration: "Consciousness is universal"
  },
  {
    id: 323,
    affirmation: "I trust in sacred presence",
    mission: "Trust presence as sacred",
    inspiration: "Presence is sacred"
  },
  {
    id: 324,
    affirmation: "I am worthy of enlightened being",
    mission: "Be enlightened today",
    inspiration: "Enlightenment is being"
  },
  {
    id: 325,
    affirmation: "I practice living from source",
    mission: "Let source live through you",
    inspiration: "Source lives as you"
  },
  {
    id: 326,
    affirmation: "I am open to infinite grace",
    mission: "Open to infinite grace",
    inspiration: "Grace is infinite"
  },
  {
    id: 327,
    affirmation: "I choose divine expression",
    mission: "Express the divine today",
    inspiration: "You are divine expression"
  },
  {
    id: 328,
    affirmation: "I am worthy of sacred truth",
    mission: "Know sacred truth",
    inspiration: "Truth is sacred"
  },
  {
    id: 329,
    affirmation: "I practice radical being",
    mission: "Just be today",
    inspiration: "Being is radical"
  },
  {
    id: 330,
    affirmation: "I am connected to eternal presence",
    mission: "Feel eternal presence",
    inspiration: "Presence is eternal"
  },
  {
    id: 331,
    affirmation: "I trust in infinite intelligence",
    mission: "Trust infinite intelligence",
    inspiration: "Intelligence is infinite"
  },
  {
    id: 332,
    affirmation: "I am worthy of universal wisdom",
    mission: "Access universal wisdom",
    inspiration: "Wisdom is universal"
  },
  {
    id: 333,
    affirmation: "I practice being one",
    mission: "Experience oneness",
    inspiration: "You are one with all"
  },
  {
    id: 334,
    affirmation: "I am aligned with divine flow",
    mission: "Flow with the divine",
    inspiration: "Divine flow is natural"
  },
  {
    id: 335,
    affirmation: "I choose sacred surrender",
    mission: "Surrender sacredly",
    inspiration: "Surrender is sacred"
  },
  {
    id: 336,
    affirmation: "I am worthy of infinite peace",
    mission: "Rest in infinite peace",
    inspiration: "Peace is infinite"
  },
  {
    id: 337,
    affirmation: "I practice living consciously",
    mission: "Be conscious all day",
    inspiration: "Conscious living is awakened living"
  },
  {
    id: 338,
    affirmation: "I am connected to cosmic intelligence",
    mission: "Connect with cosmic intelligence",
    inspiration: "Intelligence is cosmic"
  },
  {
    id: 339,
    affirmation: "I trust in eternal love",
    mission: "Trust love eternally",
    inspiration: "Love is eternal"
  },
  {
    id: 340,
    affirmation: "I am worthy of divine knowing",
    mission: "Know divinely",
    inspiration: "Divine knowing is within"
  },
  {
    id: 341,
    affirmation: "I practice being source",
    mission: "Be source itself",
    inspiration: "You are source"
  },
  {
    id: 342,
    affirmation: "I am aligned with infinite love",
    mission: "Align with infinite love",
    inspiration: "Love is infinite"
  },
  {
    id: 343,
    affirmation: "I choose eternal presence",
    mission: "Be eternally present",
    inspiration: "Presence is eternal"
  },
  {
    id: 344,
    affirmation: "I am worthy of cosmic unity",
    mission: "Experience cosmic unity",
    inspiration: "Unity is cosmic"
  },
  {
    id: 345,
    affirmation: "I practice divine remembrance",
    mission: "Remember the divine",
    inspiration: "Remembrance is divine"
  },
  {
    id: 346,
    affirmation: "I am open to sacred awakening",
    mission: "Awaken sacredly",
    inspiration: "Awakening is sacred"
  },
  {
    id: 347,
    affirmation: "I trust in universal love",
    mission: "Trust universal love",
    inspiration: "Love is universal"
  },
  {
    id: 348,
    affirmation: "I am worthy of infinite being",
    mission: "Be infinitely",
    inspiration: "Being is infinite"
  },
  {
    id: 349,
    affirmation: "I practice being awareness itself",
    mission: "Be pure awareness",
    inspiration: "You are awareness"
  },
  {
    id: 350,
    affirmation: "I am connected to divine love",
    mission: "Connect with divine love",
    inspiration: "Love is divine"
  },
  {
    id: 351,
    affirmation: "I choose presence as truth",
    mission: "Know presence as truth",
    inspiration: "Presence is truth"
  },
  {
    id: 352,
    affirmation: "I am worthy of eternal consciousness",
    mission: "Experience eternal consciousness",
    inspiration: "Consciousness is eternal"
  },
  {
    id: 353,
    affirmation: "I practice sacred being",
    mission: "Be sacredly",
    inspiration: "Being is sacred"
  },
  {
    id: 354,
    affirmation: "I am aligned with source love",
    mission: "Align with source love",
    inspiration: "Love is source"
  },
  {
    id: 355,
    affirmation: "I trust in divine essence",
    mission: "Trust your divine essence",
    inspiration: "Essence is divine"
  },
  {
    id: 356,
    affirmation: "I am worthy of cosmic presence",
    mission: "Be cosmically present",
    inspiration: "Presence is cosmic"
  },
  {
    id: 357,
    affirmation: "I practice infinite surrender",
    mission: "Surrender infinitely",
    inspiration: "Surrender is infinite"
  },
  {
    id: 358,
    affirmation: "I am connected to eternal source",
    mission: "Connect with eternal source",
    inspiration: "Source is eternal"
  },
  {
    id: 359,
    affirmation: "I choose divine presence",
    mission: "Choose presence divinely",
    inspiration: "Presence is divine"
  },
  {
    id: 360,
    affirmation: "I am worthy of universal grace",
    mission: "Receive universal grace",
    inspiration: "Grace is universal"
  },
  {
    id: 361,
    affirmation: "I practice being love eternal",
    mission: "Be eternal love",
    inspiration: "Love is eternal"
  },
  {
    id: 362,
    affirmation: "I am aligned with infinite source",
    mission: "Align with infinite source",
    inspiration: "Source is infinite"
  },
  {
    id: 363,
    affirmation: "I trust in sacred consciousness",
    mission: "Trust consciousness sacredly",
    inspiration: "Consciousness is sacred"
  },
  {
    id: 364,
    affirmation: "I am worthy of divine being",
    mission: "Be divinely",
    inspiration: "Being is divine"
  },
  {
    id: 365,
    affirmation: "I am PRACTICE: Patiently Repeating Altruistic Challenges To Inspire Core Excellence",
    mission: "Embody all aspects of PRACTICE in your day",
    inspiration: "You are the living embodiment of PRACTICE - patience, altruism, challenge, inspiration, and excellence united in every breath"
  }
];
