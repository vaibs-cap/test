import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as Api from '../../../services/api';
import * as types from './constants';

const token = localStorage.getItem('token');
export function* getBookRequests(action) {
  try {
    const res = yield call(Api.getBookRequests, action.payload, token);
    if (res?.success) {
      yield put({
        type: types.FETCH_ALL_BOOK_REQUESTS_SUCCESS,
        result: res?.result || [],
        totalCount: res?.totalRequests || 0,
      });
    } else {
      yield put({
        type: types.FETCH_ALL_BOOK_REQUESTS_FAILURE,
        error: res?.error || res?.message,
      });
    }
  } catch (error) {
    yield put({ type: types.FETCH_ALL_BOOK_REQUESTS_FAILURE, error });
  }
}

export function* watchForGetBookRequests() {
  yield takeLatest(types.FETCH_ALL_BOOK_REQUESTS_REQUEST, getBookRequests);
}

export function* addNewBookRequest(action) {
  try {
    const res = yield call(Api.addNewBookRequest, action.payload, token);
    if (res?.success) {
      yield put({
        type: types.ADD_NEW_BOOK_REQUEST_SUCCESS,
        result: res?.result || {},
      });
    } else {
      yield put({
        type: types.ADD_NEW_BOOK_REQUEST_FAILURE,
        error: res?.error || res?.message,
      });
    }
  } catch (error) {
    yield put({ type: types.ADD_NEW_BOOK_REQUEST_FAILURE, error });
  }
}

export function* watchForAddNewBookRequest() {
  yield takeLatest(types.ADD_NEW_BOOK_REQUEST_REQUEST, addNewBookRequest);
}

export default function*() {
  yield all([watchForGetBookRequests(), watchForAddNewBookRequest()]);
}
