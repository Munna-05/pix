import React from 'react'
import { API_URL } from '../Config'
import {useSelector} from 'react-redux'

const ImageDetailed = ({data}) => {
     
    

    return (
        <div>
            <div className='bg-white w-fit p-2 rounded-lg shadow shadow-black shadow-lg  mx-auto mt-10'>

                <div>
                    <img className='w-full object-cover rounded-md h-[50vh] ' src={`${API_URL}/${data.imagePath}`} alt="" />
                </div>
                <div className='flex mt-2 px-1 gap-2'>
                    <button className='border w-fit px-3 border-stone-300 items-center font-medium text-sm rounded-md py-1  text-stone-600'>Large</button>
                    <button className='border w-fit px-3 border-stone-300 items-center font-medium text-sm rounded-md py-1  text-stone-600'>Medium</button>
                    <button className='border w-fit px-3 border-stone-300 items-center font-medium text-sm rounded-md py-1  text-stone-600'>Thumbnail</button>
                </div>
            </div>
           

        </div>
    )
}

export default ImageDetailed