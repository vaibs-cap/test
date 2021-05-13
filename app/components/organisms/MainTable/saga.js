import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as Api from '../../../services/api';
import * as types from './constants';

export function* getPrograms() {
  try {
    const res = yield call(Api.getPrograms);
    if (res.success) {
      yield put({
        type: types.GET_PROGRAMS_SUCCESS,
        result: res?.result || [],
      });
    } else {
      yield put({
        type: types.GET_PROGRAMS_FAILURE,
        error: res?.error || res?.message,
      });
    }
  } catch (error) {
    yield put({ type: types.GET_PROGRAMS_FAILURE, error });
  }
}

export function* getUsersByIds({ userIds }) {
  try {
    const res = yield call(Api.getUsersByIds, { userIds });
    if (res?.success) {
      yield [
        put({
          type: types.GET_USER_LIST_SUCCESS,
          result: res?.result || [],
        }),
      ];
    } else {
      yield [
        put({
          type: types.GET_USER_LIST_FAILURE,
          error: res?.error || res?.message,
        }),
      ];
    }
  } catch (error) {
    yield [
      put({
        type: types.GET_USER_LIST_FAILURE,
        error,
      }),
    ];
  }
}

export function* getEMFStatus() {
  try {
    const res = yield call(Api.getEMFStatus);
    if (res?.success) {
      yield put({
        type: types.GET_EMF_STATUS_SUCCESS,
        result: res?.result?.[0] || {},
      });
    } else {
      yield put({
        type: types.GET_EMF_STATUS_FAILURE,
        error: res?.error || res?.message,
      });
    }
  } catch (error) {
    yield put({ type: types.GET_EMF_STATUS_FAILURE, error });
  }
}

export function* watchForGetPrograms() {
  yield takeLatest(types.GET_PROGRAMS_REQUEST, getPrograms);
}

export function* watchForGetUsersByIds() {
  yield takeLatest(types.GET_USER_LIST_REQUEST, getUsersByIds);
}

export function* watchForEMFStatus() {
  yield takeLatest(types.GET_EMF_STATUS_REQUEST, getEMFStatus);
}

export default function*() {
  yield all([
    watchForGetPrograms(),
    watchForGetUsersByIds(),
    watchForEMFStatus(),
  ]);
}
