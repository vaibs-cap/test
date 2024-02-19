import { call, put, takeLatest } from 'redux-saga/effects';
import { FETCH_ALL_BOOKLIST, GET_BOOK } from './constant';
import {
  fetchBookListSuccess,
  fetchBookListFAiled,
  setLoadingState,
  getBook,
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

// export function* issueSaga(action) {
//   console.log('*******saga is getting called');
//   const book_id = action.payload;

//   yield put(getBook(book_id));
// }

// export function* watchForIssueSaga() {
//   console.log('*******saga is getting called');
//   yield takeLatest(GET_BOOK, getBookSaga);
// }

export function* watchForBookListSaga() {
  yield takeLatest(FETCH_ALL_BOOKLIST, getBookListSaga);
}

export function* issueSaga(action) {
  try {
    console.log('*******saga is getting called');
    const book_id = action.payload;

    yield put(getBook(book_id));
  } catch (error) {
    console.error('Error in issueSaga:', error);
  }
}

export function* watchForIssueSaga() {
  try {
    console.log('*******saga is getting called');
    yield takeLatest(GET_BOOK, issueSaga);
  } catch (error) {
    console.error('Error in watchForIssueSaga:', error);
  }
}
