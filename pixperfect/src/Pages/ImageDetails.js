import React, { useEffect, useState } from 'react'
import ImageDetailed from '../Components/ImageDetailed'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../Config'
const ImageDetails = () => {
  const { id } = useParams()
  const [user, setUser] = useState({})
  const allImages = useSelector(state => state.Images.Images)
  const [image,setImage] = useState({})

  // let image = allImages?.find(res => res._id === id)

  useEffect(() => {

    axios.get(`${API_URL}/image/${id}`).then((res) => {
      setImage(res.data)
      // console.log(res.data)
      
    })

   
     
    
  }, [])
  return (
    <div>
      <ImageDetailed images={image?image:null}  />
    </div>
  ) 
}

export default ImageDetails