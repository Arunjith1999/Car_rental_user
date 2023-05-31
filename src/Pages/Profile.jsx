import React, { useEffect, useState } from 'react'
import Navbar from '../components/Home/Navbar'
import  './Profile.css'
import axios from '../../utils/axios'
import {  getAddress, getProfile, id_proofpost, licensepost, picpost } from '../../utils/constants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Cookies from 'js-cookie'
import { useForm } from 'react-hook-form'
import { faWallet } from '@fortawesome/free-solid-svg-icons'
import WalletModal from '../components/Modal/WalletModal'
import Wallet from '../components/Wallet/Wallet'
import AddAddress from '../components/Addaddress/AddAddress'

const Profile = () => {
  const [user, setUser] = useState('')
  const [idProofError, setIdProofError] = useState('')
  const [profilePicError, setProfilePicError] = useState('')
  const [ licenseError, setLicenseError] = useState('')
  const [walletPopUp, setWalletPopUp] = useState(false)
  const [address, setAddress] = useState('')
  const [addressStatus, setAddressStatus] = useState('')
 

  const{register, handleSubmit,setValue} = useForm()
  const id = Cookies.get('user_id')
 const user_details=()=>{
    axios.get(`${getProfile}${id}/`).then((res =>{
        
        setUser(res.data)
        setValue('profile_pic',res.data.profile_pic)
        setValue('license',res.data.license)
        setValue('id_proof',res.data.id_proof)
    
      }))
 }
 const user_address=()=>{
    axios.get(`${getAddress}${id}/`).then((res)=>{
            if (res.data.status === 'Not Exist'){
                setAddressStatus(res.data.status)
            }
            else{
                setAddress(res.data)
            }
           
    })
 }
  useEffect(() => {
    user_details();
    user_address();
    
  }, [id]);


 

  const onSubmit = async(data,id)=>{
    if(data.profile_pic === '/media/'){
        setProfilePicError('this field is required')
        return;
    }
    else{
        setProfilePicError('')
        const formData = new FormData()
        formData.append('profile_pic',data.profile_pic[0])
        axios.put(`${picpost}${id}/`,formData,{
         headers: { "Content-Type": "multipart/form-data" }
         },).then((res=>{
         console.log(res.data.status);
         user_details();
     }))
    }
   
  }
  const onSubmit_id_proof =async(data, id)=>{
    console.log(data.id_proof,'.../././/./.');
    if(data.id_proof === '/media/'){
        setIdProofError('this field is required')
        return;
    }
     else{
        setIdProofError('')
        const formData = new FormData()
        formData.append('id_proof',data.id_proof[0])
        axios.put(`${id_proofpost}${id}/`,formData,{
            headers:{'Content-Type':'multipart/form-data'}
        }).then((res)=>{
            console.log(res.data.status);
            user_details();
        })
     }
   
  }
  const onSubmit_license = async(data, id)=>{
    console.log(data.license,'license..');
    if(data.license === '/media/'){
        setLicenseError('this field is required')
        return;
    }
    else{
        setLicenseError('')
        const formData = new FormData()
    formData.append('license',data.license[0])
    axios.put(`${licensepost}${id}/`,formData,{
        headers:{'Content-Type':'multipart/form-data'}
    }).then((res)=>{
        console.log(res.data.status);
        user_details()
    })
    }
   
   
  }
  return (
  
     <>
     <div className='navbar'> 
     <Navbar />
     </div>
    
    <div className='container' >

    <div className='row col-md-12'>
     <div className="emp-profile" style={{boxShadow:'2px 1px 2px 1px '}}>
           
                <div className="row">
                    <div className="col-md-4" >
                    <form enctype="multipart/form-data"  method="post" onSubmit={handleSubmit((data)=>onSubmit(data,user.id))}>
                    <div class="profile-img">
                            <img src={`http://127.0.0.1:8000${user.profile_pic}`}  alt=""/>
                            {/* <div class="file btn btn-lg btn-primary">
                                Change Photo
                                <input type="file" name="file"/>
                            </div> */}
                              <input type="file" class="form-control"  style={{width:'275px',marginTop:'10px'}}  name='profile_pic' {...register('profile_pic')} id="exampleInputEmail1" aria-describedby="emailHelp" />
                              {profilePicError && <p className='text-danger'>{profilePicError}</p>}
                              <button className='btn btn-primary' style={{marginRight:'35rem'}} type='submit'>Save</button>
                        </div>
                    </form>     
                        
                    </div>
                    <div className="col-md-6" >
                        <div className="profile-head">
                                    <h2>
                                     {user.first_name + user.last_name}
                                      </h2>
                                    {/* <h6>
                                        Web Developer and Designer
                                    </h6> */}
                                     {/* <p className="proile-rating">RANKINGS : <span>8/10</span></p> */}
                                     <div style={{marginTop:'8rem'}}>
                                     <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active" id="home-tab" data-bs-toggle="tab"   href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                                </li>
                                <li className="nav-item" role='presentation'>
                                    <a className="nav-link"  id="profile-tab" data-bs-toggle="tab"   href="#profile" role="tab" aria-controls="profile" aria-selected="false">Address</a>
                                </li>
                            </ul>
                                     </div>
                          
                        </div>
                    </div>
                    <div className="col-md-2" >
                        <input type="submit" className="profile-edit-btn" name="btnAddMore" value="Edit Profile" style={{fontSize:'1.3rem',borderRadius:'15px'}}/>
                      
                      <div>
                        <button className='btn btn-success mt-4 w-4' style={{borderRadius:'15px',width:'13rem',fontSize:'1.3rem'}} onClick={()=>setWalletPopUp(true)}>Wallet <FontAwesomeIcon icon={faWallet}/> </button>
                      </div>
                       
                    </div>
                   
                </div>
                <div className="row">
                    <div className="col-md-4">

                       
                        <div class="mb-3 col-md-6">
                        <form enctype="multipart/form-data"  method="post" onSubmit={handleSubmit((data)=>onSubmit_id_proof(data,user.id))}>

                            <label for="exampleInputEmail1" class="form-label">ID proof</label>
                            <input type="file" class="form-control"   name='id_proof' id="exampleInputEmail1" {...register('id_proof')} aria-describedby="emailHelp" />
                            {idProofError && <p className='text-danger'>{idProofError}</p>}
                            <button className='btn btn-primary' type='submit'>Save</button>
                        </form>
                        </div>
                        <div>
                        <div class="mb-3 col-md-6">
                        <form enctype="multipart/form-data"  method="post" onSubmit={handleSubmit((data)=>onSubmit_license(data,user.id))}>
                            <label for="exampleInputEmail1" class="form-label">Driving License</label>
                            <input type="file" class="form-control"   id="license" name='license'  {...register('license')} aria-describedby="emailHelp"/>
                            {licenseError && <p className='text-danger'>{licenseError}</p>}
                            <button className='btn btn-primary' type='submit'>Save</button>
                        </form>
                        </div>
                        </div>
                     
                    </div>
                    <div className="col-md-8"  >
                        <div className="tab-content profile-tab" id="myTabContent" >
                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab" >
                                      <div style={{fontSize:'25px',marginTop:'-115px'}}>

                                      
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>User Id</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{user.id}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Firstname</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{user.first_name}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Lastname</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{user.last_name}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Email</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{user.email}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Phone</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{user.phone}</p>
                                            </div>
                                        </div>
                                        </div>
                            </div>
                           

                               {addressStatus === 'Not Exist' ? 
                               
                                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                <div style={{fontSize:'25px',marginTop:'-115px'}}>
                               
                                  <AddAddress id ={id}/>
                                  </div>
                                  </div>

                               :(
                                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                <div style={{fontSize:'25px',marginTop:'-115px'}}>
                                    <button style={{marginTop:'2rem'}} className='btn btn-info'>Edit</button>
                                       <div className="row">
                                            <div className="col-md-6">
                                                <label>Building Name</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{address.house_name}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Street Name</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{address.street_name}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>State</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{address.state}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Country</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{address.country}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Zipcode</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{address.zipcode}</p>
                                            </div>
                                        </div>
                                        </div>
                                        </div>
                                        )}
                                        </div> 
                            </div>
                        </div>
                    </div>
                </div>
                
        <WalletModal
        walletPopUp = {walletPopUp}
        setWalletPopUp = {setWalletPopUp}
        title ='My Wallet'
        >
         <Wallet/>
        </WalletModal>
                </div>
        
        
     </>
  
  )
}

export default Profile
