'use client';

import { CommunityGiveawayPage } from '@/components/CommunityGiveawayPage';
import { GiveawayEmailCaptureForm } from '@/components/GiveawayEmailCaptureForm';

export default function GiveawayPage() {
  return (
    <div className="min-h-screen pt-16 px-4 pb-24 bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950">
      <div className="w-full max-w-6xl mx-auto space-y-8">
        <CommunityGiveawayPage />
        
        {/* Email Capture Form */}
        <div className="w-full max-w-2xl mx-auto">
          <GiveawayEmailCaptureForm />
        </div>
      </div>
    </div>
  );
}
