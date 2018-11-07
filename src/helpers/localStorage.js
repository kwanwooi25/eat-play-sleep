const GUEST_USER = 'eps_guest_user';
const GUEST_BABIES = 'eps_guest_babies';
const GUEST_BABY_ID = 'eps_guest_baby_id';
const GUEST_ACTIVITIES = 'eps_guest_activities';
const GUEST_ACTIVITY_ID = 'eps_guest_activity_id';

/** Guest User Info */
export const getGuestUser = () => JSON.parse(localStorage.getItem(GUEST_USER));
export const setGuestUser = user => localStorage.setItem(GUEST_USER, JSON.stringify(user));
export const logoutGuestUser = () => {
  const guest = getGuestUser();
  guest.isLoggedIn = false;
  setGuestUser(guest);
}

/** Guest's baby info */
export const getGuestBabies = () => JSON.parse(localStorage.getItem(GUEST_BABIES));
export const setGuestBabies = babies => localStorage.setItem(GUEST_BABIES, JSON.stringify(babies));
export const getNextGuestBabyId = () => {
  const nextId = Number(localStorage.getItem(GUEST_BABY_ID)) + 1 || 1;
  localStorage.setItem(GUEST_BABY_ID, nextId);
  return nextId;
};
export const addGuestBaby = baby => {
  baby.id = getNextGuestBabyId();
  const babies = getGuestBabies() || [];
  babies.push(baby);
  setGuestBabies(babies);
  return getGuestBabies();
}

/** Guest's babies' activities */
const getGuestActivitiesAll = () =>
  JSON.parse(localStorage.getItem(GUEST_ACTIVITIES));
export const getGuestActivities = babyID => {
  const activities = getGuestActivitiesAll();
  let filtered = activities;
  if (activities && babyID) {
    filtered = activities
      .filter(activity => activity.baby_id === babyID)
      .sort((a, b) => {
        if (a.time_start > b.time_start) return -1;
        if (a.time_start < b.time_start) return 1;
        return 0;
      });
  }
  return filtered;
}
export const setGuestActivities = activities =>
  localStorage.setItem(GUEST_ACTIVITIES, JSON.stringify(activities));
export const getGuestActivityById = activityID => {
  const activities = getGuestActivitiesAll();
  const activity = activities.find(activity => activity.id === activityID);
  return activity;
}
export const getNextActivityId = () => {
  const nextId = Number(localStorage.getItem(GUEST_ACTIVITY_ID)) + 1 || 1;
  localStorage.setItem(GUEST_ACTIVITY_ID, nextId);
  return nextId;
};
export const addGuestActivity = data => {
  data.id = getNextActivityId();
  const activities = getGuestActivities() || [];
  activities.push(data);
  setGuestActivities(activities);
  return data;
}
export const updateGuestActivity = data => {
  const activities = getGuestActivitiesAll();
  const updated = activities.map(activity => {
    if (activity.id === data.id) return data;
    return activity;
  });
  setGuestActivities(updated);
  return data;
}
export const removeGuestActivity = id => {
  const activities = getGuestActivitiesAll();
  const updated = activities.filter(activity => activity.id !== id);
  setGuestActivities(updated);
  return id;
}