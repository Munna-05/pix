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
        }
    },
})

export const { addImage } = ImgSlice.actions;

export default ImgSlice.reducer;