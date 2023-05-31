import React from 'react'
import Navbar from '../components/Home/Navbar'
import BookCar from '../components/Home/BookCar'
import Hero from '../components/Home/Hero'
import PlanTrip from '../components/Home/PlanTrip'
import HomeCars from '../components/homeCars/HomeCars'
import Footer from '../components/Footer/Footer'
import Banner from '../components/Home/Banner'


const HomePage = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      {/* <BookCar/> */}
      <PlanTrip/>
      <HomeCars/>
      <Banner/>
      <Footer/> 
    
      {/* <CarPick/> */}

    </div>
  )
}

export default HomePage
