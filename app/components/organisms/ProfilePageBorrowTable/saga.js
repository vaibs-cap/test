import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as Api from '../../../services/api';
import * as types from './constants';

export function* getBookRequests() {
  try {
    const res = yield call(Api.getUserBookRequests);
    console.log('RESLT: ', res.status);
    if (res?.success) {
      yield put({
        type: types.FETCH_USER_BORROWED_BOOKS_SUCCESS,
        result: res?.result || [],
      });
    } else {
      yield put({
        type: types.FETCH_USER_BORROWED_BOOKS_FAILURE,
        error: res?.error || res?.message,
      });
    }
  } catch (error) {
    yield put({ type: types.FETCH_USER_BORROWED_BOOKS_FAILURE, error });
  }
}

export function* watchForGetBookRequests() {
  yield takeLatest(types.FETCH_USER_BORROWED_BOOKS, getBookRequests);
}

export default function*() {
  yield all([watchForGetBookRequests()]);
}
