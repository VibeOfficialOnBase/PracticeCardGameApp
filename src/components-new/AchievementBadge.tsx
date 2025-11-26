'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ACHIEVEMENTS, getUserAchievements, type Achievement } from '@/utils/achievementsTracking';
import { Lock } from 'lucide-react';
import Image from 'next/image';

interface AchievementBadgeProps {
  achievement: Achievement;
  unlocked: boolean;
  unlockedAt?: number;
}

export function AchievementBadge({ achievement, unlocked, unlockedAt }: AchievementBadgeProps) {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: unlocked ? 1.05 : 1.02 }}
      className="relative"
    >
      <Card
        className={`relative overflow-hidden border-2 backdrop-blur-sm transition-all duration-300 ${
          unlocked
            ? `bg-gradient-to-br ${achievement.color} border-white/30 shadow-lg`
            : 'bg-white/5 border-white/10 opacity-60'
        }`}
      >
        <CardContent className="p-4 text-center">
          {/* Icon */}
          <div className={`text-4xl mb-2 ${!unlocked && 'grayscale opacity-40'}`}>
            {unlocked ? achievement.icon : <Lock className="w-10 h-10 mx-auto text-white/30" />}
          </div>
          
          {/* Name */}
          <h3 className={`font-bold mb-1 ${unlocked ? 'text-white' : 'text-white/50'}`}>
            {achievement.name}
          </h3>
          
          {/* Description */}
          <p className={`text-xs mb-2 ${unlocked ? 'text-white/90' : 'text-white/40'}`}>
            {achievement.description}
          </p>
          
          {/* Unlocked Badge */}
          {unlocked && unlockedAt && (
            <Badge variant="secondary" className="bg-white/20 text-white text-xs">
              {new Date(unlockedAt).toLocaleDateString()}
            </Badge>
          )}
          
          {!unlocked && (
            <Badge variant="outline" className="border-white/20 text-white/50 text-xs">
              Locked
            </Badge>
          )}
          
          {/* Shine Effect for Unlocked */}
          {unlocked && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_ease-in-out_infinite]" />
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface AchievementsGridProps {
  username: string;
}

export function AchievementsGrid({ username }: AchievementsGridProps) {
  const userAchievements = getUserAchievements(username);
  
  const achievementsList = ACHIEVEMENTS.map((achievement) => {
    const userAch = userAchievements.find((ua) => ua.achievementId === achievement.id);
    return {
      achievement,
      unlocked: !!userAch,
      unlockedAt: userAch?.unlockedAt,
    };
  });
  
  const unlockedCount = achievementsList.filter((a) => a.unlocked).length;
  
  return (
    <div className="space-y-6">
      {/* Logo */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <span className="text-white/80 text-sm">Powered By</span>
        <Image
          src="https://usdozf7pplhxfvrl.public.blob.vercel-storage.com/7c5f1896-f11b-4229-b9b9-2e9aea5bb543-USUKADwyIN8ZDriizlUoypra0FvUWW"
          alt="VibeOfficial"
          width={32}
          height={32}
          className="object-contain rounded-full shadow-lg border-2 border-purple-300/50"
        />
        <span className="text-white font-bold">$VibeOfficial</span>
      </div>
      
      {/* Progress Header */}
      <div className="bg-gradient-to-r from-purple-900/40 to-indigo-900/40 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">Achievements</h2>
          <Badge className="bg-white/20 text-white text-lg px-4 py-1">
            {unlockedCount} / {ACHIEVEMENTS.length}
          </Badge>
        </div>
        <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(unlockedCount / ACHIEVEMENTS.length) * 100}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-yellow-500 to-orange-500"
          />
        </div>
        <p className="text-indigo-200 text-sm mt-2 text-center">
          Keep practicing to unlock more achievements!
        </p>
      </div>
      
      {/* Achievements Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {achievementsList.map(({ achievement, unlocked, unlockedAt }) => (
          <AchievementBadge
            key={achievement.id}
            achievement={achievement}
            unlocked={unlocked}
            unlockedAt={unlockedAt}
          />
        ))}
      </div>
    </div>
  );
}
