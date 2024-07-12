import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IRootState, useAppDispatch } from "../../store";
import { getEmailFromToken } from "../../utils/jwt";
import { getProfile } from "../../store/auth/actionCreators";

const Header = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useSelector(
    (state: IRootState) => !!state.auth.authData.accessToken
  );
  const email = dispatch(getEmailFromToken)
  // email !== null ? dispatch(getProfile(email)): console.log("email==null")
  // dispatch(getProfile(email))
  useEffect(() => {
    if (email) {
      dispatch(getProfile(email));
    }
  }, [email, dispatch]);
  const profile = useSelector(
    (state: IRootState) => state.auth.profileData.profile
  );
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Main</Link>
        </li>
        {isLoggedIn && (
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <Link to="/profile">{profile !== null ? <div>{profile.firstName} {profile.lastName}</div>  : "Your profile"}</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Header;