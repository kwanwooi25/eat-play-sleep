import {
  SHOW_SNACKBAR,
  HIDE_SNACKBAR,
} from './types';

export const showSnackbar = (message, variant) => dispatch => {
  dispatch({ type: SHOW_SNACKBAR, payload: { message, variant } });
  setTimeout(() => dispatch({ type: HIDE_SNACKBAR }), 2000);
}