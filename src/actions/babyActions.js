import axios from 'axios';
import {
  GET_BABIES,
  GET_BABIES_FAILED
} from './types';
import {
  getGuestBabies,
  addGuestBaby
} from '../helpers/localStorage';
import {
  getActivities,
} from './activityActions';

const API_HOST = process.env.REACT_APP_API_HOST || 'http://localhost:5000';

export const getBabies = user => async dispatch => {
  const { id, provider } = user;
  let babies = [];

  if (provider === 'local') {
    babies = getGuestBabies() || [];
  } else {
    const res = await axios.get(`${API_HOST}/api/babies?userID=${id}`);
    const { success, error, data } = res.data;
    if (error) return dispatch({ type: GET_BABIES_FAILED, payload: error });
    if (success) babies = data;
  }

  dispatch({ type: GET_BABIES, payload: babies });
}

export const addBaby = (user, baby) => async dispatch => {
  if (user.provider === 'local') addGuestBaby(baby);
  else await axios.post(`${API_HOST}/api/babies/add`, baby);

  dispatch(getBabies(user));
}