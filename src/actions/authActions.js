import axios from 'axios';
import {
  GET_CURRENT_USER,
  LOGIN_AS_GUEST,
  AUTH_ERROR,
  LOGOUT_USER,
} from './types';
import {
  getUserToken,
  setUserToken,
  removeUserToken,
  getGuestUser,
  setGuestUser,
  logoutGuestUser,
} from '../helpers/localStorage';
import {
  getBabies
} from './babyActions';
import { IntlActions } from 'react-redux-multilingual';

const API_HOST = process.env.REACT_APP_API_HOST;
const SETTINGS_DEFAULT = {
  displayActivities: [
    'breast',
    'bottle',
    'pump',
    'babyfood',
    'diaper',
    'sleep',
    'growth',
  ],
  displayUnits: {
    volume: 'ml',
    length: 'cm',
    weight: 'kg'
  },
  displayLanguage: 'ko',
};

const injectSettings = user => {
  Object.keys(SETTINGS_DEFAULT).forEach(key => {
    if (!user.settings[key]) {
      user.settings[key] = SETTINGS_DEFAULT[key];
    }
  });

  return user;
}

export const getCurrentUser = () => async dispatch => {
  let user = {};

  /** Guest User */
  const guest = getGuestUser();
  if (guest && guest.isLoggedIn) user = guest;

  /** Oauth User */
  else {
    const userToken = getUserToken();
    const res = await axios.get(
      `${API_HOST}/auth/current_user`,
      { headers: { 'x-oauth-token': userToken } }
    );
    const { success, error, data } = res.data;

    if (success) user = data;
    else return dispatch({ type: AUTH_ERROR, payload: error });
  }

  user = injectSettings(user);
  
  dispatch(IntlActions.setLocale(user.settings.displayLanguage));  
  dispatch({ type: GET_CURRENT_USER, payload: user });
  dispatch(getBabies(user));
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
      settings: {},
    };
  }

  // save guest info to localStorage;
  setGuestUser(user);

  dispatch(getBabies(user));
  dispatch({ type: LOGIN_AS_GUEST, payload: user });
}

export const loginUser = token => async dispatch => {
  setUserToken(token);

  dispatch(getCurrentUser());
}

export const logoutUser = () => async dispatch => {
  dispatch({ type: LOGOUT_USER });
  logoutGuestUser();
  removeUserToken();
}

export const updateUser = user => async dispatch => {
  if (user.provider === 'local') setGuestUser(user);
  else {
    const userToken = getUserToken();
    await axios.put(
      `${API_HOST}/api/user`,
      user,
      { headers: { 'x-oauth-token': userToken } }
    );
  }

  dispatch(getCurrentUser());
}