import { call, put, takeLatest } from 'redux-saga/effects';
import { FETCH_ALL_BOOKLIST, ISSUE_BOOK, RESERVE_BOOK } from './constant';
import {
  fetchBookListSuccess,
  fetchBookListFailed,
  setLoadingState,
  issueBookSuccess,
  issueBookFailure,
  reserveBookSuccess,
  reserveBookFailure,
} from './actions';
import { getBookList, requestBook } from '../../../services/api';

export function* getBookListSaga(action) {
  try {
    const bookList = yield call(getBookList, action.payload);
    yield put(setLoadingState(true));
    yield put(fetchBookListSuccess(bookList));
    yield put(setLoadingState(false));
  } catch (e) {
    yield put(setLoadingState(false));
    yield put(fetchBookListFailed(e));
  }
}

export function* issueBookSaga(action) {
  try {
    yield put(setLoadingState(true));
    yield put(issueBookSuccess(action.payload)); //write api calls
    yield put(setLoadingState(false));
  } catch (e) {
    yield put(setLoadingState(false));
    yield put(issueBookFailure(e));
  }
}

export function* reserveBookSaga(action) {
  try {
    yield call(requestBook, action.payload);
    yield put(setLoadingState(true));
    yield put(reserveBookSuccess(action.payload));
    yield put(setLoadingState(false));
  } catch (e) {
    yield put(setLoadingState(false));
    yield put(reserveBookFailure(e));
  }
}

export function* watchForBookListSaga() {
  yield takeLatest(FETCH_ALL_BOOKLIST, getBookListSaga);
  yield takeLatest(ISSUE_BOOK, issueBookSaga);
  yield takeLatest(RESERVE_BOOK, reserveBookSaga);
}
