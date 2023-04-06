import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_URL } from '../../Config';


export const createUser = createAsyncThunk('users/createUser', async (userData) => {
    const response = await axios.post(`${API_URL}/signup`, userData)
    console.log(response)
    return response.data;
});

export const loginUser = createAsyncThunk('users/loginUser', async (userData, thunkApi) => {
    const res = await axios.post(`${API_URL}/login`, userData).catch(err => {
        console.log(err.response.data)
        return thunkApi.rejectWithValue({ message: err.response.data })
    })

    console.log("res", res)
    return res
    if (res) localStorage.setItem('token', res.data._id)
    console.log("logged", res.data)


})

export const findUser = createAsyncThunk('users/find', async (userData) => {
    const res = await axios.get(`${API_URL}/findUser/${userData}`)
    console.log("user find", res.data)
    return res.data
})



export const UserSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        error: null
    },
    reducers: {
        logout: (state) => {
            state.contents = null;
            state.error = null;
        }
    },
    extraReducers: {
        //signup
        [createUser.pending]: (state) => {
            state.isLoading = true
        },
        [createUser.fulfilled]: (state, action) => {
            state.isLoading = false
            state.contents = action.payload
        },
        [createUser.rejected]: (state, action) => {
            state.isLoading = false
            state.error = action.error.message
        },

        //login
        [loginUser.pending]: (state) => {
            state.isLoading = true
        },
        [loginUser.fulfilled]: (state, action) => {
            state.isLoading = false
            state.contents = action.payload.data
        },
        [loginUser.rejected]: (state, action) => {
            state.isLoading = false;
            console.log('reducer', action)
            state.error = action.payload.message
        },
        //finduser
        [findUser.pending]: (state) => {
            state.isLoading = true
        },
        [findUser.fulfilled]: (state, action) => {
            state.isLoading = false
            state.contents = action.payload
        },
        [findUser.rejected]: (state, action) => {
            state.isLoading = false
            state.error = action.error.message
        },

    },
})

export const { logout } = UserSlice.actions;

export default UserSlice.reducer;