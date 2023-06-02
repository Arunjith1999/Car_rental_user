import { useState } from 'react'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import  { Toaster } from 'react-hot-toast';
import Signup from './components/Signup/Signup'
import Login from './components/Login/Login'
import HomePage from './Pages/HomePage'
import Navbar from './components/Home/Navbar'
import UserAccess from '../utils/Conditions'
import Category from './Pages/Category'
import {useEffect} from 'react';
import CarList from './components/CarModels/CarList'
import Car_Details from './Pages/Car_Details'
import Otp from './components/OTP/Otp';
import Profile from './Pages/Profile';
import Booking from './Pages/Booking';
import History from './components/History/History';


function App() {

  return (
   
    <div className='App'>
        <Toaster/>
        <ToastContainer/>
      <Router>
        <Routes>
        
          {/* ======================User============================== */}

          <Route path = '/signup'element = {<Signup/>}></Route>
          <Route path = '/login' element ={<Login/>}></Route>
          <Route path ='/otp' element ={<Otp/>}></Route>
          <Route path = '/category/:id' element = {<Category/>}></Route>
          <Route path = 'brand/:id' element = {<CarList/>}></Route>
          
          <Route path='/' element={<HomePage/>}></Route>
         
          {/* ======================Admin============================= */}

         
        <Route element = {<UserAccess/>}>
          <Route path ='/profile' element ={<Profile/>}></Route>
          <Route path = '/car_details/:id' element = {<Car_Details/>}></Route>
          <Route path = '/booking/:id' element = {<Booking/>}></Route>
          <Route path ='/history' element={<History/>}></Route>
          

          {/* <Route path = '/models' element = {<Category/>}></Route> */}
        </Route>


        </Routes>
      </Router>
      
    </div>
   
  )
}

export default App
