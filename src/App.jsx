import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import AddTask from './pages/AddTask'
import Profile from './pages/Profile'
import ViewTask from './pages/ViewTask'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
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