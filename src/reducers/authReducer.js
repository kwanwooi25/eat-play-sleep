import {
  GET_CURRENT_USER,
  AUTH_ERROR,
  LOGOUT_USER,
} from '../actions/types';

const INITIAL_STATE = {
  isLoggedInAsGuest: false,
  isLoggedInAsUser: false,
  currentUser: null,
  loginMethod: '',
  error: ''
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_CURRENT_USER:
      return {
        isLoggedInAsGuest: false,
        isLoggedInAsUser: true,
        currentUser: action.payload,
        loginMethod: action.payload.provider,
        error: ''
      };

    case AUTH_ERROR:
      return Object.assign({}, INITIAL_STATE, { error: action.payload });

    case LOGOUT_USER:
      return INITIAL_STATE;

    default:
      return state;
  }
}