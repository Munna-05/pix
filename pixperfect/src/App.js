import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Pages/Login';
import Navbar from './Components/Navbar';
import { Signup } from './Pages/Signup';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import ImageDetails from './Pages/ImageDetails';
import {useSelector} from 'react-redux'
import { useEffect, useState } from 'react';


function App() {
  const user = useSelector(state=>state.userSignup.contents)
  const [token,setToken] = useState('')
  useEffect(()=>{
    const token = localStorage.getItem('token')
    setToken(token)
  },[user])

  return (
    <div className="App bg-[#eae5d9] h-screen">
      <BrowserRouter>
        {
          token ? <Navbar /> : null
        }
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/home' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/details/:id' element={<ImageDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
