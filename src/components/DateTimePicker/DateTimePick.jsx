import { end } from '@popperjs/core';
import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;
import axios from '../../../utils/axios'
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getBookedDates } from '../../../utils/constants';


const DateTimePick = ({setStartDate,setendDate }) => {
  const params = useParams()
  const [bookedDates, setBookedDates] = useState([])

  useEffect(()=>{
    fetchBookedDates()
  },[])


  const fetchBookedDates = ()=>{
    axios.get(`${getBookedDates}${params.id}/`).then((res)=>{
      console.log(res.data.date);
      setBookedDates(res.data.date)
    })
  }

  const disabledDate = (current) => {
    if (!current || !current.isValid()) {
      return true;
    }
  
    // Disable all dates before today
    if (current.isBefore(dayjs().endOf('day'))) {
      return true;
    }
  
    // Disable booked dates
    for (const { start_date, end_date } of bookedDates) {
      const start = dayjs(start_date);
      const end = dayjs(end_date);
      if (current.isSame(start, 'day') || current.isSame(end, 'day') || (current.isAfter(start, 'day') && current.isBefore(end, 'day'))) {
        return true;
      }
    }
  
    return false;
  };
  
  
const onChange = (value, dateString) => {
    console.log('Selected Time: ', value);
    setStartDate(dateString[0])
   
    setendDate(dateString[1])

    console.log(dateString[0],'startdate');

    const startdate = dayjs(dateString[0],'YYYY-MM_DD hh:mm A')
    const enddate = dayjs(dateString[1],'YYYY-MM_DD hh:mm A')
    
    const dayDifference = enddate.diff(startdate, 'day');
    console.log(dayDifference,'diff b/w dates');

    if(dayDifference < 2){
      setendDate('')
      toast.error('minimum of 2 days should be selected',{
        position:toast.POSITION.BOTTOM_CENTER,
        bodyStyle: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
      
      })
     
    }else if (dayDifference > 15){
      setendDate('')
      toast.error('You cannot select more than 15 days',{
        position:toast.POSITION.BOTTOM_CENTER,
        bodyStyle: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
      
      })
    }
    
};
const onOk = (value) => {
  console.log('onOk: ', value);
  
};  

 


return(
 
  <Space direction="vertical" size={12}>
    <RangePicker
      style={{width:'50rem',height:'3rem',border: '.5px solid #008000'}}
      showTime={{
        format: 'hh:mm A', 
        use12Hours: true,
      }}
      format="YYYY-MM-DD hh:mm A"
      onChange={onChange}
      onOk={onOk}
      disabledDate={disabledDate}
    />
    
  </Space>
  
)};
export default DateTimePick;