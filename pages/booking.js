import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

import Header from '@/components/header'
import dayjs, { Dayjs } from 'dayjs';

import addDays from 'date-fns/addDays'  

import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

import { Fragment, useState ,useEffect } from 'react'

import axios from '../axios.config';

const inter = Inter({ subsets: ['latin'] })
var example_ava = {
  "9:00 - 9:30": 0,
  "9:30 - 10:00": 0,
  "10:00 - 10:30": 1,
  "10:30 - 11:00": 1,
  "11:00 - 11:30": 1,
  "11:30 - 12:00": 1,
  "12:00 - 12:30": 0,
  "12:30 - 13:00": 0,
  "13:00 - 13:30": 1,
  "13:30 - 14:00": 1,
  "14:00 - 14:30": 1,
  "14:30 - 15:00": 0,
};

export default function Home() {
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
    if (event.key === "Return") {
      event.preventDefault();
    }
  };
  
  
  const [selectTime, setselectTime] = useState();
  // const {id}  = useParams();
  function start (day){
    
    return false
  }
  const isWeekend = (date) => {
    const day = new Date(date);
    return day.getDay() === 0 || day.getDay() === 6; // Sunday or Saturday
  };
  const isBeforeToday = (date) => {
    const today = new Date();
    return date < today;
  };

  const isWeekend2 = (date) => {
    const day = new Date(date);
    // console.log(day)
  
    // var today = new Date();
    // var someday = new Date();
    // แบบ performance? 
    // someday.setFullYear(2100, 0, 14);
    
    // แบบง่าย
    return day.getDate()  === addDays(new Date(), 4).getDate() && 
    day.getMonth()  === addDays(new Date(), 4).getMonth() && 
    day.getFullYear()  === addDays(new Date(), 4).getFullYear(); // Sunday or Saturday
  };

  const isWeekend3 = (date) => {
    const day = new Date(date);
    try{
    alldayoff.forEach((element, index) => {
      // "MM/DD/YYYY"
      if(day.getDate()  === element.getDate() && 
      day.getMonth()  === element.getMonth() && 
      day.getFullYear()  === element.getFullYear())
      { 
        return true
      }
      });
    }
      catch{}
    // if(date === "02/28/2023")

    // if(day == addDays(new Date(), 2))
    // {
    //   return true
    // }
    // console.log(date)
    return false; // false mean allow to have
  };

  // const shouldDisableDate = [isWeekend, isBeforeToday].every((fn) => fn);
  // multiple function in one
  const shouldDisableDate = (date) => {
    // return isWeekend3(date);
    // return isWeekend(date) || isWeekend2(date)
    return  isWeekend2(date) || isWeekend3(date);
    // return isWeekend(date) && isWeekend2(date) && isWeekend3(date);
  };

  const startOfDay = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  };

  const now = new Date();
  const newYorkTime = utcToZonedTime(now, 'Asia/Bangkok');
  const formattedTime = format(newYorkTime, 'hh:mm:ss a');
  const [value, setValue] = useState(new Date(newYorkTime));
  const [Post2, setPost2] = useState();
  const [Post, setPost] = useState();
  const [dayoff1, setdayoff1] = useState();
  const [dayoff2, setdayoff2] = useState();
  const [alldayoff, setalldayoff] = useState();
  const baseURL = "https://booking-flask-punyapatkha.vercel.app/";
  
  const [loadingcalendar, setloadingcalendar] = useState("true");

  function format2digit(any){
    var valAsString = any.toString();
    if (valAsString.length === 1) {
      return"0"+valAsString
    }
    else{
      return valAsString
    }
    return "99"
  }

  useEffect(() => {
    //   axios.post(`${baseURL}day`,
      axios.post(baseURL+"day",
      {
        "year": newYorkTime.getFullYear(),
        "month": format2digit(newYorkTime.getMonth()+1)
      }
      ).then((response) => {
        setPost(response.data);

        let dayoff_array = [];

        response.data.dayoff.day.forEach((element, index) => {
          // "MM/DD/YYYY"
            dayoff_array[index] = new Date(format2digit(newYorkTime.getMonth()+1)+"/"+format2digit(element)+"/"+newYorkTime.getFullYear()) ;
          });
        // let concat_array = [...dayoff,  ...dayoff_array];
        // array1.push(...array2);
        setdayoff1(dayoff_array);
      });
      axios.post(baseURL+"day",
      {
        "year": newYorkTime.getFullYear(),
        "month": format2digit(newYorkTime.getMonth()+2)
      }
      ).then((response) => {
        setPost2(response.data);

        let dayoff_array = [];

        response.data.dayoff.day.forEach((element, index) => {
          // "MM/DD/YYYY"
            dayoff_array[index] = new Date(format2digit(newYorkTime.getMonth()+2)+"/"+format2digit(element)+"/"+newYorkTime.getFullYear()) ;
          });
        // let concat_array = [...dayoff,  ...dayoff_array];
        // array1.push(...array2);
        setdayoff2(dayoff_array);
      });
    }, []);
    useEffect(() => {
      // setalldayoff([...dayoff1,...dayoff2])
      try{
      setalldayoff(dayoff1.concat(dayoff2))}
      catch{}
      }, [dayoff1,dayoff2]);
    //   const cars = [new Date("03/03/2023"),new Date("03/15/2023"),new Date("03/13/2023")];
      
    
  return (
    <>
    <div onClick={()=>console.log(Post2)}>2</div>
    
    <div onClick={()=>console.log(Post)}>1</div>
    
    <div onClick={()=>console.log([...dayoff1,...dayoff2]  )}>dayoff</div>
    
    <div onClick={()=>console.log(alldayoff )}>all dayoff</div>
    <Header/>
    
  
    
    <div class="flex pt-14">
    <div class="w-1/3 ..."></div>
    <div class="w-1/3 font-bold">1. Select Date</div>
    <div class="w-1/3 ..."></div>
</div>

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
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
    <div class="flex  pb-5">
    <div class="w-1/3 ..."></div>
    <div class="w-1/3 font-bold">2. Select Time</div>
    <div class="w-1/3 ..."></div>
</div>
    <div class="md:grid md:grid-cols-3 ">

    
    <div class="md:col-start-2 md:grid md:grid-cols-3 content-center">
        
        {Object.keys(example_ava).map((service, index) => 
          (
            
            <div key ={index} className='flex justify-center '>
              {example_ava[service] ? 
                (<button  className=
                {"text-sm my-1 rounded-full py-1 px-3 hover:bg-blue-700 active:ring active:ring-blue-700 "
                +( service == selectTime ? 'my-1 text-white bg-blue-600 text-blue-500' : 'ring-1 ring-black-700')} 
                onClick={()=>setselectTime(service)}>
                {service} 
                </button >):

                (<button  className="text-slate-400 text-sm py-1 px-3 my-1" disabled>{service} </button >)
              }
            </div> 
          
          
          ))
        }
         </div>  
         </div>   

         <div  className='flex justify-center pt-14 pb-10 items-center'>
         <div className='font-bold pr-4 ' 
        //  bg-red-100 
         >3. Select Service</div>
         <Box sx={{ minWidth: 200 }}>
          
      <FormControl sx={{ minWidth: 200 }}>
      <InputLabel id="demo-select-small" sx={{ font: 2}}>Tag</InputLabel>
        <Select
        
        labelId="demo-select-small"
        id="demo-select-small"
          label="Age"
          // onChange={handleChange}
          onKeyDown={handleKeyDown}
        >
          <MenuItem value={10}>ตัดผม</MenuItem>
          <MenuItem value={20}>ย้อมสีผม</MenuItem>
          <MenuItem value={30}>สระ-ไดร์</MenuItem>
          <MenuItem value={40}>ม้วนผม</MenuItem>
        </Select>
      </FormControl>
    </Box>

    </div>   
    <div  className='flex justify-center py-10 items-center px-5'>
    <div className='font-bold pr-4 ' >4. Fill Your Phone Number</div>
    <form>
      
 
    <input type="tel" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Phone Number" onKeyDown={handleKeyDown} />
      </form>
        
     
    
    </div>  
<div class="text-center pb-10">
    <button type="submit" class="w-2/4 sm:w-1/4 text text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm   px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
    </div>
{/* w-full sm:w-auto */}
    </>
  )
}
