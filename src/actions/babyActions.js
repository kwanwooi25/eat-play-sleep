import axios from 'axios';
import {
  GET_BABIES,
  GET_BABIES_FAILED
} from './types';
import {
  getGuestBabies,
  addGuestBaby,
  editGuestBaby,
  deleteGuestBaby,
} from '../helpers/localStorage';
import { getActivities, updateActivitiesInProgress } from './activityActions';

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

  if (babies.length > 0) {
    dispatch(getActivities(user, babies[0].id));
    dispatch(updateActivitiesInProgress([]));
  }
  dispatch({ type: GET_BABIES, payload: babies });
}

export const addBaby = (user, baby) => async dispatch => {
  baby.birthday.hour(24);
  if (user.provider === 'local') addGuestBaby(baby);
  else await axios.post(`${API_HOST}/api/babies`, baby);

  dispatch(getBabies(user));
}

export const editBaby = (user, baby) => async dispatch => {
  baby.birthday.hour(24);
  if (user.provider === 'local') editGuestBaby(baby);
  else await axios.put(`${API_HOST}/api/babies`, baby);

  dispatch(getBabies(user));
}

export const deleteBaby = (user, baby) => async dispatch => {
  if (user.provider === 'local') deleteGuestBaby(baby);
  else await axios.delete(`${API_HOST}/api/babies?babyID=${baby.id}`);

  dispatch(getBabies(user));
}