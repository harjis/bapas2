import { USER_ID, USER_TOKEN, USER_NAME } from 'src/constants/user_constants';

export const isLoggedIn = () => {
  return localStorage.getItem(USER_ID) && localStorage.getItem(USER_TOKEN);
};

export const getUserName = () => {
  return localStorage.getItem(USER_NAME);
};

export const getToken = () => {
  return localStorage.getItem(USER_TOKEN);
};

export const login = (id, name, token) => {
  localStorage.setItem(USER_ID, id);
  localStorage.setItem(USER_TOKEN, token);
  localStorage.setItem(USER_NAME, name);
};

export const logout = () => {
  localStorage.removeItem(USER_ID);
  localStorage.removeItem(USER_TOKEN);
  localStorage.removeItem(USER_NAME);
};
