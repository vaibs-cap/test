import { call, put, takeLatest } from 'redux-saga/effects';
import { FETCH_ALL_BOOKLIST } from './constant';
import {
  fetchBookListSuccess,
  fetchBookListFAiled,
  setLoadingState,
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
    yield put(fetchBookListFAiled(e));
  }
}

export function* watchForBookListSaga() {
  yield takeLatest(FETCH_ALL_BOOKLIST, getBookListSaga);
}
