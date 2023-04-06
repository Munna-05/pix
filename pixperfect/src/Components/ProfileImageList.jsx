import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { API_URL } from '../Config';
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { injectStyle } from "react-toastify/dist/inject-style";

injectStyle()


const ProfileImageList = ({ username, id, apikey }) => {
    const array = [1, 2, 3, 4, 5, 6, 6, 7, 1, 2, 3, 4, 5, 6, 6, 7, 1, 2, 3, 4, 5, 6, 6, 7, 1, 2, 3, 4, 5, 6]

    const formData = new FormData()
    const [image, setImage] = useState()

    const upload = () => {

        axios.post(`${API_URL}/upload/${id}`, formData, {
            headers: {
                'Authorization': `Bearer ${apikey}`,
            }

        }).then((res) => {
            toast.success(res.data, { position: toast.POSITION.TOP_RIGHT, autoClose: 1000, hideProgressBar: true, closeButton: false, closeOnClick: true })
            formData.delete("image")

        }).catch(err => {
            console.log(err)
            toast.error(err.response.data, { position: toast.POSITION.TOP_RIGHT, autoClose: 1000, hideProgressBar: true, closeButton: false, closeOnClick: true })
        });
    }
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

            <div className=' container  mx-auto grid grid-cols-10 '>
                {
                    array.map((res, i) => {
                        return (
                            <motion.div className='cursor-pointer ring-stone-400 border' initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1, transition: { delay: i / 9, type: 'spring' } }}>
                                <motion.img whileHover={{ filter: "brightness(120%)" }} src="https://images.pexels.com/photos/1366630/pexels-photo-1366630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
                            </motion.div>
                        )
                    })
                }


            </div>
        </div>
    )
}

export default ProfileImageList