// src/components/LoginForm.tsx
import React, { FormEvent } from 'react';
import { Button, TextField, Box } from '@mui/material';

interface LoginFormProps {
  email: string;
  password: string;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent) => void;
  onSwitchToRegister: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  onSwitchToRegister,
}) => {
  return (
    <Box component="form" onSubmit={onSubmit}>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Email"
        value={email}
        onChange={onEmailChange}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderColor: 'white',
            '& fieldset': {
              borderColor: 'white',
            },
            '&:hover fieldset': {
              borderColor: '#FFAA00',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#FFAA00',
            },
          },
          '& .MuiInputLabel-root': {
            color: 'white',
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#FFAA00',
          },
          '& .MuiInputBase-input': {
            color: 'white',
          },
          ////autofill css
          '& input:-webkit-autofill': {
            WebkitBoxShadow: '0 0 0 100px transparent inset !important', // Убирает тень вокруг инпута
            boxShadow: '0 0 0 100px transparent inset !important', // Убирает тень вокруг инпута
            WebkitTextFillColor: 'white !important', // Белый цвет текста при автозаполнении
            backgroundColor: 'transparent !important', // Убирает изменение фона
            WebkitTransition: 'color 9999s ease-out, background-color 9999s ease-out !important',
            WebkitTransitionDelay: '9999s !important',
          },
          '& input:-webkit-autofill:hover': {
            WebkitBoxShadow: '0 0 0 100px transparent inset !important',
            boxShadow: '0 0 0 100px transparent inset !important',
            WebkitTextFillColor: 'white !important',
            backgroundColor: 'transparent !important',
            WebkitTransition: 'color 9999s ease-out, background-color 9999s ease-out !important',
            WebkitTransitionDelay: '9999s !important',
          },
          '& input:-webkit-autofill:focus': {
            WebkitBoxShadow: '0 0 0 100px transparent inset !important',
            boxShadow: '0 0 0 100px transparent inset !important',
            WebkitTextFillColor: 'white !important',
            backgroundColor: 'transparent !important',
            WebkitTransition: 'color 9999s ease-out, background-color 9999s ease-out !important',
            WebkitTransitionDelay: '9999s !important',
          },
          '& input:-webkit-autofill:active': {
            WebkitBoxShadow: '0 0 0 100px transparent inset !important',
            boxShadow: '0 0 0 100px transparent inset !important',
            WebkitTextFillColor: 'white !important',
            backgroundColor: 'transparent !important',
            WebkitTransition: 'color 9999s ease-out, background-color 9999s ease-out !important',
            WebkitTransitionDelay: '9999s !important',
          },
        }}
        InputLabelProps={{ style: { color: 'white' } }}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Password"
        type="password"
        value={password}
        onChange={onPasswordChange}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderColor: 'white',
            '& fieldset': {
              borderColor: 'white',
            },
            '&:hover fieldset': {
              borderColor: '#FFAA00',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#FFAA00',
            },
          },
          '& .MuiInputLabel-root': {
            color: 'white',
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#FFAA00',
          },
          '& .MuiInputBase-input': {
            color: 'white',
          },
          ////autofill css
          '& input:-webkit-autofill': {
            WebkitBoxShadow: '0 0 0 100px transparent inset !important', // Убирает тень вокруг инпута
            boxShadow: '0 0 0 100px transparent inset !important', // Убирает тень вокруг инпута
            WebkitTextFillColor: 'white !important', // Белый цвет текста при автозаполнении
            backgroundColor: 'transparent !important', // Убирает изменение фона
            WebkitTransition: 'color 9999s ease-out, background-color 9999s ease-out !important',
            WebkitTransitionDelay: '9999s !important',
          },
          '& input:-webkit-autofill:hover': {
            WebkitBoxShadow: '0 0 0 100px transparent inset !important',
            boxShadow: '0 0 0 100px transparent inset !important',
            WebkitTextFillColor: 'white !important',
            backgroundColor: 'transparent !important',
            WebkitTransition: 'color 9999s ease-out, background-color 9999s ease-out !important',
            WebkitTransitionDelay: '9999s !important',
          },
          '& input:-webkit-autofill:focus': {
            WebkitBoxShadow: '0 0 0 100px transparent inset !important',
            boxShadow: '0 0 0 100px transparent inset !important',
            WebkitTextFillColor: 'white !important',
            backgroundColor: 'transparent !important',
            WebkitTransition: 'color 9999s ease-out, background-color 9999s ease-out !important',
            WebkitTransitionDelay: '9999s !important',
          },
          '& input:-webkit-autofill:active': {
            WebkitBoxShadow: '0 0 0 100px transparent inset !important',
            boxShadow: '0 0 0 100px transparent inset !important',
            WebkitTextFillColor: 'white !important',
            backgroundColor: 'transparent !important',
            WebkitTransition: 'color 9999s ease-out, background-color 9999s ease-out !important',
            WebkitTransitionDelay: '9999s !important',
          },
        }}
        InputLabelProps={{ style: { color: 'white' } }}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{
          mt: 2,
          mb: 2,
          backgroundColor: "#FFAA00",
          color: "black",
          borderColor: "white",
          '&:hover': {
            backgroundColor: "#FF8800",
          },
        }}
      >
        Login
      </Button>
      <Button
        fullWidth
        variant="outlined"
        sx={{
          color: "white",
          borderColor: "white",
          '&:hover': {
            borderColor: '#FFAA00',
          },
        }}
        onClick={onSwitchToRegister}
      >
        Register
      </Button>
    </Box>
  );
};

export default LoginForm;