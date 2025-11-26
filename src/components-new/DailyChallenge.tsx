'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Target, Check, Gift, Sparkles } from 'lucide-react';

interface Challenge {
  id: string;
  title: string;
  description: string;
  reward: string;
  completed: boolean;
  progress: number;
  total: number;
}

interface DailyChallengeProps {
  username: string;
}

export function DailyChallenge({ username }: DailyChallengeProps) {
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: 'pull-and-journal',
      title: 'Pull & Journal',
      description: 'Pull today\'s card and write a journal entry',
      reward: '+2 bonus entries',
      completed: false,
      progress: 0,
      total: 2
    },
    {
      id: 'share-card',
      title: 'Spread the Vibes',
      description: 'Share your card on X (Twitter)',
      reward: '+1 bonus entry',
      completed: false,
      progress: 0,
      total: 1
    },
    {
      id: 'favorite-card',
      title: 'Save Inspiration',
      description: 'Add today\'s card to favorites',
      reward: '+1 bonus entry',
      completed: false,
      progress: 0,
      total: 1
    }
  ]);

  const completedCount = challenges.filter(c => c.completed).length;
  const totalChallenges = challenges.length;

  return (
    <Card className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border-indigo-400/30 backdrop-blur-sm p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="bg-gradient-to-br from-indigo-500 to-purple-500 p-2 rounded-lg"
          >
            <Target className="w-5 h-5 text-white" />
          </motion.div>
          <div>
            <h3 className="text-white font-bold">Daily Challenges</h3>
            <p className="text-white/60 text-sm">
              {completedCount}/{totalChallenges} completed
            </p>
          </div>
        </div>
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Gift className="w-6 h-6 text-yellow-400" />
        </motion.div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(completedCount / totalChallenges) * 100}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 relative"
          >
            <motion.div
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            />
          </motion.div>
        </div>
      </div>

      {/* Challenges List */}
      <div className="space-y-2">
        {challenges.map((challenge, index) => (
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div
              className={`flex items-center justify-between p-3 rounded-lg transition-all ${
                challenge.completed
                  ? 'bg-green-900/20 border border-green-400/30'
                  : 'bg-white/5 border border-white/10 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-3 flex-1">
                <motion.div
                  animate={challenge.completed ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.3 }}
                  className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    challenge.completed
                      ? 'bg-green-500'
                      : 'bg-white/10 border-2 border-white/30'
                  }`}
                >
                  {challenge.completed && (
                    <Check className="w-4 h-4 text-white" />
                  )}
                </motion.div>
                <div className="flex-1">
                  <p className={`font-semibold ${challenge.completed ? 'text-green-300' : 'text-white'}`}>
                    {challenge.title}
                  </p>
                  <p className="text-white/60 text-xs">{challenge.description}</p>
                </div>
              </div>
              <div className="text-right ml-2">
                <p className="text-yellow-400 text-xs font-bold whitespace-nowrap">
                  {challenge.reward}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Completion Reward */}
      {completedCount === totalChallenges && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border border-yellow-400/50 rounded-lg p-4 text-center"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-4xl mb-2"
          >
            🎉
          </motion.div>
          <p className="text-white font-bold mb-1">All Challenges Complete!</p>
          <p className="text-yellow-300 text-sm">
            +4 bonus giveaway entries earned today!
          </p>
        </motion.div>
      )}
    </Card>
  );
}
