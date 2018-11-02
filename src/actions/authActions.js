import axios from 'axios';
import {
  GET_CURRENT_USER,
  LOGIN_AS_GUEST,
  AUTH_ERROR,
  LOGOUT_USER,
} from './types';
import {
  getGuestUser,
  setGuestUser,
  logoutGuestUser,
} from '../helpers/localStorage';
import {
  getBabies
} from './babyActions';

export const getCurrentUser = () => async dispatch => {
  /** Guest */
  const guest = getGuestUser();
  if (guest && guest.isLoggedIn) {
    dispatch(getBabies(guest));
    return dispatch({ type: GET_CURRENT_USER, payload: guest });
  }

  /** Oauth */
  const res = await axios.get('/auth/current_user');
  const { success, error, data } = res.data;
  
  if (success) {
    dispatch(getBabies(data));
    dispatch({ type: GET_CURRENT_USER, payload: data });
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

  dispatch(getBabies(user));
  dispatch({ type: LOGIN_AS_GUEST, payload: user });
}

export const logoutUser = () => async dispatch => {
  dispatch({ type: LOGOUT_USER });
  
  // logout guest user
  logoutGuestUser();

  // logout user
  await axios.get('/auth/logout');
}