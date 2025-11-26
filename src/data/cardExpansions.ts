export interface CardExpansion {
  cardId: number;
  deeperMeaning: string;
  practice: string;
  reflectionQuestions: string[];
  integration: string[];
  breathwork?: {
    name: string;
    technique: string;
    duration: string;
    instructions: string[];
    benefits: string[];
  };
  lecheConnection: {
    pillars: string[];
    explanation: string;
  };
}

export const cardExpansions: CardExpansion[] = [
  {
    cardId: 1,
    deeperMeaning: "Patience isn't passive waiting—it's active presence. Building excellence is about showing up daily, trusting the process, and resisting the urge to rush outcomes. True mastery comes from consistent, mindful repetition. When you're patient, you create space for quality to emerge naturally. Excellence isn't a sprint; it's a marathon of small, deliberate choices made with care.",
    practice: "Before starting any task today, pause for three conscious breaths. Set the intention: 'I will complete this with presence, not pressure.' Notice when urgency tries to take over—that's your cue to breathe again. Excellence lives in the gaps between rushing.",
    reflectionQuestions: [
      "Where in my life am I trying to force results instead of allowing them to unfold?",
      "What would patience look like in my biggest challenge right now?",
      "How does my body feel when I rush versus when I move with patience?",
      "What small step can I take today that my future self will thank me for?",
      "Am I confusing speed with progress?"
    ],
    integration: [
      "Set a timer to pause every 2 hours and check: Am I rushing or flowing?",
      "Practice patience in a mundane task: washing dishes, commuting, waiting in line",
      "Journal tonight: What did I build today? What foundation did I lay?",
      "Share one thing you're patiently building with a friend or on social media"
    ],
    breathwork: {
      name: "4-4-8 Patience Breath",
      technique: "Box Breathing Variation",
      duration: "5-10 minutes",
      instructions: [
        "Sit comfortably with your spine straight",
        "Inhale through your nose for 4 counts (patience flowing in)",
        "Hold your breath for 4 counts (patience growing within)",
        "Exhale through your mouth for 8 counts (releasing urgency and tension)",
        "Repeat for 10-20 cycles",
        "Notice how the longer exhale calms your nervous system"
      ],
      benefits: [
        "Activates the parasympathetic nervous system (rest & digest)",
        "Reduces cortisol and anxiety by up to 25%",
        "Improves emotional regulation and decision-making",
        "Trains your body to respond rather than react"
      ]
    },
    lecheConnection: {
      pillars: ["Empowerment", "Healing"],
      explanation: "Patience is self-empowerment in action—you're choosing your timeline, not letting external pressure dictate it. It's also healing because rushing creates stress and disconnection. Patience brings you home to yourself."
    }
  },
  {
    cardId: 2,
    deeperMeaning: "True altruism isn't about grand gestures—it's about small acts done with pure intention. When you help without expecting recognition, reward, or reciprocity, you create ripples of genuine connection. These ripples spread outward, touching lives you'll never see. The greatest gift you can give is presence, attention, and service without strings attached.",
    practice: "Perform one anonymous act of kindness today. Leave a generous tip with a note. Pay for someone's coffee. Help a stranger without saying your name. Notice how it feels to give purely for the sake of giving.",
    reflectionQuestions: [
      "When was the last time I helped someone without expecting anything back?",
      "Do I keep a mental ledger of who 'owes' me? Why?",
      "What would it feel like to give without anyone knowing it was me?",
      "How does my ego respond to serving others?",
      "What's one small way I can be of service today?"
    ],
    integration: [
      "Make 'secret kindness' a weekly practice",
      "Notice when you're helping to be seen versus helping to serve",
      "Volunteer an hour of your time this week—no social media posts",
      "Practice active listening: give someone 10 minutes of your full attention"
    ],
    lecheConnection: {
      pillars: ["Love", "Community", "Empathy"],
      explanation: "Altruism is love in action. When you serve others without expectation, you strengthen community bonds and practice deep empathy—stepping outside your needs to honor someone else's."
    }
  },
  {
    cardId: 3,
    deeperMeaning: "Every challenge is an invitation to evolve. Your comfort zone is where growth goes to die. When you reframe obstacles as opportunities, you shift from victim to student. The universe doesn't send you challenges to break you—it sends them to make you. Resistance is the door; acceptance is the key.",
    practice: "Identify one thing you've been avoiding because it's hard. Today, take the smallest possible step toward it. Not to conquer it, but to begin a relationship with it. Growth whispers; fear shouts. Choose the whisper.",
    reflectionQuestions: [
      "What challenge am I currently resisting, and what might it be trying to teach me?",
      "When have past difficulties actually led to my greatest growth?",
      "What would be possible if I saw this obstacle as my greatest teacher?",
      "Am I running from discomfort or running toward something better?",
      "What's the first micro-step I can take today?"
    ],
    integration: [
      "Create a 'growth log': Write down one hard thing you do each day",
      "Share your challenge with a trusted friend—vulnerability creates connection",
      "Practice the 10-minute rule: commit to trying something difficult for just 10 minutes",
      "Celebrate effort, not just outcomes"
    ],
    breathwork: {
      name: "Power Breath for Courage",
      technique: "Energizing Breath",
      duration: "3-5 minutes",
      instructions: [
        "Stand with feet shoulder-width apart, spine tall",
        "Take a sharp inhale through your nose while raising your arms overhead",
        "Hold for 1-2 seconds at the top, feeling your power",
        "Exhale forcefully through your mouth with a 'HA!' sound while bringing arms down",
        "Repeat 20-30 times",
        "Finish with 3 deep, slow breaths"
      ],
      benefits: [
        "Increases adrenaline and energy",
        "Builds mental resilience and confidence",
        "Releases stuck emotions and fear",
        "Oxygenates the blood and brain"
      ]
    },
    lecheConnection: {
      pillars: ["Empowerment", "Healing"],
      explanation: "Challenges are where we reclaim our power. Facing them is healing—it integrates past wounds and builds new neural pathways of courage. You become empowered through what you overcome."
    }
  },
  {
    cardId: 4,
    deeperMeaning: "Your life is your message. People don't remember what you say; they remember how you made them feel and who you were being. Authentic action—living your values even when no one's watching—is the most powerful form of inspiration. You don't need to be perfect to inspire; you need to be real.",
    practice: "Share your story today with someone who needs to hear it. Not the highlight reel—the real journey. The struggles, the doubts, the breakthroughs. Your vulnerability gives others permission to be human too.",
    reflectionQuestions: [
      "What part of my journey am I hiding because I think it's 'not enough'?",
      "Who inspired me by being authentically themselves?",
      "What would I do differently if I knew someone was watching and learning from me?",
      "Am I living in integrity with my values, or performing for approval?",
      "What's one authentic action I can take today?"
    ],
    integration: [
      "Start a practice of 'authentic sharing'—one real post per week (no filters)",
      "Mentor or guide someone who's a few steps behind you on the path",
      "Notice when you're performing versus when you're being",
      "Write your 'mess-to-message' story—how your struggles became your strength"
    ],
    lecheConnection: {
      pillars: ["Love", "Community", "Empowerment"],
      explanation: "When you inspire through authenticity, you're offering love by showing up fully. You're building community by creating safe space for others to do the same. And you're empowering them to own their story."
    }
  },
  {
    cardId: 5,
    deeperMeaning: "Your values are your inner compass. When you're clear on what truly matters, decisions become effortless. Most people live by default—reacting to circumstances rather than choosing from their core. Identifying your values is like tuning an instrument—once aligned, everything resonates.",
    practice: "Write down your top three non-negotiable values. Then audit today: Did your actions reflect them? If not, where did you stray, and why? Awareness is the first step to alignment.",
    reflectionQuestions: [
      "What are the three things I would stand for even if it cost me everything?",
      "When have I compromised my values, and how did it feel?",
      "What decisions am I struggling with that would be easier if I honored my values?",
      "Am I living my values or someone else's expectations?",
      "What would my life look like if every choice came from my core?"
    ],
    integration: [
      "Create a 'values statement' and read it every morning",
      "Make one decision today based purely on your values, not convenience",
      "Share your values with someone you trust—speaking them makes them real",
      "Notice when you feel most 'you'—you're probably in alignment"
    ],
    lecheConnection: {
      pillars: ["Empowerment", "Love"],
      explanation: "Your values are your empowerment toolkit. When you live from them, you're loving yourself enough to honor what's true. This self-love creates a ripple effect of integrity."
    }
  },
  {
    cardId: 6,
    deeperMeaning: "Patience isn't passive—it's the active practice of staying present when everything in you wants to react. Three breaths create space between stimulus and response. In that space lives your power. Reacting is automatic; responding is conscious. Patience is choosing consciousness.",
    practice: "Set a 'breathe before responding' rule for today. Before replying to a text, answering a question, or reacting to frustration—pause and take three full breaths. Watch how this changes everything.",
    reflectionQuestions: [
      "What triggers me to react instead of respond?",
      "How many conflicts could I avoid if I just paused?",
      "What's the cost of my impatience in relationships and work?",
      "When I'm patient, what becomes possible?",
      "Am I reacting from my past or responding from my present?"
    ],
    integration: [
      "Practice the '3-breath rule' before every email or text reply",
      "Use red lights as breath breaks—not annoyances, but invitations to pause",
      "Journal: Track one situation where patience changed the outcome",
      "Teach this practice to someone else—teaching deepens learning"
    ],
    breathwork: {
      name: "The Pause Practice",
      technique: "Conscious Breath",
      duration: "1-2 minutes (as needed)",
      instructions: [
        "When you feel triggered, stop everything",
        "Place one hand on your heart, one on your belly",
        "Inhale deeply for 4 counts through your nose",
        "Hold for 2 counts",
        "Exhale slowly for 6 counts through your mouth",
        "Repeat 3 times minimum",
        "Now respond (not react)"
      ],
      benefits: [
        "Interrupts the stress response before it escalates",
        "Engages the prefrontal cortex (rational brain) over amygdala (fear brain)",
        "Creates space for conscious choice",
        "Builds emotional intelligence over time"
      ]
    },
    lecheConnection: {
      pillars: ["Healing", "Love", "Empathy"],
      explanation: "Patience is healing—it soothes your nervous system. It's love—you're choosing presence over reaction. It's empathy—you're creating space for others (and yourself) to be human."
    }
  },
  {
    cardId: 7,
    deeperMeaning: "Compassion is empathy in action. Judgment separates; compassion connects. Every person you meet is fighting a battle you know nothing about. When you choose to see their humanity instead of their behavior, you dissolve barriers. Compassion doesn't mean agreeing—it means understanding.",
    practice: "Today, practice empathy with someone you disagree with. Pause before judging. Ask: 'What pain might they be carrying that led to this?' You don't have to agree, but you can always choose to understand.",
    reflectionQuestions: [
      "Where am I withholding compassion because someone 'doesn't deserve it'?",
      "What would it cost me to choose understanding over being right?",
      "How does judgment protect me from feeling?",
      "When have I needed compassion that I didn't receive?",
      "What would change if I met every person with kindness first?"
    ],
    integration: [
      "Make 'assume positive intent' your default for one day",
      "When someone frustrates you, pause and think: 'They're doing their best with what they know'",
      "Practice self-compassion: speak to yourself as you would a dear friend",
      "Share this card with someone who needs to hear it"
    ],
    lecheConnection: {
      pillars: ["Love", "Empathy", "Community", "Healing"],
      explanation: "Compassion is the heart of LECHE. It's love without conditions, empathy in motion, the glue of community, and a profound form of healing for both giver and receiver."
    }
  },
  {
    cardId: 8,
    deeperMeaning: "Worthiness isn't earned—it's inherent. You don't become worthy through achievement; you recognize the worthiness you've always had. Excellence isn't about proving yourself; it's about expressing yourself. You are worthy simply because you exist.",
    practice: "Celebrate one thing today—something small. Not because it's 'impressive,' but because you showed up. Worthiness isn't in the outcome; it's in the showing up.",
    reflectionQuestions: [
      "What would I do if I truly believed I was worthy of everything I desire?",
      "Where am I waiting to 'earn' something I already deserve?",
      "What old story tells me I'm not enough?",
      "How would I show up differently if worthiness wasn't a question?",
      "What small win can I celebrate right now?"
    ],
    integration: [
      "Start a 'wins journal'—write down 3 small wins every night",
      "Say out loud: 'I am worthy' 10 times while looking in the mirror",
      "Share a win with someone (practice receiving praise)",
      "Notice the voice that says 'not enough'—thank it and choose a new thought"
    ],
    lecheConnection: {
      pillars: ["Love", "Empowerment", "Healing"],
      explanation: "Self-love begins with self-worth. Recognizing your inherent worthiness is empowering—it's taking back power from external validation. This recognition is deeply healing."
    }
  },
  {
    cardId: 9,
    deeperMeaning: "You are the sum of your repeated actions. Excellence isn't an event; it's a habit. Presence transforms routine into ritual. When you show up fully for the mundane, the extraordinary emerges. Your morning routine is your daily vote for who you're becoming.",
    practice: "Do your morning routine with 100% presence today. No phone. No distractions. Just you and the practice. Notice how presence transforms even the smallest task.",
    reflectionQuestions: [
      "Am I rushing through my morning or savoring it?",
      "What habits am I repeating that don't serve my highest good?",
      "What would change if I brought full presence to my daily rituals?",
      "Am I automating my life or inhabiting it?",
      "What one habit would transform my life if I did it daily?"
    ],
    integration: [
      "Design a morning routine that feels sacred (even if it's just 10 minutes)",
      "Track your habit streak—celebrate consistency over perfection",
      "Remove one habit that drains you; add one that fills you",
      "Share your morning routine on social media—inspire others"
    ],
    lecheConnection: {
      pillars: ["Empowerment", "Love"],
      explanation: "Consistent habits are self-empowerment in action. Choosing positive habits daily is an act of self-love. You're saying: 'I'm worth this care.'"
    }
  },
  {
    cardId: 10,
    deeperMeaning: "You're not separate from the collective—you're woven into it. Every action creates ripples. When you contribute to the greater good, you're not sacrificing yourself; you're expanding yourself. True fulfillment comes not from what you get, but from what you give.",
    practice: "Make one positive impact in your community today. Pick up litter. Help a neighbor. Donate. Volunteer an hour. Notice how giving fills you up rather than depletes you.",
    reflectionQuestions: [
      "How am I contributing to the world beyond my own needs?",
      "What gifts do I have that could serve others?",
      "Am I a consumer or a contributor in my community?",
      "What would my neighborhood/city look like if everyone gave like I do?",
      "How can I expand my circle of care?"
    ],
    integration: [
      "Commit to one act of community service per week",
      "Join or start a local group aligned with your values",
      "Practice 'positive deviance'—do good when no one's looking",
      "Share stories of community impact on social media—inspire action"
    ],
    lecheConnection: {
      pillars: ["Community", "Love", "Empathy"],
      explanation: "Contributing to the collective is community in action. It's love beyond the self and empathy expanded. When you serve, you belong."
    }
  },
  {
    cardId: 11,
    deeperMeaning: "Obstacles are not roadblocks—they're stepping stones. The problem isn't the problem; your perspective is. When you reframe challenges as opportunities, you shift from victimhood to empowerment. Marcus Aurelius said it: 'The obstacle is the way.' Your breakthrough is hidden in your breakdown.",
    practice: "Take one problem you're facing and ask: 'What if this is happening for me, not to me?' Write down three ways this obstacle could become your advantage.",
    reflectionQuestions: [
      "What's the hardest challenge I'm facing, and what might it be teaching me?",
      "How have past obstacles actually become my greatest strengths?",
      "What would be possible if I stopped resisting this and started learning from it?",
      "Am I a victim of my circumstances or a student of them?",
      "What's the hidden gift in this difficulty?"
    ],
    integration: [
      "Keep an 'obstacle journal'—track how challenges become opportunities",
      "Share a past obstacle that became a blessing with someone",
      "Practice 'positive reframing' for one week—every complaint becomes a question",
      "Create art or write about your transformation"
    ],
    breathwork: {
      name: "Transformation Breath",
      technique: "Circular Breathing",
      duration: "10-15 minutes",
      instructions: [
        "Sit or lie down comfortably",
        "Breathe in and out through your mouth without pause",
        "Inhale deeply into your belly, then chest",
        "Exhale fully and immediately inhale again (no pause)",
        "Maintain this circular pattern for 10-15 minutes",
        "Visualize obstacles dissolving with each exhale",
        "End with 5 slow, deep breaths through your nose"
      ],
      benefits: [
        "Releases stuck emotions and energy blocks",
        "Induces altered states of consciousness",
        "Transforms limiting beliefs",
        "Increases mental clarity and perspective"
      ]
    },
    lecheConnection: {
      pillars: ["Healing", "Empowerment"],
      explanation: "Transforming obstacles is healing—it integrates pain into wisdom. It's empowering—you're taking back control of your narrative."
    }
  },
  {
    cardId: 12,
    deeperMeaning: "Your energy is your introduction. Before you speak, people feel you. When you consciously cultivate positive energy, you become magnetic. This isn't about toxic positivity—it's about choosing to radiate presence, warmth, and light. Your vibe attracts your tribe.",
    practice: "Uplift three people with genuine, specific compliments today. Not generic flattery—real observations of their character, effort, or impact. Watch how your energy shifts when you focus on the good.",
    reflectionQuestions: [
      "What energy am I bringing into rooms?",
      "Do people feel lighter or heavier after being around me?",
      "Am I unconsciously draining or filling others?",
      "What would it take to become someone others gravitate toward?",
      "How can I be more generous with my praise?"
    ],
    integration: [
      "Start a daily 'compliment practice'—uplift one person sincerely",
      "Notice your inner dialogue—is it positive or negative?",
      "Smile at strangers—watch how they light up",
      "Share this card and tag someone who radiates positive energy"
    ],
    lecheConnection: {
      pillars: ["Love", "Community", "Empowerment"],
      explanation: "Radiating positive energy is love in action. It builds community by creating safety and belonging. It empowers others to shine."
    }
  },
  {
    cardId: 13,
    deeperMeaning: "Core strength isn't just physical—it's mental, emotional, and spiritual. Every time you push through discomfort, you're building resilience. Challenges are your gym. The weight of adversity doesn't break you; it builds you. Your capacity expands with every test.",
    practice: "Push beyond your comfort zone in one area today. Not recklessly—consciously. Feel the edge of your capacity and lean into it. That's where growth lives.",
    reflectionQuestions: [
      "Where am I playing it safe instead of growing?",
      "What would I do if I knew I couldn't fail?",
      "How have past challenges strengthened me?",
      "Am I avoiding discomfort or embracing it as a teacher?",
      "What's one edge I can lean into today?"
    ],
    integration: [
      "Take on a '30-day edge challenge'—do one uncomfortable thing daily",
      "Track your growth—journal about moments you felt strong",
      "Celebrate effort over outcomes",
      "Share your growth journey on social media—inspire others"
    ],
    lecheConnection: {
      pillars: ["Empowerment", "Healing"],
      explanation: "Building strength through challenges is empowering. Each time you overcome, you reclaim power. This is healing—integrating past weakness into present strength."
    }
  },
  {
    cardId: 14,
    deeperMeaning: "Gratitude is the fastest way to shift your state. What you focus on expands. When you practice gratitude, you're not ignoring problems—you're choosing to see gifts. Gratitude rewires your brain for abundance, joy, and resilience. It's the antidote to scarcity.",
    practice: "Write down five things you're grateful for—three external, two internal. Feel each one as you write it. Gratitude isn't just a thought; it's a felt experience.",
    reflectionQuestions: [
      "What am I taking for granted that I'd miss if it was gone?",
      "How would my life change if I focused on what I have instead of what I lack?",
      "What challenges can I find gratitude in?",
      "Am I grateful for my body, my breath, my ability to choose?",
      "What's one small blessing I overlooked today?"
    ],
    integration: [
      "Start a gratitude journal—write 5 things every night",
      "Share gratitude publicly—thank someone on social media",
      "Practice 'gratitude walks'—notice beauty everywhere",
      "End each day with: 'Today I'm grateful for...'"
    ],
    lecheConnection: {
      pillars: ["Love", "Healing"],
      explanation: "Gratitude is love for what is. It heals by shifting focus from lack to abundance. It opens your heart and transforms your perspective."
    }
  },
  {
    cardId: 15,
    deeperMeaning: "Beginner's mind is the practice of seeing with fresh eyes. When you approach the familiar as if it's the first time, wonder returns. Experts see through filters; beginners see truth. Fresh eyes dissolve assumptions and invite discovery. You've seen it before, but have you truly seen it?",
    practice: "Choose something you do every day—eating, walking, your commute—and experience it as if for the first time. What do you notice that you usually miss?",
    reflectionQuestions: [
      "Where have I stopped paying attention because 'I already know'?",
      "What assumptions am I making that limit my experience?",
      "How would I see my relationships if I approached them with fresh eyes?",
      "What magic am I missing by being on autopilot?",
      "What would a child notice that I don't?"
    ],
    integration: [
      "Practice 'fresh eyes' once a day for a week",
      "Take a familiar route and notice 10 new things",
      "Ask someone you love: 'Tell me something I don't know about you'",
      "Journal: What did I discover today by seeing differently?"
    ],
    lecheConnection: {
      pillars: ["Love", "Community"],
      explanation: "Fresh eyes are an act of love—you're giving full attention. It deepens community because you're truly seeing people, not your idea of them."
    }
  },
  {
    cardId: 16,
    deeperMeaning: "Purpose isn't something you find—it's something you live. You're already aligned when you honor what lights you up. Purpose is the intersection of your gifts, your joy, and the world's needs. You don't need permission to pursue it; you need commitment.",
    practice: "Take one action today toward your biggest dream—no matter how small. Send the email. Write the first paragraph. Make the call. Action creates clarity.",
    reflectionQuestions: [
      "What would I do if money wasn't a concern?",
      "What makes me lose track of time?",
      "What would my 80-year-old self regret not doing?",
      "Am I living my purpose or someone else's expectations?",
      "What's one small step I can take today?"
    ],
    integration: [
      "Define your 'dream in one sentence' and read it daily",
      "Take one purposeful action every day for 30 days",
      "Share your dream with someone who believes in you",
      "Join a community aligned with your purpose"
    ],
    lecheConnection: {
      pillars: ["Empowerment", "Love"],
      explanation: "Living your purpose is ultimate empowerment. It's loving yourself enough to honor your calling. Purpose-driven action is love in motion."
    }
  },
  {
    cardId: 17,
    deeperMeaning: "Courage isn't the absence of fear—it's action in the face of it. Every time you choose courage, you expand your capacity. Comfort keeps you small; courage makes you grow. The thing you're most afraid of is often the thing you most need to do.",
    practice: "Do one thing today that scares you. Not recklessly—consciously. Feel the fear and do it anyway. That's where your power lives.",
    reflectionQuestions: [
      "What am I avoiding because I'm afraid?",
      "When have I been courageous before, and what did it teach me?",
      "What would I do if I wasn't afraid of failure?",
      "Is fear protecting me or imprisoning me?",
      "What's the cost of not being brave?"
    ],
    integration: [
      "Create a 'courage list'—things you're afraid to do but want to",
      "Do one courageous thing per week",
      "Share your fear and your action—vulnerability inspires others",
      "Celebrate courage attempts, not just successes"
    ],
    breathwork: {
      name: "Courage Breath",
      technique: "Breath of Fire",
      duration: "3-5 minutes",
      instructions: [
        "Sit with spine straight, hands on knees",
        "Take a deep inhale through your nose",
        "Begin rapid, rhythmic breathing through your nose",
        "Pump your belly in on exhale, relax on inhale",
        "Continue for 1-3 minutes",
        "End with a deep inhale, hold, and slow exhale",
        "Repeat 3 rounds"
      ],
      benefits: [
        "Activates the solar plexus (power center)",
        "Increases energy and mental clarity",
        "Burns through fear and doubt",
        "Builds inner fire and confidence"
      ]
    },
    lecheConnection: {
      pillars: ["Empowerment", "Healing"],
      explanation: "Courage is empowerment in action. Every brave choice reclaims power from fear. This is healing—transforming fear into fuel."
    }
  },
  {
    cardId: 18,
    deeperMeaning: "Your body is your home. It's not just a vessel—it's the sacred temple that houses your spirit. When you honor your body, you honor yourself. Movement isn't punishment; it's celebration. Nutrition isn't restriction; it's nourishment. Your body is wise—listen to it.",
    practice: "Move your body with intention for 20 minutes today. Not to burn calories or look different, but to honor the miracle that is your physical form. Dance. Walk. Stretch. Celebrate.",
    reflectionQuestions: [
      "How am I treating my body—like a temple or a tool?",
      "What is my body asking for that I'm ignoring?",
      "Do I move from punishment or celebration?",
      "How would I care for my body if I truly loved it?",
      "What does my body need to feel alive today?"
    ],
    integration: [
      "Create a movement practice you actually enjoy",
      "Practice 'intuitive eating'—eat what feels good, not just what you 'should'",
      "Say one thing you love about your body in the mirror daily",
      "Book a massage, yoga class, or body work session—invest in yourself"
    ],
    lecheConnection: {
      pillars: ["Love", "Healing"],
      explanation: "Honoring your body is self-love made physical. Movement heals trauma stored in tissues. Your body is the vehicle for living your purpose."
    }
  },
  {
    cardId: 19,
    deeperMeaning: "Most people listen to respond, not to understand. Deep listening is a gift of presence. When you're fully there, people feel seen. This isn't about agreeing—it's about honoring. To listen deeply is to love deeply. The greatest poverty is feeling unheard.",
    practice: "Have one conversation today with complete presence. No phone. No planning your response. Just listening. Watch how the other person lights up when they feel truly heard.",
    reflectionQuestions: [
      "Am I listening to understand or to reply?",
      "When was the last time I felt truly heard?",
      "What am I missing by not being present?",
      "How does it feel when someone really listens to me?",
      "What would change in my relationships if I just listened more?"
    ],
    integration: [
      "Practice 'listening meditation'—5 minutes of just listening to sounds",
      "Put your phone away during all conversations today",
      "Ask someone: 'How are you, really?' and actually listen",
      "Reflect: Who in my life needs to be heard right now?"
    ],
    lecheConnection: {
      pillars: ["Love", "Empathy", "Community"],
      explanation: "Deep listening is love in action. It's empathy embodied. It builds community by creating belonging. When you listen, you see the divine in others."
    }
  },
  {
    cardId: 20,
    deeperMeaning: "Letting go isn't giving up—it's making space. You can't fill a cup that's already full. When you release what no longer serves you, you create room for what does. This includes beliefs, relationships, habits, and stories. Holding on doesn't protect you; it imprisons you.",
    practice: "Identify one thing you're holding onto—a grudge, a limiting belief, a toxic habit—and consciously release it. Write it down, then burn or bury the paper. Let it go.",
    reflectionQuestions: [
      "What am I holding onto that's actually holding me back?",
      "What would be possible if I let go?",
      "Am I clinging to the familiar because I'm afraid of the unknown?",
      "What belief about myself is no longer true?",
      "What's the first thing I need to release to move forward?"
    ],
    integration: [
      "Create a 'letting go ritual'—write and burn/bury what no longer serves you",
      "Practice 'non-attachment'—hold things lightly",
      "Journal: What am I making space for by letting go?",
      "Share your release with someone—speaking it makes it real"
    ],
    lecheConnection: {
      pillars: ["Healing", "Empowerment"],
      explanation: "Letting go is healing—it releases old wounds and patterns. It's empowering because you're choosing freedom over familiarity. You reclaim your power by releasing what weighs you down."
    }
  },
  {
    cardId: 21,
    deeperMeaning: "You are not a passive observer of your life—you're the creator. Your thoughts become things. Your beliefs become reality. When you consciously design your experiences, you shift from victim to creator. You're not waiting for life to happen; you're making it happen.",
    practice: "Consciously create one positive experience today. Plan something that brings you joy. Surprise someone. Design a moment of beauty. Be intentional about your day.",
    reflectionQuestions: [
      "Am I reacting to life or creating it?",
      "What experiences am I unconsciously designing through my thoughts?",
      "If I'm the architect, what reality am I building?",
      "What would I create if I fully owned my power?",
      "What's one conscious choice I can make right now?"
    ],
    integration: [
      "Morning ritual: 'Today I choose to create...'",
      "Design one intentional moment every day",
      "Notice when you're in 'victim mode' and shift to 'creator mode'",
      "Journal: What did I consciously create today?"
    ],
    lecheConnection: {
      pillars: ["Empowerment", "Love"],
      explanation: "Conscious creation is ultimate empowerment. You're owning your power. It's self-love because you're honoring your desires and designing a life you love."
    }
  },
  {
    cardId: 22,
    deeperMeaning: "You are your harshest critic. The way you speak to yourself matters more than anything anyone else says. Self-compassion isn't self-indulgence—it's self-respect. When you forgive yourself, you free yourself. You can't hate yourself into a version you love.",
    practice: "Forgive yourself for one past mistake today. Say it out loud: 'I forgive myself for [mistake]. I did the best I could with what I knew then.' Feel the weight lift.",
    reflectionQuestions: [
      "What am I still punishing myself for?",
      "Would I speak to a friend the way I speak to myself?",
      "What would change if I treated myself with the same compassion I offer others?",
      "What mistake am I ready to release?",
      "How would I show up if I wasn't carrying guilt?"
    ],
    integration: [
      "Practice 'self-compassion breaks'—place hand on heart and say: 'I'm doing my best'",
      "Write a forgiveness letter to yourself",
      "Replace self-criticism with self-encouragement for one week",
      "Share this practice with someone who needs it"
    ],
    lecheConnection: {
      pillars: ["Love", "Healing"],
      explanation: "Self-compassion is the foundation of self-love. Forgiveness is profound healing. When you're kind to yourself, you model love for others."
    }
  },
  {
    cardId: 23,
    deeperMeaning: "Receiving is just as important as giving. Many people are comfortable giving but struggle to receive—this creates imbalance. When you block receiving, you block abundance. Accepting help, compliments, and gifts graciously honors both the giver and yourself. You are worthy of receiving.",
    practice: "Accept help or a compliment today without deflecting. Don't minimize it, explain it away, or feel guilty. Just say 'thank you' and let it in.",
    reflectionQuestions: [
      "Why is it easier for me to give than receive?",
      "What am I afraid will happen if I let abundance in?",
      "How do I deflect compliments or help?",
      "What would change if I believed I was worthy of receiving?",
      "Where in my life am I blocking the flow?"
    ],
    integration: [
      "Practice saying 'thank you' without justification",
      "Ask for help with something this week",
      "Notice when you deflect—pause and let it in instead",
      "Journal: What did I receive today, and how did it feel?"
    ],
    lecheConnection: {
      pillars: ["Love", "Empowerment", "Healing"],
      explanation: "Receiving is self-love—you're honoring your worthiness. It's empowering because you're allowing support. It heals the belief that you must do everything alone."
    }
  },
  {
    cardId: 24,
    deeperMeaning: "Trying to control outcomes is exhausting. The universe has a timing and a plan bigger than yours. Trusting the timing doesn't mean being passive—it means doing your part and releasing attachment to the 'how' and 'when.' Surrender is not giving up; it's letting go of the illusion of control.",
    practice: "Surrender one outcome you've been trying to control. Say: 'I trust the timing of my life. What's meant for me won't miss me.' Feel the relief.",
    reflectionQuestions: [
      "What am I trying to force instead of allowing?",
      "Where am I resisting the flow because I think I know better?",
      "What would trust look like in this situation?",
      "What's the cost of my need for control?",
      "What becomes possible when I let go?"
    ],
    integration: [
      "Morning mantra: 'I trust the timing of my life'",
      "Notice when you're forcing—pause and ask: 'Can I surrender?'",
      "Journal: What have I been trying to control, and what if I let go?",
      "Practice 'active surrender'—do your best, then release"
    ],
    lecheConnection: {
      pillars: ["Healing", "Empowerment"],
      explanation: "Trusting timing is healing—it releases anxiety and control. It's empowering because you're choosing faith over fear. Surrender is the highest form of power."
    }
  },
  {
    cardId: 25,
    deeperMeaning: "The moment you think you know everything, you stop growing. Life is the ultimate teacher, and every experience is a lesson. Curiosity keeps you alive. The beginner's mind sees possibility; the expert's mind sees limits. Stay humble, stay curious, stay open.",
    practice: "Learn something new today that genuinely interests you. Not for productivity—for joy. Read an article, watch a tutorial, ask someone to teach you. Feed your curiosity.",
    reflectionQuestions: [
      "When did I stop being curious?",
      "What assumptions am I making that limit my learning?",
      "What would I explore if I had no fear of looking foolish?",
      "Who can I learn from today?",
      "What's one thing I'm curious about right now?"
    ],
    integration: [
      "Dedicate 20 minutes daily to learning something new",
      "Ask 'Why?' like a child—reclaim curiosity",
      "Join a class, workshop, or community around something you love",
      "Share what you're learning on social media—inspire others"
    ],
    lecheConnection: {
      pillars: ["Empowerment", "Community"],
      explanation: "Learning is empowering—it expands your capacity. Sharing what you learn builds community. Curiosity keeps you connected to life's magic."
    }
  },
  {
    cardId: 26,
    deeperMeaning: "Joy is contagious. When you spread it, you don't lose it—you multiply it. Laughter is medicine. Smiling is a gift. You never know what someone is going through; your joy might be the light they needed today. Be a joy-carrier.",
    practice: "Make someone smile or laugh today. Tell a joke. Send a funny meme. Give an unexpected compliment. Notice how their joy becomes yours.",
    reflectionQuestions: [
      "When was the last time I laughed until my belly hurt?",
      "Am I taking life (and myself) too seriously?",
      "Who lights me up, and why?",
      "How can I be a source of joy for others?",
      "What small act of joy can I do right now?"
    ],
    integration: [
      "Make 'spread joy' a daily practice",
      "Keep a list of things that make you laugh—revisit it when you're down",
      "Send a joy-filled message to someone who needs it",
      "Dance, play, be silly—reclaim your playful spirit"
    ],
    lecheConnection: {
      pillars: ["Love", "Community"],
      explanation: "Joy is love expressed. Spreading it builds community and connection. Shared laughter heals wounds and dissolves barriers."
    }
  },
  {
    cardId: 27,
    deeperMeaning: "The present moment is all we have. Past is memory; future is imagination. When you're here now, anxiety dissolves—because anxiety lives in the future. Depression dissolves—because depression lives in the past. Presence is peace. The breath is your anchor to now.",
    practice: "Practice 5 minutes of mindful breathing. Sit. Close your eyes. Feel each breath. When your mind wanders, gently return to the breath. This is meditation.",
    reflectionQuestions: [
      "Where am I right now—physically here, mentally elsewhere?",
      "What am I missing by not being present?",
      "What does 'now' feel like when I fully inhabit it?",
      "How much of my suffering exists only in my head?",
      "What becomes possible when I'm fully here?"
    ],
    integration: [
      "Set hourly reminders to pause and take 3 conscious breaths",
      "Practice 'presence anchors'—taste your food, feel the water, notice your feet",
      "Start a daily meditation practice (even just 5 minutes)",
      "Journal: What did I notice today when I was present?"
    ],
    breathwork: {
      name: "Present Moment Breath",
      technique: "Mindful Breathing",
      duration: "5-10 minutes",
      instructions: [
        "Sit comfortably with eyes closed",
        "Breathe naturally—don't force or change it",
        "Simply observe: 'I am breathing in... I am breathing out'",
        "When mind wanders, gently return to the breath",
        "No judgment—just return, again and again",
        "End by slowly opening your eyes"
      ],
      benefits: [
        "Trains attention and focus",
        "Reduces anxiety and stress",
        "Cultivates inner peace",
        "Builds mindfulness over time"
      ]
    },
    lecheConnection: {
      pillars: ["Healing", "Love"],
      explanation: "Presence is healing—it soothes the nervous system. It's self-love because you're giving yourself the gift of now. Peace lives in presence."
    }
  },
  {
    cardId: 28,
    deeperMeaning: "Jealousy contracts; celebration expands. When you celebrate others, you're affirming that abundance exists. Their success doesn't diminish yours—it proves what's possible. A rising tide lifts all boats. Your joy for others opens the door for your own blessings.",
    practice: "Genuinely congratulate someone on their achievement today. Not performatively—sincerely. Feel the expansion in your chest when you celebrate them.",
    reflectionQuestions: [
      "Where does jealousy show up in my life?",
      "What am I afraid I'll lose if others succeed?",
      "How would it feel to celebrate without comparison?",
      "Who can I genuinely celebrate today?",
      "What would change if I saw everyone's win as a win for all?"
    ],
    integration: [
      "Make 'celebration' a daily practice—cheer for others publicly",
      "Notice jealousy—transform it into inspiration",
      "Share others' wins on social media—lift them up",
      "Remember: There's enough success for everyone"
    ],
    lecheConnection: {
      pillars: ["Love", "Community", "Empowerment"],
      explanation: "Celebrating others is love in action. It builds community through support. It's empowering because it affirms abundance for all."
    }
  },
  {
    cardId: 29,
    deeperMeaning: "Resilience isn't about never falling—it's about always rising. You've survived 100% of your worst days. Every challenge you've overcome built the strength you carry now. Resilience is the muscle you develop through adversity. You're not broken; you're becoming.",
    practice: "Reflect on one past challenge you overcame. Write down: What did I learn? How am I stronger? What did that season teach me? Honor your journey.",
    reflectionQuestions: [
      "What challenge did I think would break me, but didn't?",
      "How have I grown through difficulty?",
      "What strengths did I discover in hardship?",
      "Am I giving myself credit for how far I've come?",
      "What challenge am I currently facing that I'll one day look back on with pride?"
    ],
    integration: [
      "Create a 'resilience list'—times you bounced back",
      "Share your story of overcoming with someone",
      "When facing a new challenge, remind yourself: 'I've done hard things before'",
      "Celebrate your resilience—you're still here"
    ],
    lecheConnection: {
      pillars: ["Healing", "Empowerment"],
      explanation: "Resilience is proof of healing. Every time you rise, you reclaim power. Your story of survival empowers others to keep going."
    }
  },
  {
    cardId: 30,
    deeperMeaning: "Creativity isn't reserved for artists—it's your birthright. Every human is creative; some have just forgotten. When you create, you're tapping into the divine flow of source energy. Creativity isn't about perfection; it's about expression. You don't find creativity—you allow it.",
    practice: "Engage in a creative activity for 15 minutes. Draw. Write. Dance. Build. Cook. Make something without judgment. Let your soul play.",
    reflectionQuestions: [
      "When did I stop calling myself creative?",
      "What would I create if I knew no one would judge it?",
      "How do I feel when I'm in creative flow?",
      "What's blocking my creative expression?",
      "What wants to be created through me?"
    ],
    integration: [
      "Schedule 'creative play time' weekly—no pressure, just play",
      "Try a new creative medium you've never explored",
      "Share your creation (even if imperfect)—vulnerability is powerful",
      "Join a creative community—surround yourself with makers"
    ],
    lecheConnection: {
      pillars: ["Empowerment", "Love"],
      explanation: "Creativity is empowering—it's you expressing your unique voice. It's self-love because you're honoring your inner child. Creativity connects you to source."
    }
  }
];
