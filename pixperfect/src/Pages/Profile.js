import React, { useEffect, useState } from 'react'
import ProfileImageList from '../Components/ProfileImageList'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
const Profile = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState({})
    const userdetails = useSelector(state => state.userSignup.contents)

    useEffect(()=>{
        if (!userdetails) navigate('/')
        setUser(userdetails)
    }, [])
    return (
        <div className='bg-[#eae5d9]'><ProfileImageList username={user.Name} id={user._id} apikey={user.apikey} /></div>
    )
}

export default Profile