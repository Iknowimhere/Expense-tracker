import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Input from "@mui/material/Input";
import Snackbar from "@mui/material/Snackbar";
import axios from "axios";
import bg from "../../assets/bg.png";
import instance from "../../axios";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import {
  Button,
  ButtonGroup,
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

const Register = () => {
  let [message, setMessage] = useState('');
  let [severity, setSeverity] = useState('');
  let [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  let [open, setOpen] = useState(false);
  let [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
  };

  const handleForm = (e) => {
    e.preventDefault();
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFile = (target) => {
    let value = target.files[0];
    setFormData({ ...formData, photo: value });
  };
  
  

  const register = async () => {
    try {
      setLoading(true);
      let response = await axios.post(
        `${instance.defaults.baseURL}/user/register`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setMessage("Registration Successful");
      setSeverity("success");
      setOpen(true);
      setTimeout(() => {
        window.location.href = '/dashboard';
        // navigate('/dashboard');
      }, 1000);
    } catch (error) {
      setMessage(error.response.data.message);
      setSeverity("error");
      setOpen(true);
    } finally {
      setLoading(false);
    }
  };




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
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
    <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }} variant="filled">{message}</Alert>
    </Snackbar>
      <Typography variant='h3' sx={{position:'absolute',left:'10%',top:'150px',fontWeight:'bolder'}}>Welcome to Personal Budget Tracker</Typography>
      <Box sx={{ width: '350px' }}>
        <Typography variant='h4' marginBottom={'1em'}>
          Register
        </Typography>
        <Stack>
          <FormControl sx={{ marginBottom: '1em' }}>
            <InputLabel htmlFor='username'>Username</InputLabel>
            <Input
              id='username'
              value={formData.username}
              onChange={handleForm}
              name='username'
            />
          </FormControl>
          <FormControl sx={{ marginBottom: '1em' }}>
            <InputLabel htmlFor='email'>Email</InputLabel>
            <Input
              id='email'
              value={formData.email}
              onChange={handleForm}
              name='email'
            />
          </FormControl>
          <FormControl sx={{ marginBottom: '1em' }}>
            <InputLabel htmlFor='password'>Password</InputLabel>
            <Input
              id='password'
              value={formData.password}
              onChange={handleForm}
              name='password'
              type="password"
            />
          </FormControl>
          <FormControl sx={{ marginBottom: '1em' }}>
            <InputLabel htmlFor='confirmPassword'>Confirm password</InputLabel>
            <Input
              id='confirmPassword'
              value={formData.confirmPassword}
              onChange={handleForm}
              name='confirmPassword'
              type="password"
            />
          </FormControl>
          <Button
            component='label'
            role={undefined}
            variant='contained'
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            sx={{ marginBottom: '1em' }}
          >
            Upload Profile Picture
            <VisuallyHiddenInput
              type='file'
              onChange={(event) => handleFile(event.target)}
              multiple
            />
          </Button>
          <FormHelperText>
            Alredy Registered?<Link to='/login'> Please Login</Link>
          </FormHelperText>
          <ButtonGroup sx={{ display: 'flex', gap: '1em' }}>
            <Button
              variant='contained'
              color='primary'
              fullWidth
              onClick={register}
            >
              {loading?<CircularProgress color="white"/>:"Signup"}
            </Button>
          </ButtonGroup>
        </Stack>
      </Box>
    </Box>
  );
};

export default Register;
