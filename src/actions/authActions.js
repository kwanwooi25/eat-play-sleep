import axios from 'axios';
import {
  GET_CURRENT_USER,
  GET_CURRENT_USER_FAILED,
  LOGIN_AS_GUEST,
  LOGOUT_USER,
} from './types';

export const getCurrentUser = () => async dispatch => {
  const res = await axios.get('/auth/current_user');
  const { success, error, data } = res.data;
  
  if (success) dispatch({ type: GET_CURRENT_USER, payload: data });
  else dispatch({ type: GET_CURRENT_USER_FAILED, payload: error });
}

export const loginAsGuest = () => dispatch => {
  let user = JSON.parse(localStorage.getItem('eps_guest_user'));
  let babies = JSON.parse(localStorage.getItem('eps_guest_babies')) || [];

  // generate user if not exist
  if (!user) {
    user = {
      id: 'localuser',
      email: '',
      babies: babies
    };

    localStorage.setItem('eps_guest_user', JSON.stringify(user));
  }

  dispatch({ type: LOGIN_AS_GUEST, payload: user });
}

export const logoutUser = () => async dispatch => {
  await axios.get('/auth/logout');
  dispatch({ type: LOGOUT_USER });
}