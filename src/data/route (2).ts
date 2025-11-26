import { NextRequest, NextResponse } from 'next/server';
import { verificationStore } from '@/lib/verificationStore';

export async function POST(request: NextRequest) {
  try {
    const { email, code } = await request.json();

    if (!email || !code) {
      return NextResponse.json(
        { error: 'Email and code are required' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedCode = code.trim();

    // Check if code exists in shared store
    const storedData = verificationStore.get(normalizedEmail);

    if (process.env.NODE_ENV === 'development') {
      console.log('🔍 Verification attempt:', {
        email: normalizedEmail,
        providedCode: normalizedCode,
        hasStoredData: !!storedData,
        storeSize: verificationStore.size(),
      });
    }

    if (!storedData) {
      console.warn('⚠️ No verification code found for email:', normalizedEmail);
      return NextResponse.json(
        { error: 'Invalid or expired verification code' },
        { status: 400 }
      );
    }

    // Check if code matches
    if (storedData.code !== normalizedCode) {
      console.warn('⚠️ Code mismatch:', {
        provided: normalizedCode,
        expected: storedData.code,
      });
      return NextResponse.json(
        { error: 'Invalid verification code' },
        { status: 400 }
      );
    }

    // Check if code is expired (10 minutes)
    const TEN_MINUTES = 10 * 60 * 1000;
    const codeAge = Date.now() - storedData.timestamp;
    
    if (codeAge > TEN_MINUTES) {
      console.warn('⚠️ Code expired:', {
        ageMinutes: Math.floor(codeAge / 1000 / 60),
      });
      verificationStore.delete(normalizedEmail);
      return NextResponse.json(
        { error: 'Verification code has expired' },
        { status: 400 }
      );
    }

    // Code is valid! Delete the used code
    verificationStore.delete(normalizedEmail);

    if (process.env.NODE_ENV === 'development') {
      console.log('✅ Email verified successfully:', normalizedEmail);
    }

    return NextResponse.json({
      success: true,
      message: 'Email verified successfully',
      email: normalizedEmail,
    });
  } catch (error: unknown) {
    console.error('❌ Verify code API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to verify code';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
