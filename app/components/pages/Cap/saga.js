import {
  fork,
  take,
  call,
  put,
  cancelled,
  cancel,
  takeLatest,
} from 'redux-saga/effects';
import * as utilsLocalStorageApi from '@capillarytech/cap-ui-utils/utils/utilsLocalStorageApi';
import * as Api from '../../../services/api';
import * as types from './constants';
import config from '../../../config/app';
import * as constants from '../App/constants';
import {
  setAuthenticationDetails,
  removeAuthenticationDetais,
} from '../../../utils/authWrapper';

const { getTopbarMenuDataValue, getSettingsMenuData } = constants;

function* authorize(user) {
  try {
    const res = yield call(Api.authorize, user);
    yield put({ type: types.LOGIN_SUCCESS, res });
  } catch (error) {
    yield put({ type: types.LOGIN_FAILURE, error });
  } finally {
    if (yield cancelled()) {
      // reducer will clear out login_progress on logout request
      // So this block is not exactly required
    }
  }
}

function* loginFlow() {
  const condition = true;
  while (condition) {
    const { user } = yield take(types.LOGIN_REQUEST);
    const task = yield fork(authorize, user);
    const action = yield take([types.LOGOUT_REQUEST, types.LOGIN_FAILURE]);
    if (action.type === types.LOGOUT_REQUEST) {
      yield cancel(task);
    }
  }
}

function* logoutFlow() {
  try {
    const serverLogout = yield call(Api.logout);
    if (serverLogout.success && serverLogout.success === true) {
      const loginUrl =
        process.env.NODE_ENV === 'production'
          ? `${config.production.login_url}`
          : `${config.development.login_url}`;
      yield [put({ type: types.LOGOUT_SUCCESS })];
      window.location.href = loginUrl;
    }
  } catch (error) {
    yield put({ type: types.LOGOUT_FAILURE, error });
  }
}

function* loginSuccess({ res }) {
  setAuthenticationDetails(res);
}

function* logoutSuccess() {
  removeAuthenticationDetais();
}

function* switchOrgSuccess({ orgID }) {
  yield call(utilsLocalStorageApi.saveItem, 'orgID', orgID);
}

export function* getSidebarMenuData() {
  try {
    yield put({
      type: types.GET_SIDEBAR_MENU_DATA_SUCCESS,
      data: getSettingsMenuData(),
    });
  } catch (error) {
    yield put({ type: types.GET_SIDEBAR_MENU_DATA_FAILURE, error });
  }
}

export function* getTopbarMenuData() {
  try {
    yield put({
      type: types.GET_TOPBAR_MENU_DATA_SUCCESS,
      data: getTopbarMenuDataValue(),
    });
  } catch (error) {
    yield put({ type: types.GET_TOPBAR_MENU_DATA_FAILURE, error });
  }
}

function* switchOrg({ orgID, successCallback }) {
  try {
    const res = yield call(Api.changeProxyOrg, orgID);
    if (res.success) yield put({ type: types.SWITCH_ORG_SUCCESS, orgID });
    if (successCallback) successCallback();
  } catch (error) {
    yield put({ type: types.SWITCH_ORG_FAILURE, error });
  }
}

export function* fetchUserInfo({ callback }) {
  try {
    const result = yield call(Api.getUserData);
    const { currentOrgDetails, user: userData, currentOrgId } = result;
    if (
      !(
        currentOrgDetails?.basic_details?.base_language !== '' ||
        currentOrgDetails?.basic_details?.base_language === null
      )
    ) {
      currentOrgDetails.basic_details.base_language = 'en';
    }
    if (!(currentOrgDetails?.basic_details?.supported_languages?.length > 0)) {
      currentOrgDetails.basic_details.supported_languages = [
        {
          lang_id: 69,
          language: 'English',
          iso_code: 'en',
        },
      ];
    }

    yield call(utilsLocalStorageApi.saveItem, 'orgID', currentOrgId);
    yield call(utilsLocalStorageApi.saveItem, 'user', userData);

    yield put({
      type: types.GET_USER_DATA_SUCCESS,
      userData,
      currentOrgId,
      currentOrgDetails,
    });
    if (callback) {
      callback(userData);
    }
  } catch (error) {
    yield put({
      type: types.GET_USER_DATA_FAILURE,
      error,
    });
  }
}

export function* getLastSyncTime() {
  try {
    const res = yield call(Api.getLastSyncTime);
    if (res?.status?.isError === false) {
      yield put({
        type: types.LAST_SYNC_TIME_SUCCESS,
        result: res?.response?.lastsynctime?.date || '',
      });
    } else {
      yield put({
        type: types.LAST_SYNC_TIME_FAILURE,
        error: res?.status?.message || res?.message,
      });
    }
  } catch (error) {
    yield put({ type: types.LAST_SYNC_TIME_FAILURE, error });
  }
}

function* watchForFetchUserInfo() {
  yield takeLatest(types.GET_USER_DATA_REQUEST, fetchUserInfo);
}

function* watchForLogoutFlow() {
  yield takeLatest(types.LOGOUT_REQUEST, logoutFlow);
}

function* watchForLoginSuccess() {
  yield takeLatest(types.LOGIN_SUCCESS, loginSuccess);
}

function* watchForLogoutSuccess() {
  yield takeLatest(types.LOGOUT_SUCCESS, logoutSuccess);
}

export function* watchGetSidebarMenuData() {
  yield takeLatest(types.GET_SIDEBAR_MENU_DATA_REQUEST, getSidebarMenuData);
}

export function* watchGetTopbarMenuData() {
  yield takeLatest(types.GET_TOPBAR_MENU_DATA_REQUEST, getTopbarMenuData);
}

function* watchForOrgChange() {
  yield takeLatest(types.SWITCH_ORG_REQUEST, switchOrg);
}

function* watchForOrgChangeSuccess() {
  yield takeLatest(types.SWITCH_ORG_SUCCESS, switchOrgSuccess);
}

export function* watchForGetLastSyncTime() {
  yield takeLatest(types.LAST_SYNC_TIME_REQUEST, getLastSyncTime);
}

export default [
  loginFlow,
  watchForLogoutFlow,
  watchForLoginSuccess,
  watchForLogoutSuccess,
  watchGetSidebarMenuData,
  watchGetTopbarMenuData,
  watchForOrgChange,
  watchForFetchUserInfo,
  watchForOrgChangeSuccess,
  watchForGetLastSyncTime,
];
