import {
  SHOW_SNACKBAR,
  HIDE_SNACKBAR
} from '../actions/types';

const INITIAL_STATE = {
  open: false,
  message: '',
  variant: '',
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SHOW_SNACKBAR:
      const { message, variant } = action.payload;
      return { open: true, message, variant };

    case HIDE_SNACKBAR:
      return INITIAL_STATE;

    default:
      return state;
  }
}