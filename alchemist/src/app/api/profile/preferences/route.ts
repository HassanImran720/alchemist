import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/db/dbConnect';
import User from '@/db/models/User';
import { authenticateRequest } from '@/helpers/authMiddleware';

// GET - Retrieve user's preferences profile
export async function GET(req: NextRequest) {
  await dbConnect();

  const auth = authenticateRequest(req);
  if (!auth.authenticated) {
    return auth.response;
  }

  console.log('[profile/preferences] GET called by user:', auth.user?.userId);

  try {
    const user = await User.findById(auth.user!.userId).select('preferences');
    
    if (!user) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    // Convert preferences to plain object and handle Map customFields
    const preferencesData = user.preferences ? {
      preferredOutput: user.preferences.preferredOutput || '',
      learningStyle: user.preferences.learningStyle || '',
      toneOfChoice: user.preferences.toneOfChoice || '',
      problemSolvingStyle: user.preferences.problemSolvingStyle || '',
      customFields: user.preferences.customFields 
        ? Object.fromEntries(user.preferences.customFields) 
        : {}
    } : {
      preferredOutput: '',
      learningStyle: '',
      toneOfChoice: '',
      problemSolvingStyle: '',
      customFields: {}
    };

    console.log('[profile/preferences] GET result:', preferencesData);

    return NextResponse.json({
      message: 'Preferences profile retrieved successfully.',
      data: preferencesData
    }, { status: 200 });

  } catch (error: any) {
    console.error('[profile/preferences] Error retrieving preferences profile:', error);
    return NextResponse.json({ 
      error: 'Failed to retrieve preferences profile.',
      details: error.message 
    }, { status: 500 });
  }
}

// PUT - Update user's preferences profile
export async function PUT(req: NextRequest) {
  await dbConnect();

  const auth = authenticateRequest(req);
  if (!auth.authenticated) {
    return auth.response;
  }

  console.log('[profile/preferences] PUT called by user:', auth.user?.userId);

  try {
    const body = await req.json();
    console.log('[profile/preferences] PUT body:', body);
    const { preferredOutput, learningStyle, toneOfChoice, problemSolvingStyle, customFields } = body;

    // Build the update object
    const updateData: any = {};
    
    if (preferredOutput !== undefined) updateData['preferences.preferredOutput'] = preferredOutput;
    if (learningStyle !== undefined) updateData['preferences.learningStyle'] = learningStyle;
    if (toneOfChoice !== undefined) updateData['preferences.toneOfChoice'] = toneOfChoice;
    if (problemSolvingStyle !== undefined) updateData['preferences.problemSolvingStyle'] = problemSolvingStyle;
    
    // Handle custom fields
    if (customFields !== undefined) {
      if (typeof customFields === 'object' && customFields !== null) {
        updateData['preferences.customFields'] = customFields;
      } else {
        return NextResponse.json({ 
          error: 'customFields must be an object with key-value pairs.' 
        }, { status: 400 });
      }
    }

    console.log('[profile/preferences] PUT updateData:', updateData);

    // Check if preferences field exists, initialize if not
    const currentUser = await User.findById(auth.user!.userId);
    if (!currentUser) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    if (!currentUser.preferences) {
      console.log('[profile/preferences] PUT - Initializing preferences object');
      currentUser.preferences = {
        preferredOutput: '',
        learningStyle: '',
        toneOfChoice: '',
        problemSolvingStyle: '',
        customFields: new Map()
      };
      await currentUser.save();
      console.log('[profile/preferences] PUT - After save, preferences:', currentUser.preferences);
    }

    // Now apply the actual update
    const user = await User.findByIdAndUpdate(
      auth.user!.userId,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select('preferences');

    console.log('[profile/preferences] PUT result:', user ? 'updated' : 'not found', user?.preferences);

    if (!user) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    // Convert preferences to plain object and handle Map customFields
    const preferencesData = {
      preferredOutput: user.preferences?.preferredOutput || '',
      learningStyle: user.preferences?.learningStyle || '',
      toneOfChoice: user.preferences?.toneOfChoice || '',
      problemSolvingStyle: user.preferences?.problemSolvingStyle || '',
      customFields: user.preferences?.customFields 
        ? Object.fromEntries(user.preferences.customFields) 
        : {}
    };

    return NextResponse.json({
      message: 'Preferences profile updated successfully.',
      data: preferencesData
    }, { status: 200 });

  } catch (error: any) {
    console.error('[profile/preferences] Error updating preferences profile:', error);
    return NextResponse.json({ 
      error: 'Failed to update preferences profile.',
      details: error.message 
    }, { status: 500 });
  }
}

// PATCH - Partial update of user's preferences profile
export async function PATCH(req: NextRequest) {
  await dbConnect();

  const auth = authenticateRequest(req);
  if (!auth.authenticated) {
    return auth.response;
  }

  console.log('[profile/preferences] PATCH called by user:', auth.user?.userId);

  try {
    const body = await req.json();
    console.log('[profile/preferences] PATCH body:', body);

    // Build the update object dynamically
    const updateData: any = {};
    
    // Handle standard fields
    if (body.preferredOutput !== undefined) updateData['preferences.preferredOutput'] = body.preferredOutput;
    if (body.learningStyle !== undefined) updateData['preferences.learningStyle'] = body.learningStyle;
    if (body.toneOfChoice !== undefined) updateData['preferences.toneOfChoice'] = body.toneOfChoice;
    if (body.problemSolvingStyle !== undefined) updateData['preferences.problemSolvingStyle'] = body.problemSolvingStyle;
    
    // Handle custom fields - merge with existing
    if (body.customFields !== undefined) {
      if (typeof body.customFields === 'object' && body.customFields !== null) {
        // Get current user to merge custom fields
        const currentUser = await User.findById(auth.user!.userId).select('preferences');
        const existingCustomFields = currentUser?.preferences?.customFields || {};
        
        // Merge existing with new custom fields
        const mergedCustomFields = {
          ...Object.fromEntries(existingCustomFields as any),
          ...body.customFields
        };
        
        updateData['preferences.customFields'] = mergedCustomFields;
      }
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ 
        error: 'No valid fields provided for update.' 
      }, { status: 400 });
    }

    console.log('[profile/preferences] PATCH updateData:', updateData);

    // Check if preferences field exists, initialize if not
    const checkUser = await User.findById(auth.user!.userId);
    if (!checkUser) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    if (!checkUser.preferences) {
      console.log('[profile/preferences] PATCH - Initializing preferences object');
      checkUser.preferences = {
        preferredOutput: '',
        learningStyle: '',
        toneOfChoice: '',
        problemSolvingStyle: '',
        customFields: new Map()
      };
      await checkUser.save();
      console.log('[profile/preferences] PATCH - After save, preferences:', checkUser.preferences);
    }

    // Now apply the actual update
    const user = await User.findByIdAndUpdate(
      auth.user!.userId,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select('preferences');

    console.log('[profile/preferences] PATCH result:', user ? 'updated' : 'not found', user?.preferences);

    if (!user) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    // Convert preferences to plain object and handle Map customFields
    const preferencesData = {
      preferredOutput: user.preferences?.preferredOutput || '',
      learningStyle: user.preferences?.learningStyle || '',
      toneOfChoice: user.preferences?.toneOfChoice || '',
      problemSolvingStyle: user.preferences?.problemSolvingStyle || '',
      customFields: user.preferences?.customFields 
        ? Object.fromEntries(user.preferences.customFields) 
        : {}
    };

    return NextResponse.json({
      message: 'Preferences profile updated successfully.',
      data: preferencesData
    }, { status: 200 });

  } catch (error: any) {
    console.error('[profile/preferences] Error updating preferences profile (PATCH):', error);
    return NextResponse.json({ 
      error: 'Failed to update preferences profile.',
      details: error.message 
    }, { status: 500 });
  }
}
