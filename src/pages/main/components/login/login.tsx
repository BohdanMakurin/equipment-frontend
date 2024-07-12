import React, { FormEvent, useState } from "react";
import { useAppDispatch } from "../../../../store";
import { getProfile, loginUser, registerUser } from "../../../../store/auth/actionCreators";

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
    
    dispatch(registerUser({ firstName, lastName, email, password}));
    
  };

  // const renderRegister = () => (
  //   <div>
  //     <div>Вы успешно авторизовались</div>
  //     {/* <button onClick={() => dispatch(logoutUser())}>Logout</button> */}
  //   </div>
  // );
  return (
    <div>
      {isLogin ?  
        <div>
          <form onSubmit={loginSubmit}>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                name="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button>Submit</button>
          </form>
          <button onClick={() => setIsLogin(false)}>Register</button>
        </div> 
      : 
        <div>
          <form onSubmit={registerSubmit}>
          <div>
              <label htmlFor="firstName">First Name:</label>
              <input
                name="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="lastName">Last Name:</label>
              <input
                name="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                name="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button>Submit</button>
          </form>
          <button onClick={() => setIsLogin(true)}>Login</button>
        </div> 
      }
    </div>
  );
};

export default Login;