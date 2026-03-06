import React, { useEffect } from 'react'
import ProfileHeader from '../components/ProfileHeader'
import StatsCard from '../components/StatsCard'

import {useAuth} from '../../auth/hooks/useAuth'
import Loader from '../../../shared/components/loader//Loader'


const Profile = () => {
  const {loading,user}  = useAuth()

  
  return (
    <div>
      <ProfileHeader user = {user} />
      <StatsCard/>

    </div>
  )
}

export default Profile