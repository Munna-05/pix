import React, { useEffect, useState } from 'react'
import { API_URL } from '../Config'
import { useSelector } from 'react-redux'
import moment from 'moment/moment'
import axios from 'axios'
import { motion } from 'framer-motion'

const ImageDetailed = (props) => {

    const [user,setUser] = useState({})
    useEffect(()=>{
        if(props?.images){
            axios.get(`${API_URL}/findUser/${props?.images?.userId}`).then((res)=>{
                console.log("user details",res.data)
                setUser(res.data)
        })
        }
    },[props])
console.log("img",props?.images)
    const toLarge = async (data) => {
        console.log(data.thumbs.thumbnails.Large)
        window.open(`${API_URL}${data?.thumbs?.thumbnails?.Large}`)

    }
    const toMedium = (data) => {
        window.open(`${API_URL}${data?.thumbs?.thumbnails?.Medium}`)
    }
    const toSmall = (data) => {
        window.open(`${API_URL}${data?.thumbs?.thumbnails?.Small}`)
    }

    return (
        <div>
            
                    <motion.div initial={{ opacity: 0, y: 1000 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.4, type: 'spring' } }} className='bg-white w-fit p-2 rounded-lg shadow shadow-black shadow-lg  mx-auto mt-10'>

                        <div>
                            <img className='w-full object-cover rounded-md h-[50vh] ' src={`${API_URL}/${props.images?.imagePath}`} alt="" />
                        </div>
                        <div className='flex mt-2 px-1 gap-2'>
                            <button onClick={()=>toLarge(props.images)} className='border w-fit flex px-3 border-stone-300 items-center font-medium text-sm rounded-md py-1  text-stone-600'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mr-1">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                                </svg>
                                Large</button>
                            <button onClick={()=>toMedium(props.images)} className='flex border w-fit px-3 border-stone-300 items-center font-medium text-sm rounded-md py-1  text-stone-600'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mr-1">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                                </svg>
                                Medium</button>
                            <button onClick={()=>toSmall(props.images)} className='flex border w-fit px-3 border-stone-300 items-center font-medium text-sm rounded-md py-1  text-stone-600'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mr-1">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                                </svg>
                                Thumbnail</button>
                        </div>
                        <div className='flex px-3 mt-2 capitalize text-sm text-stone-700'><p>Uploaded by {user?.Name} on {moment(props?.images?.createdAt).format('ll')} </p></div>
                    </motion.div>
             


        </div>
    )
}

export default ImageDetailed