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

  let isWeekend3 = (date) => {
    let day = new Date(date);
    // try{
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
      catch{}
      })
    
      

    return x; // false mean allow to have
  };

  let isWeekend44 = (date) => {
    let day = new Date(date);
    // try{
    alldayoff.forEach((element, index) => {
      // "MM/DD/YYYY"
      if(day.getDate()  === element.getDate() && 
      day.getMonth()  === element.getMonth() && 
      day.getFullYear()  === element.getFullYear())
      {
        console.log(day.getDate()+"/"+day.getMonth()+day.getFullYear())
        console.log(element.getDate(),element.getMonth(),element.getFullYear() )
    
        
        console.log("here")
        return true
      }
      });

      
    // }
    //   catch{}
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
   
    // return true;
    return isWeekend3(date)
    // return isWeekend(date) || isWeekend2(date)
    // return  isWeekend2(date) || isWeekend3(date);
    // return isWeekend(date) && isWeekend2(date) && isWeekend3(date);
    // return false
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
  const [loadingcalendar, setloadingcalendar] = useState(false);

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
      setalldayoff(dayoff1.concat(dayoff2))
      console.log("pass")
    }
      
      catch{
        console.log("error")
      }
      setloadingcalendar(true)
      }, [dayoff1,dayoff2]);
    //   const cars = [new Date("03/03/2023"),new Date("03/15/2023"),new Date("03/13/2023")];
      
    
  /////////////////// part for time
  // selectdate 
  const [selectdate, setselectdate] = useState(false);
  const [timeAPI, settimeAPI] = useState(false);
  const [timeslot, settimeslot] = useState(false);
  const [timeslotready, settimeslotready] = useState(false);
  
  const [timeslotreserved, settimeslotreserved] = useState(false);
  //  loading avaliable time of that day + config
  useEffect(() => {
    settimeslotready(false)
    //   axios.post(`${baseURL}day`,
      axios.post(baseURL+"time",
      {
        "year": newYorkTime.getFullYear(),
        "month": format2digit(newYorkTime.getMonth()+1),
        "day": format2digit(newYorkTime.getDay())

      }
      ).then((response) => {
        settimeAPI(response.data);
      }).then(() => {
        try{
        console.log(timeAPI["default"]["endtime"])
        console.log(timeAPI["default"]["starttime"])
        console.log(timeAPI["default"]["interval"])
        settimeslot(generateTimeslots(timeAPI["default"]["interval"],timeAPI["default"]["starttime"],timeAPI["default"]["endtime"]))
        console.log(generateTimeslots(30,"03:30","07:00"))
        }
        catch{
        // console.log("load not finish")
        }
      }).then(()=>{
        // เช็คว่า timeslot ไหนว่างบ้าง
        // get status 0 - 1
        try{
                    var temp = {}
                  timeAPI["already reserve slot"].forEach((element, index) => {
                    // "MM/DD/YYYY"
                    if (temp[element["time"]]){
                      temp[element["time"]] = temp[element["time"]]+1
                    }
                    else{
                      temp[element["time"]] = 1
                    
                    }
                      });
                      settimeslotreserved(temp)
          }
          catch{
          // console.log("load not finish")
          }
        
          var temp = {}
          Object.keys(timeAPI["already reserve slot"]).map((element, index) => {
            // "MM/DD/YYYY"
            // if (temp[element["time"]]){
            //   temp[element["time"]] = temp[element["time"]]+1
            // }
            // else{
            //   temp[element["time"]] = 1
            
            // }
            console.log(element)
              });
              settimeslotreserved(temp)
        settimeslotready(true)
      }
      );
    }, [selectdate]);

  /**
 * Generate an array of timeslots based on timeinterval
 * Assumption for brevity: 
 * - startTime and endTime are of valid time
 * - in the case where startTime is greater than endTime, the timeSlots 
 *   will go into the next "day". i.e: 
 *      generateTimeslots(60, '23:00', '02:00') = ["23:00", "00:00", "01:00", "02:00"]
 * 
 * @param  {integer} timeInterval   In mins. Can only accept 15, 30 or 60
 *                                  * my version will work with any interval > 0
 * @param  {string}  startTime      '03:45'. Min - '00:00', Max - '24:00'
 * @param  {string}  endTime        '15:00'. Min - '00:00', Max - '24:00'
 * @return {array}                  ['03:45', ....., '15:00']
 */

function generateTimeslots(timeInterval, startTime, endTime) {
  // get the total minutes between the start and end times.
  var totalMins = subtractTimes(startTime, endTime);
  
  // set the initial timeSlots array to just the start time
  var timeSlots = [startTime];
  
  // get the rest of the time slots.
  return getTimeSlots(timeInterval, totalMins, timeSlots);
}

/**
 * Generate an array of timeSlots based on timeInterval and totalMins
 *
 * @param  {integer} timeInterval   In mins.
 * @param  {integer} totalMins      In mins.
 * @param  {array}   timeSlots      ['03:45', ....., '15:00']
 * @return {array}                  ['03:45', ....., '15:00']
 */
function getTimeSlots(timeInterval, totalMins, timeSlots) {
  // base case - there are still more minutes
  if (totalMins - timeInterval >= 0) {
    // get the previous time slot to add interval to
    var prevTimeSlot = timeSlots[timeSlots.length - 1];
    // add timeInterval to previousTimeSlot to get nextTimeSlot
    var nextTimeSlot = addMinsToTime(timeInterval, prevTimeSlot);
    timeSlots.push(nextTimeSlot);
    
    // update totalMins
    totalMins -= timeInterval;
    
    // get next time slot
    return getTimeSlots(timeInterval, totalMins, timeSlots);
  } else {
    // all done!
    return timeSlots;
  }
}

/**
 * Returns the total minutes between 2 time slots
 *
 * @param  {string} t1    a time string: "12:15"
 * @param  {string} t2    a time string: "14:15"
 * @return {integer}      120
 */
function subtractTimes(t2, t1) {
  // get each time's hour and min values
  var [t1Hrs, t1Mins] = getHoursAndMinsFromTime(t1);
  var [t2Hrs, t2Mins] = getHoursAndMinsFromTime(t2);
  
  // time arithmetic (subtraction)
  if (t1Mins < t2Mins) {
    t1Hrs--;
    t1Mins += 60;
  }
  var mins = t1Mins - t2Mins;
  var hrs = t1Hrs - t2Hrs;
  
  // this handles scenarios where the startTime > endTime
  if (hrs < 0) {
    hrs += 24;
  }
  
  return (hrs * 60) + mins;
}

/**
 * Gets the hours and minutes as intergers from a time string
 * 
 * @param  {string} time    a time string: "12:15"
 * @return {array}          [12, 15]
 */
function getHoursAndMinsFromTime(time) {
  return time.split(':').map(function(str) {
    return parseInt(str);
  });
}

/**
 * Adds minutes to a time slot.
 *
 * @param  {interger} mins      number of mintues: 15
 * @param  {string}   time      a time slot: "12:15"
 * @return {string}             a time slot: "12:30"
 */
function addMinsToTime(mins, time) {
  // get the times hour and min value
  var [timeHrs, timeMins] = getHoursAndMinsFromTime(time);
  
  // time arithmetic (addition)
  if (timeMins + mins >= 60) {
    var addedHrs = parseInt((timeMins + mins) / 60);
    timeMins = (timeMins + mins) % 60
    if (timeHrs + addedHrs > 23) {
      timeHrs = (timeHrs + addedHrs) % 24;
    } else {
      timeHrs += addedHrs;
    }
  } else {
    timeMins += mins;
  }
  
  // make sure the time slots are padded correctly
  return String("00" + timeHrs).slice(-2) + ":" + String("00" + timeMins).slice(-2);
}


  const [selecttime, setselecttime] = useState(false);

  return (
    <>
    <div onClick={()=>console.log(timeslotreserved)}>2</div>
    
    <div onClick={()=>console.log(Post)}>1</div>
    
    <div onClick={()=>console.log([...dayoff1,...dayoff2]  )}>dayoff</div>
    
    <div onClick={()=>console.log(timeslot )}>all dayoff</div>
    
    <div onClick={()=>console.log(loadingcalendar )}>loadingcalendar</div>
    <Header/>
    <div>
      The user is <b>{loadingcalendar ? 'currently' : 'not'}</b> logged in.
    </div>
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
        
        // shouldDisableDate={shouldDisableDate}
        // excludeDates={[alldayoff,addDays(new Date(), 2)] }
        // excludeDates={[addDays(new Date(), 2)] }
        excludeDates={"02/28/2023"}
        displayStaticWrapperAs="desktop"
        openTo="day"
        // disablePast={true}
        disableHighlightToday={false}
        // disableOpenPicker={true}
        defaultCalendarMonth={false}
        maxDate={addDays(new Date(), 30)}
        // selected={value}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
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
