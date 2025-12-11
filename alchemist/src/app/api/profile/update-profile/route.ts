import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/db/dbConnect';
import User from '@/db/models/User';
import { authenticateRequest } from '@/helpers/authMiddleware';

// PUT - Update user's name and optionally password
export async function PUT(req: NextRequest) {
  await dbConnect();

  const auth = authenticateRequest(req);
  if (!auth.authenticated) {
    return auth.response;
  }

  console.log('[profile/update-profile] PUT called by user:', auth.user?.userId);

  try {
    const body = await req.json();
    console.log('[profile/update-profile] PUT body:', { ...body, oldPassword: '***', newPassword: '***' });
    
    const { name, oldPassword, newPassword } = body;

    // Validate name
    if (!name || !name.trim()) {
      return NextResponse.json({ error: 'Name is required.' }, { status: 400 });
    }

    // Get current user with password field if needed
    const currentUser = await User.findById(auth.user!.userId).select('+password +authMethod');
    
    if (!currentUser) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    // Update name
    currentUser.name = name.trim();

    // Handle password update if provided (only for self auth users)
    if (newPassword) {
      // Check if user is using self auth
      if (currentUser.authMethod !== 'self') {
        return NextResponse.json({ 
          error: 'Password can only be changed for users who registered with email/password.' 
        }, { status: 403 });
      }

      // Validate old password is provided
      if (!oldPassword) {
        return NextResponse.json({ error: 'Current password is required to change password.' }, { status: 400 });
      }

      // Validate new password length
      if (newPassword.length < 6) {
        return NextResponse.json({ error: 'New password must be at least 6 characters.' }, { status: 400 });
      }

      // Verify old password
      const isPasswordCorrect = await currentUser.correctPassword(oldPassword);
      if (!isPasswordCorrect) {
        return NextResponse.json({ error: 'Current password is incorrect.' }, { status: 401 });
      }

      // Update password (will be hashed by pre-save hook)
      currentUser.password = newPassword;
    }

    // Save the updated user
    await currentUser.save();

    console.log('[profile/update-profile] PUT success - name updated:', currentUser.name);

    return NextResponse.json({
      message: 'Profile updated successfully.',
      data: {
        name: currentUser.name,
        email: currentUser.email,
        authMethod: currentUser.authMethod,
      }
    }, { status: 200 });

  } catch (error: any) {
    console.error('[profile/update-profile] Error updating profile:', error);
    return NextResponse.json({ 
      error: 'Failed to update profile.',
      details: error.message 
    }, { status: 500 });
  }
}
