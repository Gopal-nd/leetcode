'use client'


import Heatmap from '@/components/user/CalanderHeatMap'
import SubmissionsHistory from '@/components/user/SubmissionsHistory'
import ProblemsSolved from '@/components/user/ProblemsSolved'
import UserCard from '@/components/user/UserCard'



const ProfilePage: React.FC = () => {


  return (
    <>
    <div className="p-4 w-full mx-auto">
      <UserCard />
     
    </div>
    <ProblemsSolved />
    
    <Heatmap />
    <SubmissionsHistory />

    
          </>
  )
}

export default ProfilePage