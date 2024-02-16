import * as types from './constant';

export const fetchBookList = () => ({
  type: types.FETCH_ALL_BOOKLIST,
});

export const fetchBookListSuccess = result => ({
  type: types.FETCH_ALL_BOOKLIST_SUCCESS,
  result,
});

export const fetchBookListFAiled = error => ({
  type: types.FETCH_ALL_BOOKLIST_FAILED,
  error,
});
