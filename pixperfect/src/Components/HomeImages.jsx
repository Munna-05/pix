import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../Config'
const HomeImages = ({images}) => {
    const navigate = useNavigate()
    const array = [1, 2, 3, 4, 5, 6, 6, 7,2,2,2,2,2,2]
    return (
        <div>
            <div className=' container py-16 bg-[]  mx-auto grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2 px-3 gap-1'>
                {
                    images.map((res, i) => {
                        return (
                            <motion.div onClick={()=>navigate(`/details/${res._id}`)} className='cursor-pointer' initial={{opacity:0,scale:0.7}} animate={{opacity:1,scale:1,transition:{delay:i/9,type:'spring'}}}>
                                <img className='w-full h-full object-cover' src={`${API_URL}/${res.imagePath}`} alt="" />
                            </motion.div>
                        )
                    })
                }


            </div>
        </div>
    )
}

export default HomeImages