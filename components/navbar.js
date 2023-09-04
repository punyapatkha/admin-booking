import { useSession, signIn, signOut } from "next-auth/react"
import { Fragment, useState ,useEffect } from 'react'
import Image from 'next/image';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { Ring } from "react-awesome-spinners";
import speakeasy from 'speakeasy';
import { totp } from 'otplib';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Menu from '@mui/material/Menu';
// import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useRouter } from 'next/navigation';
import Avatar from '@mui/material/Avatar';
import { authenticator } from '@otplib/preset-default';

function Navbar() {
    const pages = ['Create', 'Checks','bookdate','checking','checkdate'];
    const router = useRouter()
    const handleclick = (test) => {
      router.push(test)
      console.log('Button clicked!');
    }
    const { data: session, status } = useSession();
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseNavMenu = (href) => {
      router.push(href)
      setAnchorElNav(null);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

  // Check if we're on the client side before rendering the button
  // typeof window !== 'undefined' ไม่มีผล?
  if (typeof window !== 'undefined' & status === "authenticated") {
    return (
        <Box sx={{ flexGrow: 1 }}>
    

     <AppBar position="static">
      
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            QCUT
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => handleclick(page) }>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            QCUT
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleclick(page)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip>
            {session 
      ? <Button onClick={() => signOut()} color="inherit">Sign out</Button>
      : <Button onClick={() => signIn()} color="inherit">Sign in</Button>}
            </Tooltip>
            
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    {/* <AppBar position="static">
    <Toolbar>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
      >
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        QCut Portal
      </Typography>

      {session 
      ? <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
      session {session.user.avatar}
    </Typography>
      : <></>} 

      {session 
      ? <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
      session {session.user.access_token}
    </Typography>
      : <></>}
      
      {session 
      ? <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
      QCut Portal
    </Typography>
      : <></>}

      {session 
      ? <Button onClick={() => signOut()} color="inherit">Sign out</Button>
      : <Button onClick={() => signIn()} color="inherit">Sign in</Button>}
    </Toolbar>
  </AppBar> */}
</Box>
    );
  }
  
  return null; // Return null during server-side rendering
}

export default Navbar;