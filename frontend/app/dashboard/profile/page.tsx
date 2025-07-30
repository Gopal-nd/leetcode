'use client'
import React, { Suspense } from 'react'


import Heatmap from '@/components/user/CalanderHeatMap'
import SubmissionsHistory from '@/components/user/SubmissionsHistory'
import ProblemsSolved from '@/components/user/ProblemsSolved'
import UserCard from '@/components/user/UserCard'


export const Spinner: React.FC = () => (
    <div className="flex justify-center">
      <div className="w-8 h-8 border-4 border-t-transparent rounded-full animate-spin" />
    </div>
  )

const ProfilePage: React.FC = () => {


  return (
    <>
    <div className="p-4 w-full mx-auto">
      <UserCard />
     
    </div>
    <ProblemsSolved />
    <Suspense fallback={<Spinner />}>
    <Heatmap />
    <SubmissionsHistory />
    </Suspense>

    
          </>
  )
}

export default ProfilePage