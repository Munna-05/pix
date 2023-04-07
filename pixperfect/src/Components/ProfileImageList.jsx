import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { API_URL } from '../Config';
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { injectStyle } from "react-toastify/dist/inject-style";
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { addImage } from '../Redux/Slice/UserUploaded';
import { useNavigate } from 'react-router';
import moment from 'moment';


injectStyle()


const ProfileImageList = ({ username, id, apikey }) => {
    const [Images, setImages] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userUploads = useSelector(state => state.UserProfile.Images)

    const formData = new FormData()
    const upload = () => {

        axios.post(`${API_URL}/upload/${id}`, formData, {
            headers: {
                'Authorization': `Bearer ${apikey}`,
            }

        }).then((res) => {

            dispatch(addImage(res.data))

            toast.success("Image Uploaded", { position: toast.POSITION.TOP_RIGHT, autoClose: 1000, hideProgressBar: true, closeButton: false, closeOnClick: true })
            formData.delete("image")

        }).catch(err => {
            console.log(err)
            toast.error(err.response.data, { position: toast.POSITION.TOP_RIGHT, autoClose: 1000, hideProgressBar: true, closeButton: false, closeOnClick: true })
        });
    }


    useEffect(() => {
        setImages(userUploads)
    }, [userUploads])

   

    console.log(Images)
    return (
        <div className='pb-16'>
            <ToastContainer


            />

            <div className='flex my-8 justify-center container mx-auto'>
                <h1 className='text-xl text-stone-500 capitalize'>Hi, <span className='text-stone-700 text-4xl ml-4'>{username}</span> <span className='text-sm mx-2'>your API key is</span> <span className='text-stone-600 font-semibold'>"{`${apikey}`}"</span></h1>
            </div>
            <div>
                <div class="items-center px-5 justify-center pt-5  w-fit mx-auto mb-10">

                    <form className='bg-white w-96 mx-auto  rounded-r-lg'>
                        <label class="">
                            <span class="sr-only">Choose photo</span>
                            <input type="file" onChange={(e) => formData.append("image", e.target.files[0])} class="block w-full text-sm text-gray-500
                                                        file:mr-4 file:py-2 file:px-4
                                                        file:rounded-md file:border-0
                                                        file:text-sm file:font-semibold
                                                        file:bg-blue-500 file:text-white
                                                        hover:file:bg-blue-600
                                                        "/>
                        </label>
                    </form>
                    <button onClick={upload} className='my-4 bg-[#6a87a5] w-20 h-8 text-white text-sm rounded-lg hover:bg-gray-500'>Upload</button>
                </div>
            </div>

            <div className=' container  mx-auto grid gap-2  grid-cols-4  '>
                {
                    Images?.map((res, i) => {
                        return (

                            <motion.div onClick={()=>navigate(`/details/${res._id}`)} className='cursor-pointer ring-stone-400 border' initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1, transition: { delay: i / 9, type: 'spring' } }}>
                                <motion.img whileHover={{ filter: "brightness(120%)" }} src={`${API_URL}/${res.imagePath}`} className='w-full h-full mx-auto  object-cover mx-auto bg-white p-2' alt="" />
                                
                            </motion.div>
                           
                        )
                    })
                }


            </div>
        </div>
    )
}

export default ProfileImageList