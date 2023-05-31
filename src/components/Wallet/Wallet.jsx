import React, { useEffect, useState } from 'react'
import { getWallet } from '../../../utils/constants'
import axios from '../../../utils/axios'
import Cookies from 'js-cookie'

const Wallet = () => {
  const[balance, setBalance] = useState('')
  const id = Cookies.get('user_id')
  useEffect(()=>{
    axios.get(`${getWallet}${id}/`).then((res)=>{
           console.log(res.data);
           setBalance(res.data)
    })
  },[])
  return (
    <div>
      {balance === '' ?
       <h1>Wallet is empty</h1>
      :
       <h1>Available Balance : ₹  {balance.balance}</h1>
      }
    
    </div>
  )
}

export default Wallet
