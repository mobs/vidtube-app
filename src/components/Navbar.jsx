import { useEffect, useState } from 'react';
import { Box, Button, Modal, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { themeActions } from '../store/theme'
import { useSelector, useDispatch } from 'react-redux';
import { signInWithPopup } from 'firebase/auth';
import { addDoc, collection} from '@firebase/firestore'


import { auth, authProvider,db } from '../Firebase'
import SearchBar from './SearchBar';
import logo from '../utils/kindpng_114834.png'

const Navbar = () => {
  const nonThemeColor = useSelector( state => state.nonThemeColor)
  const [userLoggedIn, setUserLoggedIn] = useState(true);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPic, setUserPic] = useState('');

  const [open,setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  
  const userCollectionRef = collection(db,"userData");

  const signInWithGoogle = () => {
    signInWithPopup(auth, authProvider)
      .then((data) => {
          setUserLoggedIn(!userLoggedIn)
          console.log(data.user);
          
          setUserName(data.user.displayName);
          setUserEmail(data.user.email);
          setUserPic(data.user.photoURL);
          // console.log(userName);
      })
      .catch((error) => console.log(error))
  }

  const signOut = () => {
    setOpen(false);
    addDoc(userCollectionRef,{
      name: userName,
      email: userEmail,
      pic: userPic
    })
    setUserLoggedIn(!userLoggedIn)
  }

  const mode = useSelector(state => state.mode);
  const bgColor = useSelector(state => state.theme.backgroundColor);

    const dispatch = useDispatch();

    function handleModeChange() {
      const lightModeBtn = document.getElementById("lightModeBtn")
      const darkModeBtn = document.getElementById("darkModeBtn")
      if (mode === 'light') {
          lightModeBtn.style.display = "none";
          darkModeBtn.style.display = "block";
          darkModeBtn.style.color = "black";
      }
      else {
          lightModeBtn.style.display = "block";
          darkModeBtn.style.display = "none";
          lightModeBtn.style.color = "white";
      }
      dispatch(themeActions.toggleMode());
    }
    let systemTheme='light';
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        systemTheme='dark';
    }
    useEffect(() => {
      if (systemTheme==='dark') {
          handleModeChange();
      }
    }, [systemTheme]);

  return (
    <Stack 
      direction="row" 
      alignItems="center" 
      p={2} 
      sx={{ position: 'sticky', background:bgColor, top:0, justifyContent:'space-between'}} 
    >
      <Link to='/' style={{ display:'flex',
      alignItems:'center'}}>
      <img src={logo} alt='logo' height={45} />
      </Link>
      <SearchBar />
      <div style={{ backgroundColor:'#ff4040', width:'5rem', height:'2rem', borderRadius:'1rem', display:'flex', alignItems:'center', justifyContent:'space-evenly', cursor:'pointer'}} onClick={handleModeChange}>
        <div style={{ marginLeft:'0.5rem', marginRight:'auto',color: "white"}} id="lightModeBtn" ><LightModeIcon /></div>
        <div style={{ marginLeft:'auto', marginRight:'0.5rem', display: "none" }} id="darkModeBtn" ><DarkModeIcon /></div>
      </div>
      {userLoggedIn ? 
        <Button variant='contained' onClick={signInWithGoogle} sx={{ background: '#ff4040', cursor:'pointer', '&:hover': { backgroundColor:'#ff4040' } }}> LogIn</Button>
        : 
        <Button onClick={handleOpen}> 
          <img src={userPic} alt='pic' height={45} style={{ borderRadius:'5rem'}} />
        </Button> 
      }
      <Modal open={open}>
        <Box style={{ position: 'absolute',
          top: '15%',
          left: '100%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: nonThemeColor,
          boxShadow: 24,
          color:nonThemeColor,
          p: 4
        }}>
          <Typography>
            {userName} <br/>
            {userEmail}
          </Typography>
          <Button onClick={signOut} variant='contained' sx={{ background: '#ff4040', cursor:'pointer', '&:hover': { backgroundColor:'#ff4040' } }}> Logout </Button>
        </Box>
        
      </Modal>
      
    </Stack>
  )
}

export default Navbar