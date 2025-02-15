import get from 'lodash/get';
import * as authWrapper from '../utils/authWrapper';
import * as localStorageApi from './localStorageApi';

const { loadItem } = localStorageApi;
const { getAuthenticationDetails } = authWrapper;

const isProd = process.env.NODE_ENV === 'production';

export function getAPICallObject(
  method,
  body,
  isFileUpload = false,
  apiConfigs,
) {
  const { token, orgID, user, ouId } = getAuthenticationDetails();
  let headers;
  if (isFileUpload) {
    headers = {};
  } else {
    headers = {
      'Content-Type': 'application/json',
    };
  }

  if (user && user.refID) {
    headers['X-CAP-REMOTE-USER'] = user.refID;
  }

  if (process.env.NODE_ENV !== 'production' && orgID !== undefined) {
    headers['X-CAP-API-AUTH-ORG-ID'] = orgID;
  }

  if (ouId !== undefined) {
    headers['x-cap-api-auth-ou-id'] = ouId;
  }

  if (process.env.NODE_ENV !== 'production' && token !== undefined) {
    headers.Authorization = `Bearer ${token}`;
  }
  headers.authentication = localStorage.getItem('token');
  if (get(apiConfigs, 'headers')) {
    const configHeaders = apiConfigs.headers;
    headers = { ...headers, ...configHeaders };
  }

  const requestObj = {
    method,
    mode: 'cors',
    headers: new Headers(headers),
  };

  if (isProd) {
    requestObj.credentials = 'same-origin';
  }

  if (body && !isFileUpload) {
    requestObj.body = JSON.stringify(body);
  } else if (body && isFileUpload) {
    requestObj.body = body;
  }
  return requestObj;
}

export function getBiHeaders() {
  const orgID = loadItem('orgID');
  const headers = {};
  headers['X-CAP-API-DATA-CONTEXT-ORG-ID'] = orgID;
  return headers;
}
