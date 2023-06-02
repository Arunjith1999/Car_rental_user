import React, { useCallback, useEffect, useState } from "react";
import Navbar from "../components/Home/Navbar";
import styles from "./Booking.module.css";
import { carDetail } from "../../utils/constants";
import { useParams } from "react-router-dom";
import axios from "../../utils/axios";
import DateTimePicker from '../components/DateTimePicker/DateTimePick'
import { TextField } from "@mui/material";
import BookingModal from  '../components/Modal/PaymentModal'
import PaymentModal from "../components/Modal/PaymentModal";
import Payment from "../components/Payment/Payment";
import toast from 'react-hot-toast'



const Booking = () => {
  const [startDate,setStartDate] = useState('')
  const [endDate,setendDate] = useState('')
  const [paymentPopUp, setPaymentPopup] = useState(false)
  console.log(paymentPopUp,'../modal status');
  const [carId, setCarId] = useState('')
  const [carImg, setCarImg] = useState("");
  const [location, setLocation] = useState('')
  const params = useParams();

  console.log(startDate,'////////');
  console.log(endDate,'////////');
  
  useEffect(() => {
    axios.get(`${carDetail}${params.id}/`).then((res) => {
       setCarId(res.data.id)
      setCarImg(res.data.image);
      setLocation(res.data.location)
    });
  }, []);
  const clickHandler = ()=>{
    
      setPaymentPopup(true)
   
   
  }
  const isDateSelected = startDate && endDate;
const textFieldStyle = {width:'20rem',height:'3.7rem'}
const labelStyle = {
    fontSize: '18px',
    fontWeight: '600',
    color :'grey',
    fontFamily :'monospace',
    marginTop:'-1rem'
}






  return (
    <div>
      <Navbar />
      <div className="container" style={{zoom:'1.2'}}>
        <div className="row col-md-12">
          <div className="row">
            <div
              className={styles["card-wrapper"]}
              style={{ marginTop: "3rem" }}
            >
              <div className={styles["card"]}>
                <div className={styles["product-imgs"]}>
                  <div className={styles["img-display"]}>
                    <div
                      className={styles["img-showcase"]}
                      style={{ marginLeft: "8rem" }}
                    >
                      <img
                        src={`http://127.0.0.1:8000${carImg}`}
                        alt="Car image"
                      />
                    </div>
                  </div>
                </div>
                <div
                  className={styles["product-content"]}
                  style={{ border: "1px solid black" }}
                >
                  <p>
                    <span>
                      {" "}
                      Select Time And Date For Your Journey{" "}
                      <span style={{ color: "red" }}>*</span>
                    </span>{" "}
                  </p>
                  <DateTimePicker setStartDate={setStartDate} setendDate={setendDate} />
                  <div className={styles.rentlimit}>
                  Note<span style={{color:'red'}}>*</span><span className={styles.limitspan}>  &nbsp;You cannot rent car for more than <u style={{color:'red'}}>15</u>   days</span>
                  </div>
                  <div className={styles.rentlimit}>
                  <span className={styles.limitspan}>  &nbsp;  &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;Minimum of  <u style={{color:'red'}}>2</u>    days should be selected</span>
                  </div>
                
                  
                  <hr
                    style={{
                      color: "red",
                      border: "none",
                      borderTop: "4px solid red",
                      margin: "20px 0",
                      marginTop:'6rem'
                    }}
                  />
                
                   
                </div>
              </div>
            </div>
              <div className="d-flex justify-content-end">
              {!isDateSelected?
                            <button className="btn btn-outline-secondary" disabled style={{width:'25rem', fontSize:'1.7rem', borderRadius:'10px'}} onClick={clickHandler}>Select date to continue</button>

                            :
                            <button className={styles.paymentbutton}  style={{width:'25rem', fontSize:'1.7rem', borderRadius:'10px'}} onClick={clickHandler}>Proceed to Payment</button>
              }
              </div>
          
          </div>
        </div>
      </div>
       <BookingModal
       paymentPopUp = {paymentPopUp}
       setPaymentPopup = {setPaymentPopup}
       title ='Payment'
       
       >
       <Payment startDate = {startDate}
                endDate = {endDate}
                carId = {carId}
                location = {location}
                setPaymentPopup = {setPaymentPopup}
                />
       </BookingModal>
    </div>
  );
};

export default Booking;
