import React from 'react'
import {Form, Button} from 'semantic-ui-react';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import image from '../../assets/Images/signupcar.jpg'
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, TextField,Typography,} from '@mui/material';
import { MDBCheckbox, MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit'
import { red } from '@mui/material/colors';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from '../../../utils/axios'
import { signupPost } from '../../../utils/constants';


const schema = yup.object().shape({
    firstName : yup
             .string("name should be a string")
             .min(3, "name should have a min length of 3 letters")
             .required("name is required"),

    lastName : yup         
             .string("lastname should be a string")
             .min(1, "lastname should have a min length of 1 letter")
             .required("lastname is required"),

    email    : yup
              .string('email should be a string')
              .email('please provide a valid email')
              .matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/,"Invalid email")
              .required('email address is required'),
             
              
              

    phonenumber : yup
                .number('phone should be a number')
                .min(1000000000, 'phone number should be at least 10 digits')
                .max(9999999999, 'phone number should not exceed 10 digits')
                 .required('mobile number required'),

    password  : yup
               .string('password should be a string')
               .min(5, "must contain atleast 5 ")
               .max(12,"should not exceed more than 12")
               .required('password required'),

    // verifypassword : yup
    //                 .string('password should be a string')
    //                 .required('verify password !!!')



    
})

    
          
const Signup = () => {
    const navigate = useNavigate()
    const {register, handleSubmit, formState: {errors} } = useForm({resolver : yupResolver(schema),});
    const onSubmit = (data) => {
        // console.log(data);
        axios.post(signupPost,data,{
            headers:{"Content-Type": "application/json"},
        }).then((res)=>{
            const exist = res.data.exists
            {exist ?
                navigate('')
                (toast.error('email is already taken',{
                    position : 'top-right',
                    style :{
                      borderRadius : '10px',
                      background : '#333',
                      color : '#fff'
                    }
                    
                  })) 
                 
                 
                 : 
                 console.log(res.data,'asdfm')
                 navigate('/login')
            
            } 
         
        })
    }
  return (
    <div className='login'>
        <MDBContainer className = "p-3 my-5 mt-4 ">

         <MDBRow>
          

        <MDBCol col = '10' md = '6' className='mt-5'>
            <img src={image} style={{height:'40rem',width:'30rem',marginLeft:'14rem'}} className ="img-fluid " alt="image loading" />

        </MDBCol>

        <MDBCol col = '4' md = '6' className='mt-5'>
            <Typography component = 'h1' variant ='h5'>
            
            Sign In to your Account !!

            </Typography>

       

       

      
        <Box component="form" onSubmit = {handleSubmit(onSubmit)} sx ={{mt:1}}>

        

        
            
        <TextField  margin="normal"
                    autoFocus
                   
                    label="FirstName" 
                    variant="outlined" 
                    name = "firstName"
                    id='firstName'
                    error = {!!errors.firstName}
                    helperText = {errors.firstName ? errors.firstName.message : ""}
                    {...register('firstName')}  style={{width:'32rem'}}
                />
             <TextField  label="LastName" 
                         margin = "normal"
                         style={{width:'32rem'}}
                        variant="outlined" 
                        name = "lastName"
                        id='lastName'
                        error = {!!errors.lastName}
                        helperText = {errors.lastName ? errors.lastName.message : ""}
                        {...register('lastName')} 
                />
            
           
                <TextField margin='normal'
                         style={{width:'32rem'}}
                            label='Email'
                            type="email"
                            name = "email"
                            error = {!! errors.email}
                            helperText = {errors.email ? errors.email.message : ""}
                            {...register('email')} 
                 />
           
           
             <TextField  margin = 'normal'
                        style={{width:'32rem'}}
                        label="Phonenumber" 
                            variant="outlined" 
                            name = "phonenumber"
                            id='phonenumber'
                            error = {!!errors.phonenumber}
                            helperText = {errors.phonenumber ? errors.phonenumber.message : ""}
                            {...register('phonenumber')} 
                />

                 <TextField margin='normal'
                          style={{width:'32rem'}}
                            label="Password" 
                            variant="outlined" 
                            name = "password"
                            type = "password"
                            id='password'
                            error = {!!errors.password}
                            helperText = {errors.password ? errors.password.message : ""}
                            {...register('password')} 
                />
             {/* <TextField 
                    margin='normal'
                    style={{width:'32rem'}}
                    label="Verify Password" 
                        variant="outlined" 
                        type='password'
                        name = "verifypassword"
                        id='verifypassword'
                        error = {!!errors.verifypassword}
                        helperText = {errors.verifypassword ? errors.verifypassword.message : ""}
                        {...register('verifypassword')} 
                /> */}

            {/* <Button type = 'submit' 
            variant="contained"
            sx={{ mt: 3, mb: 2 }} color='blue'> 
            <Link to ='/login' > <Typography style={{color:"white"}}> Login </Typography> </Link>
            </Button> */}

            
         <Link to ='/login' ><Typography style={{color : "red"}}>Already a User !  <span>Login here</span> </Typography></Link>


           <button type='submit' className='btn btn-primary mt-5 px-5 pt-2 pb-2 ' style={{marginLeft:'14rem'}}>Register</button>
            
            </Box>
          
            </MDBCol>
            

           
           
            {/* <button className='btn btn-outline-danger'>Aiswarya</button> */}

       
        
          </MDBRow>   

        </MDBContainer>
      
    </div>
  )
}

export default Signup
