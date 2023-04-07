import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { API_URL } from '../Config'
import { useState } from 'react'
const HomeImages = () => {
    const navigate = useNavigate()

    const images = useSelector(state => state.Images.Images)
    console.log("home images",images)




    return (
        <div>
            {images?.length < 1 ? <div className='w-full h-80 flex items-center justify-center font-light text-2xl text-stone-500'>Go to Profile Add Images...</div> : null}
            <div className=' container py-16 bg-[]  mx-auto grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2 px-3 gap-1'>
                {
                    images?.map((res, i) => {
                        return (
                            
                                <motion.div onClick={() => navigate(`/details/${res?._id}`)} className='cursor-pointer' initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1, transition: { delay: i / 4, duration: 1, type: 'spring' } }}>
                                    <img className='w-full h-full object-cover' src={`${API_URL}/${res?.imagePath}`} alt="" />
                                </motion.div>
                            
                        )
                    })
                }


            </div>
        </div>
    )
}

export default HomeImages