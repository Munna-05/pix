import React, { useEffect, useState } from 'react'
import LoginComponent from '../Components/LoginComponent'
import {useSelector,useDispatch} from 'react-redux'
import { createUser } from '../Redux/Slice/UserSlice'
import { useNavigate } from 'react-router-dom'
import { findUser } from '../Redux/Slice/UserSlice'
const Login = () => {
    const navigate = useNavigate()
    const userdetails = useSelector(state => state.userSignup.contents)
    const dispatch = useDispatch()

    useEffect(()=>{
        if (userdetails) navigate('/home')
        const token = localStorage.getItem('token')
        if(token) dispatch(findUser(token))
    }, [])

    
  return (
    <div>
        <LoginComponent/>
    </div>
  )
}

export default Login