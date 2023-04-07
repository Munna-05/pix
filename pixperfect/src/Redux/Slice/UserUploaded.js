import {createSlice} from '@reduxjs/toolkit'

const UserUploaded = createSlice({
    name: 'UserUploaded',
    initialState: {
       Images:null,
       error:null
    },
    reducers: {
        addImage: (state,action) => {
            state.Images = action.payload;
            state.error = null;
        },
        reset:(state)=>{
            state.Images = null
        }
    },
})

export const { addImage,reset } = UserUploaded.actions;

export default UserUploaded.reducer;