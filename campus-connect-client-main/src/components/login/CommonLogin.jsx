import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { togglePasswordVisibility } from '../../redux/features/imgTrackerSlice';
import { clearError, login } from '../../redux/features/authSlice';
import { useNavigate } from 'react-router-dom';

const CommonLogin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Local state to store form data
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    // Retrieve user status and password visibility settings from Redux state
    const status = useSelector((state) => state.auth.user.status);
    const passVisibility = useSelector((state) => state.imgTracker.passVisibility);


      

    // Toggle password visibility function
    const handleTogglePasswordVisibility = () => {
        dispatch(togglePasswordVisibility());
    };

    // Handle input changes in the form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleFormSubmit = (e) => {
        e.preventDefault();
        
        // Reset form data
        setFormData({
            email: '',
            password: '',
        });

        // Trigger login action and clear any existing errors
        dispatch(login(formData));
        dispatch(clearError());
    };

    useEffect(() => {
        if(status === "success"){
            navigate("/chat");
        }
    }, [status])

    return (
        <>
            {/* Login form */}
            <form onSubmit={handleFormSubmit}>
                <div className="input-field">
                    <label htmlFor="email">Email Id</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your Email"
                    />
                </div>

                <div className="input-field">
                    <label htmlFor="password">Password</label>
                    <div className="viewChanger" onClick={() => { handleTogglePasswordVisibility() }}>
                        <img src={passVisibility.eye} alt="" />
                        <span>&nbsp; {passVisibility.title}</span>
                    </div>
                    <input
                        type={passVisibility.type}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your Password"
                    />
                </div>
                <div className="submit-button">
                    <button className='button' type="submit">Login</button>
                </div>
            </form>

            {/* Display user status message */}
            <p style={{ fontSize: '2rem', textAlign: 'center' }}>{status}</p>
        </>
    );
}

export default CommonLogin;
