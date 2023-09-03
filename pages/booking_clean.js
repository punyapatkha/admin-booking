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

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { generateTimeslots,format2digit_month } from '../utils/datefunction';
import { Fragment, useState ,useEffect } from 'react'

import axios from '../axios.config';

const inter = Inter({ subsets: ['latin'] })


export default function Home() {


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


  const now = new Date();
  const newYorkTime = utcToZonedTime(now, 'Asia/Bangkok');
  // const formattedTime = format(newYorkTime, 'hh:mm:ss a');
  
  
  const [selectdate, setselectdate] = useState(new Date(newYorkTime)); // also use in time slot part
  const [Post2, setPost2] = useState();
  const [Post, setPost] = useState();
  const [dayoff1, setdayoff1] = useState();
  const [dayoff2, setdayoff2] = useState();
  const [alldayoff, setalldayoff] = useState();
  const baseURL = "https://booking-flask-punyapatkha.vercel.app/";
  const [loadingcalendar, setloadingcalendar] = useState(false);

  

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

    
  /////////////////// part for time
  // selectdate 
  const [selectTime, setselectTime] = useState();
  const [timeAPI, settimeAPI] = useState();
  const [timeslot, settimeslot] = useState(false);
  const [timeslotready, settimeslotready] = useState(false);
  const [timeslotdisplay, settimeslotdisplay] = useState(false);
  
  const [timeslotreserved, settimeslotreserved] = useState(false);
  //  loading avaliable time of that day + config
  // useEffect(() => {
  //   settimeslotready(false)
  //   //   axios.post(`${baseURL}day`,
  //     axios.post(baseURL+"time",
  //     {
  //       "year": selectdate.getFullYear(),
  //       "month": format2digit_month(selectdate.getMonth()+1),
  //       "day": format2digit_month(selectdate.getDate())

  //     }
  //     ).then((response) => {
  //       settimeAPI(response.data)
  //     }).then(() => {
  //       if(timeAPI){
  //       // console.log(timeAPI["default"]["endtime"])
  //       // console.log(timeAPI["default"]["starttime"])
  //       // console.log(timeAPI["default"]["interval"])
  //       settimeslot(generateTimeslots(timeAPI["default"]["interval"],timeAPI["default"]["starttime"],timeAPI["default"]["endtime"]))
  //       // console.log(generateTimeslots(30,"03:30","07:00"))
  //       }
        
  //     }).then(()=>{
  //       // เช็คว่า timeslot ไหนว่างบ้าง
  //       // get status 0 - 1

  //         var temp_timeslot = {}
  //         // var expect_result = {
  //         //   "9:00": {"avaliable":0 ,"display":"9:00 - 9:30"},
  //         //   "9:30": {"avaliable":0 ,"display":"9:00 - 9:30"},
  //         //   "10:00": {"avaliable":0 ,"display":"9:00 - 9:30"},
  //         //   "10:30": {"avaliable":0 ,"display":"9:00 - 9:30"},
  //         //   "11:00": {"avaliable":0 ,"display":"9:00 - 9:30"}
  //         // };
  //         if(timeAPI["already reserve slot"]){
            
  //           console.log(timeAPI["already reserve slot"])
            
  //           console.log("____here")
  //           Object.keys(timeAPI["already reserve slot"]).map((element, index) => {
  //             if (temp_timeslot[timeAPI["already reserve slot"][element]["time"]])
  //             {
  //               temp_timeslot[timeAPI["already reserve slot"][element]["time"]]= {"avaliable":temp_timeslot[timeAPI["already reserve slot"][element]["time"]]["avaliable"]+1,"display":temp_timeslot[timeAPI["already reserve slot"][element]["time"]]["display"]}
  //             }
  //             else{
  //               var a=new Date("01/01/2000 "+timeAPI["already reserve slot"][element]["time"])
  //               var b=addMinutes(a, "30")
  //               temp_timeslot[timeAPI["already reserve slot"][element]["time"]]= {"avaliable":1,"display":timeAPI["already reserve slot"][element]["time"]+" - "+format2digit_month(b.getHours())+":"+format2digit_month(b.getMinutes())}
  //             } });

  //             settimeslotreserved(temp_timeslot)
  //             // console.log(temp_timeslot)
              
  //             console.log(timeslot)
  //             console.log(timeslotreserved)
  //             var temp_timeslot_display={}
  //             Object.keys(timeslot).map((element, index) => {
  //             var c=new Date("01/01/2000 "+timeslot[element])
  //             var d=addMinutes(c, timeAPI["default"]["interval"])
              
  //             temp_timeslot_display[timeslot[element]]={"avaliability":1,"display":timeslot[element]+" - "+format2digit_month(d.getHours())+":"+format2digit_month(d.getMinutes())}
  //             // console.log("done")
  //             }
  //             )
  //             Object.keys(timeslotreserved).map((element, index) => {
  //               var c=new Date("01/01/2000 "+timeslotreserved[element])
  //               var d=addMinutes(c, timeAPI["default"]["interval"])
  //               if(timeslotreserved[element].avaliable >= timeAPI["default"]["capacity"]){
  //               temp_timeslot_display[timeslotreserved[element]]={"avaliability":0,"display":timeslotreserved[element]+" - "+format2digit_month(d.getHours())+":"+format2digit_month(d.getMinutes())}
  //               }
  //               // console.log("done")
  //               }
  //               )
  //             // timeAPI["default"]["capacity"]
  //             settimeslotdisplay(temp_timeslot_display)
  //             console.log("gg wp")
  //         }
          
  //     }
  //     );
      
  //   }, [selectdate]);

    const command1 = () => {
      return new Promise((resolve) => {
            settimeslotready(false)
        //   axios.post(`${baseURL}day`,
          axios.post(baseURL+"time",
          {
            "year": selectdate.getFullYear(),
            "month": format2digit_month(selectdate.getMonth()+1),
            "day": format2digit_month(selectdate.getDate())

          }
          ).then((response) => {
            
            console.log("start",1)
            console.log(selectdate)
            console.log(response.data)
            console.log(response)
            settimeAPI(response.data)
            
            console.log("timeAPI",1)
            console.log(timeAPI)
            console.log("end",1)
            resolve();
          }).catch(
            error => console.log("this is error : ",error)
          )
        
      });
    };
  
    var command2 = () => {
      return new Promise((resolve) => {
        if(timeAPI){
        console.log("start",2)
        console.log("timeAPI",2)
            console.log(timeAPI)
        console.log("timeslot",2)
        settimeslot(generateTimeslots(timeAPI["default"]["interval"],timeAPI["default"]["starttime"],timeAPI["default"]["endtime"]))
        console.log(timeslot)
        console.log("end",2)
        resolve();
        }
      });
    };
  
    const command3 = () => {
      return new Promise((resolve) => {
        var temp_timeslot = {}
          // var expect_result = {
          //   "9:00": {"avaliable":0 ,"display":"9:00 - 9:30"},
          //   "9:30": {"avaliable":0 ,"display":"9:00 - 9:30"},
          //   "10:00": {"avaliable":0 ,"display":"9:00 - 9:30"},
          //   "10:30": {"avaliable":0 ,"display":"9:00 - 9:30"},
          //   "11:00": {"avaliable":0 ,"display":"9:00 - 9:30"}
          // };
          console.log("start",3)
          if(timeAPI["already reserve slot"]){
            console.log("timeAPI[already reserve slot]")
            console.log(timeAPI["already reserve slot"])
            
            
            Object.keys(timeAPI["already reserve slot"]).map((element, index) => {
              if (temp_timeslot[timeAPI["already reserve slot"][element]["time"]])
              {
                temp_timeslot[timeAPI["already reserve slot"][element]["time"]]= {"avaliable":temp_timeslot[timeAPI["already reserve slot"][element]["time"]]["avaliable"]+1,"display":temp_timeslot[timeAPI["already reserve slot"][element]["time"]]["display"]}
              }
              else{
                var a=new Date("01/01/2000 "+timeAPI["already reserve slot"][element]["time"])
                var b=addMinutes(a, "30")
                temp_timeslot[timeAPI["already reserve slot"][element]["time"]]= {"avaliable":1,"display":timeAPI["already reserve slot"][element]["time"]+" - "+format2digit_month(b.getHours())+":"+format2digit_month(b.getMinutes())}
              } });

              settimeslotreserved(temp_timeslot)
              // console.log(temp_timeslot)
              
              console.log(timeslot)
              
              console.log("below is timeslot reserved")
              console.log(timeslotreserved)
              var temp_timeslot_display={}
              Object.keys(timeslot).map((element, index) => {
              var c=new Date("01/01/2000 "+timeslot[element])
              var d=addMinutes(c, timeAPI["default"]["interval"])
              
              temp_timeslot_display[timeslot[element]]={"avaliability":1,"display":timeslot[element]+" - "+format2digit_month(d.getHours())+":"+format2digit_month(d.getMinutes())}
              // console.log("done")
              }
              )
              Object.keys(timeslotreserved).map((element, index) => {
                var c=new Date("01/01/2000 "+timeslotreserved[element])
                var d=addMinutes(c, timeAPI["default"]["interval"])
                if(timeslotreserved[element].avaliable >= timeAPI["default"]["capacity"]){
                temp_timeslot_display[timeslotreserved[element]]={"avaliability":0,"display":timeslotreserved[element]+" - "+format2digit_month(d.getHours())+":"+format2digit_month(d.getMinutes())}
                }
                // console.log("done")
                }
                )
              // timeAPI["default"]["capacity"]
              settimeslotdisplay(temp_timeslot_display)
          
              console.log("end",3)
          }
        
        resolve();
      });
    };
  
    const executeCommands = async () => {
      await command1();
      await command2();
      await command3();
    };

    useEffect(() => {
      console.log("gg wp start")
      executeCommands();
      console.log("gg wp end")
    }, [selectdate]);

    // useEffect(() => {
    //   settimeslotready(false)
    //   //   axios.post(`${baseURL}day`,
    //     axios.post(baseURL+"time",
    //     {
    //       "year": newYorkTime.getFullYear(),
    //       "month": format2digit_month(newYorkTime.getMonth()+1),
    //       "day": format2digit_month(newYorkTime.getDate())
  
    //     }
    //     ).then((response) => {
    //       settimeAPI(response.data);
    //     }).then(() => {
          
    //       if (timeAPI){
    //         settimeslot(generateTimeslots(timeAPI["default"]["interval"],timeAPI["default"]["starttime"],timeAPI["default"]["endtime"]))
    //       }

    //       }).then(()=>{
    //       // เช็คว่า timeslot ไหนว่างบ้าง
    //       // get status 0 - 1
    //       try{
    //         var temp_timeslot = {}
    //         // var expect_result = {
    //         //   "9:00": {"avaliable":0 ,"display":"9:00 - 9:30"},
    //         //   "9:30": {"avaliable":0 ,"display":"9:00 - 9:30"},
    //         //   "10:00": {"avaliable":0 ,"display":"9:00 - 9:30"},
    //         //   "10:30": {"avaliable":0 ,"display":"9:00 - 9:30"},
    //         //   "11:00": {"avaliable":0 ,"display":"9:00 - 9:30"}
    //         // };
    //         Object.keys(timeAPI["already reserve slot"]).map((element, index) => {
    //           if (temp_timeslot[element])
    //           {
    //             temp_timeslot[element]= {"avaliable":temp_timeslot[element]["avaliable"]+1,"display":temp_timeslot[element]["display"]}
    //           }
    //           else{
    //             temp_timeslot[element]= {"avaliable":1,"display":timeAPI["already reserve slot"][element]["time"]+" - "+format2digit_month(b.getHours())+":"+format2digit_month(b.getMinutes())}
    //           }
    //           // temp_timeslot[new_key] = new_value;
    //           // var a=new Date("01/01/2000 "+timeAPI["already reserve slot"][element]["time"])
    //           // var b=addMinutes(a, "30")
    //           // console.log(timeAPI["already reserve slot"][element]["time"]+" - "+format2digit_month(b.getHours())+":"+format2digit_month(b.getMinutes()))
    //           // console.log(timeAPI["already reserve slot"][element]["time"])
    //           // console.log(timeAPI["already reserve slot"][element])

    //           // temp_timeslot[timeAPI["already reserve slot"][element]["time"]] =
    //           // {"avaliable":0 ,"display":timeAPI["already reserve slot"][element]["time"]+" - "+format2digit_month(b.getHours())+":"+format2digit_month(b.getMinutes())}
    //         });
    //             settimeslotreserved(temp_timeslot)
    //         settimeslotready(true)
    //         }
    //         catch{
    //         // console.log("load not finish")
    //         }
    //         var temp_timeslot = {}
    //         if(timeAPI["already reserve slot"]){
              
    //           // console.log(timeAPI["already reserve slot"])
              
    //           // console.log("here")
    //           Object.keys(timeAPI["already reserve slot"]).map((element, index) => {
    //             if (temp_timeslot[timeAPI["already reserve slot"][element]["time"]])
    //           {
    //             temp_timeslot[timeAPI["already reserve slot"][element]["time"]]= {"avaliable":temp_timeslot[timeAPI["already reserve slot"][element]["time"]]["avaliable"]+1,"display":temp_timeslot[timeAPI["already reserve slot"][element]["time"]]["display"]}
    //           }
    //           else{
    //             var a=new Date("01/01/2000 "+timeAPI["already reserve slot"][element]["time"])
    //             var b=addMinutes(a, "30")
    //             temp_timeslot[timeAPI["already reserve slot"][element]["time"]]= {"avaliable":1,"display":timeAPI["already reserve slot"][element]["time"]+" - "+format2digit_month(b.getHours())+":"+format2digit_month(b.getMinutes())}
    //           } });
  
    //             // console.log(temp_timeslot)
    //             settimeslotreserved(temp_timeslot)
    //             settimeslotready(true)
    //         }
            
    //         //   console.log(timeAPI["already reserve slot"])
              
    //         //   console.log("here")
    //     }
    //     );
    //   }, []);



  
  return (
    <>
   
    
    
    <Header/>
    
    <div onClick={()=>console.log(timeslotreserved)}>click to log</div>
    {/* <div>
    loadingcalendar <b>{loadingcalendar ? loadingcalendar.toString() : 'not'}</b> --
    </div>
    <div>
    alldayoff <b>{alldayoff ? alldayoff.toString() : 'not'}</b> --
    </div> */}

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
{/* place for time */}

    <div>
    selectdate <b>{selectdate ? selectdate.getDate() : 'not'}</b> day--
    </div>
    <div>
    selectTime <b>{selectTime ? selectTime : 'not'} </b> day--
    </div>

    {/* <div>
    timeAPI <b>{timeAPI ? timeAPI["already reserve slot"][0]["time"] : 'not'} </b> day--
    </div> */}
    <div>
    timeslotready <b>{timeslotready ? timeslotready : 'not'} </b> day--
    </div>
    <div onClick={()=>console.log(timeAPI)}>
    timeslotreserved
    {/* <b>{timeslotreserved ? timeslotreserved["12:30"]["display"] : 'not'} </b> day-- */}
    </div>
     {selectdate && timeslotready  ? (
        <>
           <div class="flex  pb-5">
    <div class="w-1/3 ..."></div>
    <div class="w-1/3 font-bold">2. Select Time</div>
    <div class="w-1/3 ..."></div>
</div>
    <div class="md:grid md:grid-cols-3 ">

    
    <div class="md:col-start-2 md:grid md:grid-cols-3 content-center">
        
        {Object.keys(timeslot).map((service, index) => 
          (
            
            <div key ={index} className='flex justify-center '>
              {service ? 
                (<button  className=
                {"text-sm my-1 rounded-full py-1 px-3 hover:bg-blue-700 active:ring active:ring-blue-700 "
                +( service == selectTime ? 'my-1 text-white bg-blue-600 text-blue-500' : 'ring-1 ring-black-700')} 
                onClick={()=>setselectTime(service)}>
                {timeslot[service]} ( { timeAPI["default"]["interval"]} minute ) 
                </button >):

                (<button  className="text-slate-400 text-sm py-1 px-3 my-1" disabled>{service} </button >)
              }
            </div> 
          
          
          ))
        }
         </div>  
         </div>   
        </>
      ) : (
        <div>please select date</div>
       
      )}


   {/* place for service */}  
   {selectdate && timeslotready  ? (
        <> 
        </>
      ) : (
        <div></div>
       
      )}
   {/* place for phone */}  
   {selectdate && timeslotready  ? (
        <> 
        </>
      ) : (
        <div></div>
       
      )}
    </>
  )
}
