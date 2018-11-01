import axios from 'axios';
import moment from 'moment';
import {
  GET_ACTIVITIES,
  GET_ACTIVITIES_FAILED,
  START_ACTIVITY,
  UPDATE_CURRENT_ACTIVITY,
  UPDATE_CURRENT_ACTIVITIES
} from './types';
import {
  getGuestActivities,
  addGuestActivity
} from '../helpers/localStorage';
import Timer from '../helpers/Timer';

const API_HOST = process.env.REACT_APP_API_HOST || 'http://localhost:5000';

export const getActivities = (user, babyID) => async dispatch => {
  const { provider } = user;
  let activities = [];

  if (provider === 'local') {
    activities = getGuestActivities(babyID) || [];
  } else {
    // const res = await axios.get(`${API_HOST}/api/babies?userID=${id}`);
    // const { success, error, data } = res.data;
    // if (error) return dispatch({ type: GET_BABIES_FAILED, payload: error });
    // if (success) babies = data;
  }

  dispatch({ type: GET_ACTIVITIES, payload: activities });
}

export const startActivity = activity => dispatch => {
  const { name, currentSide } = activity;

  if (name === 'breast' || name === 'pump') {
    activity.leftTimer = new Timer();
    activity.rightTimer = new Timer();
    if (currentSide === 'left') activity.leftTimer.start();
    else if (currentSide === 'right') activity.rightTimer.start(); 
  } else if (name === 'bottle' || name === 'sleep') {
    activity.timer = new Timer();
    activity.timer.start();
  }

  dispatch({ type: START_ACTIVITY, payload: activity });
}

export const resumeActivity = activity => dispatch => {
  const { name, currentSide } = activity;

  if (name === 'breast' || name === 'pump') {
    if (currentSide === 'left') {
      activity.leftTimer.start();
      activity.rightTimer.stop();
    } else if (currentSide === 'right') {
      activity.rightTimer.start();
      activity.leftTimer.stop();
    }
  }

  dispatch({ type: START_ACTIVITY, payload: activity });
}

export const updateCurrentActivity = activity => dispatch => {
  dispatch({ type: UPDATE_CURRENT_ACTIVITY, payload: activity });
}

export const updateCurrentActivities = currentActivities => dispatch => {
  dispatch({ type: UPDATE_CURRENT_ACTIVITIES, payload: currentActivities });
}

export const saveActivity = (user, activity) => async dispatch => {
  const { name } = activity;
  if (name === 'breast' || name === 'pump') {
    activity.leftTimer.stop();
    activity.rightTimer.stop();
  } else if (name === 'bottle' || name === 'sleep') {
    activity.timer.stop();
  }

  const activityToSave = formActivityToSave(activity);
  if (user.provider === 'local') addGuestActivity(activityToSave);
  // else await axios.post(`${API_HOST}/api/activities/add`, activity);

  dispatch(getActivities(user, activity.babyID));
}

const formActivityToSave = activity => {
  const {
    babyID,
    name,
    type,
    time_start,
    leftTimer,
    rightTimer,
    timer,
    amount,
    amount_unit,
    height,
    height_unit,
    weight,
    weight_unit,
    head,
    head_unit,
    memo
  } = activity;

  let duration_left = 0;
  let duration_right = 0;
  let duration_total = 0;
  if (leftTimer) duration_left = leftTimer.elapsed;
  if (rightTimer) duration_right = rightTimer.elapsed;
  if (timer) duration_total = timer.elapsed;
  else duration_total = duration_left + duration_right;

  return {
    babyID,
    name,
    type,
    time_start,
    time_end: moment(),
    duration_left,
    duration_right,
    duration_total,
    amount,
    amount_unit,
    height,
    height_unit,
    weight,
    weight_unit,
    head,
    head_unit,
    memo
  };
}