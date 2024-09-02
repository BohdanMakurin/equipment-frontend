import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Main from './pages/main';
import Header from './components/header';
import { IRootState } from './store';
import { useSelector } from 'react-redux';
import Profile from './pages/profile';
import Home from './pages/home';
import Companies from './pages/companies';
import Footer from './components/footer';
import Users from './pages/users/users';
import Equipment from './pages/equipment/equipment';

function App() {

  const isLoggedIn = useSelector(
    (state: IRootState) => !!state.auth.authData.accessToken
  );

  return (
    <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path='/home' element={isLoggedIn ? <Home /> : <Navigate to="/" />}/>
        <Route path='/profile' element={isLoggedIn ? <Profile /> : <Navigate to="/" />}/>
        <Route path='/companies' element={isLoggedIn ? <Companies /> : <Navigate to="/" />}/>
        <Route path='/workers' element={isLoggedIn ? <Users /> : <Navigate to="/" />}/>
        <Route path='/equipment' element={isLoggedIn ? <Equipment /> : <Navigate to="/" />}/>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
