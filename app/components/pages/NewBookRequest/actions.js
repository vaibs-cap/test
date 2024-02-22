import * as types from './constants';

export const fetchAllBookRequestsRequest = query => {
  return {
    type: types.FETCH_ALL_BOOK_REQUESTS_REQUEST,
    payload: query,
  };
};

export const fetchAllBookRequestsSuccess = data => ({
  type: types.FETCH_ALL_BOOK_REQUESTS_SUCCESS,
  payload: data,
});

export const fetchAllBookRequestsFailure = () => ({
  type: types.FETCH_ALL_BOOK_REQUESTS_FAILURE,
});

export const addNewBookRequestRequest = data => ({
  type: types.ADD_NEW_BOOK_REQUEST_REQUEST,
  payload: data,
});

export const addNewBookRequestSuccess = data => ({
  type: types.ADD_NEW_BOOK_REQUEST_SUCCESS,
  payload: data,
});

export const addNewBookRequestFailure = () => ({
  type: types.ADD_NEW_BOOK_REQUEST_FAILURE,
});

export const removeError = () => ({
  type: types.REMOVE_ERROR,
});
