import { ROLE_ADMIN } from './constants';

export const getUserRoles = (currentUserInfo = {}) =>
  currentUserInfo.roles || [];

export const isUserAdmin = currentUserInfo =>
  getUserRoles(currentUserInfo).includes(ROLE_ADMIN);
