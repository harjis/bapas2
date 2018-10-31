import { USER_ID, USER_TOKEN } from 'src/constants/user_constants';

export const isLoggedIn = () => {
  return localStorage.getItem(USER_ID) && localStorage.getItem(USER_TOKEN);
};

export const getToken = () => {
  return localStorage.getItem(USER_TOKEN);
};

export const login = (id, name, token) => {
  localStorage.setItem(USER_ID, id);
  localStorage.setItem(USER_TOKEN, token);
};

export const logout = () => {
  localStorage.removeItem(USER_ID);
  localStorage.removeItem(USER_TOKEN);
};
