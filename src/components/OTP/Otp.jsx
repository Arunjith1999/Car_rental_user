import React, { useState } from 'react'
import { toast, Toaster } from 'react-hot-toast'
import styles from './Otp.module.css'
import {BsFillShieldLockFill,BsTelephoneFill} from 'react-icons/bs'
import OtpInput from 'react-otp-input'
import {CgSpinner} from 'react-icons/cg'
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {useForm} from 'react-hook-form';
import axios from '../../../utils/axios'
import { auth } from '../../firebase.config'
import { getNumber } from '../../../utils/constants'
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const Otp = () => {
    const [otp, setOtp] = useState("");
    const [ph, setPh] = useState("");
    const [loading, setLoading] = useState(false);
    const [showOTP, setShowOTP] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate()
    const {register} = useForm();
    const token = Cookies.get('jwt')
    function onCaptchVerify() {
        if (!window.recaptchaVerifier) {
          window.recaptchaVerifier = new RecaptchaVerifier(
            "recaptcha-container",
            {
              size: "invisible",
              callback: (response) => {
                onSignup();
              },
              "expired-callback": () => {},
            },
            auth
          );
        }
      }
    
      function onSignup() {
        setLoading(true);
        onCaptchVerify();
    
        const appVerifier = window.recaptchaVerifier;
    
        const formatPh = "+" + ph;
        console.log(formatPh);
        axios.post(getNumber,{'phone':ph}).then((res)=>{
             console.log(res.data);
             if (res.data.status == 'verified'){
                signInWithPhoneNumber(auth, formatPh, appVerifier)
                .then((confirmationResult) => {
                  window.confirmationResult = confirmationResult;
                  setLoading(false);
                  setShowOTP(true);
                  toast.success("OTP sended successfully!");
                  Cookies.set("jwt",String(res.data.jwt_token))
                  Cookies.set("user_id",String(res.data.user_id))
                })
                
                .catch((error) => {
                  console.log(error);
                  setLoading(false);
                });
              
            }else{
                toast.error('This number is not registered',{
                    position : 'top-right',
                    style :{
                      borderRadius : '10px',
                      background : '#333',
                      color : '#fff'
                    }
                  })
            }
    
        })
      
         
      }
      function onOTPVerify() {

        if (token) {
            setLoading(true);
            window.confirmationResult
              .confirm(otp)
              .then(async (res) => {
                console.log(res);
                setUser(res.user);
                setLoading(false);
                navigate('/')
                
              })
              .catch((err) => {
                console.log(err);
                setLoading(false);
              });
        }
       
      }
    

  return (
    <section className={styles.section}>
        <div id="recaptcha-container"></div>
    <div>
      <Toaster toastOptions={{ duration: 4000 }} />
      
      {user ? (
        <h2 className={styles.loginsuccess}>
          👍Login Success
        </h2>
      ) : (
        <div className={styles.container}>
          <h1 className={styles.heading}>
            Forget password !! <br/> Verify By Otp
          </h1>
          {showOTP ? (
            <>
              <div className={styles.circle}>
                <BsFillShieldLockFill size={30} />
              </div>
              <label
                htmlFor="otp"
                className={styles.heading2}
              >
                Enter your OTP
              </label>
              <div className={styles.otpContainer}>
              <input
                type="text"
                placeholder="OTP"
                {...register("OTP", {
                  required: true,
                  maxLength: 6,
                  minLength: 6,
                })}
                onChange={(e) => setOtp(e.target.value)}
              />
              </div>
             
              <button
                onClick={onOTPVerify}
                className={styles.container2}
              >
                {loading && (
                  <CgSpinner size={20} className={styles.spinner} />
                )}
                <span>Verify OTP</span>
              </button>
            </>
          ) : (
            <>
              <div className={styles.button}>
                <BsTelephoneFill size={30} />
              </div>
              <label
                htmlFor=""
                className={styles.heading3}
              >
                Verify your phone number
              </label>
              <PhoneInput country={"in"} value={ph} onChange={setPh} />
              <button
                onClick={onSignup}
                style={{marginLeft:'30px'}}
                className={styles.container3}
              >
                {loading && (
                  <CgSpinner size={20} className={styles.spinner2}/>
                )}
                <span >Send code via SMS</span>
              </button>
            </>
          )}
        </div>
      )}
    </div>
  </section>

  )
}

export default Otp
