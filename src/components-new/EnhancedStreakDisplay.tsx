'use client';

import { motion } from 'framer-motion';
import { Flame, Trophy, Star, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface EnhancedStreakDisplayProps {
  streak: number;
  username: string;
}

export function EnhancedStreakDisplay({ streak, username }: EnhancedStreakDisplayProps) {
  // Determine streak tier and visual effects
  const getStreakTier = (streakDays: number): { tier: string; color: string; icon: React.ReactNode; message: string } => {
    if (streakDays >= 365) {
      return {
        tier: 'LEGENDARY',
        color: 'from-yellow-400 via-orange-500 to-red-500',
        icon: <Trophy className="w-8 h-8 text-yellow-300" />,
        message: 'Year-long commitment! 🏆'
      };
    } else if (streakDays >= 100) {
      return {
        tier: 'DIAMOND',
        color: 'from-blue-400 via-purple-500 to-pink-500',
        icon: <Star className="w-8 h-8 text-blue-300" />,
        message: '100+ days of excellence! 💎'
      };
    } else if (streakDays >= 30) {
      return {
        tier: 'GOLD',
        color: 'from-yellow-400 via-yellow-500 to-orange-400',
        icon: <Zap className="w-8 h-8 text-yellow-300" />,
        message: 'One month strong! ⚡'
      };
    } else if (streakDays >= 7) {
      return {
        tier: 'SILVER',
        color: 'from-gray-300 via-gray-400 to-gray-500',
        icon: <Flame className="w-8 h-8 text-orange-400" />,
        message: 'One week streak! 🔥'
      };
    } else {
      return {
        tier: 'BRONZE',
        color: 'from-orange-300 via-orange-400 to-orange-500',
        icon: <Flame className="w-7 h-7 text-orange-400" />,
        message: 'Keep it going! 🌟'
      };
    }
  };

  const streakTier = getStreakTier(streak);

  if (streak === 0) return null;

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      className="w-full max-w-md mx-auto mb-6"
    >
      <Card className={`relative overflow-hidden bg-gradient-to-br ${streakTier.color} border-0 shadow-2xl`}>
        {/* Animated background shimmer */}
        <div className="absolute inset-0 opacity-30">
          <motion.div
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
            className="w-full h-full bg-gradient-to-br from-white/20 to-transparent"
          />
        </div>

        <div className="relative z-10 p-6">
          {/* Streak Counter */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: 'loop',
                }}
              >
                {streakTier.icon}
              </motion.div>
              <div>
                <motion.h3
                  className="text-4xl font-bold text-white drop-shadow-lg"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {streak}
                </motion.h3>
                <p className="text-white/90 text-sm font-semibold drop-shadow-md">
                  Day Streak
                </p>
              </div>
            </div>

            {/* Tier Badge */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border-2 border-white/40"
            >
              <p className="text-white font-bold text-sm drop-shadow-md">
                {streakTier.tier}
              </p>
            </motion.div>
          </div>

          {/* Streak Message */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white text-center font-semibold drop-shadow-md"
          >
            {streakTier.message}
          </motion.p>

          {/* Progress to next milestone */}
          {streak < 365 && (
            <div className="mt-4">
              <div className="flex justify-between text-white/80 text-xs mb-2">
                <span>Current: {streak} days</span>
                <span>
                  Next: {streak < 7 ? '7' : streak < 30 ? '30' : streak < 100 ? '100' : '365'} days
                </span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${(streak / (streak < 7 ? 7 : streak < 30 ? 30 : streak < 100 ? 100 : 365)) * 100}%`,
                  }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="h-full bg-white rounded-full shadow-lg"
                />
              </div>
            </div>
          )}

          {/* Animated fire particles */}
          {streak >= 3 && (
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-yellow-300/60"
                  initial={{ bottom: '0%', left: `${20 + i * 15}%`, opacity: 0 }}
                  animate={{
                    bottom: '100%',
                    opacity: [0, 1, 0],
                    scale: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: 'easeOut',
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
