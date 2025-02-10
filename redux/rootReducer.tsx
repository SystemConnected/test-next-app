import { combineReducers } from "@reduxjs/toolkit";
import layoutReducer from '@/redux/slices/layoutSlice';
import authReducer from "@/redux/slices/authSlice"

const rootReducer= combineReducers({
    layout:layoutReducer,
    auth:authReducer,
});

export default rootReducer;