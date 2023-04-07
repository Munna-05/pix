import React, { useEffect, useState } from 'react'
import ImageDetailed from '../Components/ImageDetailed'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../Config'


const ImageDetails = () => {
  const { id } = useParams()
  const [image,setImage] = useState({})
  useEffect(() => {

    axios.get(`${API_URL}/image/${id}`).then((res) => {
      setImage(res.data)
      
      
    })

   
     
    
  }, [])
  return (
    <div>
      <ImageDetailed images={image?image:null}  />
    </div>
  ) 
}

export default ImageDetails