import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import authReducer from './reducers/authReducer';

const rootReducer = combineReducers({
  auth: authReducer,
});

const store = configureStore({
  reducer: rootReducer,
  // If you are not using custom enhancers, you can omit this
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(), // Default middleware
});

export default store;
