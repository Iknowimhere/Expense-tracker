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
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import bg from '../../assets/bg.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

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
  let [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  let [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  let navigate = useNavigate();

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
      console.log(formData);

      setLoading(true);
      let response = await axios.post(
        'http://localhost:5000/api/user/register',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log(response);
      setOpen(true);
      navigate('/dashboard');
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
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
        background: `url(${bg}) no-repeat center left 20%/600px 700px`,
      }}
    >
      {/* <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity='success'
          variant='filled'
          sx={{ width: '100%' }}
        >
          Registration successfull
        </Alert>
      </Snackbar> */}
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
            />
          </FormControl>
          <FormControl sx={{ marginBottom: '1em' }}>
            <InputLabel htmlFor='confirmPassword'>Confirm password</InputLabel>
            <Input
              id='confirmPassword'
              value={formData.confirmPassword}
              onChange={handleForm}
              name='confirmPassword'
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
              Signup
            </Button>
          </ButtonGroup>
        </Stack>
      </Box>
    </Box>
  );
};

export default Register;
