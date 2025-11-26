import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with a fallback to prevent build errors
const resend = new Resend(process.env.RESEND_API_KEY || 'dummy_key');

function generateWelcomeEmail(username: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px; margin-bottom: 30px; }
          .content { background: #f9fafb; padding: 30px; border-radius: 10px; margin-bottom: 20px; }
          .button { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
          .footer { text-align: center; color: #666; font-size: 14px; margin-top: 30px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>✨ Welcome to PRACTICE ✨</h1>
          <p>Your Daily Affirmation Journey Starts Now</p>
        </div>
        
        <div class="content">
          <h2>Hey ${username}! 👋</h2>
          <p>We're thrilled to have you join the PRACTICE community! You've just taken the first step toward daily self-improvement and mindfulness.</p>
          
          <h3>🌟 What's Next?</h3>
          <ul>
            <li><strong>Pull Your First Card</strong> - Start your journey with a daily affirmation</li>
            <li><strong>Build Your Streak</strong> - Come back every day to build momentum</li>
            <li><strong>Unlock Achievements</strong> - Earn badges as you practice</li>
            <li><strong>Join the Community</strong> - Share your journey on the leaderboard</li>
          </ul>
          
          <p><strong>💎 Token Holder?</strong> If you hold 1,000+ $VibeOfficial tokens, you'll unlock exclusive Vibe Check cards!</p>
          
          <center>
            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://stems-prevent-512.app.ohara.ai'}" class="button">
              Pull Your First Card →
            </a>
          </center>
        </div>
        
        <div class="footer">
          <p>Built with ❤️ by Eddie Pabon on Base</p>
          <p>💎 $VibeOfficial Community</p>
        </div>
      </body>
    </html>
  `;
}

function generateStreakRiskEmail(username: string, streakDays: number): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #f97316 0%, #dc2626 100%); color: white; padding: 30px; text-align: center; border-radius: 10px; margin-bottom: 30px; }
          .content { background: #f9fafb; padding: 30px; border-radius: 10px; margin-bottom: 20px; }
          .streak-badge { font-size: 48px; text-align: center; margin: 20px 0; }
          .button { display: inline-block; background: linear-gradient(135deg, #f97316 0%, #dc2626 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
          .footer { text-align: center; color: #666; font-size: 14px; margin-top: 30px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🔥 Your Streak Needs You!</h1>
          <p>Don't let it slip away</p>
        </div>
        
        <div class="content">
          <h2>Hey ${username}!</h2>
          <p>You've built an amazing <strong>${streakDays}-day streak</strong>! That's incredible dedication. 🎉</p>
          
          <div class="streak-badge">
            🔥 ${streakDays} Days
          </div>
          
          <p><strong>But...</strong> you haven't pulled your card today. Your streak is at risk!</p>
          
          <p>All that progress shouldn't go to waste. Take just 2 minutes right now to:</p>
          <ul>
            <li>✨ Pull your daily card</li>
            <li>🎯 Complete your mission</li>
            <li>📝 Journal your thoughts</li>
            <li>🏆 Keep your momentum going</li>
          </ul>
          
          <center>
            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://stems-prevent-512.app.ohara.ai'}" class="button">
              Save My Streak 🔥
            </a>
          </center>
        </div>
        
        <div class="footer">
          <p>You've got this! 💪</p>
        </div>
      </body>
    </html>
  `;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, username, type, data } = body;

    if (!email || !username || !type) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    let subject = '';
    let htmlContent = '';

    switch (type) {
      case 'welcome':
        subject = '✨ Welcome to PRACTICE - Your Journey Begins!';
        htmlContent = generateWelcomeEmail(username);
        break;
      case 'streak_risk':
        subject = '🔥 Don\'t Lose Your Streak!';
        htmlContent = generateStreakRiskEmail(username, data?.streakDays || 0);
        break;
      default:
        return NextResponse.json(
          { error: 'Invalid email type' },
          { status: 400 }
        );
    }

    // Send email via Resend
    const result = await resend.emails.send({
      from: 'PRACTICE <noreply@practicecards.com>',
      to: email,
      subject,
      html: htmlContent,
    });

    if (process.env.NODE_ENV === 'development') {
      console.log('Retention email sent:', { type, email, username });
    }

    return NextResponse.json({ 
      success: true,
      messageId: result.data?.id,
    });
  } catch (error) {
    console.error('Error sending retention email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
