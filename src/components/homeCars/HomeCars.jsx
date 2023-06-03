import React, { useEffect, useState } from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from './HomeCars.module.css'
import { homeCarGet } from '../../../utils/constants';
import axios from '../../../utils/axios'
import { useNavigate } from 'react-router-dom';



const HomeCars = () => {
    const navigate = useNavigate()
    const[homeCar,getHomeCar] = useState([])
    useEffect(()=>{
        axios.get(homeCarGet).then((res)=>{
            console.log(res.data);
              getHomeCar(res.data)
        })
    },[])

    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 1024 },
          items: 4
        },
        desktop: {
          breakpoint: { max: 1024, min: 800 },
          items: 3,
          slidesToSlide: 2
        },
        tablet: {
          breakpoint: { max: 800, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };
  return (

        <>
       <section  style={{padding:'10rem 0'}}>
        <div className={styles.container}>
          <div  style={{display:'flex',flexDirection:'column'}}>
            <div className={styles.title}>
              <h3 className={styles.h3}>Vehicle Models</h3>
              <h2 className={styles.h2}>Our Latest Cars 🚗</h2>
              <p className={styles.p}>
                <span>Choose from a variety of our amazing vehicles to rent for your next adventure or business trip</span> 
                
              </p>
              </div>
            </div>
            </div>
            </section>
            <div style={{marginLeft:'8rem'}}>
              <Carousel responsive={responsive} 
               swipeable={true}  
               autoPlay={responsive.deviceType !== "mobile" ? true : false} 
               autoPlaySpeed={1000} 
               keyBoardControl={true} 
               customTransition="all .5"
               transitionDuration={3500}
               containerClass="carousel-container" 
               showDots={true}>
           
        {homeCar.map((r)=>(
     <div className={styles.card}>
             <img style={{width:'100%',height:'16em',objectFit:'cover'}} src= {` https://ap.carrent.website${r.image}`} alt="product image" />
             <h2>{r.name}</h2>
             <p className={styles.price}>₹{r.rent_price}/day</p>
             <p>{r.fuel}</p>
             <p>
               <button className= {styles.button} style={{backgroundColor:'orangered'}} onClick={() => navigate(`/car_details/${r.id}`)} >View Details</button>
             </p>
    </div>
        ))}
          </Carousel>
          </div>
          </>
      
     
  
   
  )
}

export default HomeCars
