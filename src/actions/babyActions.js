import axios from 'axios';
import {
  GET_BABIES,
  GET_BABIES_FAILED
} from './types';
import { getCurrentUser } from './authActions';
import { getActivities, updateActivitiesInProgress } from './activityActions';
  import {
    getUserToken,
    getGuestBabies,
    addGuestBaby,
    editGuestBaby,
    deleteGuestBaby,
  } from '../utils/localStorage';

const API_HOST = process.env.REACT_APP_API_HOST;

export const getBabies = user => async dispatch => {
  const { id, provider } = user;
  let all = [];

  if (provider === 'local') {
    all = getGuestBabies() || [];
  } else {
    const userToken = getUserToken();
    const res = await axios.get(
      `${API_HOST}/api/baby?userID=${id}`,
      { headers: { 'x-oauth-token': userToken } }
    );
    const { success, error, data } = res.data;
    if (error) return dispatch({ type: GET_BABIES_FAILED, payload: error });
    if (success) all = data;
  }

  const currentBaby = all.find(({ id }) => id === user.settings.currentBabyId) || all[0];

  if (currentBaby) {
    dispatch(getActivities(user, currentBaby.id));
    dispatch(updateActivitiesInProgress([]));
  }
  dispatch({ type: GET_BABIES, payload: { all, currentBaby } });
}

export const addBaby = (user, baby) => async dispatch => {
  if (user.provider === 'local') addGuestBaby(baby);
  else {
    const userToken = getUserToken();
    await axios.post(
      `${API_HOST}/api/baby`,
      baby,
      { headers: { 'x-oauth-token': userToken } }
    );
  }

  dispatch(getCurrentUser());
}

export const editBaby = (user, baby) => async dispatch => {
  if (user.provider === 'local') editGuestBaby(baby);
  else {
    const userToken = getUserToken();
    await axios.put(
      `${API_HOST}/api/baby`,
      baby,
      { headers: { 'x-oauth-token': userToken } }
    );
  }

  dispatch(getBabies(user));
}

export const deleteBaby = (user, baby) => async dispatch => {
  if (user.provider === 'local') deleteGuestBaby(baby);
  else {
    const userToken = getUserToken();
    await axios.delete(
      `${API_HOST}/api/baby?babyID=${baby.id}`,
      { headers: { 'x-oauth-token': userToken } }
    );
  }

  dispatch(getBabies(user));
}