import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import UserCard from './UserCard';
import EditProfile from './EditProfile';

const Profile = () => {
  const userData = useSelector((store) => store.user);
  return (
    (userData && 
    <div className='flex my-10 items-center justify-center'>
    <EditProfile user = {userData}/>
    </div>
    )
  )
}

export default Profile
