import * as types from './constants';

export const fetchUserNewRequestedBooks = () => ({
  type: types.FETCH_USER_NEW_REQUESTED_BOOKS,
});

export const fetchUserNewRequestedBooksSuccess = data => ({
  type: types.FETCH_USER_NEW_REQUESTED_BOOKS_SUCCESS,
  payload: data,
});

export const fetchUserNewRequestedBooksFailure = data => ({
  type: types.FETCH_USER_NEW_REQUESTED_BOOKS_FAILURE,
  payload: data,
});

export const cancelUserNewRequestedBooks = () => ({
  type: types.CANCEL_USER_NEW_REQUESTED_BOOKS,
});

export const cancelUserNewRequestedBooksSuccess = data => ({
  type: types.CANCEL_USER_NEW_REQUESTED_BOOKS_SUCCESS,
  payload: data,
});

export const cancelUserNewRequestedBooksFailure = data => ({
  type: types.CANCEL_USER_NEW_REQUESTED_BOOKS_FAILURE,
  payload: data,
});
