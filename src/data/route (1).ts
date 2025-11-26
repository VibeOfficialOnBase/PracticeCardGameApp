import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { verificationStore } from '@/lib/verificationStore';

// Initialize Resend with API key from environment variable
const resendApiKey = process.env.RESEND_API_KEY;

// Initialize Resend (only if API key is available)
const resend = resendApiKey ? new Resend(resendApiKey) : null;

if (!resendApiKey && process.env.NODE_ENV === 'production') {
  console.error('⚠️ RESEND_API_KEY environment variable is not set in production');
}

// Generate a 6-digit verification code
function generateCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Clean up old codes
    verificationStore.cleanup();

    // Generate verification code
    const code = generateCode();
    const timestamp = Date.now();

    // Store code in shared store
    verificationStore.set(normalizedEmail, {
      code,
      timestamp,
      username: '', // Will be populated after verification
    });

    if (process.env.NODE_ENV === 'development') {
      console.log('📧 Generated verification code:', {
        email: normalizedEmail,
        code,
        storeSize: verificationStore.size(),
      });
    }

    // Check if Resend is configured
    if (!resend || !resendApiKey) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('⚠️ Resend API key not configured. Returning code in response for testing.');
        console.log('📋 VERIFICATION CODE:', code);
      }
      
      // Return the code in response when email service is not configured
      // This allows testing without requiring Resend setup
      return NextResponse.json({
        success: true,
        message: 'Email service not configured. Your verification code is shown below.',
        code: code, // Return code when no email service
        noEmail: true, // Flag to indicate email wasn't sent
      });
    }

    // Send verification email via Resend
    try {
      const { data, error } = await resend.emails.send({
        from: 'PRACTICE App <onboarding@resend.dev>',
        to: normalizedEmail,
        subject: 'Your PRACTICE Verification Code',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #4F46E5; font-size: 32px; margin: 0;">PRACTICE</h1>
              <p style="color: #6B7280; font-size: 14px; margin: 5px 0;">Patiently Repeating Altruistic Challenges To Inspire Core Excellence</p>
            </div>
            
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 16px; text-align: center;">
              <h2 style="color: white; margin: 0 0 20px 0; font-size: 24px;">Welcome Back!</h2>
              <p style="color: rgba(255, 255, 255, 0.9); font-size: 16px; margin-bottom: 25px;">
                Here's your verification code to access your PRACTICE account:
              </p>
              
              <div style="background: rgba(255, 255, 255, 0.15); backdrop-filter: blur(10px); border: 2px solid rgba(255, 255, 255, 0.3); border-radius: 12px; padding: 20px; margin: 20px 0;">
                <div style="font-size: 48px; font-weight: bold; color: white; letter-spacing: 8px; font-family: 'Courier New', monospace;">
                  ${code}
                </div>
              </div>
              
              <p style="color: rgba(255, 255, 255, 0.8); font-size: 14px; margin-top: 20px;">
                This code will expire in <strong>10 minutes</strong>
              </p>
            </div>
            
            <div style="margin-top: 30px; padding: 20px; background-color: #F3F4F6; border-radius: 12px;">
              <p style="color: #6B7280; font-size: 14px; margin: 0 0 10px 0;">
                <strong>Security Tips:</strong>
              </p>
              <ul style="color: #6B7280; font-size: 13px; margin: 0; padding-left: 20px;">
                <li>Never share this code with anyone</li>
                <li>We'll never ask for your code via phone or email</li>
                <li>If you didn't request this code, you can safely ignore this email</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #E5E7EB;">
              <p style="color: #6B7280; font-size: 12px; margin: 0;">
                Powered by <strong style="color: #4F46E5;">$VibeOfficial</strong> on Base Blockchain
              </p>
            </div>
          </div>
        `,
      });

      if (error) {
        console.error('❌ Resend error:', error);
        return NextResponse.json({
          success: false,
          error: typeof error === 'string' ? error : error.message || 'Failed to send verification email',
        }, { status: 500 });
      }

      if (process.env.NODE_ENV === 'development') {
        console.log('✅ Verification code sent successfully:', { 
          email: normalizedEmail, 
          emailId: data?.id 
        });
      }

      return NextResponse.json({
        success: true,
        message: 'Verification code sent to your email',
      });
    } catch (emailError: unknown) {
      console.error('❌ Error sending verification email:', emailError);
      const errorMessage = emailError instanceof Error ? emailError.message : 'Failed to send email';
      return NextResponse.json({
        success: false,
        error: errorMessage,
      }, { status: 500 });
    }
  } catch (error: unknown) {
    console.error('❌ Send code API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to process request';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
