import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/db/dbConnect';
import User from '@/db/models/User';
import { authenticateRequest } from '@/helpers/authMiddleware';

// GET - Retrieve user's comprehensive profile
export async function GET(req: NextRequest) {
  await dbConnect();

  const auth = authenticateRequest(req);
  if (!auth.authenticated) {
    return auth.response;
  }

  console.log('[profile/comprehensive] GET called by user:', auth.user?.userId);

  try {
    const user = await User.findById(auth.user!.userId).select('comprehensiveProfile profileurl name authMethod email');
    
    if (!user) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    // Convert comprehensiveProfile to plain object
    const profileData = user.comprehensiveProfile ? {
      role: user.comprehensiveProfile.role || '',
      bio: user.comprehensiveProfile.bio || '',
      aiLikes: user.comprehensiveProfile.aiLikes || [],
      aiDislikes: user.comprehensiveProfile.aiDislikes || [],
      customAILikes: user.comprehensiveProfile.customAILikes || [],
      customAIDislikes: user.comprehensiveProfile.customAIDislikes || [],
      aboutMe: user.comprehensiveProfile.aboutMe || '',
      myValues: user.comprehensiveProfile.myValues || [],
      mySkills: user.comprehensiveProfile.mySkills || [],
      howIThink: user.comprehensiveProfile.howIThink || [],
      myInfluences: user.comprehensiveProfile.myInfluences || [],
      brandVoices: user.comprehensiveProfile.brandVoices || [],
      audiencePersona: user.comprehensiveProfile.audiencePersona || [],
      dataReferences: user.comprehensiveProfile.dataReferences || [],
      workExamples: user.comprehensiveProfile.workExamples || [],
      miscellaneous: user.comprehensiveProfile.miscellaneous || [],
      profileurl: user.profileurl || '',
      name: user.name || '',
      authMethod: user.authMethod || '',
      email: user.email || '',
    } : {
      role: '',
      bio: '',
      aiLikes: [],
      aiDislikes: [],
      customAILikes: [],
      customAIDislikes: [],
      aboutMe: '',
      myValues: [],
      mySkills: [],
      howIThink: [],
      myInfluences: [],
      brandVoices: [],
      audiencePersona: [],
      dataReferences: [],
      workExamples: [],
      miscellaneous: [],
      profileurl: '',
      name: '',
      authMethod: '',
      email: '',
    };

    console.log('[profile/comprehensive] GET result:', profileData);
    
    return NextResponse.json({
      message: 'Comprehensive profile retrieved successfully.',
      data: profileData
    }, { status: 200 });

  } catch (error: any) {
    console.error('[profile/comprehensive] Error retrieving comprehensive profile:', error);
    return NextResponse.json({ 
      error: 'Failed to retrieve comprehensive profile.',
      details: error.message 
    }, { status: 500 });
  }
}

// PUT - Update user's comprehensive profile
export async function PUT(req: NextRequest) {
  await dbConnect();

  const auth = authenticateRequest(req);
  if (!auth.authenticated) {
    return auth.response;
  }

  console.log('[profile/comprehensive] PUT called by user:', auth.user?.userId);

  try {
    const body = await req.json();
    console.log('[profile/comprehensive] PUT body:', body);
    
    const {
      role,
      aiLikes,
      aiDislikes,
      customAILikes,
      customAIDislikes,
      aboutMe,
      myValues,
      mySkills,
      howIThink,
      myInfluences,
      brandVoices,
      audiencePersona,
      dataReferences,
      workExamples,
      miscellaneous,
    } = body;

    // Build the update object
    const updateData: any = {};
    
    if (role !== undefined) updateData['comprehensiveProfile.role'] = role;
    if (aiLikes !== undefined) updateData['comprehensiveProfile.aiLikes'] = aiLikes;
    if (aiDislikes !== undefined) updateData['comprehensiveProfile.aiDislikes'] = aiDislikes;
    if (customAILikes !== undefined) updateData['comprehensiveProfile.customAILikes'] = customAILikes;
    if (customAIDislikes !== undefined) updateData['comprehensiveProfile.customAIDislikes'] = customAIDislikes;
    if (aboutMe !== undefined) updateData['comprehensiveProfile.aboutMe'] = aboutMe;
    if (myValues !== undefined) updateData['comprehensiveProfile.myValues'] = myValues;
    if (mySkills !== undefined) updateData['comprehensiveProfile.mySkills'] = mySkills;
    if (howIThink !== undefined) updateData['comprehensiveProfile.howIThink'] = howIThink;
    if (myInfluences !== undefined) updateData['comprehensiveProfile.myInfluences'] = myInfluences;
    if (brandVoices !== undefined) updateData['comprehensiveProfile.brandVoices'] = brandVoices;
    if (audiencePersona !== undefined) updateData['comprehensiveProfile.audiencePersona'] = audiencePersona;
    if (dataReferences !== undefined) updateData['comprehensiveProfile.dataReferences'] = dataReferences;
    if (workExamples !== undefined) updateData['comprehensiveProfile.workExamples'] = workExamples;
    if (miscellaneous !== undefined) updateData['comprehensiveProfile.miscellaneous'] = miscellaneous;

    console.log('[profile/comprehensive] PUT updateData:', updateData);

    // Check if comprehensiveProfile field exists, initialize if not
    const currentUser = await User.findById(auth.user!.userId);
    if (!currentUser) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    // Ensure a concrete object is present and use a local variable so TypeScript
    // knows the value is defined for subsequent updates.
    const profile = currentUser.comprehensiveProfile || (currentUser.comprehensiveProfile = {
      role: '',
      aiLikes: [],
      aiDislikes: [],
      customAILikes: [],
      customAIDislikes: [],
      aboutMe: '',
      myValues: [],
      mySkills: [],
      howIThink: [],
      myInfluences: [],
      brandVoices: [],
      audiencePersona: [],
      dataReferences: [],
      workExamples: [],
      miscellaneous: [],
    });

    // Apply the updates to the profile object
    if (role !== undefined) profile.role = role;
    if (aiLikes !== undefined) profile.aiLikes = aiLikes;
    if (aiDislikes !== undefined) profile.aiDislikes = aiDislikes;
    if (customAILikes !== undefined) profile.customAILikes = customAILikes;
    if (customAIDislikes !== undefined) profile.customAIDislikes = customAIDislikes;
    if (aboutMe !== undefined) profile.aboutMe = aboutMe;
    if (myValues !== undefined) profile.myValues = myValues;
    if (mySkills !== undefined) profile.mySkills = mySkills;
    if (howIThink !== undefined) profile.howIThink = howIThink;
    if (myInfluences !== undefined) profile.myInfluences = myInfluences;
    if (brandVoices !== undefined) profile.brandVoices = brandVoices;
    if (audiencePersona !== undefined) profile.audiencePersona = audiencePersona;
    if (dataReferences !== undefined) profile.dataReferences = dataReferences;
    if (workExamples !== undefined) profile.workExamples = workExamples;
    if (miscellaneous !== undefined) profile.miscellaneous = miscellaneous;

    // Save the updated user
    await currentUser.save();
    console.log('[profile/comprehensive] PUT - After save, comprehensiveProfile:', currentUser.comprehensiveProfile);

    // Fetch the updated user to return
    const user = await User.findById(auth.user!.userId).select('comprehensiveProfile');

    console.log('[profile/comprehensive] PUT result:', user ? 'updated' : 'not found', user?.comprehensiveProfile);

    if (!user) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    // Convert comprehensiveProfile to plain object
    const profileData = {
      role: user.comprehensiveProfile?.role || '',
      aiLikes: user.comprehensiveProfile?.aiLikes || [],
      aiDislikes: user.comprehensiveProfile?.aiDislikes || [],
      customAILikes: user.comprehensiveProfile?.customAILikes || [],
      customAIDislikes: user.comprehensiveProfile?.customAIDislikes || [],
      aboutMe: user.comprehensiveProfile?.aboutMe || '',
      myValues: user.comprehensiveProfile?.myValues || [],
      mySkills: user.comprehensiveProfile?.mySkills || [],
      howIThink: user.comprehensiveProfile?.howIThink || [],
      myInfluences: user.comprehensiveProfile?.myInfluences || [],
      brandVoices: user.comprehensiveProfile?.brandVoices || [],
      audiencePersona: user.comprehensiveProfile?.audiencePersona || [],
      dataReferences: user.comprehensiveProfile?.dataReferences || [],
      workExamples: user.comprehensiveProfile?.workExamples || [],
      miscellaneous: user.comprehensiveProfile?.miscellaneous || [],
    };

    return NextResponse.json({
      message: 'Comprehensive profile updated successfully.',
      data: profileData
    }, { status: 200 });

  } catch (error: any) {
    console.error('[profile/comprehensive] Error updating comprehensive profile:', error);
    return NextResponse.json({ 
      error: 'Failed to update comprehensive profile.',
      details: error.message 
    }, { status: 500 });
  }
}
