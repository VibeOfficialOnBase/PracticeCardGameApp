import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const cardId = searchParams.get('cardId') || '1';
    const affirmation = searchParams.get('affirmation') || 'Daily PRACTICE Card';
    const username = searchParams.get('username') || 'Practitioner';
    const streak = searchParams.get('streak') || '1';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            fontFamily: 'system-ui',
            position: 'relative',
          }}
        >
          {/* Background Pattern */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
            }}
          />
          
          {/* Content Container */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '60px',
              maxWidth: '900px',
              textAlign: 'center',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '30px',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(255,255,255,0.2)',
            }}
          >
            {/* Circular VibeOfficial Logo */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '15px',
              }}
            >
              <img
                src="https://usdozf7pplhxfvrl.public.blob.vercel-storage.com/thumbnail_6c3fa7f1-3668-4a88-befc-6f2e019c6c52-ExkvmE6HvykbuBjbilMbIxlDOu4RAW"
                alt="VibeOfficial"
                width={100}
                height={100}
                style={{
                  borderRadius: '50%',
                  border: '3px solid rgba(255,255,255,0.4)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                }}
              />
            </div>

            {/* PRACTICE Title */}
            <div
              style={{
                fontSize: 48,
                fontWeight: 'bold',
                color: 'white',
                marginBottom: '20px',
              }}
            >
              PRACTICE
            </div>

            {/* Affirmation */}
            <div
              style={{
                fontSize: 36,
                fontWeight: 600,
                color: 'white',
                marginBottom: '30px',
                lineHeight: 1.4,
                maxWidth: '750px',
              }}
            >
              "{affirmation}"
            </div>

            {/* User Info */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '30px',
                marginTop: '20px',
              }}
            >
              <div
                style={{
                  fontSize: 24,
                  color: 'rgba(255,255,255,0.9)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                👤 {username}
              </div>
              <div
                style={{
                  fontSize: 24,
                  color: 'rgba(255,255,255,0.9)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                🔥 {streak} Day Streak
              </div>
            </div>

            {/* Card Number Badge */}
            <div
              style={{
                position: 'absolute',
                top: '30px',
                right: '30px',
                background: 'rgba(255,255,255,0.2)',
                padding: '15px 25px',
                borderRadius: '50px',
                fontSize: 20,
                fontWeight: 'bold',
                color: 'white',
                border: '2px solid rgba(255,255,255,0.3)',
              }}
            >
              Card #{cardId}
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              fontSize: 20,
              color: 'rgba(255,255,255,0.8)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            💎 $VibeOfficial on Base
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    console.error('Error generating OG image:', e);
    return new Response('Failed to generate image', { status: 500 });
  }
}
