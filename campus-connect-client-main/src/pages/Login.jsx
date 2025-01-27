import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, clearStatus } from '../redux/features/authSlice';
import "../style/auth.scss";
import signUpImage from "../assets/loginSignupImage.png";
import CommonLogin from '../components/login/CommonLogin';

const Login = () => {
  // Get the logo from the state 
  const logo = useSelector((state) => state.imgTracker.logo);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearStatus());
    dispatch(clearError());
  }, []);

  return (
    <>
      <div className="auth-container">
        <div className="left">
          <div className="logo">
            {/* Link to the home page with the app logo */}
            <NavLink to='/'>
              <img src={logo} alt="Logo" />
            </NavLink>
          </div>
          <div className="form-container">
            <h2>Welcome to Campus Connect App</h2>
            <p>Log in and explore it</p>

            <CommonLogin/>

            <div className="switch">
              {/* Link to the signup page */}
              <p>Do not have an account?&nbsp;&nbsp;&nbsp;<NavLink to="/user/signup">Sign-up</NavLink></p>
            </div>
          </div>
        </div>
        <div className="right">
          <img src={signUpImage} alt="Signup" />
        </div>
      </div>
    </>
  );
};

export default Login;
