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
   
   <Header/>
   {/* <h1> {data ? data : "Go to Home"} </h1>   */}
   
<Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Permanent drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        {/* for blank toolbar */}
        {/* <Toolbar /> */}

        <Toolbar>
          <Typography variant="h8" noWrap component="div">
            [logo]-[name]-[version]
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >

        {/* <Toolbar /> */}
        <div>
 
    <div class="bg-blue-200 grid grid-cols-4 gap-4 px-4 pt-4 pb-3">
  <div class="bg-blue- text-black font-sans font-semibold rounded-lg ">Dashboard</div>
  <div class="bg-blue- text-black font-sans  rounded-lg"> Dashboard </div>
  <div class="bg-blue- rounded-lg"></div>
  <div class="bg-blue- rounded-lg"></div>
</div>
{/* create crontab update data evern hours */}
<div class="bg-blue-200 grid grid-cols-4 gap-4 px-4 pt-2 ">
  <div class="bg-blue-300 rounded-lg cursor-progress">
    <div class="pt-3 px-4">Total Web Visit</div>
    <div class="px-4 text-lg font-sans font-bold">2,236</div>
    <div class="px-4 pt-3 pb-2 text-sm">You made an [number] today</div></div>
  <div class="bg-blue-500 rounded-lg">
  
    <div class="pt-3 px-4">Total Booking</div>
    <div class="px-4 text-lg font-sans font-bold">236</div>
    <div class="px-4 pt-3 pb-2 text-sm">You made an extra 35,000 this year</div>
  </div>
  <div class="bg-blue-900 rounded-lg">
    <div class="pt-3 px-4">Total Served</div>
    <div class="px-4 text-lg font-sans font-bold">224</div>
    <div class="px-4 pt-3 pb-2 text-sm">You made an extra 35,000 this year</div>
  </div>
  <div class="bg-blue-900 rounded-lg">
    <div class="pt-3 px-4">Total Cancel</div>
    <div class="px-4 text-lg font-sans font-bold">12</div>
    <div class="px-4 pt-3 pb-2 text-sm">You made an extra 35,000 this year</div>
  </div>
</div>



<div class="bg-blue-200 grid grid-cols-3 gap-4 px-4 pt-14 pb-2">
  <div class="col-span-2 text-black font-sans font-semibold ">Unique Visitor</div>
  <div class="text-black font-sans font-semibold">Income Overview</div>
</div>
<div class="bg-blue-200 grid grid-cols-3 gap-4 p-4">
  <div class="bg-blue-300 rounded-lg h-80 col-span-2">01</div>
  <div class="bg-blue-500 rounded-lg">01</div>
</div>
</div>
<div>
   
    <div class="bg-blue-200 grid grid-cols-4 gap-4 px-4 pt-4">
  <div class="bg-blue- text-black rounded-lg ">Dashboard</div>
  <div class="bg-blue- rounded-lg"></div>
  <div class="bg-blue- rounded-lg"></div>
  <div class="bg-blue- rounded-lg"></div>
</div>
{/* create crontab update data evern hours */}
<div class="bg-blue-200 grid grid-cols-4 gap-4 px-4 pt-2 ">
  <div class="bg-blue-300 rounded-lg h-40 pl-2 pt-2 ">Total Visit Booking Web</div>
  <div class="bg-blue-500 rounded-lg"><div>2</div><div>1</div>Total Book +..today</div>
  <div class="bg-blue-900 rounded-lg">Total Served +..today</div>
  <div class="bg-blue-900 rounded-lg">Total Cancel green less than 10%</div>
</div>



<div class="bg-blue-200 grid grid-cols-3 gap-4 px-4 pt-4 pb-2">
  <div class="col-span-2 text-black">Unique Visitor</div>
  <div class="text-black">Income Overview</div>
</div>
<div class="bg-blue-200 grid grid-cols-3 gap-4 p-4">
  <div class="bg-blue-300 rounded-lg h-80 col-span-2">01</div>
  <div class="bg-blue-500 rounded-lg">01</div>
</div>
</div>
        <Typography paragraph>
          Line chart to displays status count for each day.
          Pie chart to displays percentage of each service divided by total booking.
          Table shows total booking group by service type
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
          eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
          neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
          tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
          sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
          tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
          gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
          et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
          tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
      </Box>
    </Box>
 </>
  )
}