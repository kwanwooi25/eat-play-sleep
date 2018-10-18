import {
  LOGIN_AS_GUEST,
  LOGOUT_USER
} from '../actions/types';

const INITIAL_STATE = {
  isLoggedInAsGuest: false,
  isLoggedInAsUser: false,
  loginMethod: '',
  currentUser: null,
  error: ''
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_AS_GUEST:
      return Object.assign(
        {},
        state,
        {
          isLoggedInAsGuest: true,
          loginMethod: 'guest',
          currentUser: action.payload
        }
      );

    case LOGOUT_USER:
      return INITIAL_STATE;

    default:
      return state;
  }
}