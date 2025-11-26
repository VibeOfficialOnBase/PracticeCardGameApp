export interface BreathworkGuide {
  id: string;
  name: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  benefits: string[];
  bestFor: string[];
  instructions: string[];
  contraindications: string[];
  tips: string[];
  science: string;
}

export const breathworkGuides: BreathworkGuide[] = [
  {
    id: 'box-breathing',
    name: 'Box Breathing (4-4-4-4)',
    duration: '5-10 minutes',
    difficulty: 'Beginner',
    benefits: [
      'Reduces stress and anxiety',
      'Improves focus and concentration',
      'Lowers heart rate and blood pressure',
      'Activates parasympathetic nervous system',
      'Enhances emotional regulation'
    ],
    bestFor: [
      'Stressful situations',
      'Before important meetings or presentations',
      'When you need to focus',
      'Calming anxiety',
      'Resetting your nervous system'
    ],
    instructions: [
      'Sit comfortably with your spine straight',
      'Rest your hands on your lap or knees',
      'Close your eyes or soften your gaze',
      'Inhale slowly through your nose for 4 counts',
      'Hold your breath for 4 counts (don\'t strain)',
      'Exhale slowly through your mouth for 4 counts',
      'Hold empty for 4 counts',
      'Repeat this cycle for 5-10 minutes',
      'Gradually return to natural breathing',
      'Notice how you feel'
    ],
    contraindications: [
      'Don\'t practice while driving or operating machinery',
      'If you feel dizzy, return to natural breathing',
      'Those with respiratory conditions should start gently'
    ],
    tips: [
      'Start with 3 counts if 4 feels too long',
      'Use your fingers to count if it helps',
      'Visualize drawing a box: up, across, down, across',
      'Practice daily to build your capacity',
      'Navy SEALs use this to stay calm under pressure'
    ],
    science: 'Box breathing activates the vagus nerve, which controls the parasympathetic nervous system. This "rest and digest" state counteracts the "fight or flight" response, lowering cortisol levels and bringing your body into balance. Studies show it reduces stress hormones by up to 25% and improves HRV (heart rate variability), a marker of nervous system resilience.'
  },
  {
    id: '4-7-8-breath',
    name: '4-7-8 Breath (Natural Tranquilizer)',
    duration: '2-5 minutes',
    difficulty: 'Beginner',
    benefits: [
      'Induces deep relaxation',
      'Helps you fall asleep faster',
      'Reduces anxiety and panic',
      'Lowers blood pressure',
      'Acts as a natural sedative'
    ],
    bestFor: [
      'Insomnia and sleep issues',
      'Anxiety attacks',
      'Winding down in the evening',
      'Calming racing thoughts',
      'Pre-sleep ritual'
    ],
    instructions: [
      'Sit or lie down comfortably',
      'Place the tip of your tongue behind your upper front teeth',
      'Keep it there throughout the entire practice',
      'Exhale completely through your mouth with a "whoosh" sound',
      'Close your mouth and inhale quietly through your nose for 4 counts',
      'Hold your breath for 7 counts',
      'Exhale completely through your mouth for 8 counts (make a whoosh sound)',
      'This is one cycle. Repeat for 4 cycles total',
      'Practice twice daily for best results',
      'Don\'t exceed 4 cycles when starting out'
    ],
    contraindications: [
      'Don\'t practice while driving',
      'If you feel dizzy, stop and breathe naturally',
      'Start with shorter counts if 4-7-8 feels too intense',
      'Not recommended during pregnancy without medical approval'
    ],
    tips: [
      'The ratio (4-7-8) matters more than the exact time',
      'You can adjust to 2-3.5-4 if needed',
      'The exhale is the most important part—make it long and full',
      'Practice before bed for deep sleep',
      'Dr. Andrew Weil calls this "the most powerful relaxation technique I know"'
    ],
    science: 'The extended exhale (8 counts) activates the vagus nerve more strongly than the inhale, triggering deep parasympathetic activation. The breath hold (7 counts) increases CO2 in the blood, which signals the body to relax. This combination creates a powerful sedative effect without drugs. Research shows it can reduce time to fall asleep by up to 50%.'
  },
  {
    id: 'coherent-breathing',
    name: 'Coherent Breathing (5-5 Rhythm)',
    duration: '10-20 minutes',
    difficulty: 'Beginner',
    benefits: [
      'Maximizes heart rate variability (HRV)',
      'Balances sympathetic and parasympathetic systems',
      'Improves emotional resilience',
      'Enhances focus and clarity',
      'Reduces inflammation'
    ],
    bestFor: [
      'Daily baseline practice',
      'Building nervous system resilience',
      'Emotional balance',
      'Heart-brain coherence',
      'Long-term stress management'
    ],
    instructions: [
      'Sit comfortably with your spine straight',
      'Close your eyes or soften your gaze',
      'Breathe in through your nose for 5 counts',
      'Breathe out through your nose for 5 counts',
      'No pause between breaths—just a smooth transition',
      'Continue this rhythm for 10-20 minutes',
      'Focus on the smoothness and evenness of each breath',
      'If your mind wanders, gently return to counting',
      'End gradually, allowing your breath to return to normal',
      'Sit for a moment and notice how you feel'
    ],
    contraindications: [
      'None for most people—this is one of the safest practices',
      'If you feel lightheaded, slow down or pause'
    ],
    tips: [
      'Use a metronome app set to 6 breaths per minute',
      'This is the scientifically optimal breathing rate for most people',
      'Practice daily for maximum benefit',
      'Combine with heart-focused meditation for deeper effect',
      'This is foundation-level breathwork—master this first'
    ],
    science: 'Breathing at 5-6 breaths per minute creates "resonance" between your heart rate, blood pressure, and respiratory system. This synchronization maximizes HRV, which is linked to longevity, emotional resilience, and nervous system health. Studies by the HeartMath Institute show this rhythm creates coherence between the heart and brain, improving decision-making and emotional regulation.'
  },
  {
    id: 'alternate-nostril',
    name: 'Alternate Nostril Breathing (Nadi Shodhana)',
    duration: '5-10 minutes',
    difficulty: 'Beginner',
    benefits: [
      'Balances left and right brain hemispheres',
      'Calms the mind',
      'Reduces stress and anxiety',
      'Improves focus and mental clarity',
      'Balances energy (prana)'
    ],
    bestFor: [
      'Morning practice',
      'Before meditation',
      'When feeling mentally scattered',
      'Balancing emotions',
      'Clearing brain fog'
    ],
    instructions: [
      'Sit comfortably with your spine straight',
      'Use your right hand: fold your index and middle fingers into your palm',
      'Your thumb and ring finger will be used to close your nostrils',
      'Close your right nostril with your thumb',
      'Inhale slowly through your left nostril',
      'Close your left nostril with your ring finger',
      'Release your thumb and exhale through your right nostril',
      'Inhale through your right nostril',
      'Close your right nostril with your thumb',
      'Release your ring finger and exhale through your left nostril',
      'This is one complete cycle. Repeat 5-10 times',
      'Always end by exhaling through your left nostril'
    ],
    contraindications: [
      'Avoid if you have a cold or blocked nose',
      'Don\'t force the breath or strain',
      'If you feel dizzy, pause and breathe normally'
    ],
    tips: [
      'Keep your breath smooth and even',
      'Don\'t block your nostril too hard—just gently close it',
      'Practice in the morning for best results',
      'Advanced: Add a breath retention after each inhale',
      'This is a traditional yogic practice used for thousands of years'
    ],
    science: 'Your nostrils connect to different hemispheres of the brain. The right nostril activates the left brain (logical, analytical), and the left nostril activates the right brain (creative, intuitive). Alternating nostrils balances both hemispheres, creating mental clarity and emotional equilibrium. Research shows it reduces stress hormones and improves cognitive function.'
  },
  {
    id: 'breath-of-fire',
    name: 'Breath of Fire (Kapalabhati)',
    duration: '1-3 minutes per round',
    difficulty: 'Intermediate',
    benefits: [
      'Increases energy and alertness',
      'Clears brain fog',
      'Strengthens core muscles',
      'Detoxifies the body',
      'Builds heat and energy'
    ],
    bestFor: [
      'Morning energy boost',
      'Replacing coffee',
      'Before a workout',
      'Clearing mental stagnation',
      'Activating your solar plexus (power center)'
    ],
    instructions: [
      'Sit with your spine straight, hands on knees',
      'Take a deep inhale through your nose',
      'Begin rapid, rhythmic breathing through your nose',
      'Focus on the exhale: pump your belly in sharply',
      'Allow the inhale to happen naturally as your belly relaxes',
      'Keep your face, neck, and shoulders relaxed',
      'Start with 30 breaths, then rest',
      'Work up to 1-3 minutes per round',
      'Do 3 rounds total with rest in between',
      'End with a deep inhale, hold, and slow exhale'
    ],
    contraindications: [
      'Avoid during pregnancy',
      'Not recommended for those with high blood pressure or heart conditions',
      'Skip if you have a hernia or abdominal issues',
      'Don\'t practice on a full stomach',
      'If you feel dizzy, stop immediately'
    ],
    tips: [
      'This should feel vigorous but not forced',
      'The exhale is active; the inhale is passive',
      'Imagine you\'re blowing out birthday candles rapidly',
      'Start slowly and build speed as you get comfortable',
      'This is more intense than other practices—respect your limits'
    ],
    science: 'Breath of Fire rapidly oxygenates the blood while increasing CO2 expulsion. This alkalizes the blood pH temporarily, creating an energizing effect. It also activates the sympathetic nervous system, releasing adrenaline and cortisol in controlled amounts—like a natural, healthy dose of stress that wakes you up. The abdominal pumping also massages internal organs and strengthens the diaphragm.'
  }
];
