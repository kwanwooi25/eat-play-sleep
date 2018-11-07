import axios from 'axios';
import {
  GET_ACTIVITIES,
  GET_ACTIVITY_BY_ID,
  RESET_CURRENT_ACTIVITY,
  START_ACTIVITY,
  UPDATE_ACTIVITY_IN_PROGRESS,
  UPDATE_ACTIVITIES_IN_PROGRESS,
  ACTIVITY_ERROR,
} from './types';
import {
  getGuestActivities,
  getGuestActivityById,
  addGuestActivity,
  updateGuestActivity,
  removeGuestActivity,
} from '../helpers/localStorage';
import Timer from '../helpers/Timer';

const API_HOST = process.env.REACT_APP_API_HOST || 'http://localhost:5000';

export const getActivities = (user, babyID) => async dispatch => {
  const { provider } = user;
  
  /** Get all activities */
  let all = [];
  if (provider === 'local') {
    all = getGuestActivities(babyID) || [];
  } else {
    const res = await axios.get(`${API_HOST}/api/activities?babyID=${babyID}`);
    const { success, error, data } = res.data;
    if (error) return dispatch({ type: ACTIVITY_ERROR, payload: error });
    if (success) all = data;
  }

  /** store last activities */
  let lastActivities = {};
  all.forEach(activity => {
    const { name } = activity;
    if (!lastActivities[name]) {
      lastActivities[name] = activity;
    } else if (lastActivities[name].time_start < activity.time_start) {
      lastActivities[name] = activity;
    }
  });

  dispatch({ type: GET_ACTIVITIES, payload: { all, lastActivities } });
}

export const getActivityById = (user, activityID) => async dispatch => {
  const { provider } = user;

  let activity;
  if (provider === 'local') {
    activity = getGuestActivityById(activityID);
  } else {
    const res = await axios.get(`${API_HOST}/api/activity?activityID=${activityID}`);
    const { success, error, data } = res.data;
    if (error) return dispatch({ ACTIVITY_ERROR, payload: error });
    if (success) activity = data;
  }

  dispatch({ type: GET_ACTIVITY_BY_ID, payload: activity });
}

export const resetCurrentActivity = () => dispatch => {
  dispatch({ type: RESET_CURRENT_ACTIVITY });
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

export const updateActivityInProgress = activity => dispatch => {
  dispatch({ type: UPDATE_ACTIVITY_IN_PROGRESS, payload: activity });
}

export const updateActivitiesInProgress = activities => dispatch => {
  dispatch({ type: UPDATE_ACTIVITIES_IN_PROGRESS, payload: activities });
}

export const saveActivity = (user, activity) => async dispatch => {
  const { name } = activity;
  
  activity.guardianID = user.id;

  if (name === 'breast' || name === 'pump') {
    activity.leftTimer.stop();
    activity.rightTimer.stop();
  } else if (name === 'bottle' || name === 'sleep') {
    activity.timer.stop();
  }

  const activityToSave = formActivityToSave(activity);
  if (user.provider === 'local') addGuestActivity(activityToSave);
  else await axios.post(`${API_HOST}/api/activity`, activityToSave);

  dispatch(getActivities(user, activityToSave.baby_id));
}

export const updateActivity = (user, activity) => async dispatch => {
  if (user.provider === 'local') updateGuestActivity(activity);
  else await axios.put(`${API_HOST}/api/activity`, activity);

  dispatch(getActivities(user, activity.baby_id));
}

export const removeActivity = (user, activity) => async dispatch => {
  if (user.provider === 'local') removeGuestActivity(activity.id);
  else await axios.delete(`${API_HOST}/api/activity?activityID=${activity.id}`);

  dispatch(getActivities(user, activity.baby_id));
}

const formActivityToSave = activity => {
  const {
    guardianID,
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
    guardian_id: guardianID,
    baby_id: babyID,
    name,
    type,
    time_start,
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