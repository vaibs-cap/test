import * as types from './constant';

export const fetchBookList = (payload = {}) => ({
  type: types.FETCH_ALL_BOOKLIST,
  payload,
});

export const fetchBookListSuccess = result => ({
  type: types.FETCH_ALL_BOOKLIST_SUCCESS,
  result,
});

export const fetchBookListFAiled = error => ({
  type: types.FETCH_ALL_BOOKLIST_FAILED,
  error,
});

export const setLoadingState = loadingState => ({
  type: types.SET_LOADING_STATE,
  loadingState,
});

export function issueBook(book_id) {
  return {
    type: ISSUE_BOOK,
    payload: book_id,
  };
}

export function issueBookSuccess(book_id) {
  return {
    type: types.ISSUE_BOOK_SUCCESS,
    payload: book_id,
  };
}

export function issueBookFailure(error) {
  return {
    type: types.ISSUE_BOOK_FAILED,
    payload: error,
  };
}
