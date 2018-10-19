import {
  GET_CURRENT_USER,
  GET_CURRENT_USER_FAILED,
  LOGIN_AS_GUEST,
  LOGOUT_USER
} from '../actions/types';

const INITIAL_STATE = {
  isLoggedInAsGuest: false,
  isLoggedInAsUser: false,
  currentUser: null,
  error: ''
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_CURRENT_USER:
      return {
        isLoggedInAsGuest: false,
        isLoggedInAsUser: true,
        currentUser: action.payload,
        error: ''
      };

    case GET_CURRENT_USER_FAILED:
      return {
        isLoggedInAsGuest: false,
        isLoggedInAsUser: false,
        currentUser: null,
        error: action.payload
      };

    case LOGIN_AS_GUEST:
      return {
        isLoggedInAsGuest: true,
        isLoggedInAsUser: false,
        currentUser: action.payload,
        error: ''
      };

    case LOGOUT_USER:
      return INITIAL_STATE;

    default:
      return state;
  }
}