const GUEST_USER = 'eps_guest_user';
const USER_TOKEN = 'eps_user_token';
const GUEST_BABIES = 'eps_guest_babies';
const GUEST_BABY_ID = 'eps_guest_baby_id';

/** Guest User Info */
export const getGuestUser = () => JSON.parse(localStorage.getItem(GUEST_USER));
export const setGuestUser = user => localStorage.setItem(GUEST_USER, JSON.stringify(user));

/** Login Token (for email login) */
export const getUserToken = () => localStorage.getItem(USER_TOKEN);
export const setUserToken = token => localStorage.setItem(USER_TOKEN, token);
export const removeUserToken = () => localStorage.removeItem(USER_TOKEN);

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