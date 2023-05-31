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
// import { MDBCheckbox, MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit'
import {
    MDBContainer,
    MDBInput,
    MDBCheckbox,
    MDBBtn,
    MDBIcon,
    
  }
  from 'mdb-react-ui-kit';
import shadows from '@mui/material/styles/shadows';
import { Link } from 'react-router-dom';
import { loginPost } from '../../../utils/constants';
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
          

{/* 
        <div  style={{height:"15rem"}}>
          <img  style={{width: '10rem',marginLeft:'65rem',marginTop:'10rem'}}  src={image} alt="" />
        </div>
        <MDBContainer className='text-center   p-3  ' style={{width:'50vh',height:'55vh' , boxShadow:'1px 2px 5px #D7FF00'}}>

        <Typography component = 'h1' variant ='h3' className='text-center p-5' >
            
            Login

            </Typography>
        <Box component="form" onSubmit = {handleSubmit(onSubmit)} sx ={{mt:1}}>
        <div  >
        <TextField
                           style={{width:'20rem'}}
                           label ="email"
                           variant = "outlined"
                           name = "email"
                           id = "email"
                           error = {!!errors.email}
                           helperText = {errors.email? errors.email.message:""}
                           {...register('email')}
                           />
            
            </div>    
       
     
        <TextField margin ='normal'
                             
                            label ='Password'
                            variant='outlined'
                            type='password'
                            name='Password'
                            id ='Password'
                            error = {!!errors.password}
                           helperText = {errors.password ? errors.password.message:""}
                           {...register('password')} style={{width:'20rem'  ,marginTop:'2rem'}}
                            />
       
  
        <div className='mt-3 mb-3'>
        
          <a href="!#" className='text-center'>  Forgot password?</a>
        </div>
         
            <button className='btn btn-primary m-3 ' >Sign In</button>
        
        
  
       
          <Link to ='/signup' ><Typography style={{color : "red" ,fontSize:'1em'}}>Not registered yet!  <span className='signup'>Signup here</span> </Typography></Link>
          
  
          </Box>
  
      </MDBContainer> */}


<div className={styles.wrapper}>
        <div className={styles.logo}>
            <img src= {image} alt=""/>
        </div>
        <div className={`${styles.name} text-center mt-4`}>
            Sign In
        </div>
        <form className="p-3 mt-3" onSubmit = {handleSubmit(onSubmit)}>
            <div className={`${styles['form-field']} d-flex align-items-center`}>
                <span className="far fa-user"></span>
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
                <span className={styles.fas}></span>
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
