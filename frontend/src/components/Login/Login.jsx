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
      <Box sx={{ width: '350px' }}>
        <Typography variant='h4' marginBottom={'1em'}>
          Login
        </Typography>
        <Stack>
          <FormControl sx={{ marginBottom: '1em' }}>
            <InputLabel htmlFor='email'>Email</InputLabel>
            <Input id='email' />
          </FormControl>
          <FormControl sx={{ marginBottom: '1em' }}>
            <InputLabel htmlFor='password'>Password</InputLabel>
            <Input id='password' />
          </FormControl>
          <FormHelperText>
            Not Registered Yet? <Link to='/'>Please Register</Link>
          </FormHelperText>
          <ButtonGroup sx={{ display: 'flex', gap: '1em' }}>
            <Button variant='contained' color='primary' fullWidth>
              Login
            </Button>
          </ButtonGroup>
        </Stack>
      </Box>
    </Box>
  );
};

export default Login;
