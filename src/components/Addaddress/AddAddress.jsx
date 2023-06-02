import React from 'react'
import {useForm} from 'react-hook-form'
import axios from '../../../utils/axios'
import { postAddress } from '../../../utils/constants'
import { toast } from 'react-hot-toast'
const AddAddress = (props) => {
    const {register,handleSubmit,formState:{errors}} = useForm()
    const onSubmit = async(data)=>{
        const formData = new FormData();
        formData.append('house_name',data.house_name)
        formData.append('street_name',data.street_name)
        formData.append('state_name',data.state_name)
        formData.append('country',data.country)
        formData.append('zipcode',data.zipcode)
        axios.post(`${postAddress}${props.id}/`,formData).then((res)=>{
            console.log(res.data);
            toast.success('Address Added')
        })

    }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
  <div class="form-row">
    <div class="form-group col-md-6">
      <input type="text" class="form-control" placeholder="House/Building Name" id='house_name' name='house_name' {...register('house_name', { required: true })}/>
      {errors.house_name && <p  className='text-danger' style={{fontSize:'10px'}}>Provide House/Building Name</p>}
    </div>

    <div class="form-group col-md-6 mt-4">
      <input type="text" class="form-control"  placeholder="Street Name" {...register('street_name', { required: true })} name='street_name' id='street_name'/>
      {errors.street_name && <p  className='text-danger' style={{fontSize:'10px'}}>Provide street Name</p>}
    </div>
  </div>
  <div class="form-group mt-4 ">
    <input type="text" class="form-control" id='state_name' name='state_name' style={{width:'40rem'}}  {...register('state_name', { required: true })} placeholder="state Name"/>
    {errors.state_name && <p  className='text-danger' style={{fontSize:'10px'}}>Provide state Name</p>}
  </div>
  <div class="form-group mt-4">
   
    <input type="text" class="form-control" id="country" name='country'  style={{width:'40rem'}} placeholder="Country"  {...register('country', { required: true })} />
    {errors.country && <p  className='text-danger' style={{fontSize:'10px'}}>Provide country Name</p>}
  </div>

    <div class="form-group col-md-2 mt-4">
     
      <input type="number" class="form-control" id="zipcode" name='zipcode'  {...register('zipcode', { required: true })} placeholder='ZipCode'/>
      {errors.zipcode && <p  className='text-danger' style={{fontSize:'10px'}}>Provide pincode</p>}
    </div>
  
  
  <button type="submit" class="btn btn-primary mt-4">Add Address</button>
</form>
  )
}

export default AddAddress
