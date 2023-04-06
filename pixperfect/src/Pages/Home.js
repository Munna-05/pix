import React, { useEffect, useState } from 'react'
import HomeImages from '../Components/HomeImages'
import { useSelector ,useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addImage } from '../Redux/Slice/ImgSlice'
import axios from 'axios'
import { API_URL } from '../Config'
const Home = () => {
    const navigate = useNavigate()
    const [images,setImages] = useState([])
    const userdetails = useSelector(state => state.userSignup.contents)
    const dispatch = useDispatch()
    useEffect(()=>{
        if (!userdetails) navigate('/')
        axios.get(`${API_URL}/images/get_all`).then((res)=>{
            console.log(res.data)
            dispatch(addImage(res.data))
            setImages(res.data)
        })
    }, [])


    return (
        <div className='bg-[#eae5d9]'>
            <HomeImages images={images} />
        </div>
    )
}

export default Home