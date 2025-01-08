import axios from 'axios';

// Action types
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAIL = 'SIGNUP_FAIL';
export const LOGOUT = 'LOGOUT';

// Login action
export const login = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post('/api/login', { email, password });
    dispatch({ type: LOGIN_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data });
  }
};

// Signup action
export const signup = (username, email, password) => async (dispatch) => {
  try {
    const response = await axios.post('/api/signup', { username, email, password });
    dispatch({ type: SIGNUP_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: SIGNUP_FAIL, payload: error.response.data });
  }
};

// Logout action
export const logout = () => ({ type: LOGOUT });
