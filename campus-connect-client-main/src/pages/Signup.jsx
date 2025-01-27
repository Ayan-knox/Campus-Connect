import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearError } from '../redux/features/authSlice';
import "../style/auth.scss";
import signUpImage from "../assets/loginSignupImage.png";
import StudentSignup from '../components/signup/StudentSignup';
import FacultySignup from '../components/signup/FacultySignup';

const Signup = () => {
  const dispatch = useDispatch();

  // Get the "logo" from the state 
  const logo = useSelector((state) => state.imgTracker.logo);

  // Local state to manage the user type (student or Faculty)
  const [userType, setUserType] = useState('student');

  // Function to handle user type {like switch} for rendering form 
  const handleUserTypeClick = (type) => {
    setUserType(type);
    
    // Clear existing errors when switching user form
    dispatch(clearError());
  };

  // Function to render the appropriate signup form based on user type
  const renderSignupForm = () => {
    
    // Render the appropriate signup form component based on the user type
    switch (userType) {
      case 'student':
        return <StudentSignup />;
      case 'faculty':
        return <FacultySignup />;
      default:
        return null;
    }
  };

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
            <p>Are you a</p>
            <div className="switch-user">
              {/* Switch between student and Faculty user types */}
              <div className={`student ${userType === 'student' ? 'active' : ''}`} onClick={() => handleUserTypeClick('student')}>
                Student
              </div>
              <div className={`faculty ${userType === 'faculty' ? 'active' : ''}`} onClick={() => handleUserTypeClick('faculty')}>
                Faculty
              </div>
            </div>

            {/* Render the appropriate signup form based on user type */}
            {renderSignupForm()}

            <div className="switch">
              {/* Link to the login page with the option to clear errors on click */}
              <p>Already have an account?&nbsp;&nbsp;<NavLink to="/user/login" onClick={() => { dispatch(clearError()); }} >Login</NavLink></p>
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

export default Signup;
