import React, { useEffect, useState } from "react";
import { getProfile, logoutUser } from "../../store/auth/actionCreators";
import { IRootState, useAppDispatch } from "../../store";
import { getEmailFromToken } from "../../utils/jwt";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  // const [email] = useState(dispatch(getEmailFromToken))
  // email !== null ? dispatch(getProfile(email)): console.log("email==null")
  
  // const profile = useSelector(
  //   (state: IRootState) => state.auth.profileData.profile
  // );
  // const email = dispatch(getEmailFromToken)
  
  const profile = useSelector(
    (state: IRootState) => state.auth.profileData.profile
  );
  
  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={() => dispatch(logoutUser())}>Logout</button>
      <h2>{profile !== null ? <span>email: {profile.email}</span>  : "Loading..."}</h2>
    </div>
  );
};

export default Dashboard;
