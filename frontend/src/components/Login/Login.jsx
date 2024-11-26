import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import axios from "axios";
import bg from "../../assets/bg.png";
import instance from "../../axios";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import {
  Alert,
  Button,
  ButtonGroup,
  CircularProgress,
  FormControl,
  FormHelperText,
  FormLabel,
  InputLabel,
  Stack,
  Typography,
} from '@mui/material';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const Login = () => {
  let [message, setMessage] = useState('');
  let [severity, setSeverity] = useState('');
  let [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  let [open, setOpen] = useState(false);
  let [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
  
    setOpen(false);
  };
  

  



  const handleForm = (e) => {
    e.preventDefault();
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const login=async ()=>{
    setLoading(true)
    try {
      let response=await axios.post(`${instance.defaults.baseURL}/user/login`,formData)
      localStorage.setItem('user',JSON.stringify(response.data.user))
      setMessage("Login Successful")
      setSeverity("success")
      setOpen(true)
      setTimeout(()=>{
        // navigate('/dashboard')
        window.location.href='/dashboard'
      },1000)
    } catch (error) {
      setMessage(error.response.data.message)
      setSeverity('error')
      setOpen(true)
    }finally{
      setLoading(false)
    }
  }
  return (
    <Box
      sx={{
        width: '100%',
        padding: '2em 5em',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'end',
        height: '100vh',
        position:'relative',
        background: `url(${bg}) no-repeat center left 20%/600px 700px`,
      }}
    >
    <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Login Successful"

      >
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }} variant="filled">
      {message }
      </Alert>
      </Snackbar>
    <Typography variant='h3' sx={{position:'absolute',left:'10%',top:'150px',fontWeight:'bolder'}}>Welcome to Personal Budget Tracker</Typography>

      <Box sx={{ width: '350px' }}>
        <Typography variant='h4' marginBottom={'1em'}>
          Login
        </Typography>
        <Stack>
          <FormControl sx={{ marginBottom: '1em' }}>
            <InputLabel htmlFor='email'>Email</InputLabel>
            <Input id='email' value={formData.email} onChange={handleForm} name='email' />
          </FormControl>
          <FormControl sx={{ marginBottom: '1em' }}>
            <InputLabel htmlFor='password'>Password</InputLabel>
            <Input id='password' value={formData.password} onChange={handleForm} name='password' type="password" />
          </FormControl>
          <FormHelperText>
            Not Registered Yet? <Link to='/'>Please Register</Link>
          </FormHelperText>
          <ButtonGroup sx={{ display: 'flex', gap: '1em' }}>
            <Button variant='contained' color='primary' fullWidth onClick={login}>
              {loading ? <CircularProgress color="white"/> : 'Login'}
            </Button>
          </ButtonGroup>
        </Stack>
      </Box>
    </Box>
  );
};

export default Login;
