import axios from 'axios';
import {
  GET_CURRENT_USER,
  LOGIN_AS_GUEST,
  LOGIN_WITH_EMAIL,
  AUTH_ERROR,
  LOGOUT_USER,
} from './types';
import {
  getGuestUser,
  setGuestUser,
  getUserToken,
  setUserToken,
  removeUserToken
} from '../helpers/localStorage';
import {
  getBabies
} from './babyActions';

const API_HOST = process.env.REACT_APP_API_HOST || 'http://localhost:5000';

export const getCurrentUser = () => async dispatch => {
  // 1. check for guest user
  const guest = getGuestUser();
  if (guest && guest.isLoggedIn) {
    dispatch(getBabies(guest));
    return dispatch({ type: GET_CURRENT_USER, payload: guest });
  }

  // 2. get user info logged in
  const token = getUserToken();
  const res = await axios.get(`/auth/current_user?token=${token}`);
  const { success, error, data } = res.data;
  
  if (success) {
    dispatch(getBabies(data));
    dispatch({ type: GET_CURRENT_USER, payload: data });
  } else {
    dispatch({ type: AUTH_ERROR, payload: error });
  } 
}

export const signupWithEmail = (email, password) => async dispatch => {
  const credentials = { email, password };
  const res = await axios.post(`${API_HOST}/auth/email/signup`, credentials);
  const { success, error } = res.data;

  // call login action when successfully signed up
  if (success) {
    dispatch(loginWithEmail(email, password));
  // dispatch error on fail
  } else {
    dispatch({ type: AUTH_ERROR, payload: error });
  }
}

export const loginWithEmail = (email, password) => async dispatch => {
  const credentials = { email, password };
  const res = await axios.post(`${API_HOST}/auth/email`, credentials);
  const { success, error, data } = res.data;

  if (success) {
    setUserToken(data.token);
    dispatch(getBabies(data.user));
    dispatch({ type: LOGIN_WITH_EMAIL, payload: data });
  } else {
    dispatch({ type: AUTH_ERROR, payload: error });
  }
}

export const loginAsGuest = () => dispatch => {
  let user = getGuestUser();

  /**
   * when user exists,
   * set the user as logged in
   */
  if (user) {
    user.isLoggedIn = true;
  /**
   * when user doesn't exist,
   * generate new user
   */
  } else {
    user = {
      isLoggedIn: true,
      id: 'localuser',
      provider: 'local',
    };
  }

  // save guest info to localStorage;
  setGuestUser(user);
  // remove user info from localStorage;
  removeUserToken();

  dispatch(getBabies(user));
  dispatch({ type: LOGIN_AS_GUEST, payload: user });
}

export const logoutUser = () => async dispatch => {
  // logout guest user
  const guest = getGuestUser();
  guest.isLoggedIn = false;
  setGuestUser(guest);

  // logout user
  removeUserToken();
  await axios.get('/auth/logout');
  dispatch({ type: LOGOUT_USER });
}