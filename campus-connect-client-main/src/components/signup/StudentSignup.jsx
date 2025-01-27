import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { togglePasswordVisibility } from '../../redux/features/imgTrackerSlice';
import { clearError, signup, updateUser } from '../../redux/features/authSlice';
import Otp from './Otp';

const StudentSignup = () => {
    const dispatch = useDispatch();

    // Local state to store track form submission status & form data 
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        type: 'student',
        studentId: '',
        name: '',
        dept: "",
        emailPrefix: '',
        password: '',
    });

    // Retrieve error message and user token from the Redux state
    const msg = useSelector((state) => state.auth.error);
    const token = useSelector((state) => state.auth.user.token);

    // Retrieve passVisibility object from the Redux state
    const passVisibility = useSelector((state) => state.imgTracker.passVisibility);

    // function to change the visibility or input type of the password input tag
    const handleTogglePasswordVisibility = () => {
        dispatch(togglePasswordVisibility());
    };

    // Handle input changes in the form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleFormSubmit = (e) => {
        e.preventDefault();

        // Reset form data
        setFormData({
            type: 'student',
            studentId: '',
            name: '',
            dept: "",
            emailPrefix: '',
            password: '',
        });

        // Clear any existing errors
        dispatch(clearError());

        // Update user data and initiate signup process
        dispatch(updateUser(formData));
        dispatch(signup(formData));

        // Set form submission status to true
        setFormSubmitted(true);
    };

    return (
        <>
            {/* If form submitted and token exists, display Otp component */}
            {(formSubmitted && token) ? (
                <Otp />
            ) : (
                // Render the signup form
                <form onSubmit={handleFormSubmit}>
                    <div className="first-input-field input-field ">
                        <div>
                            <label htmlFor="studentId">Student ID</label>
                            <input
                                type="number"
                                id="studentId"
                                name="studentId"
                                value={formData.studentId}
                                placeholder="Enter your Student ID"
                                min="0"
                                pattern="[0-9]*"
                                inputMode="numeric"
                                style={{ appearance: 'textField' }}
                                onWheel={(e) => e.preventDefault()}
                                onKeyDown={(e) => {
                                    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                                        e.preventDefault();
                                    }
                                }}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="dept">Department</label>
                            <input
                                type="text"
                                id="dept"
                                name="dept"
                                value={formData.dept}
                                onChange={handleInputChange}
                                placeholder="eg: CSE"
                                maxLength={3}
                                required
                            />
                        </div>
                    </div>

                    <div className="input-field">
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Enter your Full Name"
                            required
                        />
                    </div>

                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <div className="email">
                            <input
                                type="text"
                                id="emailPrefix"
                                name="emailPrefix"
                                value={formData.emailPrefix}
                                onChange={handleInputChange}
                                placeholder="Enter your Email"
                                required
                            />
                            <span>@students.vnit.ac.in</span>
                        </div>
                    </div>

                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <div className="viewChanger" onClick={handleTogglePasswordVisibility}>
                            <img src={passVisibility.eye} alt="" />
                            <span>&nbsp; {passVisibility.title}</span>
                        </div>
                        <input
                            type={passVisibility.type}
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Enter your Password"
                            required
                        />
                    </div>
                    <div className="submit-button">
                        <button className="button" type="submit">
                            Sign-Up
                        </button>
                        <p>{msg}</p>
                    </div>
                </form>
            )}
        </>
    );
};

export default StudentSignup;
