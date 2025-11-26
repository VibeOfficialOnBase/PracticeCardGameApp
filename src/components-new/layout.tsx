import type { Metadata } from 'next'
import '@coinbase/onchainkit/styles.css';
import './globals.css';
import { Providers } from './providers';
import FarcasterWrapper from "@/components/FarcasterWrapper";
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Toaster } from '@/components/ui/sonner';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
        <html lang="en">
          <body>
            <a href="#main-content" className="skip-to-content">
              Skip to content
            </a>
            <ErrorBoundary>
              <Providers>
                <FarcasterWrapper>
                  {children}
                </FarcasterWrapper>
                <Toaster />
              </Providers>
            </ErrorBoundary>
          </body>
        </html>
      );
}

export const metadata: Metadata = {
        title: "Vibe PRACTICE Card Game",
        description: "Pull daily affirmation cards to boost self-empowerment. Token-gated access with leaderboards and sharing features. Join raffles and enhance your vibe with $VibeOfficial.",
        other: { "fc:frame": JSON.stringify({"version":"next","imageUrl":"https://usdozf7pplhxfvrl.public.blob.vercel-storage.com/thumbnail_6c3fa7f1-3668-4a88-befc-6f2e019c6c52-ExkvmE6HvykbuBjbilMbIxlDOu4RAW","button":{"title":"Open with Ohara","action":{"type":"launch_frame","name":"Vibe PRACTICE Card Game","url":"https://stems-prevent-512.app.ohara.ai","splashImageUrl":"https://usdozf7pplhxfvrl.public.blob.vercel-storage.com/farcaster/splash_images/splash_image1.svg","splashBackgroundColor":"#ffffff"}}}
        ) }
    };
