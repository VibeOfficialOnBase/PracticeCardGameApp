export interface JournalPromptSet {
  affirmation: string;
  mission: string;
  inspiration: string;
}

// Generate dynamic prompts based on card content
export function generateJournalPrompts(
  affirmation: string,
  mission: string,
  inspiration: string,
  dayNumber: number
): JournalPromptSet {
  // Extract key themes from the card
  const affirmationPrompt = generateAffirmationPrompt(affirmation, dayNumber);
  const missionPrompt = generateMissionPrompt(mission, dayNumber);
  const inspirationPrompt = generateInspirationPrompt(inspiration, dayNumber);
  
  return {
    affirmation: affirmationPrompt,
    mission: missionPrompt,
    inspiration: inspirationPrompt,
  };
}

function generateAffirmationPrompt(affirmation: string, dayNumber: number): string {
  const prompts = [
    `What does "${affirmation}" mean to you personally? Reflect on a time when you embodied this truth.`,
    `How can you live "${affirmation}" more fully today? What would change in your life?`,
    `Write about a moment when you forgot "${affirmation}". What brought you back to this truth?`,
    `If you fully believed "${affirmation}", what would you do differently today?`,
    `Describe how "${affirmation}" feels in your body. Where do you feel it most strongly?`,
  ];
  
  return prompts[dayNumber % prompts.length];
}

function generateMissionPrompt(mission: string, dayNumber: number): string {
  const prompts = [
    `How will you approach "${mission}" today? What obstacles might you face and how will you overcome them?`,
    `Why does "${mission}" matter to you? How will completing it impact your day?`,
    `Visualize yourself completing "${mission}". What does success look like? How will you feel?`,
    `What's the first small step you can take toward "${mission}"? When will you do it?`,
    `Reflect on how "${mission}" aligns with your bigger goals. What's the deeper purpose?`,
  ];
  
  return prompts[dayNumber % prompts.length];
}

function generateInspirationPrompt(inspiration: string, dayNumber: number): string {
  const prompts = [
    `"${inspiration}" - What personal experience does this remind you of? Tell that story.`,
    `How has "${inspiration}" proven true in your life? Share a specific example.`,
    `If you shared "${inspiration}" with someone who needed it most, who would that be and why?`,
    `What would your life look like if you lived by "${inspiration}" every single day?`,
    `Write a letter to your future self about how "${inspiration}" is guiding you right now.`,
  ];
  
  return prompts[dayNumber % prompts.length];
}

// Milestone-specific prompts
export function getMilestonePrompts(streakDay: number): JournalPromptSet | null {
  if (streakDay === 7) {
    return {
      affirmation: "Reflect on your first week of PRACTICE. What surprised you most about yourself?",
      mission: "What's the biggest challenge you've overcome in these 7 days? How did you do it?",
      inspiration: "Looking back at your week, what moment are you most proud of and why?",
    };
  }
  
  if (streakDay === 30) {
    return {
      affirmation: "You've completed 30 days! How has daily practice transformed you?",
      mission: "What habit or mindset shift from the past month will you carry forward forever?",
      inspiration: "Write a letter to someone starting PRACTICE. What wisdom would you share?",
    };
  }
  
  if (streakDay === 100) {
    return {
      affirmation: "100 days of PRACTICE! Who have you become through this journey?",
      mission: "Looking back at day 1, what would you tell your past self about this journey?",
      inspiration: "Your 100-day story could inspire thousands. What's the most powerful lesson you've learned?",
    };
  }
  
  if (streakDay === 365) {
    return {
      affirmation: "A full year of PRACTICE! Describe your transformation in vivid detail.",
      mission: "What seemed impossible on day 1 that now feels natural? How did that shift happen?",
      inspiration: "You are living proof of what's possible. What message does your journey send to the world?",
    };
  }
  
  return null;
}

// Quick prompt templates for inspiration
export const QUICK_PROMPTS = {
  gratitude: [
    "What are you grateful for in this moment?",
    "Who in your life deserves appreciation today?",
    "What small blessing did you almost overlook today?",
  ],
  growth: [
    "What challenge are you currently growing through?",
    "What's one thing you learned about yourself today?",
    "How are you different than you were a month ago?",
  ],
  intention: [
    "What's your intention for the rest of today?",
    "How do you want to show up in the world right now?",
    "What's one thing you can do today that your future self will thank you for?",
  ],
  reflection: [
    "What emotion is present for you right now? What is it teaching you?",
    "What pattern or habit are you ready to release?",
    "What truth have you been avoiding that needs to be acknowledged?",
  ],
};
