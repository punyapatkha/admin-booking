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
      // setloadingcalendar(true)
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
        console.log("start",2)
        console.log("timeAPI",2)
            console.log(timeAPI)
        console.log("timeslot",2)
        settimeslot(generateTimeslots(timeAPI["default"]["interval"],timeAPI["default"]["starttime"],timeAPI["default"]["endtime"]))
        console.log(timeslot)
        console.log("end",2)
        resolve();
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
            
            console.log(timeAPI["already reserve slot"])
            
            console.log("____here")
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

    // useEffect(() => {
    //   console.log("gg wp start")
    //   executeCommands();
    //   console.log("gg wp end")
    // }, [selectdate]);

    useEffect(() => {
      
      // executeCommands();
      // console.log("gg wp end")
    }, []);
    const [count, setCount] = useState(0);
    const [count123, setCount123] = useState();

    useEffect(() => {
      console.log("gg wp start123")
    }, [count,count123]);
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
    
    </>
  )
}
