import '@/styles/globals.css'

import { ThemeProvider, createTheme } from '@mui/material/styles';
import {red,green,lime,blue,grey,deepOrange,amber} from '@mui/material/colors';

import { SessionProvider } from "next-auth/react"
const theme = createTheme({
  palette: {
    mode: 'dark',
  }
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={theme}>

      <Component {...pageProps} />  
</ThemeProvider>
    </SessionProvider>
  )
}
