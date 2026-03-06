import React from 'react'
import '../style/profileheader.scss'
const ProfileHeader = ({user}) => {
const {username,name,email} = user
  return (
    <div className="profile-header">
      {/* Avatar */}
      <div className="profile-header__avatar">
        <span className="profile-header__initials">JD</span>
      </div>

      {/* Info */}
      <div className="profile-header__info">
        <h2 className="profile-header__name">Name - {name}</h2>
             <h3 className="profile-header__username">username - {username}</h3>
        <p className="profile-header__email">Email - {email}</p>
      </div>
    </div>
  )
}

export default ProfileHeader