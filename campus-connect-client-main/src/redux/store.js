import { configureStore } from "@reduxjs/toolkit";
import imgTrackerReducer from "./features/imgTrackerSlice";
import userMessageReducer from "./features/userMessageSlice";
import authSlice from "./features/authSlice";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import { combineReducers } from "@reduxjs/toolkit";
// import persistReducer from "redux-persist/es/persistReducer";

const persistConfig = {
  key:"root",
  version:1,
  storage,
  blacklist: ['userMsg'],
}

const reducer = combineReducers({
  imgTracker: imgTrackerReducer,
  auth: authSlice,
  userMsg: userMessageReducer,
})

const persistReducers = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
