import {
  Alert,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { useMemo, useState } from 'react';
import { useForm } from '../hooks/useForm';
import { useNavigate } from 'react-router-dom';
import { useAuthSotre } from '../store/auth-store';

const formValidations = {
  email: [(value) => value.length > 1, 'This field is required'],
  pass: [(value) => value.length > 1, 'This field is required'],
};
const formData = {
  email: '',
  pass: '',
};
export const SignIn = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { email, pass, onInputChange, emailValid, passValid, formState } =
    useForm(formData, formValidations);
  const {status,
    errorMessage,
    login,
  } = useAuthSotre((state) => state)

  const isChecking = useMemo(() => status === 'checking', [status]);
  const nav = useNavigate();

  const onSubmit =  (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    const user = {
      email: formState.email,
      pass: formState.pass,
    };
    login(user)
    nav('VentilationProjectManager/home');
  };
  return (
    <form onSubmit={onSubmit}>
      <Container
        fixed
        sx={{
          width: 600,
          border: 'solid',
          borderRadius: 2,
          borderWidth: 2,
          backgroundColor: 'white',
          marginTop: 25,
        }}
      >
        <Typography
          variant='h1'
          sx={{ fontSize: 20, textAlign: 'center', marginTop: 2 }}
        >
          WELCOME TO VENTILATION PROJECT MANAGER
        </Typography>
        <Grid
          container
          sx={{
            marginTop: 3,
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Grid item sx={{ width: 350, padding: 1 }}>
            <TextField
              label='Email'
              type='text'
              placeholder='Email'
              fullWidth
              name='email'
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmitted}
              helperText={emailValid}
            />
          </Grid>
          <Grid item sx={{ width: 350, padding: 1 }}>
            <TextField
              label='Password'
              type='password'
              placeholder='Password'
              fullWidth
              name='pass'
              value={pass}
              onChange={onInputChange}
              error={!!passValid && formSubmitted}
              helperText={passValid}
            />
          </Grid>
        </Grid>
        <Grid
          container
          display={!!errorMessage ? '' : 'none'}
          sx={{ mt: 1, justifyContent: 'center' }}
        >
          <Grid item xs={6}>
            <Alert severity='error'>{errorMessage}</Alert>
          </Grid>
        </Grid>
        <Grid
          container
          sx={{ justifyContent: 'center', marginTop: 1, marginBottom: 3 }}
        >
          <Grid item>
            <Button
              disabled={isChecking}
              type='submit'
              variant='contained'
              sx={{ width: 200 }}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </Container>
    </form>
  );
};
