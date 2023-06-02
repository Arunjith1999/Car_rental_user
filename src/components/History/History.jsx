import React, { useEffect, useState } from 'react'
import Navbar from '../Home/Navbar'
import Cookies from 'js-cookie'
import { editPayment, getBookingHistory } from '../../../utils/constants'
import axios from '../../../utils/axios'
import Swal from 'sweetalert2'
import { toast } from 'react-hot-toast'

const History = () => {
    const user_id = Cookies.get('user_id')
    const [booking, setBooking] = useState([]) 
    const [showDeleteSwal, setShowDeleteSwal] = useState(false);
    
    const booking_details = () => {
        axios.get(`${getBookingHistory}${user_id}/`).then((res) => {
          console.log(res.data.ser1);
          setBooking(res.data.ser1);
        }).catch((error) => {
          console.error(error);
        });
      };
      
    useEffect(()=>{
       booking_details();
    
    },[user_id])
    const formatDate = (dateString) => {
        const options = {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
        };
        const date = new Date(dateString);
        return date.toLocaleString('en-US', options);
      };
      const cancelPayment = (id,rent)=>{
        setShowDeleteSwal(true);
        {showDeleteSwal && (
            Swal.fire({
              title: 'Are you sure?',
              text: 'Your Booking will be Cancelled!',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Yes, confirm!',
              cancelButtonText: 'No, keep it'
            }).then((result) => {
              if (result.isConfirmed) {
                const data = {id,rent,user_id}
       
                axios.patch(editPayment,data).then((res=>{
                    console.log(res.data);
                    booking_details();
                    toast.success('Money will be credited to your Wallet')
                  }))
                  setShowDeleteSwal(false);
                }else {
                  // User clicked the cancel button, hide the swal
                  setShowDeleteSwal(false);
                }
              })
            )}
      }
    
        
    const getStatus = (start_date, end_date)=>{
      const  start = new Date(start_date)
      const  end = new Date(end_date)
      const today = new Date()
    

      console.log(today,'today');
      if (start <= today && end >= today ){
         return 'Started'
      }
      else if(end < today){
        return 'Ended'
      }
      return 'Cancel'

    }
  return (
    <div>
     <Navbar/>
    
                     <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-bordered"  id="dataTable" width="100%" cellspacing="0" style={{marginTop:'13rem',width:'95%',marginLeft:'4rem',zoom:'1.3'}}>
                                {booking.length === 0 ? 

                                <h1 style={{fontWeight:'700',textAlign:'center'}}>No previous Bookings...</h1>

                                :(
                                    <>
                                    <thead>
                                        <tr>
                                            <th>Booking Id</th>
                                            <th>Car Name</th>
                            
                                            <th>StartDate</th>
                                            <th>EndDate</th>
                                            <th>Total_Rent</th>
                                            <th>Transaction Id</th>
                                            <th>Payment Mode</th>
                                            <th>Status</th>
                                           

                                        </tr>
                                    </thead>
                                          <tbody>
                                    {booking.map((r)=>(
                                     
                                           
                                             <tr key={r.id}>
                                             <td>{r.id}</td>
                                             <td>{r.car_name}</td>
                                             <td>{formatDate(r.start_date)}</td>
                                             <td>{formatDate(r.end_date)}</td>
                                             <td>{r.total_rent}</td>
                                             <td>{r.transaction_id}</td>
                                             <td>{r.payment_method}</td>
                                             <td>
                                              
                                             {r.status === 'cancelled' ? (
                                                  <td><button className='btn btn-danger'> Cancelled</button></td>
                                                ) : (
                                                  <td>
                                                    <button className='btn btn-outline-danger' onClick={() => {
                                                                                      if (getStatus(r.start_date, r.end_date) === 'Cancel') {
                                                                                        cancelPayment(r.id, r.total_rent);
                                                                                      }
                                                                                    }}>
                                                      {getStatus(r.start_date, r.end_date)}
                                                    </button>
                                                  </td>
                                                )}
                                             </td>
                                           
                                           
                                           

                                           
                                                                                     
                            
                          
                                         </tr>
                                          
                                          
                                           
                                           
                                        ))}
                                      </tbody>
                                      </>
                                     )
                                    }

                                </table>
                            </div>
                        
                        </div>
                      

    </div>
  )
}

export default History
