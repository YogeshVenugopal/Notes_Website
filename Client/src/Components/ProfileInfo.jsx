import React from 'react'
import { firstName, getInitials } from '../utils/Helper'

const ProfileInfo = ({onLogout}) => {
    const name = "Yogesh venugopal";
  return (
    <div className='flex items-center gap-5'>
        <div
        className='w-[50px] h-[50px] rounded-full bg-gray-200 flex justify-center items-center text-lg font-semibold cursor-pointer'
        >
            {getInitials(name)}
        </div>
        <div className='flex flex-col items-center justify-center'>
            <p className='font-semibold'>
                {firstName(name)}    
            </p> 
            <span className='text-gray-500 underline cursor-pointer' onClick={onLogout}>Logout</span>
        </div>
    </div>
  )
}

export default ProfileInfo