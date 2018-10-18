import {
  LOGIN_AS_GUEST,
  LOGOUT_USER,
} from './types';

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

export const logoutUser = () => dispatch => {
  dispatch({ type: LOGOUT_USER });
}