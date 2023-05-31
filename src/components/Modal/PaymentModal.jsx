import React from 'react'
import { Dialog,DialogTitle,Typography,DialogContent } from '@mui/material'

const PaymentModal = (props) => {
    const {paymentPopUp, setPaymentPopup,title,children} = props
  
  return (
      <Dialog open ={paymentPopUp} maxWidth style={{marginTop:'8rem'}}>
        <DialogTitle>
            <div style={{display:'flex'}}>
                <Typography 
                 component='div'
                 style={{textAlign:'center',flexGrow:'1',fontSize:'20px',fontWeight:'700'}}
                >
                    {title}
                </Typography>
                <button className='btn btn-danger' onClick={()=>{setPaymentPopup(false)}}>X</button>
            </div>
        </DialogTitle>
        <DialogContent dividers >
    <div>{children}</div>
    </DialogContent>
    </Dialog>
    
  )
}

export default PaymentModal
