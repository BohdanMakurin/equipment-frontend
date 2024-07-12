import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from './pages/dashboard';
import Main from './pages/main';
import Header from './components/header';
import { IRootState } from './store';
import { useSelector } from 'react-redux';
import Profile from './pages/profile';

function App() {

  const isLoggedIn = useSelector(
    (state: IRootState) => !!state.auth.authData.accessToken
  );

  return (
    <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path='/dashboard' element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />}/>
        <Route path='/profile' element={isLoggedIn ? <Profile /> : <Navigate to="/" />}/>
      </Routes>
    </Router>
  );
}

export default App;
