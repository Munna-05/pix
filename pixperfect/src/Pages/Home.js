import React, { useEffect, useState } from 'react'
import HomeImages from '../Components/HomeImages'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addImage } from '../Redux/Slice/ImgSlice'
import axios from 'axios'
import { API_URL } from '../Config'
const Home = () => {
    const navigate = useNavigate()
    const [allImages, setImages] = useState([])
    const userdetails = useSelector(state => state.userSignup.contents)
    const userUploads = useSelector(state => state.UserProfile.Images)
    const images = useSelector(state => state.Images.Images)


    const dispatch = useDispatch()

    useEffect(() => {
        if (!userdetails) navigate('/')
           
            axios.get(`${API_URL}/images/get_all`).then((res) => {
                console.log(res.data)

                dispatch(addImage(res.data))

            })
           
    }, [userUploads])

   



    return (
        <div className='bg-[#eae5d9]'>
            <HomeImages />
        </div>
    )
}

export default Home