import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper';
import config from '../config/app';
import {
  clearItem,
  loadItem,
  loadItemInProd,
  saveItem,
} from '../services/localStorageApi';
import { publicPath } from '../config/path';

const loginUrl =
  process.env.NODE_ENV === 'production'
    ? `${config.production.login_url}`
    : `${config.development.login_url}`;

const isLoggedIn = () => {
  let isLoggedIn = false;
  let authenticationToken =
    process.env.NODE_ENV === 'production'
      ? loadItemInProd('isLoggedIn')
      : loadItem('token');
  if (authenticationToken) {
    isLoggedIn = true;
  }
  return isLoggedIn;
};

const isNotLoggedIn = () => !isLoggedIn();

const userIsAuthenticatedDefaults = {
  authenticatedSelector: isLoggedIn,
  wrapperDisplayName: 'UserIsAuthenticated',
};

export const userIsAuthenticatedWrapper = connectedAuthWrapper(
  userIsAuthenticatedDefaults,
);

export const userIsAuthenticated = connectedRouterRedirect({
  ...userIsAuthenticatedDefaults,
  redirectPath: loginUrl,
  allowRedirectBack: false,
});

export const userIsNotAuthenticated = connectedRouterRedirect({
  redirectPath: publicPath,
  allowRedirectBack: false,
  authenticatedSelector: isNotLoggedIn,
  wrapperDisplayName: 'UserIsNotAuthenticated',
});

export const setAuthenticationDetails = res => {
  saveItem('token', res.token);
  saveItem('orgID', res.user.orgID);
  saveItem('user', res.user);
  saveItem('isLoggedIn', true);
};

export const removeAuthenticationDetais = () => {
  clearItem('token');
  clearItem('orgID');
  clearItem('user');
  clearItem('isLoggedIn');
  clearItem('ouId');
};

export const getAuthenticationDetails = () => ({
  token: loadItem('token'),
  orgID: loadItem('orgID'),
  user: loadItem('user'),
  ouId: loadItem('ouId'),
});
