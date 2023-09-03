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

import axios from '../axios.config';

import Link from 'next/link'
import { Fragment, useState ,useEffect } from 'react'


const inter = Inter({ subsets: ['latin'] })


import { useRouter } from 'next/router'

export default function Post () {
  const router = useRouter()
  // const { pid } = router.query

  return (<>
  <p>this is failed: 
    {/* {pid} */}
  </p>
  <Link
  href={{
    pathname: '/bookdate',
      }}
>
bookdate2
</Link>
  </>)
}