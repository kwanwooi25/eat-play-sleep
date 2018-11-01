import {
  GET_ACTIVITIES,
  GET_ACTIVITIES_FAILED,
  START_ACTIVITY,
  UPDATE_CURRENT_ACTIVITY,
  UPDATE_CURRENT_ACTIVITIES,
} from '../actions/types';

const INITIAL_STATE = {
  all: [],
  currentActivities: [],
  error: ''
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ACTIVITIES:
      return Object.assign({}, state, { all: action.payload });
    
    case GET_ACTIVITIES_FAILED:
      return state;

    case START_ACTIVITY:
      state.currentActivities.push(action.payload);
      return state;

    case UPDATE_CURRENT_ACTIVITY:
      const updatedActivity = action.payload;
      state.currentActivities.forEach(activity => {
        if (activity.name === updatedActivity.name) {
          activity = updatedActivity;
        }
      });
      return state;

    case UPDATE_CURRENT_ACTIVITIES:
      return Object.assign({}, state, { currentActivities: action.payload });

    default:
      return state;
  }
}