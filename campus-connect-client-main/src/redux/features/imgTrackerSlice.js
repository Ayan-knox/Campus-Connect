import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    logo: '/src/assets/logo.jpg',
    visible: '/src/assets/visible.svg',
    hide: '/src/assets/hide.svg',
    chat: '/src/assets/chat.svg',
    home: '/src/assets/home.svg',
    search: '/src/assets/search.svg',
    profile: '/src/assets/profile.jpg',

    passVisibility: {
        title: 'Hide',
        type: 'password',
        eye: '/src/assets/hide.svg'
    },
};

const passViewMapping = {
    'password': {
        title: 'Visible',
        type: 'text',
        eye: '/src/assets/visible.svg'
    },
    'text': {
        title: 'Hide',
        type: 'password',
        eye: '/src/assets/hide.svg'
    }
}

export const imgTrackerSlice = createSlice({
    name: 'imageTracker',
    initialState,
    reducers: {
        togglePasswordVisibility: (state) => {
            const passVisibility = state.passVisibility;
            state.passVisibility = passViewMapping[passVisibility.type] || passViewMapping.password;
        },

    },
});

export const { togglePasswordVisibility } = imgTrackerSlice.actions;

export default imgTrackerSlice.reducer;
