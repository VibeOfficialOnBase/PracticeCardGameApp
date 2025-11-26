import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { subscription, username, preferences } = body;

    if (!subscription || !username) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Store subscription in localStorage (client-side) or database (server-side)
    // For now, we'll just return success and handle storage client-side
    
    if (process.env.NODE_ENV === 'development') {
      console.log('Push notification subscription:', {
      username,
      endpoint: subscription.endpoint,
      preferences,
    });
    }

    return NextResponse.json({ 
      success: true,
      message: 'Successfully subscribed to notifications'
    });
  } catch (error) {
    console.error('Error subscribing to notifications:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe to notifications' },
      { status: 500 }
    );
  }
}
