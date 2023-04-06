import {configureStore} from '@reduxjs/toolkit'
import UserSlice from '../Slice/UserSlice'
import ImgSlice from '../Slice/ImgSlice'
import UserUploaded from '../Slice/UserUploaded'

export const store = configureStore({
    reducer:{
        userSignup:UserSlice,
        Images:ImgSlice,
        UserProfile:UserUploaded
    }
})
