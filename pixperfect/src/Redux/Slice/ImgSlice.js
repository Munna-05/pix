import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


const ImgSlice = createSlice({
    name: 'images',
    initialState: {
       Images:null,
       error:null
    },
    reducers: {
        addImage: (state,action) => {
            state.Images = action.payload;
            state.error = null;
        },
        remove:(state)=>{
            state.Images = null;
        }
    },
})

export const { addImage ,remove} = ImgSlice.actions;

export default ImgSlice.reducer;