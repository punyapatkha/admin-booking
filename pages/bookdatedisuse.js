import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';

import Header from '@/components/header'

import addDays from 'date-fns/addDays'  
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

import axios from '../axios.config';

import Link from 'next/link'
import { Fragment, useState ,useEffect } from 'react'

import { generateTimeslots,format2digit_month } from '../utils/datefunction';

const inter = Inter({ subsets: ['latin'] })


export default function Checking() {
    
    const now = new Date();
    const newYorkTime = utcToZonedTime(now, 'Asia/Bangkok');
    // const formattedTime = format(newYorkTime, 'hh:mm:ss a');
    
      
    const [Valuephone, setValuephone] = useState();
    
    const [selectTime, setselectTime] = useState();
    
    const [Loading, setLoading] = useState();
    const [selectdate, setselectdate] = useState(new Date(newYorkTime)); // also use in time slot part
    const [Post2, setPost2] = useState();
    const [Post, setPost] = useState();
    const [dayoff1, setdayoff1] = useState();
    const [dayoff2, setdayoff2] = useState();
    const [alldayoff, setalldayoff] = useState();
    const baseURL = "https://booking-flask-punyapatkha.vercel.app/";
    const [loadingcalendar, setloadingcalendar] = useState(false);
    
    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
        }
        if (event.key === "Return") {
          event.preventDefault();
        }
      };

      let isDayoff = (date) => {
        let day = new Date(date);
        let x = false
        alldayoff.some((element, index) => {
          // "MM/DD/YYYY"
          try{
          if(
            day.getDate()  === element.getDate() && 
            day.getMonth()  === element.getMonth() && 
            day.getFullYear()  === element.getFullYear())
    
          {
            x = true
          }}
          catch{
    
          }
          })
        return x; // false mean allow to have
      };
    
    
      const shouldDisableDate = (date) => {
        // return true;
        return isDayoff(date)
        // return isWeekend(date) || isWeekend2(date)
        // return  isWeekend2(date) || isWeekend3(date);
        // return isWeekend(date) && isWeekend2(date) && isWeekend3(date);
        // return false
      };
    


      
    
      // calendar dayoff month 1 and 2 split
      useEffect(() => {
          axios.post(baseURL+"day",
          {
            "year": newYorkTime.getFullYear(),
            "month": format2digit_month(newYorkTime.getMonth()+1)
          }
          ).then((response) => {
            setPost(response.data);
    
            let dayoff_array = [];
    
            response.data.dayoff.day.forEach((element, index) => {
              // "MM/DD/YYYY"
                dayoff_array[index] = new Date(format2digit_month(newYorkTime.getMonth()+1)+"/"+format2digit_month(element)+"/"+newYorkTime.getFullYear()) ;
              });
            // let concat_array = [...dayoff,  ...dayoff_array];
            // array1.push(...array2);
            setdayoff1(dayoff_array);
          });
          axios.post(baseURL+"day",
          {
            "year": newYorkTime.getFullYear(),
            "month": format2digit_month(newYorkTime.getMonth()+2)
          }
          ).then((response) => {
            setPost2(response.data);
    
            let dayoff_array = [];
    
            response.data.dayoff.day.forEach((element, index) => {
              // "MM/DD/YYYY"
                dayoff_array[index] = new Date(format2digit_month(newYorkTime.getMonth()+2)+"/"+format2digit_month(element)+"/"+newYorkTime.getFullYear()) ;
              });
            // let concat_array = [...dayoff,  ...dayoff_array];
            // array1.push(...array2);
            setdayoff2(dayoff_array);
          });
        }, []);
    
        // calendar dayoff month 1 and 2 combine
        useEffect(() => {
          // setalldayoff([...dayoff1,...dayoff2])
          try{
          setalldayoff(dayoff1.concat(dayoff2))
          // console.log("pass")
          setloadingcalendar(true)
        }
          
          catch{
            // console.log("error")
          }
          
          }, [dayoff1,dayoff2]);


  return (
    <>
   
   <Header/>
   {/* <Link href="/page2" state={{ data: data }}  >
    
   Apple
   </Link> */}
   <div onClick={()=>setdata("test1")}>test1</div>
   
   <div onClick={()=>setdata("test2")}>test2</div>
   
   <div onClick={()=>setdata("test3")}>test3</div>
   
   <div onClick={()=>setdata("test4")}>test4</div>



   <div class="flex pt-14">
    <div class="w-1/3 ..."></div>
    <div class="w-1/3 font-bold">1. Select Date</div>
    <div class="w-1/3 ..."></div>
</div>

{ loadingcalendar && alldayoff ? (
  
  
<> 
  <LocalizationProvider  dateAdapter={AdapterDayjs}>
      <StaticDatePicker 
       inputFormat="MM-dd"
       views={[ "day"]}
        // shouldDisableDate={isWeekend}
        
        shouldDisableDate={shouldDisableDate}
        // excludeDates={[alldayoff,addDays(new Date(), 2)] }
        // excludeDates={[addDays(new Date(), 2)] }
        excludeDates={"02/28/2023"}
        displayStaticWrapperAs="desktop"
        openTo="day"
        disablePast={true}
        disableHighlightToday={false}
        // disableOpenPicker={true}
        defaultCalendarMonth={false}
        maxDate={addDays(new Date(), 30)}
        // selected={value}
        value={selectdate}
        onChange={(newValue) => {
          // setValue(new Date(newValue));
          setselectdate(new Date(newValue));
          console.log(new Date(newValue));
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>

  </>
  ):(
  <>
  <div class="text-center"><svg aria-hidden="true" class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span class="sr-only">Loading...</span></div></>
  )
  }



   <Link
  href={{
    pathname: '/page2',
    query: "test"//data // the data
  }}
>
  Some text
</Link>

<Link
  href={{
    pathname: '/booktime',
    query: "pid="+"test"//data // the data
  }}
>
  page3
</Link>
 </>
  )
}