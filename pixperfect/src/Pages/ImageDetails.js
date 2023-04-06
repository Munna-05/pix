import React from 'react'
import ImageDetailed from '../Components/ImageDetailed'
import {useSelector} from 'react-redux'
import { useParams } from 'react-router-dom'
const ImageDetails = () => {
    const {id} = useParams()
    const allImages = useSelector(state=>state.Images.Images)
    console.log(id)
    let image = allImages.find(res=>{
      if(res._id===id)return res
    })
    console.log(image)
  return (
    <div>
        <ImageDetailed data={image}/>
    </div>
  )
}

export default ImageDetails