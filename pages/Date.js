import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';

import CircularProgress from '@mui/material/CircularProgress';
import Header from '@/components/header'
import Navbar from '@/components/navbar'

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

import Modal from '@mui/material/Modal';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import Typography from '@mui/material/Typography';

import { generateTimeslots,format2digit_month } from '../utils/datefunction';
import axios from '../axios.config';

import Link from 'next/link'
import { Fragment, useState ,useEffect } from 'react'

import { useSession, signIn, signOut } from "next-auth/react"

const inter = Inter({ subsets: ['latin'] })


import { useRouter } from 'next/router'

export default function Date () {

  const router = useRouter()
  const { pid } = router.query
  const [DataAPI,setDataAPI] = useState();
  const [readydisplay,setreadydisplay] = useState(false);
  const [selectedtime,setselectedtime] = useState(false);

  const [selectedservice,setselectedservice] = useState(false);
  const [selectedphone,setselectedphone] = useState(false);
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  
  const [loadingtable, setloadingtable] = useState(false);
  const [loadingAPI, setloadingAPI] = useState(false);
  const [tablelist, settablelist] = useState();

  
  const [modalid, setmodalid] = useState();
  const [modalphone, setmodalphone] = useState();
  const [modaltime, setmodaltime] = useState();  
  const [modaltype, setmodaltype] = useState();
  const [modalstatus, setmodalstatus] = useState();
  const [modalloading, setmodalloading] = useState();

  const { data: session, status } = useSession();

  
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  // https://stackoverflow.com/questions/69412453/next-js-router-query-getting-undefined-on-refreshing-page-but-works-if-you-navi
  useEffect(() => {
    setloadingAPI(false)
    setloadingtable(false)
    if(router.isReady && status==="authenticated"){
      axios.post(baseURL+"admin/view",
      {
        "year": pid.substring(4, 8),
        "month": format2digit_month(pid.substring(2, 4)),
        "day": format2digit_month(pid.substring(0, 2))
      },
      {
        headers: {
          Authorization: 'Bearer ' +session.user.access_token
        }
      }
      ).then((response) => {
        if(response.data.detial === "Could not validate credentials"){
          router.push('/api/auth/signin', { replace: true });
        }
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
   }
    

      setloadingtable(true)
    }, [router.isReady,status]);
 
    
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
        }, 2000);
        

      });
    
    

    } catch (error) {
      console.log(error)
      setreadydisplay(true);
      setTimeout(() => {
        // navigate('/failed', { replace: true });
      }, 2000);
    }
     
    

    }
    
    var handleeditbutton = (id,phone,time) => {
      setmodalid(id)
      setmodalphone(phone);
      setmodaltime(time) ;
      setOpen(true)
      setmodalloading(false)
    }

    var cancelbutton = () => {
      setmodalphone();
      setmodaltime();
      setmodaltype();
      setmodalstatus();
      setOpen(false)
      setmodalloading(false)
    }
    
    var handleconfirmbutton = () => {
      
      setmodalloading(true)
      var request_body = {}
      if(modaltype){
        request_body['service_type']=modaltype
      }
      if(modalstatus){
        request_body['status']=modalstatus
      }
      if (Object.keys(request_body).length === 0) {
        // Your code here if request_body is an empty dictionary (empty object)
      } else {
        request_body['desired_id']=modalid
        
        // const baseURL = "http://127.0.0.1:8000/";
        axios.post(baseURL+"admin/edit",
        request_body,
          {
            headers: {
              Authorization: 'Bearer ' +session.user.access_token
            }
          }
          ).then((response) => {
            console.log(response.data)
            setmodalloading(true)
            // router.push('/Date?pid='+pid)
            router.reload()
            }
          );
      }
      
      // setOpen(true)
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
      { loadingAPI  && loadingtable ? (
        
        <> 
      <br/>
      <Box sx={{ width: '100%', maxWidth: 1500,textAlign: 'center' }}>
      <Typography variant="h5" gutterBottom>
      Date : {format2digit_month(pid.substring(0, 2))} {format2digit_month(pid.substring(2, 4))} {pid.substring(4, 8)} 
      </Typography>
      </Box>
      <br/>

          <TableContainer component={Paper}>
      <Table sx={{ minWidth: 5 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {/* <TableCell>ID</TableCell> */}
            <TableCell align="right">Phone Number</TableCell>
            <TableCell align="right">Time </TableCell>
            <TableCell align="right">Service Type</TableCell>
            <TableCell align="right">Status </TableCell>
            <TableCell align="right">Action </TableCell>
          </TableRow>
        </TableHead>
        {(() => {
      if (tablelist !== undefined) {
      return <TableBody>
      {tablelist.map((row) => (
        <TableRow
          key={row.id}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          {/* <TableCell component="th" scope="row">
            {row.id}
          </TableCell> */}
          <TableCell align="right">{row.phone}</TableCell>
          <TableCell align="right">{row.time}</TableCell>
          <TableCell align="right">{row.service_type}</TableCell>
          <TableCell align="right">{row.status}</TableCell>
          <TableCell align="right"><Button onClick={() =>handleeditbutton(row.id,row.phone,row.time)} variant="contained" color="error"> Edit</Button></TableCell>
        </TableRow>
      ))}
    </TableBody>;
        } else {
      return <></>;
       }
        })()}
        
      </Table>
    </TableContainer>


    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit {modalphone} at {modaltime}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Please validate information before confirm. 
          </Typography>

          <br/>
          
     
          
          
 
         
          <Stack spacing={3} direction="row">
          <Typography id="modal-modal-description" sx={{ mt: 10, paddingTop:2 }}>
            Service:
          </Typography>
        
          <FormControl sx={{ minWidth: 150 }}>
        <Select
            onChange= {(e) => setmodaltype(e.target.value)}
            onKeyDown={handleKeyDown}
          >
            <MenuItem value={"ตัดผม"}>ตัดผม</MenuItem>
              <MenuItem value={"ย้อมสีผม"}>ย้อมสีผม</MenuItem>
              <MenuItem value={"สระ-ไดร์"}>สระ-ไดร์</MenuItem>
              <MenuItem value={"ม้วนผม"}>ม้วนผม</MenuItem>
          </Select>
          </FormControl>
    </Stack>
    <br/>

          <Stack spacing={4} direction="row">
          <Typography id="modal-modal-description" sx={{ mt: 10, paddingTop:2 }}>
            Status:
          </Typography>
        
          <FormControl sx={{ minWidth: 150 }}>
        <Select
            onChange= {(e) => setmodalstatus(e.target.value)}
            onKeyDown={handleKeyDown}
          >
            <MenuItem value={"cancel"}>Cancel</MenuItem>
            <MenuItem value={"await payment"}>Await payment</MenuItem>
            <MenuItem value={"confirm"}>Confirm</MenuItem>
            <MenuItem value={"served"}>Served</MenuItem>
          </Select>
          </FormControl>
    </Stack>
    <br/>
    
    

    {modalloading?( 
    <Box
    sx={{
      mx: 'auto',
      width: 200,
      p: 1,
      ml: 2,
      bgcolor: (theme) =>
        theme.palette.mode === 'dark' ? '#101010' : 'grey.50',
      color: (theme) =>
        theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
      border: '1px solid',
      borderColor: (theme) =>
        theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
      borderRadius: 2,
      textAlign: 'center',
      fontSize: '0.875rem',
      fontWeight: '700',
    }}
  >
    <CircularProgress />

  </Box>

    
    
    ):(
          
      <Stack spacing={4} direction="row">
        <Button  variant="contained" color="error" onClick={()=>cancelbutton()}>Cancel</Button>
        <Button  variant="contained" color="success"  onClick={()=>handleconfirmbutton()}>Confirm</Button>
        
    </Stack>
              )}
        </Box>
        
      </Modal>
    </div>


        </>
        ):(
        <>
         <div class="text-center mt-10"><svg aria-hidden="true" class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
              <div class="mt-5">Loading...</div>
              </div>
        </>
        )
      }

  </>)
}