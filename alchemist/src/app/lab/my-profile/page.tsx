
import ComprehensiveProfile from '@/components/myAccount/ComprehensiveProfile'
import { ProfileProvider } from '@/context/ProfileContext'
import React from 'react'

const page = () => {
  return (
    <div>
      <ProfileProvider>
        <ComprehensiveProfile/>
      </ProfileProvider>
    </div>
  )
}

export default page
