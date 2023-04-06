import React, { useEffect, useState } from 'react'
import ImageDetailed from '../Components/ImageDetailed'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../Config'
const ImageDetails = () => {
  const { id,userId } = useParams()
  const [user, setUser] = useState({})
  const allImages = useSelector(state => state.Images.Images)
  const [image,setImage] = useState({})

  // let image = allImages?.find(res => res._id === id)

  useEffect(() => {

    axios.get(`${API_URL}/image/${id}`).then((res) => {
      setImage(res.data)
      
    })

   
      axios.get(`${API_URL}/findUser/${userId}`).then((res) => {
        setUser(res.data)

      })
    
  }, [])
  return (
    <div>
      <ImageDetailed data={image} user={user} thumbs={image?.thumbs?.thumbnails} />
    </div>
  )
}

export default ImageDetails