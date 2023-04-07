import React, { useEffect, useState } from 'react'
import ProfileImageList from '../Components/ProfileImageList'
import { useSelector,useDispatch } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { addImage } from '../Redux/Slice/UserUploaded'
import axios from 'axios'
import { API_URL } from '../Config'
const Profile = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [user, setUser] = useState({})
    const [Images,setImages] = useState([])
    const userdetails = useSelector(state => state.userSignup.contents)
    const userUploads = useSelector(state=>state.UserProfile.Images)


    useEffect(()=>{
        if (!userdetails) navigate('/')
        setUser(userdetails)
        
           if(!userUploads){
            axios.get(`${API_URL}/userprofile/${userdetails?._id}`).then((res)=>{
                dispatch(addImage(res.data))   
            })
           }
        
    }, [])

    return (
        <div className='bg-[#eae5d9]'><ProfileImageList username={user.Name} id={user._id} apikey={user.apikey} /></div>
    )
}

export default Profile