import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';
import TodayTwoToneIcon from '@mui/icons-material/TodayTwoTone';
import EventTwoToneIcon from '@mui/icons-material/EventTwoTone';
import Header from '@/components/header'
import Navbar from '@/components/navbar'

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import axios from '../axios.config';

import { useRouter } from 'next/router'
import { Fragment, useState ,useEffect } from 'react'


const inter = Inter({ subsets: ['latin'] })


const drawerWidth = 240;
export default function Checking() {
    const router = useRouter();
    const data = router.query;

    // console.log(data, " useLocation Hook");

        useEffect(() => {
   
        console.log(data, " useLocation Hook");
        console.log(data[0], " useLocation Hook");
        console.log(data, " useLocation Hook");
      
      }, []);
  
    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
        }
        if (event.key === "Return") {
          event.preventDefault();
        }
      };
    




  return (
    <>
   <Navbar/> 
   {/* <Header/> */}
   {/* <h1> {data ? data : "Go to Home"} </h1>   */}
 <div class="grid grid-cols-1  bg-gray- pt-5 text-white">
  <div class="bg-red- p-2 w-40 h-40 justify-self-center">
    <div class="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-800 hover:to-gray-800 
     h-36 rounded-xl justify-self-center border border-slate-600 hover:border-gray-700 shadow-2xl" >
      <div class="justify-self-center h-11 text-center">
      </div>
      {/* https://mui.com/material-ui/material-icons/ */}
      
      <div class="justify-self-center text-center ">
       <EventTwoToneIcon sx={{ fontSize: 27 }}/>
      </div>
      <div class="justify-self-center text-center text-lg">Today</div>
      
    </div>
  </div>  
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
</div>
 </>
  )
}