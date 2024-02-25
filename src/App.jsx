import React, { useContext, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import AddTask from './pages/AddTask'
import Profile from './pages/Profile'
import ViewTask from './pages/ViewTask'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import MyContext from './context/MyContext'


function App() {
  const navigate = useNavigate();
  const myState = useContext(MyContext);

  useEffect(() => {
    if (!myState.isAuthenticated) {
      navigate('/')
    }
    else {
      navigate('/profile')
    }
  }, [myState.isAuthenticated])

  return (
    <>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/viewtask" element={<ViewTask />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/addtask" element={<AddTask />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      <Footer />
    </>
  )
}

export default App