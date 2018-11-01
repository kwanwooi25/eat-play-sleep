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
export const getGuestActivities = babyID => {
  const activities = JSON.parse(localStorage.getItem(GUEST_ACTIVITIES));
  let filtered = activities;
  if (activities && babyID) filtered = activities.filter(activity => activity.babyID === babyID); 
  return filtered;
}
export const setGuestActivities = activities =>
  localStorage.setItem(GUEST_ACTIVITIES, JSON.stringify(activities));
export const getNextActivityId = () => {
  const nextId = Number(localStorage.getItem(GUEST_ACTIVITY_ID)) + 1 || 1;
  localStorage.setItem(GUEST_ACTIVITY_ID, nextId);
  return nextId;
};
export const addGuestActivity = activity => {
  activity.id = getNextActivityId();
  const activities = getGuestActivities() || [];
  activities.push(activity);
  setGuestActivities(activities);
  return getGuestActivities(activity.babyID);
}