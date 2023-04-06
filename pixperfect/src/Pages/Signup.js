import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SignupComponent from '../Components/SignupComponent'
import {useSelector} from 'react-redux'

export const Signup = () => {
    const navigate = useNavigate()
    const userdetails = useSelector(state => state.userSignup.contents)

    useEffect(()=>{
        if (userdetails) navigate('/home')
    }, [])

  return (
    <div><SignupComponent/></div>
  )
}
