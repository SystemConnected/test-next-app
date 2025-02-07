import { combineReducers } from "@reduxjs/toolkit";
import layoutReducer from '@/redux/slices/layoutSlice';

const rootReducer= combineReducers({
    layout:layoutReducer,
});

export default rootReducer;