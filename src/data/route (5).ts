import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { untrustedData } = body;
    
    // Get the button clicked
    const buttonIndex = untrustedData?.buttonIndex || 1;
    
    // Get user's FID (Farcaster ID)
    const fid = untrustedData?.fid;
    
    if (process.env.NODE_ENV === 'development') {
      console.log('Frame interaction:', { fid, buttonIndex });
    }

    // Return next frame state
    return NextResponse.json({
      type: 'frame',
      version: 'next',
      imageUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'https://stems-prevent-512.app.ohara.ai'}/api/og?cardId=${Math.floor(Math.random() * 365) + 1}&affirmation=Daily+PRACTICE+Card`,
      button: {
        title: '✨ Pull Another Card',
        action: {
          type: 'launch_frame',
          name: 'PRACTICE',
          url: process.env.NEXT_PUBLIC_APP_URL || 'https://stems-prevent-512.app.ohara.ai',
          splashImageUrl: 'https://usdozf7pplhxfvrl.public.blob.vercel-storage.com/farcaster/splash_images/splash_image1.svg',
          splashBackgroundColor: '#667eea',
        },
      },
    });
  } catch (error) {
    console.error('Frame error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Return initial frame
  return NextResponse.json({
    type: 'frame',
    version: 'next',
    imageUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'https://stems-prevent-512.app.ohara.ai'}/api/og?cardId=1&affirmation=Pull+Your+Daily+Card`,
    button: {
      title: '✨ Pull Your Daily Card',
      action: {
        type: 'launch_frame',
        name: 'PRACTICE',
        url: process.env.NEXT_PUBLIC_APP_URL || 'https://stems-prevent-512.app.ohara.ai',
        splashImageUrl: 'https://usdozf7pplhxfvrl.public.blob.vercel-storage.com/farcaster/splash_images/splash_image1.svg',
        splashBackgroundColor: '#667eea',
      },
    },
  });
}
