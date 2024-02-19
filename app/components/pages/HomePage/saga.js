import { call, put, takeLatest } from 'redux-saga/effects';
import { FETCH_ALL_BOOKLIST, ISSUE_BOOK } from './constant';
import {
  fetchBookListSuccess,
  fetchBookListFailed,
  setLoadingState,
  issueBookSuccess,
  issueBookFailure,
} from './actions';
import { getBookList } from '../../../services/api';

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
    yield put(issueBookSuccess(action.payload.book_id));
    yield put(setLoadingState(false));
  } catch (e) {
    yield put(setLoadingState(false));
    yield put(issueBookFailure(e));
  }
}

export function* watchForBookListSaga() {
  yield takeLatest(FETCH_ALL_BOOKLIST, getBookListSaga);
  yield takeLatest(ISSUE_BOOK, issueBookSaga);
}
