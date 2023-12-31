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
import Navbar from '@/components/navbar'

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

import { generateTimeslots,format2digit_month } from '../utils/datefunction';
import axios from '../axios.config';

import Link from 'next/link'
import { Fragment, useState ,useEffect } from 'react'


const inter = Inter({ subsets: ['latin'] })


import { useRouter } from 'next/router'

export default function Post () {

  const router = useRouter()
  const { pid } = router.query
  const [DataAPI,setDataAPI] = useState();
  const [readydisplay,setreadydisplay] = useState(false);
  const [selectedtime,setselectedtime] = useState(false);

  const [selectedservice,setselectedservice] = useState(false);
  const [selectedphone,setselectedphone] = useState(false);
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  
  

  useEffect(() => {
    console.log("this is Pid ",pid)
    if(router.isReady){
    axios.post(baseURL+"checktime",
    // axios.post( "http://127.0.0.1:8000/"+"checktime",
    {
      "day": format2digit_month(pid.substring(0, 2)),
      "month": format2digit_month(pid.substring(2, 4)),
      "year" :pid.substring(4, 8)
    }
    ).then((response) => {
      setDataAPI(response.data);
      setreadydisplay(true)
      
    });
  }
    }, [router.isReady]);
 
    
  const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
      }
      if (event.key === "Return") {
        event.preventDefault();
      }
    };

    const booking= () => {
      // set loading
      setreadydisplay(false);
    try {

      axios.post(baseURL+"bookwtime",
      { 
        "year":pid.substring(4, 8),
        "starttime":selectedtime,
        "startdate":format2digit_month(pid.substring(0, 2)) ,
        "startmonth":format2digit_month(pid.substring(2, 4)),
        "phone":selectedphone,
        "servicetype":selectedservice
      }

      ).then((response) => {
        console.log(response.data)
        setTimeout(() => {
          // navigate('/failed', { replace: true });
          if (response.data.status_code ===200) {
            router.push('/success', { replace: true });
          } else if (response.data.status_code ===400) {
            router.push('/failed', { replace: true });
          } else {
            router.push('/failed', { replace: true });
          }
        // }, 2000);
      }, 100);
        

      });

    } catch (error) {
      console.log(error)
      setreadydisplay(true);
      setTimeout(() => {
        // navigate('/failed', { replace: true });
      }, 2000);
    }
     

    }

  return (<>
    <Navbar/>
   {/* <div onClick={()=>console.log(selectedservice)}>click to log</div>

   <div onClick={()=>console.log(selectedphone)}>click to log</div> */}
{/* 
  <p>Post: {pid.substring(0, 2)}</p>
  
  <p>Post: {pid.substring(2, 4)}</p>
  
  <p>Post: {pid.substring(4, 8)}</p> */}
  {DataAPI && readydisplay  ? (
  // {DataAPI   ? (
        <>
           <div class="flex  pb-5">
    <div class="w-1/3 ..."></div>
    <div class="w-1/3 font-bold">2. Select Time</div>
    <div class="w-1/3 ..."></div>
</div>
    <div class="md:grid md:grid-cols-3 ">

    
    <div class="md:col-start-2 md:grid md:grid-cols-3 content-center">
        
        {Object.keys(DataAPI.timeslot_display).map((service, index) => 
          (
            // <div>{DataAPI.timeslot_display[service].avalibility}</div>
            <div key ={service} className='flex justify-center '>
              {DataAPI.timeslot_display[service].avalibility ? 
                (<button  className=
                {"text-sm my-1 rounded-full py-1 px-3 hover:bg-blue-700 active:ring active:ring-blue-700 "
                +( service == selectedtime ? 'my-1 text-white bg-blue-600 text-blue-500' : 'ring-1 ring-black-700')} 
                onClick={()=>setselectedtime(service)}>
                {DataAPI.timeslot_display[service].display}
                </button >):

                (<button  className="text-slate-400 text-sm py-1 px-3 my-1" disabled>{DataAPI.timeslot_display[service].display}</button >)
              }
            </div> 
          
          
          ))
        }
         </div>  
         </div>   

{/* part for 3 */}

         <div  className='flex justify-center pt-14 pb-10 items-center'>
         <div className='font-bold pr-4 ' 
        //  bg-red-100 
         >3. Select Service</div>
         <Box sx={{ minWidth: 200 }}>
          
          <FormControl sx={{ minWidth: 200 }}>
          <InputLabel  sx={{ font: 2}}></InputLabel>
            <Select
            


              onChange= {(e) => setselectedservice(e.target.value)}
              onKeyDown={handleKeyDown}
            >
              <MenuItem value={"ตัดผม"}>ตัดผม</MenuItem>
              <MenuItem value={"ย้อมสีผม"}>ย้อมสีผม</MenuItem>
              <MenuItem value={"สระ-ไดร์"}>สระ-ไดร์</MenuItem>
              <MenuItem value={"ม้วนผม"}>ม้วนผม</MenuItem>
            </Select>
          </FormControl>
        </Box>

    </div>   

{/* part for 4 */}


<div  className='flex justify-center py-10 items-center px-5'>
    <div className='font-bold pr-4 ' >4. Fill Your Phone Number</div>
    <form>
      
 
    <input type="tel" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
    onChange={(e) => setselectedphone(e.target.value)} placeholder="Phone Number" onKeyDown={handleKeyDown} />
      </form>
        
     
    
    </div>  

    {/* part for submit */}

    <div class="text-center pb-10">
    <button onClick={()=>booking()} class="w-2/4 sm:w-1/4 text text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm   px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
    </div>


        </>
      ) : (
        <>
  
        <div class="text-center mt-10"><svg aria-hidden="true" class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
              <div class="mt-5">Loading...</div>
              </div>
              {/* <div>Loading...</div> */}
              </>
       
      )}

  
  {/* <Link
  href={{
    pathname: '/success',
      }}
>
success
</Link> 
<Link
  href={{
    pathname: '/failed',
      }}
>
failed
</Link> */}
  </>)
}