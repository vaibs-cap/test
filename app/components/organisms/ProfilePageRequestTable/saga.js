import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';
import {
  fetchUserRequestedBooksFailure,
  fetchUserRequestedBooksSuccess,
} from './actions';
import { FETCH_USER_REQUESTED_BOOKS } from './constants';

function* onFetchUserRequestedBooks() {
  try {
    const res = yield call(axios.get, ['']);
    yield put(fetchUserRequestedBooksSuccess(res.data));
    console.log('******', res.data);
  } catch (err) {
    yield put(fetchUserRequestedBooksFailure(err));
    console.log('(((((((', err);
  }
}

export function* fetchUserRequestedBooksSaga() {
  yield takeLatest(FETCH_USER_REQUESTED_BOOKS, onFetchUserRequestedBooks);
}
