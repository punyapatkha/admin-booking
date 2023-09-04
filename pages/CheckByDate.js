import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Header from '@/components/header'
import dayjs, { Dayjs } from 'dayjs';
import addDays from 'date-fns/addDays'  
import { addMinutes  } from 'date-fns'

import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { generateTimeslots,format2digit_month } from '../utils/datefunction';
import { Fragment, useState ,useEffect } from 'react'

import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link'
import axios from '../axios.config';

import Navbar from '@/components/navbar'
const inter = Inter({ subsets: ['latin'] })


export default function CheckByDate() {


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

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  const rows = [
    createData('1', '0893651231', '13:00', 'ตัดผม', 'Cancel'),
    createData('2', '0893651567', '13:00', 'ตัดผม', 'Done'),
    createData('3', '0893459999', '13:30', 'ตัดผม', 'Confirm'),
    createData('4', '0673459898', '14:00', 'ตัดผม', 'Confirm'),
    createData('5', '0893651222', '15:30', 'ตัดผม', 'Pending'),
  ];

  const testfunction = () => {
    console.log(tablelist)
  };
  const now = new Date();
  const newYorkTime = utcToZonedTime(now, 'Asia/Bangkok');
  // const formattedTime = format(newYorkTime, 'hh:mm:ss a');
  
  var debug = false
  const { data: session, status } = useSession();
  const [selectdate, setselectdate] = useState(new Date(newYorkTime)); // also use in time slot part
  const [Post2, setPost2] = useState();
  const [Post, setPost] = useState();
  const [dayoff1, setdayoff1] = useState();
  const [dayoff2, setdayoff2] = useState();
  const [alldayoff, setalldayoff] = useState();
  // const baseURL = "http://127.0.0.1:8000/";
  // const baseURL = "https://booking-flask-punyapatkha.vercel.app/";
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const [loadingcalendar, setloadingcalendar] = useState(false);

  const [loadingtable, setloadingtable] = useState(false);
  const [loadingAPI, setloadingAPI] = useState(false);
  const [tablelist, settablelist] = useState();

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

    useEffect(() => {
      setloadingAPI(false)
      setloadingtable(false)
      axios.post(baseURL+"admin/view",
        {
          "year": selectdate.getFullYear(),
          "month": format2digit_month(selectdate.getMonth()+1),
          "day": format2digit_month(selectdate.getDate())
        },
        {
          headers: {
            Authorization: 'Bearer ' +session.user.access_token
          }
        }
        ).then((response) => {
          if (Object.keys(response.data.data).length > 0){

            // ไม่ต้องมีก็ได้ จัดการมาจากฝั่ง python แล้ว
          //   let list_array = [];
          // response.data.data.map((element, index) => {
          //     // "MM/DD/YYYY"
          //     list_array[index] = createData(element.id, element.id, element.id, element.id, element.id) ;
          //     });
          
          settablelist(response.data.data);

          // let dayoff_array = [];
  
          // response.data.dayoff.day.forEach((element, index) => {
          //   // "MM/DD/YYYY"
          //     dayoff_array[index] = new Date(format2digit_month(newYorkTime.getMonth()+1)+"/"+format2digit_month(element)+"/"+newYorkTime.getFullYear()) ;
          //   });
          // // let concat_array = [...dayoff,  ...dayoff_array];
          // // array1.push(...array2);
          // setdayoff1(dayoff_array);
          
          setloadingAPI(true)
          }
          
        });

        setloadingtable(true)
      }, [selectdate]);

      useEffect(() => {
        try{
      }
        
        catch{
          // console.log("error")
        }
        
        }, [tablelist]);
    
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
   
    
    
   <Navbar/>
    
    {/* <div onClick={()=>console.log(selectdate)}>click to log</div> */}


    <div class="flex pt-14">
    <div class="w-1/3 ..."></div>
    <div class="w-1/3 font-bold">Select Date</div>
    <div class="w-1/3 ..."></div>
</div>
  { loadingcalendar && alldayoff  ? (
  
  <> 
  <LocalizationProvider  dateAdapter={AdapterDayjs}>
      <StaticDatePicker 
       inputFormat="MM-dd"
       views={[ "day"]}

        
        shouldDisableDate={shouldDisableDate}
        // excludeDates={[alldayoff,addDays(new Date(), 2)] }
        // excludeDates={[addDays(new Date(), 2)] }
        excludeDates={"02/28/2023"}
        displayStaticWrapperAs="desktop"
        openTo="day"
        disablePast={true}
        disableHighlightToday={false}

        defaultCalendarMonth={false}
        maxDate={addDays(new Date(), 35)}

        value={selectdate}
        onChange={(newValue) => {

          setselectdate(new Date(newValue));
          console.log(new Date(newValue));
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
    <div class="text-center pb-10 mt-2">
    <Link
  href={{
    pathname: '/Date',
    query: "pid="+format2digit_month(selectdate.getDate())+format2digit_month(selectdate.getMonth()+1)+selectdate.getFullYear()//data // the data
  }}
>
<button class="w-2/4 sm:w-1/4 text text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm   px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Check</button>
</Link>
</div>

{/* <> */}
    {/* <Link
  href={{
    pathname: '/booktime',
    query: "pid="+format2digit_month(selectdate.getDate())+format2digit_month(selectdate.getMonth()+1)+selectdate.getFullYear()//data // the data
  }}
>
  page3
</Link>

<Link
  href={{
    pathname: '/booktime',
    query: "pid=28022023"//data // the data
  }}
>
  page3
</Link> */}

  </>
  ):(
  <>
  
  <div class="text-center mt-10"><svg aria-hidden="true" class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <div class="mt-5">Loading...</div>
        </div>
        {/* <div>Loading...</div> */}
        </>
  )
  }





    </>
  )
}
