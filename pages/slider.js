import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
// import styles from '@/styles/Home.module.css'

// import styles from '@/styles/Slider.module.css'

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

import axios from '../axios.config';

import Link from 'next/link'
import { Fragment, useState ,useEffect } from 'react'


const inter = Inter({ subsets: ['latin'] })


import { useRouter } from 'next/router'

import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react' // import from 'keen-slider/react.es' for to get an ES module

function Arrow(props) {
  const disabeld = props.disabled ? " arrow--disabled" : ""
  return (
    <svg
      onClick={props.onClick}
      className={`arrow ${
        props.left ? "arrow--left" : "arrow--right"
      } ${disabeld}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!props.left && (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </svg>
  )
}

export default function Post () {
  const [sliderRef, instanceRef] = useKeenSlider(
    {
      initial: 0,
      slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
      mode: "free-snap",
      slides: {
        perView: 3,
        spacing: 15,
      },
      created() {
        setLoaded(true)
      },
    },
    [
      // add plugins here
    ]
  )

  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [sliderRef2, instanceRef2] = useKeenSlider({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
  })
    const [sliderRef3] = useKeenSlider({
    mode: "free-snap",
    slides: {
      origin: "center",
      perView: 2,
      // perView: "auto",
      spacing: 15,
      
    },
  })
  return (<>
<div class="h-screen w-screen">
    <Navbar></Navbar>
 {/* front = more z 
     back = more negative z*/}
 {/* <div className="absolute z-30 text-white"> test</div> */}
 
 {/* for blur */}
 <div className='absolute z-10 text-white h-1/3' id="inside"></div>
<div ref={sliderRef3} className="keen-slider h-1/3" >
      <div className="keen-slider__slide number-slide2" style={{ maxWidth: 250, minWidth: 150 }}>
    
<div class="flex flex-col bg-white h-full w-full " >
  <div className="bg-[#FF0000]">01</div>
  <div  className="bg-[#0000FF]">02</div>
  <div>03</div></div></div>
      
      <div className="keen-slider__slide number-slide2" style={{ maxWidth: 150, minWidth: 150 }}>3</div>
      <div className="keen-slider__slide number-slide3">3</div>
      <div className="keen-slider__slide number-slide3">4</div>
    </div>
</div>
{loaded && instanceRef.current && (
          <>
            <Arrow
              left
              onClick={(e) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
              disabled={currentSlide === 0}
            />

            <Arrow
              onClick={(e) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
              disabled={
                currentSlide ===
                instanceRef.current.track.details.slides.length - 1
              }
            />
          </>
        )}
 
 <div ref={sliderRef3} className="keen-slider">
      <div className="keen-slider__slide number-slide1">1</div>
      <div className="keen-slider__slide number-slide2">2</div>
      {/* <div className="keen-slider__slide number-slide3">3</div>
      <div className="keen-slider__slide number-slide4">4</div>
      <div className="keen-slider__slide number-slide5">5</div>
      <div className="keen-slider__slide number-slide6">6</div> */}
    </div>
  </>)
}