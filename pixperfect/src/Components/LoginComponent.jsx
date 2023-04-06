import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { createUser } from '../Redux/Slice/UserSlice'
import { loginUser, findUser } from '../Redux/Slice/UserSlice'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
const LoginComponent = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const error = useSelector(state => state.userSignup.error)

    useEffect(() => {
        if (error) toast.error(error, { position: toast.POSITION.TOP_RIGHT,autoClose:1000,hideProgressBar:true })
    }, [error])


    const loginNow = () => {
        const data = {
            email: email,
            password: password
        }
        dispatch(loginUser(data))

    }
    const user = useSelector(state => state.userSignup?.contents)
    console.log(user)
    if (user) {
        localStorage.setItem('token', user._id)
        navigate('/home')
    }

    return (
        <div className=''>
            <ToastContainer />


            <div className='bg-[#a8c1d1] h-[100vh] flex items-center justify-center px-3'
                style={{ backgroundImage: "url(https://images.pexels.com/photos/3297593/pexels-photo-3297593.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)" }}
            >
                <div className='lg:w-1/4 md:w-1/4  bg-white rounded-3xl shadow shadow-md shadow-[#4f4f4f]'>
                    <div className=' pt-8 font-bold text-2xl text-stone-700'><span>PixPerfect</span></div>
                    <div className=''>
                        <div className=' pt-5'>
                            <input onChange={(e) => setEmail(e.target.value)} type="text" className=' outline-none ring-1 ring-stone-600 px-3 text-sm lg:3/4 md:w-3/4 w-3/4 h-8 rounded-lg my-2' placeholder='Enter your Email' />
                            <input onChange={(e) => setPassword(e.target.value)} type="password" className=' outline-none ring-1 ring-stone-600 px-3 text-sm lg:3/4 md:w-3/4 w-3/4 h-8 rounded-lg my-2' placeholder='Enter your Password' />
                        </div>
                        <div className='my-6'>
                            <button onClick={loginNow} className='bg-[#6a87a5] lg:w-60 w-40 h-8 text-stone-100 hover:bg-blue-900  rounded'>Login</button>
                        </div>
                        <div className='my-3 mb-6'>
                            <span className='text-sm text-stone-600'>
                                Don't have an Account ? <span onClick={() => navigate('/signup')} className='mx-1 text-sm hover:underline cursor-pointer text-blue-700'>Sign up here</span>
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default LoginComponent