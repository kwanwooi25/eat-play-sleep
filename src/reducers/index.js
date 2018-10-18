import { combineReducers } from 'redux';
// to make the app multilingual
import { IntlReducer } from 'react-redux-multilingual';
import authReducer from './authReducer';

export default combineReducers({
  Intl: IntlReducer,
  auth: authReducer
});