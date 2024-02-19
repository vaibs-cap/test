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
