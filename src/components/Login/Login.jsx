import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast';
import * as yup from 'yup';
import {Form, Button, Container} from 'semantic-ui-react';
import styles from './Login.module.css'
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'
import {useForm} from 'react-hook-form';
import { Box, TextField, Typography} from '@mui/material';
import React, { useEffect } from 'react'
import axios from '../../../utils/axios'
import image from '../../assets/Images/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Link } from 'react-router-dom';
import { loginPost } from '../../../utils/constants';
import { faEnvelope, faLock, faVoicemail } from '@fortawesome/free-solid-svg-icons';
const schema = yup.object().shape({
    email : yup
            .string('email should be a string')
            .email('please provide a valid email')
            .required('email address is required'),
            // .test('contains-com','Email address must contain  .com domain'),

    password : yup
              .string('password should be a string')
              .required('password required')
           
})



const Login = () => {

    
  const token = Cookies.get('jwt')
  useEffect(()=>{
    if (token){
      navigate('/')
    }
      
  },[])
 
  const navigate = useNavigate();
    const {register, handleSubmit, formState : {errors} } = useForm({resolver : yupResolver(schema)});
    const onSubmit = (data) => {
        axios.post(loginPost,data,{
            headers:{"Content-Type" : "application/json"},
        }).then((res) => {
          console.log(res.data.user_id);
            if(res.data.status === 'true'){
              toast.success('Logined Successfully !!!',{
                position :'top-left',
                style:{
                  borderRadius : '10px',
                  background :'#333',
                  color: '#fff',
                }
              })
                Cookies.set("jwt",String(res.data.jwt_token))
                Cookies.set("user_id",String(res.data.user_id))
                navigate('/')
              }else{
                toast.error('Invalid Email or Password',{
                  position : 'top-right',
                  style :{
                    borderRadius : '10px',
                    background : '#333',
                    color : '#fff'
                  }
                })
              }
              
            }

        )
    }
    
  return (

        

        
     <div>
          


<div className={styles.wrapper}>
        <div className={styles.logo}>
            <img src= {image} alt=""/>
        </div>
        <div className={`${styles.name} text-center mt-4`}>
            Sign In
        </div>
        <form className="p-3 mt-3" onSubmit = {handleSubmit(onSubmit)}>
            <div className={`${styles['form-field']} d-flex align-items-center`}>
                <FontAwesomeIcon icon={faEnvelope} />
                <TextField type="text" 
                variant='standard'
                id ='email'
                name ='email'
                error ={!!errors.email} 
                helperText = {errors.email ? errors.email.message: ''}
                 placeholder=" Email"
                 {...register('email')}/>
            </div>
            <div className={`${styles['form-field']} d-flex align-items-center`}>
            <FontAwesomeIcon icon={faLock} />
                <TextField type="password"
                id = 'password'
                name = 'password'
                variant='standard'
                placeholder="Password"
                error = {!!errors.password}
                helperText = {errors.password ? errors.password.message:''}
                {...register('password')}
                />
            </div>
            <button className={`${styles.btn} mt-3`} type='submit'>Login</button>
        </form>
        <div className="text-center fs-6">
            <Link to='/signup'>Sign up</Link> or <Link to='/otp'>Forget password?</Link>
        </div>
    </div>
    
</div>
  )
}

export default Login
