// src/components/RegisterForm.tsx
import React, { FormEvent } from 'react';
import { Button, TextField, Box } from '@mui/material';

interface RegisterFormProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  onFirstNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onLastNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent) => void;
  onSwitchToLogin: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  firstName,
  lastName,
  email,
  password,
  onFirstNameChange,
  onLastNameChange,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  onSwitchToLogin,
}) => {
  return (
    <Box component="form" onSubmit={onSubmit}>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="First Name"
        value={firstName}
        onChange={onFirstNameChange}
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
        label="Last Name"
        value={lastName}
        onChange={onLastNameChange}
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
        fullWidth
        variant="outlined"
        sx={{
          mt: 2,
          mb: 2,
          color: "white",
          borderColor: "white",
          '&:hover': {
            borderColor: '#FFAA00',
          },
        }}
        onClick={onSwitchToLogin}
      >
        Login
      </Button>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{
          backgroundColor: "#FFAA00",
          color: "black",
          borderColor: "white",
          '&:hover': {
            backgroundColor: "#FF8800",
          },
        }}
      >
        Register
      </Button>
    </Box>
  );
};

export default RegisterForm;