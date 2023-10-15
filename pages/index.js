import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

import Link from 'next/link'
import Header from '@/components/header'
import Navbar from '@/components/navbar'
import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';

import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';

import EventTwoToneIcon from '@mui/icons-material/EventTwoTone';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useSession, signIn, signOut } from "next-auth/react"
import { Fragment, useState ,useEffect } from 'react'


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

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
  
  const { data: session, status } = useSession();
  const [value, setValue] = useState();
  const currentDate = new Date(); 
  const timestamp = currentDate. getTime();
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
    return day.getDay() === 0 || day.getDay() === 3; // Sunday or Saturday
  };

  // const shouldDisableDate = [isWeekend, isBeforeToday].every((fn) => fn);
  // multiple function in one
  const shouldDisableDate = (date) => {
    return isWeekend(date) || isWeekend2(date);
  };

  const startOfDay = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
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
  return (
    <>
    
    <Navbar/>
    {session 
      ? <>
      <div class="grid grid-cols-1  bg-gray- pt-5 text-white">
        <Link class="justify-self-center" href={"/Date?pid="+currentDate.getDate()+(Number(currentDate.getMonth())+1)+currentDate.getFullYear()}>
          <div class="bg-red- p-2 w-40 h-40 justify-self-center">
            <div class="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-800 hover:to-gray-800 
            h-36 rounded-xl justify-self-center border border-slate-600 hover:border-gray-700 shadow-2xl" >
              <div class="justify-self-center h-11 text-center">
              </div>
          {/* https://mui.com/material-ui/material-icons/ */}
          
              <div class="justify-self-center text-center ">
                <EventTwoToneIcon sx={{ fontSize: 27 }}/>
              </div>
              <div class="justify-self-center text-center text-lg">Today 
                <br></br>
                {/* {currentDate.getDate()}{" "}{currentDate.getMonth()+1}{" "}{currentDate.getFullYear()} */}
              </div>
              
            </div>
          </div>
        </Link>  
        <Link class="justify-self-center" href="/CheckByDate">
        
        <div class="bg-red- p-2 w-40 h-40 justify-self-center ">
        <div class="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-800 hover:to-gray-800 
        h-36 rounded-xl justify-self-center border border-slate-600 hover:border-gray-700 shadow-2xl" >
         <div class="justify-self-center h-11 text-center">
         </div>
      {/* https://mui.com/material-ui/material-icons/ */}
      
          <div class="justify-self-center text-center ">
          <CalendarMonthTwoToneIcon sx={{ fontSize: 27  }}/>
      </div>
      <div class="justify-self-center text-center text-lg">Date</div>
      
    </div>
        </div>
        </Link> 
      </div>
  


    
      </>
      : <>
       <div class="text-center"><Link href="/api/auth/signin"><button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded m-5">Sign in</button></Link></div> 
      </>}
    
    </>
  )
}
