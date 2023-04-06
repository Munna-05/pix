import {configureStore} from '@reduxjs/toolkit'
import UserSlice from '../Slice/UserSlice'
import ImgSlice from '../Slice/ImgSlice'

export const store = configureStore({
    reducer:{
        userSignup:UserSlice,
        Images:ImgSlice
    }
})
