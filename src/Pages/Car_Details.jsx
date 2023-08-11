import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from '../../utils/axios'
import { carDetail, profileStatus } from '../../utils/constants'
import Navbar from '../components/Home/Navbar'
import Carousel from '../components/Carousel/Carousel'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCarOn,faSnowflake,faCarSide,faGasPump, faLocationPin} from '@fortawesome/free-solid-svg-icons'
import 'font-awesome/css/font-awesome.min.css';
import styles from './Car_Details.module.css'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'


const Car_Details = () => {
    const [image, setImage] = useState([])
    const [carDetails, setCarDetails] = useState([])
    const [imageSrc,setImageSrc] =useState('');
    const [statuss,setStatus] = useState('')
    console.log(imageSrc);
    const params = useParams()

  
  
    useEffect(()=>{
        axios.get(`${carDetail}${params.id}/`).then((res)=>{
            console.log(res.data);
           setImage(res.data)
           setCarDetails(res.data)
           const defaultValue = (res.data.image1);
           console.log(defaultValue);
           setImageSrc(defaultValue)
          
        })
    },[params])
   const id = Cookies.get('user_id')
   const buttonHandler = () => {
    axios.get(`${profileStatus}${id}/`).then((res) => {
      setStatus(res.data.status);
      if (res.data.status === 'true') {
        navigate(`/booking/${carDetails.id}`);
        console.log('Trueeeeee');
      } else {
        console.log('falseee');
        toast.error('Upload your license and ID proof', {
          position: toast.POSITION.BOTTOM_CENTER,
          bodyStyle: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          },
        });
        navigate('/profile');
      }
    });
  };
const handleClick=(image)=>{
    setImageSrc(image)
}
const navigate = useNavigate()
  return (
    <>
    <Navbar/>
<div className='container' style={{zIndex:'-9999',zoom:''}} >
  <div className='row col-md-12' >
<div className = {styles['card-wrapper']} >
  <div className = {styles['card']}>
    <div className = {styles['product-imgs']} style={{  border: '1px solid black',}}>
      <div className ={styles['img-display']}>

        <div className = {styles['img-showcase']}  >
          <img  src ={` https://api1.carrent.website${imageSrc}`} alt = "Car image"/>
        </div>
      </div>
      <div className = {styles["img-select"]} >
      
            <div className = {styles["img-item"]}>
            <a href = "#" data-id = "1">
              <img  src  = {` https://api1.carrent.website${image.image1}`} onClick={() => handleClick(image.image1)} alt = "Car image"/>
            </a>
            </div>
            <div className = {styles["img-item"]}>
            <a href = "#" data-id = "1">
              <img  src  = {` https://api1.carrent.website${image.image2}`} onClick={() => handleClick(image.image2)} alt = "Car image"/>
            </a>
            </div>
            <div className = {styles["img-item"]}>
            <a href = "#" data-id = "1">
              <img  src  = {` https://api1.carrent.website${image.image3}`} onClick={() => handleClick(image.image3)} alt = "Car image"/>
            </a>
          </div>
         
      </div>
    </div>

    <div className = {styles["product-content"]} style={{  border: '1px solid black'}}>
      <h2 className = {styles["product-title"]}>{carDetails.name}</h2>

      <div className = {styles["product-price"]}>
       <p className = {styles["new-price"]}>Rent: <span> ₹ {carDetails.rent_price} /day </span></p>
      </div>

      <div className = {styles["product-detail"]}>
        <h2>About {carDetails.name}: </h2>
        <p>{carDetails.description}</p>
        <ul>
            
         <li > <FontAwesomeIcon icon={faGasPump}> </FontAwesomeIcon>   Fuel: <span>{carDetails.fuel}</span></li>
          <li   className='pt-5'><FontAwesomeIcon icon = {faCarSide}></FontAwesomeIcon>  Seats: <span>4/5</span></li>
          <li className='pt-5'><FontAwesomeIcon icon ={faSnowflake}></FontAwesomeIcon>  A.C: <span>{carDetails.ac}</span></li>
          <li className='pt-5'><FontAwesomeIcon icon ={faLocationPin}></FontAwesomeIcon>  Location <span>{carDetails.location}</span></li>
          <li className='pt-5'><FontAwesomeIcon icon={faCarOn}></FontAwesomeIcon>  Availability : <span>Available</span></li>
        </ul>
      </div>

      <div className ={styles["purchase-info"]}>
        {/* <button type = "button" className = {styles.btn} onClick={()=>navigate(`/booking/${carDetails.id}`)}  */}
        <button type = "button" className = {styles.btn} onClick={buttonHandler}
        style={{marginLeft:'12em',
              width:'250px',
              height:'65px',
              borderRadius:'0px',
              fontSize:'1.5rem',
              fontFamily:'monospace',
              letterSpacing:'2px'}} >
         Book Now <i ></i>
        </button>
      </div>
    </div>
  </div>
</div>
</div>

</div>
  
</>
  )
}

export default Car_Details
