
import styles from '@/styles/Home.module.css'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
export default function Header() {
    
    return (<div>
      {/* shadow-lg shadow-blue-300
      remove these 2 because it doesn't fit dark theme safari
      */}
    < div class="p-3 bg-gradient-to-r from-blue-500 to-cyan-500  text-white "><Link href="/">Barber Booking</Link>
    </div>
     {/* <ul>
     <li>
       <Link href="/">(☒debug) Home</Link>
     </li>
     <li>
       <Link href="/checking">(☒debug) checking</Link>
     </li>
     <li>
       <Link href="/bookdate">(☒debug) booking</Link>
     </li>
   </ul> */}
   </div>
)
}