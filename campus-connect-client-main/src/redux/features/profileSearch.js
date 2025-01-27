import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    profile: {},
    searchProfile: {},
    loading: false,
    error: null,
}

export const profileSearch = createSlice({
    name:"profile",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
        .addCase(search.fulfilled, (state, action) => {
            state.user = { ...state.user, ...action.payload }
            state.loading = false
            state.error = null
        })
        .addCase(search.pending, (state, action) => {
            state.loading = false
        })
        .addCase(search.rejected, (state, action) => {
            console.log(`This is the action.error.message ${action.error.message}`);
            state.loading = false
            state.error = action.error.message
        })
    }
})