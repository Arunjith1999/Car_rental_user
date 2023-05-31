import React, { useCallback, useEffect, useState } from 'react'
import styles from './Payment.module.css'
import { Booking, createOrder } from '../../../utils/constants';
import axios from '../../../utils/axios'
import dayjs from 'dayjs';
import useRazorpay from "react-razorpay";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
 
const Payment = (props) => {
  const navigate = useNavigate()
  const {startDate,endDate, carId, location, setPaymentPopup} = props
  const Razorpay = useRazorpay();
  const [bookingDetails, setBookingDetails] = useState({})
  

    const user_id = Cookies.get('user_id')
    const data = {startDate,endDate,carId,location}
    console.log(data.startDate);
    // const [order, setOrder] = useState({})
    useEffect(()=>{
        axios.post(Booking,data).then((res)=>{
            setBookingDetails(res.data)
            
           
        })

    },[])
     
    const booking = (details) => {
     console.log(details,'latest');
      const requestData = {
        details: details,
        user_id: user_id,
        data: data,
      };
       
      axios
        .post(createOrder, requestData, {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    
    const formattedStartDate = dayjs(startDate).format('MMMM DD, YYYY hh:mm A');
    const formattedEndDate = dayjs(endDate).format('MMMM DD, YYYY hh:mm A');
    // const amount = bookingDetails.Total_rent
   
    // console.log(bookingDetails.Total_rent);



    const handlePayment=useCallback((amount,details)=>{
      
      setPaymentPopup(false)
      const options= {
          key: "rzp_test_kHXZcATGWVEeS7",
          amount: amount*100,
          currency: "INR",
          name: "Acme Corp",
          description: "Test Transaction",
          image: "https://example.com/your_logo",
          // order_id: order.id,
          handler: (res) => {
              
              if (res.razorpay_payment_id){
                  booking(details)
                  navigate('/history')
              }
          },
          prefill: {
              name: "Piyush Garg",
              email: "youremail@example.com",
              contact: "9999999999",
          },
          notes: {
              address: "Razorpay Corporate Office",
          },
          theme: {
              color: "#3399cc",
          },
          modal: {
              ondismiss: function() {
                
              }
            }
        };
    
        const rzpay = new Razorpay(options);
        rzpay.open();
  },[Razorpay])
  return (
    <>
    <div style={{width:'40rem'}}>
  {/* <header className={styles.header}>
    <h1 className={styles.h1}>Checkout</h1>
  </header> */}

  <form  className={styles.form} >
    <div>
      <h2 className={styles.h2}>Address</h2>

      <div className={styles.card}>
        <address className={styles.address}>
          Adam Johnson<br />
          403 Oakland Ave Street, A city, Florida, 32104,<br />
          United States of America
        </address>
      </div>
    </div>

    <fieldset className={styles.fieldset}>
      <legend className={styles.legend}>Payment Method</legend>

      <div className={styles.formradios}>
        {/* <div className={styles.formradio}>
          <label for="visa">
              
           Wallet Payment</label>
          <input className={styles.input} checked id="visa" name="payment-method" type="radio" />
        </div> */}

        {/* <div className={styles.formradio}>
          <label for="paypal"><svg className={styles.icon}>
              <use xlink:href="#icon-paypal" />
            </svg>PayPal</label>
          <input className={styles.input} id="paypal" name="payment-method" type="radio" />
        </div> */}

        <div className={styles.formradio}>
          <label for="mastercard">
             
          Razor Pay</label>
          <input className={styles.input} id="mastercard" name="payment-method" type="radio" />
        </div>
      </div>
    </fieldset>

    <div>
      <h2 className={styles.h2}>Booking Details</h2>
      
           <table className={styles.table}>
           <tbody className={styles.tbody}>
           <tr>
               <td className={styles.td}>Location</td>
               <td className={styles.td} align="right">{location}</td>
             </tr>
             <tr>
               <td className={styles.td}>Starting-Date</td>
               <td  className={styles.td} align="right">{formattedStartDate}</td>
             </tr>
             <tr>
               <td className={styles.td}>Ending-Date</td>
               <td className={styles.td} align="right">{formattedEndDate}</td>
             </tr>
             <tr>
               <td className={styles.td}>Rent/day</td>
               <td className={styles.td} align="right">₹{bookingDetails.rent}</td>
             </tr>
             
             <tr>
               <td className={styles.td}>Total Days</td>
               <td className={styles.td} align="right">{bookingDetails.difference_in_days}</td>
             </tr>
             
             
             <tr>
               <td className={styles.td}>Coupon</td>
               <td className={styles.td} align="right"></td>
             </tr>
             
             <tr>
               <td  className={styles.td}>Total Rent</td>
               <td  className={styles.td} align="right">₹{bookingDetails.Total_rent}</td>
             </tr>
           </tbody>
           <tfoot className={styles.tfoot}>
             <tr>
               <td className={styles.td}>Total</td>
               <td  className={styles.td} align="right">₹{bookingDetails.Total_rent}</td>
             </tr>
           </tfoot>
         </table>
 
      
    </div>

    <div>
      {/* <button  onClick={()=>setPaymentPopup(false)} className={styles.button} type="submit"><svg className={styles.icon}>
          <use xlink:href="#icon-shopping-bag" />
        </svg>Pay</button> */}
        <button type='button' className={styles.button} onClick={()=>{handlePayment(bookingDetails.Total_rent,bookingDetails)}}>Pay Now</button>
    </div>
  </form>
</div>
</>
  )
}

export default Payment
