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
        }
    },
})

export const { addImage } = UserUploaded.actions;

export default UserUploaded.reducer;