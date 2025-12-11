"use client";
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';

// Types
interface IdentityData {
  role: string;
  goals: string;
  values: string;
  skills: string;
  customFields: { [key: string]: string };
}

interface PreferencesData {
  preferredOutput: string;
  learningStyle: string;
  toneOfChoice: string;
  problemSolvingStyle: string;
  customFields: { [key: string]: string };
}

interface DynamicEntry {
  id: string;
  key: string;
  value: string;
}

interface ComprehensiveProfileData {
  role: string;
  profileurl?: string;
  name?: string;
  authMethod?: string;
  aiLikes: string[];
  aiDislikes: string[];
  customAILikes: string[];
  customAIDislikes: string[];
  aboutMe: string;
  myValues: string[];
  mySkills: string[];
  howIThink: string[];
  myInfluences: string[];
  brandVoices: DynamicEntry[];
  audiencePersona: DynamicEntry[];
  dataReferences: DynamicEntry[];
  workExamples: DynamicEntry[];
  miscellaneous: DynamicEntry[];
}

interface ProfileContextType {
  // Identity state
  identity: IdentityData | null;
  isLoadingIdentity: boolean;
  identityError: string | null;
  
  // Preferences state
  preferences: PreferencesData | null;
  isLoadingPreferences: boolean;
  preferencesError: string | null;
  
  // Comprehensive profile state
  comprehensiveProfile: ComprehensiveProfileData | null;
  isLoadingComprehensive: boolean;
  comprehensiveError: string | null;
  
  // Identity methods
  fetchIdentity: () => Promise<void>;
  updateIdentity: (data: Partial<IdentityData>) => Promise<boolean>;
  
  // Preferences methods
  fetchPreferences: () => Promise<void>;
  updatePreferences: (data: Partial<PreferencesData>) => Promise<boolean>;
  
  // Comprehensive profile methods
  fetchComprehensiveProfile: () => Promise<void>;
  updateComprehensiveProfile: (data: Partial<ComprehensiveProfileData>) => Promise<boolean>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within ProfileProvider');
  }
  return context;
};

interface ProfileProviderProps {
  children: ReactNode;
}

export const ProfileProvider: React.FC<ProfileProviderProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  
  // Identity state
  const [identity, setIdentity] = useState<IdentityData | null>(null);
  const [isLoadingIdentity, setIsLoadingIdentity] = useState(false);
  const [identityError, setIdentityError] = useState<string | null>(null);
  
  // Preferences state
  const [preferences, setPreferences] = useState<PreferencesData | null>(null);
  const [isLoadingPreferences, setIsLoadingPreferences] = useState(false);
  const [preferencesError, setPreferencesError] = useState<string | null>(null);
  
  // Comprehensive profile state
  const [comprehensiveProfile, setComprehensiveProfile] = useState<ComprehensiveProfileData | null>(null);
  const [isLoadingComprehensive, setIsLoadingComprehensive] = useState(false);
  const [comprehensiveError, setComprehensiveError] = useState<string | null>(null);

  // Get token from localStorage
  const getToken = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  };

  // Handle authentication errors by redirecting to login
  const handleAuthError = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      const currentPath = pathname || '/lab';
      router.push(`/login?redirect=${encodeURIComponent(currentPath)}`);
    }
  };

  // Fetch Identity
  const fetchIdentity = useCallback(async () => {
    setIsLoadingIdentity(true);
    setIdentityError(null);
    
    try {
      const token = getToken();
      if (!token) {
        handleAuthError();
        return;
      }

      const response = await fetch('/api/profile/identity', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 401) {
        handleAuthError();
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch identity');
      }

      const data = await response.json();
      
      // Convert customFields Map to plain object if needed
      if (data.data && data.data.customFields) {
        // MongoDB Map is serialized as an object with numeric keys or as array
        const customFields = data.data.customFields;
        
        // If it's already an object with string keys, keep it
        if (typeof customFields === 'object' && !Array.isArray(customFields)) {
          // It's already in the right format
          data.data.customFields = customFields;
        }
      }
      
      console.log('[ProfileContext] Identity fetched:', data.data);
      setIdentity(data.data);
    } catch (error: any) {
      console.error('Error fetching identity:', error);
      setIdentityError(error.message);
    } finally {
      setIsLoadingIdentity(false);
    }
  }, []);

  // Update Identity
  const updateIdentity = useCallback(async (data: Partial<IdentityData>): Promise<boolean> => {
    setIsLoadingIdentity(true);
    setIdentityError(null);
    
    try {
      const token = getToken();
      if (!token) {
        handleAuthError();
        return false;
      }

      const response = await fetch('/api/profile/identity', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.status === 401) {
        handleAuthError();
        return false;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update identity');
      }

      const result = await response.json();
      setIdentity(result.data);
      return true;
    } catch (error: any) {
      console.error('Error updating identity:', error);
      setIdentityError(error.message);
      return false;
    } finally {
      setIsLoadingIdentity(false);
    }
  }, []);

  // Fetch Preferences
  const fetchPreferences = useCallback(async () => {
    setIsLoadingPreferences(true);
    setPreferencesError(null);
    
    try {
      const token = getToken();
      if (!token) {
        handleAuthError();
        return;
      }

      const response = await fetch('/api/profile/preferences', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 401) {
        handleAuthError();
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch preferences');
      }

      const data = await response.json();
      
      // Convert customFields Map to plain object if needed
      if (data.data && data.data.customFields) {
        const customFields = data.data.customFields;
        
        // If it's already an object with string keys, keep it
        if (typeof customFields === 'object' && !Array.isArray(customFields)) {
          data.data.customFields = customFields;
        }
      }
      
      console.log('[ProfileContext] Preferences fetched:', data.data);
      setPreferences(data.data);
    } catch (error: any) {
      console.error('Error fetching preferences:', error);
      setPreferencesError(error.message);
    } finally {
      setIsLoadingPreferences(false);
    }
  }, []);

  // Update Preferences
  const updatePreferences = useCallback(async (data: Partial<PreferencesData>): Promise<boolean> => {
    setIsLoadingPreferences(true);
    setPreferencesError(null);
    
    try {
      const token = getToken();
      if (!token) {
        handleAuthError();
        return false;
      }

      const response = await fetch('/api/profile/preferences', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.status === 401) {
        handleAuthError();
        return false;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update preferences');
      }

      const result = await response.json();
      setPreferences(result.data);
      return true;
    } catch (error: any) {
      console.error('Error updating preferences:', error);
      setPreferencesError(error.message);
      return false;
    } finally {
      setIsLoadingPreferences(false);
    }
  }, []);

  // Fetch Comprehensive Profile
  const fetchComprehensiveProfile = useCallback(async () => {
    setIsLoadingComprehensive(true);
    setComprehensiveError(null);
    
    try {
      const token = getToken();
      if (!token) {
        handleAuthError();
        return;
      }

      const response = await fetch('/api/profile/comprehensive', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 401) {
        handleAuthError();
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch comprehensive profile');
      }

      const data = await response.json();
      console.log('[ProfileContext] Comprehensive profile fetched:', data.data);
        setComprehensiveProfile({
          role: data.data.role || '',
          profileurl: data.data.profileurl || '',
          ...data.data
        });
    } catch (error: any) {
      console.error('Error fetching comprehensive profile:', error);
      setComprehensiveError(error.message);
    } finally {
      setIsLoadingComprehensive(false);
    }
  }, []);

  // Update Comprehensive Profile
  const updateComprehensiveProfile = useCallback(async (data: Partial<ComprehensiveProfileData>): Promise<boolean> => {
    setIsLoadingComprehensive(true);
    setComprehensiveError(null);
    
    try {
      const token = getToken();
      if (!token) {
        handleAuthError();
        return false;
      }

      const response = await fetch('/api/profile/comprehensive', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.status === 401) {
        handleAuthError();
        return false;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update comprehensive profile');
      }

      const result = await response.json();
      setComprehensiveProfile(result.data);
      return true;
    } catch (error: any) {
      console.error('Error updating comprehensive profile:', error);
      setComprehensiveError(error.message);
      return false;
    } finally {
      setIsLoadingComprehensive(false);
    }
  }, []);

  const value: ProfileContextType = {
    identity,
    isLoadingIdentity,
    identityError,
    preferences,
    isLoadingPreferences,
    preferencesError,
    comprehensiveProfile,
    isLoadingComprehensive,
    comprehensiveError,
    fetchIdentity,
    updateIdentity,
    fetchPreferences,
    updatePreferences,
    fetchComprehensiveProfile,
    updateComprehensiveProfile,
  };

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
};
