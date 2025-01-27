import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { otpVerification, signup } from '../../redux/features/authSlice';
import { useNavigate } from 'react-router-dom';

const Otp = () => {

  const otpBoxReference = useRef([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let token = useSelector((state) => state.auth.user.token);
  let type = useSelector((state) => state.auth.user.type);
  let formData = useSelector((state) => state.auth.user);
  const [otpArray, setOtp] = useState(new Array(6).fill(''));

  const status = useSelector((state) => state.auth.user.status);


  const resendOtp = () => {
    dispatch(signup(formData));
  }

  useEffect(() => {
    console.log(status);
    if (status === "success") {
      navigate("/user/login");
    }
  }, [status])


  const handleChange = (value, index) => {
    let newArr = [...otpArray];
    newArr[index] = value;

    setOtp(newArr);

    if (value && index < otpArray.length - 1) {
      otpBoxReference.current[index + 1].focus();
    }
  };


  const handleBackspaceAndEnter = (e, index) => {
    if (e.key === 'Backspace' && !e.target.value && index > 0) {
      otpBoxReference.current[index - 1].focus();
    }
    if (e.key === 'Enter' && e.target.value && index < otpArray.length - 1) {
      otpBoxReference.current[index + 1].focus();
    }
    if (e.key === 'ArrowRight' && index < otpArray.length - 1) {
      otpBoxReference.current[index + 1].focus();
    }
    if (e.key === 'ArrowLeft' && index > 0) {
      otpBoxReference.current[index - 1].focus();
    }
  };

  const handleOtpSubmit = (e) => {
    let otp = otpArray.join('');
    e.preventDefault();
    dispatch(otpVerification({ token, otp, type }));
  };

  return (
    <div className="otp-container">
      <h2>Verify</h2>
      <p>Your code has been sent to your email.</p>
      <form onSubmit={handleOtpSubmit}>
        <div className="otp-input-container">
          {otpArray.map((digit, index) => (

            <input
              key={index}
              value={digit}
              maxLength={1}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyUp={(e) => handleBackspaceAndEnter(e, index)}
              ref={(reference) => (otpBoxReference.current[index] = reference)}
              className='opt-input'
            />

          ))}
        </div>
        <button className='otp-button' type="submit">Submit OTP</button>
        <button className='otp-button' onClick={() => resendOtp()}>Resend OTP</button>
        <p>{status}</p>
      </form>
    </div>
  );
};

export default Otp;
