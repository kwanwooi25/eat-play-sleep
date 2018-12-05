import axios from 'axios';
import moment from 'moment';
import {
  GET_ACTIVITIES,
  GET_ACTIVITY_BY_ID,
  GET_ACTIVITY_SUMMARY_BY_DATE,
  GET_ACTIVITY_TREND_BY_NAME,
  UPDATE_CURRENT_ACTIVITY,
  RESET_CURRENT_ACTIVITY,
  START_ACTIVITY,
  UPDATE_ACTIVITY_IN_PROGRESS,
  UPDATE_ACTIVITIES_IN_PROGRESS,
  ACTIVITY_ERROR,
} from './types';
import {
  getUserToken,
  getGuestActivities,
  getGuestActivityById,
  getGuestActivitySummaryByDate,
  getGuestActivityTrendByName,
  addGuestActivity,
  updateGuestActivity,
  removeGuestActivity,
} from '../utils/localStorage';
import { showSnackbar } from './snackbarActions';
import Timer from '../utils/Timer';
import formTrendData from '../utils/formTrendData';

const API_HOST = process.env.REACT_APP_API_HOST;

export const getActivities = (user, babyID, options) => async dispatch => {
  const { provider } = user;
  if (!options) {
    options = {
      name: ['breast', 'bottle', 'pump', 'babyfood', 'diaper', 'sleep', 'growth'],
    }
  }
  
  /** Get all activities */
  let all = [];
  if (provider === 'local') {
    all = getGuestActivities(babyID, options) || [];
  } else {
    const userToken = getUserToken();
    const res = await axios.get(
      `${API_HOST}/api/activity/all?babyID=${babyID}&options=${JSON.stringify(options)}`,
      { headers: { 'x-oauth-token': userToken } }
    );
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
    const userToken = getUserToken();
    const res = await axios.get(
      `${API_HOST}/api/activity?activityID=${activityID}`,
      { headers: { 'x-oauth-token': userToken } }
    );
    const { success, error, data } = res.data;
    if (error) return dispatch({ type: ACTIVITY_ERROR, payload: error });
    if (success) activity = data;
  }

  dispatch({ type: GET_ACTIVITY_BY_ID, payload: activity });
}

export const getActivitySummaryByDate = (user, babyID, date) => async dispatch => {
  const { provider } = user;
  const range = {
    from: moment(date).startOf('date'),
    to: moment(date).endOf('date')
  }

  let summary;
  if (provider === 'local') {
    summary = getGuestActivitySummaryByDate(babyID, range);
  } else {
    const userToken = getUserToken();
    const res = await axios.get(
      `${API_HOST}/api/activity/summary?babyID=${babyID}&range=${JSON.stringify(range)}`,
      { headers: { 'x-oauth-token': userToken } }
    );
    const { success, error, data } = res.data;
    if (error) return dispatch({ type: ACTIVITY_ERROR, payload: error });
    if (success) summary = data;
  }

  dispatch({ type: GET_ACTIVITY_SUMMARY_BY_DATE, payload: summary });
}

export const getActivityTrendByName = (user, babyID, options) => async dispatch => {
  const { provider } = user;
  
  let trendByName;
  if (provider === 'local') {
    trendByName = getGuestActivityTrendByName(babyID, options);
  } else {
    const userToken = getUserToken();
    const res = await axios.get(
      `${API_HOST}/api/activity/trend?babyID=${babyID}&options=${JSON.stringify(options)}`,
      { headers: { 'x-oauth-token': userToken } }
    );
    const { success, error, data } = res.data;
    if (error) return dispatch({ type: ACTIVITY_ERROR, payload: error });
    if (success) trendByName = formTrendData(data, options);
  }

  let payload = { name: options.names[0], trendByName };
  if (options.names.includes('breast', 'bottle', 'babyfood')) payload.name = 'feed';

  dispatch({ type: GET_ACTIVITY_TREND_BY_NAME, payload });
}

export const updateCurrentActivity = activity => dispatch => {
  dispatch({ type: UPDATE_CURRENT_ACTIVITY, payload: activity });
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
      activity.paused = false;
    } else if (currentSide === 'right') {
      activity.rightTimer.start();
      activity.leftTimer.stop();
      activity.paused = false;
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

export const saveActivity = (user, activity, successMessage, errorMessage) => async dispatch => {
  const { name } = activity;
  
  activity.guardianID = user.id;

  if (name === 'breast' || name === 'pump') {
    activity.leftTimer.stop();
    activity.rightTimer.stop();
  } else if (name === 'bottle' || name === 'sleep') {
    activity.timer.stop();
  }

  const activityToSave = formActivityToSave(activity);
  if (user.provider === 'local') {
    addGuestActivity(activityToSave);
    dispatch(showSnackbar(successMessage, 'success'));
  } else {
    const userToken = getUserToken();
    const res = await axios.post(
      `${API_HOST}/api/activity`,
      activityToSave,
      { headers: { 'x-oauth-token': userToken } }
    );
    if (res.data.success) dispatch(showSnackbar(successMessage, 'success'));
    else dispatch(showSnackbar(errorMessage, 'error'));
  }

  dispatch(getActivities(user, activityToSave.baby_id));
}

export const updateActivity = (user, activity, successMessage, errorMessage) => async dispatch => {
  if (user.provider === 'local') {
    updateGuestActivity(activity);
    dispatch(showSnackbar(successMessage, 'success'));
  } else {
    const userToken = getUserToken();
    const res = await axios.put(
      `${API_HOST}/api/activity`,
      activity,
      { headers: { 'x-oauth-token': userToken } }
    );
    if (res.data.success) dispatch(showSnackbar(successMessage, 'success'));
    else dispatch(showSnackbar(errorMessage, 'error'));
  }

  dispatch(getActivities(user, activity.baby_id));
}

export const removeActivity = (user, activity, successMessage, errorMessage) => async dispatch => {
  if (user.provider === 'local') {
    removeGuestActivity(activity.id);
    dispatch(showSnackbar(successMessage, 'success'));
  } else {
    const userToken = getUserToken();
    const res = await axios.delete(
      `${API_HOST}/api/activity?activityID=${activity.id}`,
      { headers: { 'x-oauth-token': userToken } }
    );
    if (res.data.success) dispatch(showSnackbar(successMessage, 'success'));
    else dispatch(showSnackbar(errorMessage, 'error'));
  }

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
    height,
    weight,
    head,
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
    height,
    weight,
    head,
    memo
  };
}