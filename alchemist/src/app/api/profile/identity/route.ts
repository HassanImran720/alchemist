import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/db/dbConnect';
import User from '@/db/models/User';
import { authenticateRequest } from '@/helpers/authMiddleware';

// GET - Retrieve user's identity profile
export async function GET(req: NextRequest) {
  await dbConnect();

  const auth = authenticateRequest(req);
  if (!auth.authenticated) {
    return auth.response;
  }

  console.log('[profile/identity] GET called by user:', auth.user?.userId);

  try {
    const user = await User.findById(auth.user!.userId).select('identity');
    
    if (!user) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    // Convert identity to plain object and handle Map customFields
    const identityData = user.identity ? {
      role: user.identity.role || '',
      goals: user.identity.goals || '',
      values: user.identity.values || '',
      skills: user.identity.skills || '',
      customFields: user.identity.customFields 
        ? Object.fromEntries(user.identity.customFields) 
        : {}
    } : {
      role: '',
      goals: '',
      values: '',
      skills: '',
      customFields: {}
    };

    console.log('[profile/identity] GET result:', identityData);
    
    return NextResponse.json({
      message: 'Identity profile retrieved successfully.',
      data: identityData
    }, { status: 200 });

  } catch (error: any) {
    console.error('[profile/identity] Error retrieving identity profile:', error);
    return NextResponse.json({ 
      error: 'Failed to retrieve identity profile.',
      details: error.message 
    }, { status: 500 });
  }
}

// PUT - Update user's identity profile
export async function PUT(req: NextRequest) {
  await dbConnect();

  const auth = authenticateRequest(req);
  if (!auth.authenticated) {
    return auth.response;
  }

  console.log('[profile/identity] PUT called by user:', auth.user?.userId);

  try {
    const body = await req.json();
    console.log('[profile/identity] PUT body:', body);
    const { role, goals, values, skills, customFields } = body;

    // Build the update object
    const updateData: any = {};
    
    if (role !== undefined) updateData['identity.role'] = role;
    if (goals !== undefined) updateData['identity.goals'] = goals;
    if (values !== undefined) updateData['identity.values'] = values;
    if (skills !== undefined) updateData['identity.skills'] = skills;
    
    // Handle custom fields
    if (customFields !== undefined) {
      if (typeof customFields === 'object' && customFields !== null) {
        updateData['identity.customFields'] = customFields;
      } else {
        return NextResponse.json({ 
          error: 'customFields must be an object with key-value pairs.' 
        }, { status: 400 });
      }
    }

    console.log('[profile/identity] PUT updateData:', updateData);

    // Check if identity field exists, initialize if not
    const currentUser = await User.findById(auth.user!.userId);
    if (!currentUser) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    if (!currentUser.identity) {
      console.log('[profile/identity] PUT - Initializing identity object');
      currentUser.identity = {
        role: '',
        goals: '',
        values: '',
        skills: '',
        customFields: new Map()
      };
      await currentUser.save();
      console.log('[profile/identity] PUT - After save, identity:', currentUser.identity);
    }

    // Now apply the update
    const user = await User.findByIdAndUpdate(
      auth.user!.userId,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select('identity');

    console.log('[profile/identity] PUT result:', user ? 'updated' : 'not found', user?.identity);

    if (!user) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    // Convert identity to plain object and handle Map customFields
    const identityData = {
      role: user.identity?.role || '',
      goals: user.identity?.goals || '',
      values: user.identity?.values || '',
      skills: user.identity?.skills || '',
      customFields: user.identity?.customFields 
        ? Object.fromEntries(user.identity.customFields) 
        : {}
    };

    return NextResponse.json({
      message: 'Identity profile updated successfully.',
      data: identityData
    }, { status: 200 });

  } catch (error: any) {
    console.error('[profile/identity] Error updating identity profile:', error);
    return NextResponse.json({ 
      error: 'Failed to update identity profile.',
      details: error.message 
    }, { status: 500 });
  }
}

// PATCH - Partial update of user's identity profile
export async function PATCH(req: NextRequest) {
  await dbConnect();

  const auth = authenticateRequest(req);
  if (!auth.authenticated) {
    return auth.response;
  }

  console.log('[profile/identity] PATCH called by user:', auth.user?.userId);

  try {
    const body = await req.json();
    console.log('[profile/identity] PATCH body:', body);

    // Build the update object dynamically
    const updateData: any = {};
    
    // Handle standard fields
    if (body.role !== undefined) updateData['identity.role'] = body.role;
    if (body.goals !== undefined) updateData['identity.goals'] = body.goals;
    if (body.values !== undefined) updateData['identity.values'] = body.values;
    if (body.skills !== undefined) updateData['identity.skills'] = body.skills;
    
    // Handle custom fields - merge with existing
    if (body.customFields !== undefined) {
      if (typeof body.customFields === 'object' && body.customFields !== null) {
        // Get current user to merge custom fields
        const currentUser = await User.findById(auth.user!.userId).select('identity');
        const existingCustomFields = currentUser?.identity?.customFields || {};
        
        // Merge existing with new custom fields
        const mergedCustomFields = {
          ...Object.fromEntries(existingCustomFields as any),
          ...body.customFields
        };
        
        updateData['identity.customFields'] = mergedCustomFields;
      }
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ 
        error: 'No valid fields provided for update.' 
      }, { status: 400 });
    }

    console.log('[profile/identity] PATCH updateData:', updateData);

    // Check if identity field exists, initialize if not
    const checkUser = await User.findById(auth.user!.userId);
    if (!checkUser) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    if (!checkUser.identity) {
      console.log('[profile/identity] PATCH - Initializing identity object');
      checkUser.identity = {
        role: '',
        goals: '',
        values: '',
        skills: '',
        customFields: new Map()
      };
      await checkUser.save();
      console.log('[profile/identity] PATCH - After save, identity:', checkUser.identity);
    }

    // Now apply the actual update
    const user = await User.findByIdAndUpdate(
      auth.user!.userId,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select('identity');

    console.log('[profile/identity] PATCH result:', user ? 'updated' : 'not found', user?.identity);

    if (!user) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    // Convert identity to plain object and handle Map customFields
    const identityData = {
      role: user.identity?.role || '',
      goals: user.identity?.goals || '',
      values: user.identity?.values || '',
      skills: user.identity?.skills || '',
      customFields: user.identity?.customFields 
        ? Object.fromEntries(user.identity.customFields) 
        : {}
    };

    return NextResponse.json({
      message: 'Identity profile updated successfully.',
      data: identityData
    }, { status: 200 });

  } catch (error: any) {
    console.error('[profile/identity] Error updating identity profile (PATCH):', error);
    return NextResponse.json({ 
      error: 'Failed to update identity profile.',
      details: error.message 
    }, { status: 500 });
  }
}
