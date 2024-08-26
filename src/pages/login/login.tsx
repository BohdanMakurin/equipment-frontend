// src/pages/main/components/login/Login.tsx
import React, { FormEvent, useState } from 'react';
import cover from '../../img/login.png';
import {
  Box,
  Container,
  Typography,
  Paper
} from '@mui/material';
import LoginForm from '../../components/loginForm/loginForm';
import RegisterForm from '../../components/registerForm/registerForm';
import { useAppDispatch } from '../../store';
import { loginUser, registerUser } from '../../store/auth/actionCreators';

const Login = () => {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const loginSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  const registerSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(registerUser({ firstName, lastName, email, password }));
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `url(${cover})`,
        backgroundSize: "cover",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container maxWidth="xs">
        <Paper elevation={6} sx={{ padding: 4, backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
          <Typography variant="h3" component="h1" align="center" color="white" gutterBottom>
            Welcome to Eq
          </Typography>
          {isLogin ? (
            <LoginForm
              email={email}
              password={password}
              onEmailChange={(e) => setEmail(e.target.value)}
              onPasswordChange={(e) => setPassword(e.target.value)}
              onSubmit={loginSubmit}
              onSwitchToRegister={() => setIsLogin(false)}
            />
          ) : (
            <RegisterForm
              firstName={firstName}
              lastName={lastName}
              email={email}
              password={password}
              onFirstNameChange={(e) => setFirstName(e.target.value)}
              onLastNameChange={(e) => setLastName(e.target.value)}
              onEmailChange={(e) => setEmail(e.target.value)}
              onPasswordChange={(e) => setPassword(e.target.value)}
              onSubmit={registerSubmit}
              onSwitchToLogin={() => setIsLogin(true)}
            />
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;