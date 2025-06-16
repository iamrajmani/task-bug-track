import { LOGIN_SUCCESS, LOGOUT } from './types';
import { users } from '../mockData';

export const login = (username, password) => dispatch => {
  const user = users.find(u => u.username === username && u.password === password);
  
  if (user) {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: user
    });
    return true;
  }
  return false;
};

export const logout = () => ({
  type: LOGOUT
});