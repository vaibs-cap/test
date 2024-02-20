import { call, put, takeLatest } from 'redux-saga/effects';
import { FETCH_ALL_BOOKLIST, GET_BOOK, ISSUE_BOOK } from './constant';
import {
  fetchBookListSuccess,
  fetchBookListFailed,
  setLoadingState,
  getBook,
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
  yield takeLatest(ISSUE_BOOK, issueBookSaga);
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
