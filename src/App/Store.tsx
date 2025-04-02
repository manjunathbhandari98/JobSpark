import {configureStore} from '@reduxjs/toolkit';
import userReducer from '../Slices/UserSlice'
import profileReducer from '../Slices/ProfileSlice'
import jobReducer from '../Slices/JobSlice'

export default configureStore({
    reducer:{
        user:userReducer,
        profile:profileReducer,
        job:jobReducer
        
    }
})