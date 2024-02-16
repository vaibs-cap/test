import { call, put, takeLatest, all } from 'redux-saga/effects';
import { FETCH_ALL_BOOKLIST } from './constant';
import { fetchBookListSuccess, fetchBookListFAiled } from './actions';
import { getBookList } from '../../../services/api';

export function* getBookListSaga() {
  try {
    const bookList = yield call(getBookList);
    yield put(fetchBookListSuccess(bookList));
  } catch (e) {
    yield put(fetchBookListFAiled(e));
  }
}

export function* watchForBookListSaga() {
  yield takeLatest(FETCH_ALL_BOOKLIST, getBookListSaga);
}

export default function*() {
  yield all([watchForBookListSaga]);
}
