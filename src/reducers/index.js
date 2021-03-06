import { combineReducers } from 'redux';
// to make the app multilingual
import { IntlReducer } from 'react-redux-multilingual';
import authReducer from './authReducer';
import babyReducer from './babyReducer';
import activityReducer from './activityReducer';
import snackbarReducer from './snackbarReducer';

export default combineReducers({
  Intl: IntlReducer,
  auth: authReducer,
  babies: babyReducer,
  activities: activityReducer,
  snackbar: snackbarReducer,
});