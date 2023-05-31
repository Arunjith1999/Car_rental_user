import React from 'react'
import { Dialog,DialogTitle,Typography,DialogContent } from '@mui/material'

const WalletModal = (props) => {
    const{walletPopUp, setWalletPopUp, children, title} = props
  return (
    <Dialog open ={walletPopUp} maxWidth style={{marginTop:'8rem'}}>
        <DialogTitle>
            <div style={{display:'flex'}}>
                <Typography 
                 component='div'
                 style={{textAlign:'center',flexGrow:'1',fontSize:'20px',fontWeight:'700'}}
                >
                    {title}
                </Typography>
                <button className='btn btn-danger' onClick={()=>{setWalletPopUp(false)}}>X</button>
            </div>
        </DialogTitle>
        <DialogContent dividers >
    <div>{children}</div>
    </DialogContent>
    </Dialog>
  )
}

export default WalletModal
