import React from 'react'
import HeroPages from '../components/HeroPage/HeroPages'
import Footer from '../components/Footer/Footer'
import { useEffect, useState } from "react";
import Navbar from '../components/Home/Navbar'

// import './CarModels.scss'
import axios from '../../utils/axios';
import CarList from '../components/CarModels/CarList';


const Category = () => {
  const [Brand,SetBrand] = useState([])
  const HandleSelect = (e) =>{
     const value = e.target.value 

  useEffect (()=>{
    axios.get(brandGet).then((res)=>{
      console.log(res.data);
      SetBrand(res.data)
    })
  })
  }
  return (
    <div>
    <Navbar/>    
      <section className="models-section">
        <HeroPages name="Vehicle Models" />
        <CarList/>
       {/* <div className="book-banner">
          <div className="book-banner__overlay"></div>
          <div className="container">
            <div className="text-content">
              <h2>Book a car by getting in touch with us</h2>
              <span>
                <i className="fa-solid fa-phone"></i>
                <h3>(123) 456-7869</h3>
              </span>
            </div>
          </div>
        </div> */}
       <Footer/>   
     </section>
</div>
  )
}

export default Category
