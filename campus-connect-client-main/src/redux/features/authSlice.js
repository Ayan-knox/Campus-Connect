import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// "POST Signup request" (function) to send the signup data of the user using createAsyncThunk
export const signup = createAsyncThunk('user/signup', async (formData) => {
    try {
        let type = formData.type;

        // "POST Signup request" using the switch 
        switch (type) {
            case 'student': {
                let { studentId, name, emailPrefix, dept, password } = formData;
                const res = await axios.post('http://localhost:3000/users/signup/student', { studentId, name, emailPrefix, dept, password })
                return res.data;
            }
            case 'faculty': {
                let { facultyId, name, emailPrefix, dept, password } = formData;
                const res = await axios.post('http://localhost:3000/users/signup/faculty', { facultyId, name, emailPrefix, dept, password });
                return res.data;
            }
            default:
                console.log('Error in Type');
                break;
        }
    } catch (error) {

        // "POST Signup request" -> error handling using the switch
        switch (error.response.status) {
            case 409:
                console.log(`This is the message: ${error.response.data.message}`)
                throw { status: 409, message: error.response.data.message };

            default:
                break;
        }
    }
});


// "POST OTP request" (function) to send the otp to verify signup using createAsyncThunk
export const otpVerification = createAsyncThunk('user/signup/otp', async (otpData) => {
    try {
        let { token, otp, type } = otpData;

        // "POST OTP request" using the switch 
        switch (type) {
            case 'student':
                {
                    const res = await axios.post('http://localhost:3000/users/signup/student/auth', { otp, token });
                    return res.data;
                }
            case 'faculty':
                {
                    const res = await axios.post('http://localhost:3000/users/signup/faculty/auth', { otp, token });
                    return res.data;
                }
            default:
                console.log('Error in Type');
                break;
        }
    } catch (error) {

        // "POST OTP request" -> error handling using the switch
        switch (error.response.status) {
            case 409:
                throw { status: 409, message: error.response.data.message };

            default:
                throw { status: error.response.status, message: error.response.data.message };
        }
    }
})

// "POST Login request" (function) to send the login data to verify user using createAsyncThunk
export const login = createAsyncThunk('user/login', async (formData) => {
    try {
        let { email, password } = formData;

        // "POST Login request"  
        const res = await axios.post('http://localhost:3000/users/login', { email, password });
        return res.data;

    } catch (error) {

        // "POST Login request" -> error handling using the switch
        switch (error.response.status) {
            case 409:
                throw { status: 409, message: error.response.data.message };

            default:
                throw { status: error.response.status, message: error.response.data.message };
        }
    }
})


// auth state
const initialState = {
    user: {},
    loading: false,
    error: null,
    isAuthenticated: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // "Logout action" -> to clear user data on logout
        logout: (state, action) => {
            state.user = {}
            state.isAuthenticated = false
            state.loading = false
            state.error = null
        },

        // "updateUser action" -> to update the user data on login & signup
        updateUser: (state, action) => {
            state.user = action.payload
        },

        // "clearError action" -> to reset the error state
        clearError: (state, action) => {
            state.error = null
        },

        // "clearStatus action" -> to clear the ??????????
        clearStatus: (state, action) => {
            if (state.user.email === undefined) {
                state.user = {}
            }
        }
    },
    extraReducers: (builder) => {

        // Reducers for handling different states of async thunks {builder.addCase()}
        builder

            // Reducers for signup async thunk to handle the otp response
            .addCase(signup.fulfilled, (state, action) => {
                state.user = { ...state.user, ...action.payload }
                state.loading = false
                state.error = null
            })
            .addCase(signup.pending, (state, action) => {
                state.loading = false
            })
            .addCase(signup.rejected, (state, action) => {
                console.log(`This is the action.error.message ${action.error.message}`);
                state.loading = false
                state.error = action.error.message
            })

            // Reducer for otp async thunk to handle the otp response
            .addCase(otpVerification.fulfilled, (state, action) => {
                state.user = { ...state.user, ...action.payload }
                state.loading = false
                state.error = null
            })
            .addCase(otpVerification.pending, (state, action) => {
                state.loading = false
            })
            .addCase(otpVerification.rejected, (state, action) => {
                state.loading = false
                state.error = 'An error occurred in otp verification... "authSlice"'
            })


            // Reducer for login async thunk to handle the otp response
            .addCase(login.fulfilled, (state, action) => {
                let {token} = action.payload
                state.user = { ...action.payload }
                state.loading = false
                state.error = null
                token ? state.isAuthenticated = true : state.isAuthenticated = false
            })
            .addCase(login.pending, (state, action) => {
                state.loading = false
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })

    }
})

export const { logout, updateUser, clearError, clearStatus } = authSlice.actions

export default authSlice.reducer