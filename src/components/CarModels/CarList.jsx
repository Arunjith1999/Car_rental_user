import React, { useEffect, useState} from 'react'
import CarImg1 from '../../assets/Images/bmw-box.png'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
// import './CarModels.scss'
import styles from './CarList.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee,faSquareCaretDown,faGasPump,faCarSide,faLocationPin} from '@fortawesome/free-solid-svg-icons'


import axios from '../../../utils/axios'
import { brandsGet, carGet,carbrandGet } from '../../../utils/constants'
const CarList = () => {
   const params = useParams()
   
   const navigate = useNavigate()

    const [brand, setBrand] = useState([])
    const [car, setCar] = useState([])
    // const [brand_id,setBrand_id] = useState('')
    
    // const selectHandler = (e)=> {
    //     const value = e.target.value 
        
    // }
    useEffect (()=>{
        
        axios.get(`${brandsGet}${params.id}`).then((res)=>{
            setBrand(res.data)
        })
    },[params])

   

    const selectBrand = (e)=>{
        const value = e.target.value 
        console.log(value,'ooooooo');
        axios.get(`${carbrandGet}${params.id}/${value}`).then((res)=>{
            console.log(res.data);
            setCar(res.data)
        })
        
        

    }

    useEffect(()=>{
        axios.get(`${carGet}${params.id}/`).then((res)=>{
            
            setCar(res.data)
        })

    },[params])

  
    

  return (
       <>
<div className={styles['select-container']}>
  <select className={styles['select-box']}  onChange={selectBrand}>
  <option  value="">Brands</option>
  {brand.map((r,index) => (
        <option key = {r.id} value={r.id}  >{r.title}</option>
       ))}
  </select>
  <div className={styles['icon-container']} style={{pointerEvents: 'none'}}>
  <FontAwesomeIcon icon={faSquareCaretDown} />
  </div>
</div>
       
      
      <div className={styles.container}>
          <div className={styles['models-div']}>




            {car.map((c)=>(
                <div className={styles.box} >
           
                 <div className={styles['box-img']}>
                   <img className={styles.img}  src={` https://api1.carrent.website${c.image}`} alt="car_img" />
                   <div className={styles.description}>
                     <div className={styles["name-price"]}>
                       <div className={styles.name}>
                         <p className={styles.p1}>{c.name}</p>
                         <span className={styles.span1}>
                           {/* <i className="fa-solid fa-star"></i>
                           <i className="fa-solid fa-star"></i>
                           <i className="fa-solid fa-star"></i>
                           <i className="fa-solid fa-star"></i>
                           <i className="fa-solid fa-star"></i> */}
                         </span>
                       </div>
                       <div className={styles.price}>
                         <h4 className={styles.h4}>₹{c.rent_price}</h4>
                         <p className={styles.p2}>per day</p>
                       </div>
                     </div>
                     <div className={styles.details}>
                       <span className={styles.span2}>
                         <i className={styles.i2}></i> &nbsp; {c.name}
                       </span>
                       <span className={styles.span2} style={{ textAlign: "right" }}>
                         4/5 &nbsp; <i className={styles.i2}></i>
                       </span>
                       <span style={{fontWeight:'300',fontSize:'20px'}}>
                         <i ></i>
                          &nbsp; <FontAwesomeIcon icon ={faCarSide}/>Manual
                       </span>
                       <span className={styles.span2} style={{ textAlign: "right" }}>
                      {c.fuel}  <FontAwesomeIcon icon = {faGasPump}></FontAwesomeIcon> &nbsp; <i className="fa-solid fa-car-side"></i>
                       </span>
                       <span className={styles.span2} style={{ textAlign: "right" }}>
                      {c.location}  <FontAwesomeIcon icon = {faLocationPin}></FontAwesomeIcon> &nbsp; <i className="fa-solid fa-car-side"></i>
                       </span>
                     </div>
                     <div className={styles.btn}>
                       <button  style={{border:'none',background:'transparent',color:'white',fontFamily:'bold'}} onClick={() => navigate(`/car_details/${c.id}`) } >
                        View Details
                       </button>
                       
                     </div>
                   </div>
                 </div>
               </div>
            ))}
           






    </div>
    </div>
    </>
  )
}

export default CarList
