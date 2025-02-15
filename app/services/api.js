import 'whatwg-fetch';
import isEmpty from 'lodash/isEmpty';
import CapNotification from '@capillarytech/cap-ui-library/CapNotification';
import { removeAuthenticationDetais } from '../utils/authWrapper';
import config from '../config/app';
import * as requestConstructor from './requestConstructor';
// const isNil = require('lodash/isNil');

const { getAPICallObject, getBiHeaders } = requestConstructor;

let API_ENDPOINT = config.development.api_endpoint;
let API_AUTH_ENDPOINT = config.development.auth_endpoint;
let BI_API_ENDPOINT = config.development.bi_api_endpoint;
const MOCK_API_ENDPOINT = config.development.mock_endpoint;
const isProd = process.env.NODE_ENV === 'production';

if (isProd) {
  API_ENDPOINT = config.production.api_endpoint;
  API_AUTH_ENDPOINT = config.production.auth_endpoint;
  BI_API_ENDPOINT = config.production.bi_api_endpoint;
}

function parseJSON(response) {
  return response.json();
}

function redirectIfUnauthenticated(response) {
  const isUnauthorized = response.status === 401;
  const isLoginPage = window.location.pathname.indexOf('/login') !== -1;
  const isAuthUserCall =
    response.url.split('auth')[1] &&
    response.url.split('auth')[1].split('?')[0] === '/user';
  if (isUnauthorized) {
    if (isProd) {
      const originUrl = window.location.origin;
      removeAuthenticationDetais();
      window.location = `${originUrl}${config.production.logout_url}`;
    } else {
      if (isLoginPage && isAuthUserCall) return;
      removeAuthenticationDetais();
      const loginPage = `${config.development.login_url}`;
      window.location = `${loginPage}`;
    }
  }
}

function checkStatus(response) {
  if (
    (response.status >= 200 && response.status < 300) ||
    response.status === 500 ||
    response.status === 400 ||
    response.status === 403 ||
    response.status === 409
  ) {
    return response;
  }

  redirectIfUnauthenticated(response);

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function fetchWithTimeout(ms, promise) {
  //https://github.com/github/fetch/issues/175#issuecomment-125779262
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      reject({
        message: 'Request timeout',
        errorLocation: window.location.href,
      });
    }, ms);
    promise.then(resolve, reject);
  });
}
function showError(errorMessage) {
  CapNotification.error({
    message: errorMessage.message || 'Api error occured',
  });
}
function checkStatusCode(res) {
  if (res && res.code) {
    return /^[4-5][0-9][0-9]$/.test(res.code);
  }
  return false;
}
function request(url, options, timeout = 50000) {
  const fetchUrl =
    url.indexOf('?') !== -1
      ? `${url}&time=${Date.now()}`
      : `${url}?time=${Date.now()}`;
  try {
    return fetchWithTimeout(timeout, fetch(fetchUrl, options))
      .then(checkStatus)
      .then(parseJSON)
      .then(res => {
        if (!isEmpty(res.errors) || checkStatusCode(res)) {
          showError(res);
        }
        return res;
      })
      .catch(error => {
        if (error) {
          showError(error);
        }
        return error;
      });
  } catch (err) {
    if (err) {
      showError(err);
    }
    return err;
    // eslint-disable-next-line
  }
}

export const getLocizeMessage = async locale => {
  const appNameList = ['loyalty_plus'];
  const response = await Promise.all(
    appNameList.map(appName => {
      const url = `${API_AUTH_ENDPOINT}/translations/${appName}/${locale}`;
      return request(url, getAPICallObject('GET'));
    }),
  );
  let data = {};
  response.forEach(item => {
    data = {
      ...data,
      ...item,
    };
  });
  return data;
};

export const logout = () => {
  const url = `${API_AUTH_ENDPOINT}/auth/logout`;
  return request(url, getAPICallObject('GET'));
};

export const changeProxyOrg = orgId => {
  const url = `${API_AUTH_ENDPOINT}/auth/setProxy/${orgId}`;
  return request(url, getAPICallObject('Post'));
};

export const getUserData = () => {
  const url = `${API_AUTH_ENDPOINT}/auth/user`;
  return request(url, getAPICallObject('GET'));
};

export const getPrograms = () => {
  const url = `${API_ENDPOINT}/programs`;
  return request(url, getAPICallObject('GET'));
};

export const saveKpis = kpiData => {
  const url = `${API_ENDPOINT}/kpi-config`;
  return request(url, getAPICallObject('PUT', kpiData));
};

export const getLastSyncTime = () => {
  const url = `${BI_API_ENDPOINT}/data/lastsynctime`;
  return request(
    url,
    getAPICallObject('GET', null, false, { headers: getBiHeaders() }),
  );
};

export const getKpis = () => {
  const url = `${BI_API_ENDPOINT}/metadata/kpis`;
  return request(url, getAPICallObject('GET'));
};

export const getChartData = payload => {
  const url = `${BI_API_ENDPOINT}/data/reports/charts/identifier/LOYALTY_GOAL_CARDS?type=NORMAL`;
  return request(
    url,
    getAPICallObject('POST', payload, false, { headers: getBiHeaders() }),
    180000,
  );
};

export const getTrackers = ({ programId }) => {
  const url = `${API_ENDPOINT}/trackers/${programId}`;
  return request(url, getAPICallObject('GET'));
};

export const getStrategies = (programId, filter = []) => {
  let filterStr = '';
  if (filter.length) {
    filter.map(str => {
      filterStr = `${str},${filterStr}`;
    });
  }
  const url = `${API_ENDPOINT}/strategy/points/${programId}${
    filter ? `?filter=${filterStr}` : ''
  }`;
  return request(url, getAPICallObject('GET'));
};

export const getProgramFilterType = () => {
  const url = `${API_ENDPOINT}/common/entityType/PROGRAM_FILTER_TYPE`;
  return request(url, getAPICallObject('GET'));
};

export const getProgramById = programId => {
  const url = `${API_ENDPOINT}/programs/${programId}`;
  return request(url, getAPICallObject('GET'));
};

export const getTier = programId => {
  const url = `${API_ENDPOINT}/strategy/tier/${programId}`;
  return request(url, getAPICallObject('GET'));
};

export const upsertRedeemStrategy = (programId, payload) => {
  const url = `${API_ENDPOINT}/strategy/points-redemption/${programId}`;
  return request(url, getAPICallObject('POST', payload));
};

export const upsertReturnStrategy = (programId, payload) => {
  const url = `${API_ENDPOINT}/strategy/points-return/${programId}`;
  return request(url, getAPICallObject('POST', payload));
};

export const upsertExpiryStrategy = (programId, payload) => {
  const url = `${API_ENDPOINT}/strategy/points-expiry/${programId}`;
  return request(url, getAPICallObject('POST', payload));
};

export const getBookList = (query = {}) => {
  //Todo: It's mock endpoint right now, needs to change when server is ready.
  let url = `${MOCK_API_ENDPOINT}/books?`;
  url += `page=${query && query.page ? query.page : 1}`;

  if (query && query.genre) url += `&genre=${query.genre}`;

  if (query && query.authorName) url += `&authorName=${query.authorName}`;

  if (query && query.bookName) url += `&bookName=${query.bookName}`;

  return request(url, getAPICallObject('GET'));
};

export const requestBook = (query = {}) => {
  let url = `${MOCK_API_ENDPOINT}/books/reserve?user_id=${
    query.user_id
  }&book_id=${query.book_id}`;

  return request(url, getAPICallObject('PUT'));
};

export const issueBook = (query = {}) => {
  let url = `${MOCK_API_ENDPOINT}/books/issue?user_id=${
    query.user_id
  }&book_id=${query.book_id}`;

  return request(url, getAPICallObject('PUT'));
};

export const getBookRequests = query => {
  const url = `${MOCK_API_ENDPOINT}/books/requests?searchText=${query.searchText ??
    ''}&filter=${query.selectedFilter}&page=${query.page}`;
  return request(url, getAPICallObject('GET'));
};

export const addNewBookRequest = data => {
  const url = `${MOCK_API_ENDPOINT}/books/requests/new-request`;
  return request(url, getAPICallObject('POST', data));
};

export const getUserRequestedBooks = userId => {
  const url = `${MOCK_API_ENDPOINT}/books/request/${userId}`;
  return request(url, getAPICallObject('GET'));
};

export const cancelUserRequests = (userId, bookId) => {
  const url = `${MOCK_API_ENDPOINT}/books/cancel_request/${userId}/${bookId}`;
  return request(url, getAPICallObject('GET'));
};

export const getUserBorrowedBooks = userId => {
  const url = `${MOCK_API_ENDPOINT}/books/borrow/${userId}`;
  return request(url, getAPICallObject('GET'));
};

export const returnBook = (userId, bookId) => {
  const url = `${MOCK_API_ENDPOINT}/books/return/${userId}/${bookId}`;
  return request(url, getAPICallObject('GET'));
};

export const getUserNewRequestedBooks = page => {
  const url = `${MOCK_API_ENDPOINT}/books/requests?page=${page}`;
  return request(url, getAPICallObject('GET'));
};

export const cancelNewRequest = payload => {
  const url = `${MOCK_API_ENDPOINT}/books/new_request/cancel`;
  return request(url, getAPICallObject('POST', payload));
};

export const acceptNewRequest = payload => {
  const url = `${MOCK_API_ENDPOINT}/books/add_book`;
  return request(url, getAPICallObject('POST', payload));
};




