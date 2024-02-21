import axios from 'axios';
import { put, call, takeLatest, all } from 'redux-saga/effects';
import {
  cancelUserRequestedBooksFailure,
  cancelUserRequestedBooksSuccess,
  fetchUserRequestedBooksFailure,
  fetchUserRequestedBooksSuccess,
} from './actions';
import {
  CANCEL_USER_REQUESTED_BOOKS,
  FETCH_USER_REQUESTED_BOOKS,
  FETCH_USER_REQUESTED_BOOKS_FAILURE,
  FETCH_USER_REQUESTED_BOOKS_SUCCESS,
} from './constants';
import * as Api from '../../../services/api';
// Fetch Reserved/Requested Books of a user
export function* onFetchUserRequestedBooks() {

  try {
    const res = yield call(
      Api.getUserRequestedBooks('ijfojiwg'),
      action.payload,
    );
    console.log('api**************: ', res);
    if (res?.success) {
      yield put({
        type: FETCH_USER_REQUESTED_BOOKS_SUCCESS,
        // result: res?.result || [],
        // totalCount: res?.totalRequests || 0,
      });
    } else {
      yield put({
        type: FETCH_USER_REQUESTED_BOOKS_FAILURE,
        error: res?.error || res?.message,
      });
    }
  } catch (error) {
    console.log('##########');
    yield put({ type: FETCH_USER_REQUESTED_BOOKS_FAILURE, error });
  }
}

export function* fetchUserRequestedBooksSaga() {
  yield takeLatest(FETCH_USER_REQUESTED_BOOKS, onFetchUserRequestedBooks);
}

// Cancel Reserved/Requested book of a user
// function* onCancelUserRequestedBooks(action) {
//   try {
//     const res = yield call(axios.delete, ``);

//     yield put(cancelUserRequestedBooksSuccess(res.data));
//   } catch (err) {
//     yield put(cancelUserRequestedBooksFailure(err));
//   }
// }

// export function* cancelUserRequestedBooksSaga() {
//   yield takeLatest(CANCEL_USER_REQUESTED_BOOKS, action =>
//     onCancelUserRequestedBooks(action),
//   );
// }

export default function*() {
  yield all([fetchUserRequestedBooksSaga()]);
}
