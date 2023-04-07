import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { createUser } from '../Redux/Slice/UserSlice'
import { toast, ToastContainer } from 'react-toastify'
import { logout } from '../Redux/Slice/UserSlice'
import 'react-toastify/dist/ReactToastify.css';

const SignupComponent = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [Name,setName] = useState('')
    const [Lastname,setLastname] = useState('')
    const [Email,setEmail] = useState('')
    const [Passowrd,setPassword] = useState('')
    const [Repass,setRepass] = useState('')
    const error = useSelector(state => state.userSignup.error)
    useEffect(() => {
        if (error) toast.error(error, { position: toast.POSITION.TOP_RIGHT,autoClose:1000,hideProgressBar:true })
        dispatch(logout())
    }, [error])

    const Signup =()=>{
       const data={
            Name : Name,
            LastName:Lastname,
            Email:Email,
            Password:Passowrd,
            Repassword:Repass
        }
        dispatch(createUser(data))
    }
    const user = useSelector(state=>state.userSignup?.contents)
    if(user) {
        localStorage.setItem('token',user._id)
        navigate('/home')
    }   
  return (
    <div>
        <ToastContainer/>
         <div className=''>
           
           <div className='bg-[#a8c1d1]  h-[100vh]  flex items-center justify-center px-3'
           style={{backgroundImage: "url(https://images.pexels.com/photos/3297593/pexels-photo-3297593.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)"}}
           >
               <div className='lg:w-1/4 md:w-1/4 bg-white rounded-3xl shadow shadow-md shadow-[#4f4f4f]'>
                   <div className=' pt-8 font-bold text-2xl text-stone-700'><span>Sign Up </span></div>
                   <div className=''>
                       <div className=' pt-5'>
                           <div className="flex mx-auto w-full justify-center lg:px-0 md:px-10 px-16">
                           <input onChange={(e)=>setName(e.target.value)} type="text" className='ring-1 outline-none ring-stone-600 px-3  text-sm lg:w-1/3 w-full h-8 rounded-l-lg  my-2' placeholder='First Name' />
                           <input onChange={(e)=>setLastname(e.target.value)} type="text" className='ring-1 ring-stone-600 px-3 text-sm outline-none lg:w-1/3 w-full h-8 rounded-r-lg  my-2' placeholder='Last Name' />
                           </div>
                           <input onChange={(e)=>setEmail(e.target.value)} type="text" className='ring-1 ring-stone-600 px-3 text-sm  outline-none w-2/3 h-8 rounded-lg my-2' placeholder='Enter your Email' />
                           <input onChange={(e)=>setPassword(e.target.value)} type="password" className='ring-1 ring-stone-600 px-3 text-sm  outline-none w-2/3 h-8 rounded-lg my-2' placeholder='Enter your Password' />
                           <input onChange={(e)=>setRepass(e.target.value)} type="password" className='ring-1 ring-stone-600 px-3 text-sm  outline-none w-2/3 h-8 rounded-lg my-2' placeholder='Re-Enter your Password' />
                       </div>
                       <div className='my-6'>
                           <button onClick={()=>Signup()} className='bg-[#6a87a5] lg:w-60 w-40 h-8 text-stone-100 hover:bg-blue-900  rounded'>Singup</button>
                       </div>
                       <div className='my-3 mb-6'>
                           <span className='text-sm text-stone-600'>
                           already have an Account ? <span onClick={()=>navigate('/')} className='mx-1 text-sm hover:underline cursor-pointer text-blue-700'>Login here</span> 
                           </span>
                       </div>
                   </div>

               </div>
           </div>
       </div>
    </div>
  )
}

export default SignupComponent