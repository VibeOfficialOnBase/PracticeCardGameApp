import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with API key
// You can set RESEND_API_KEY environment variable or hardcode your key here
const resend = new Resend(process.env.RESEND_API_KEY || 'your-api-key-here');

export async function POST(request: NextRequest) {
  try {
    const { email, username, action, tokenBalance, usdValue, wallet } = await request.json();

    if (!email || !username) {
      return NextResponse.json(
        { error: 'Email and username are required' },
        { status: 400 }
      );
    }

    // Determine email subject based on action
    const actionLabels: Record<string, string> = {
      'signup': 'User Sign Up',
      'reminder': 'Reminder Opt-In',
      'raffle': 'Raffle Entry',
      'Signup': 'User Sign Up',
      'Reminder': 'Reminder Opt-In',
      'Raffle': 'Raffle Entry',
    };
    
    const subject = `PRACTICE App - New ${actionLabels[action] || action}`;

    // Build email content
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4F46E5;">PRACTICE App - User Activity</h2>
        <div style="background-color: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Action:</strong> ${actionLabels[action] || action}</p>
          <p><strong>Username:</strong> ${username}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${wallet ? `<p><strong>Wallet:</strong> ${wallet}</p>` : ''}
          ${tokenBalance ? `<p><strong>Token Balance:</strong> ${tokenBalance} $VibeOfficial</p>` : ''}
          ${usdValue ? `<p><strong>USD Value:</strong> $${usdValue.toFixed(2)}</p>` : ''}
          <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
        </div>
        <p style="color: #6B7280; font-size: 14px;">This is an automated notification from the PRACTICE card game app.</p>
      </div>
    `;

    // Send email notification to mindcalmwell@gmail.com
    try {
      const { data, error } = await resend.emails.send({
        from: 'PRACTICE App <onboarding@resend.dev>',
        to: 'mindcalmwell@gmail.com',
        subject: subject,
        html: emailContent,
      });

      if (error) {
        console.error('Resend error:', error);
        return NextResponse.json({
          success: false,
          message: 'Failed to send email notification',
          error: error,
        }, { status: 500 });
      }

      if (process.env.NODE_ENV === 'development') {
        console.log('Email sent successfully:', data);
      }
      
      return NextResponse.json({
        success: true,
        message: 'Email recorded and notification sent successfully',
        emailId: data?.id,
      });
    } catch (emailError: unknown) {
      console.error('Error sending email:', emailError);
      const errorMessage = emailError instanceof Error ? emailError.message : 'Unknown error';
      return NextResponse.json({
        success: false,
        message: 'Failed to send email',
        error: errorMessage,
      }, { status: 500 });
    }
  } catch (error: unknown) {
    console.error('Email API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Failed to process email', details: errorMessage },
      { status: 500 }
    );
  }
}
