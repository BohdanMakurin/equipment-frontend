import React, { useEffect, useState } from "react";
import Login from "./components/login";
import { useSelector } from "react-redux";
import { IRootState, useAppDispatch } from "../../store";
import { logoutUser } from "../../store/auth/actionCreators";
import Home from "../home/home";

const Main = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useSelector(
    (state: IRootState) => !!state.auth.authData.accessToken
  );

  const renderProfile = () => (
    <div>
      <div>Вы успешно авторизовались</div>
      <button onClick={() => dispatch(logoutUser())}>Logout</button>
    </div>
  );

  return (
    <div>
      {isLoggedIn ? <Home /> : <Login />}
    </div>
  );
};

export default Main;