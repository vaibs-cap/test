import {
  CANCEL_USER_REQUESTED_BOOKS,
  CANCEL_USER_REQUESTED_BOOKS_FAILURE,
  CANCEL_USER_REQUESTED_BOOKS_SUCCESS,
  FETCH_USER_REQUESTED_BOOKS,
  FETCH_USER_REQUESTED_BOOKS_FAILURE,
  FETCH_USER_REQUESTED_BOOKS_SUCCESS,
} from '../constants';

export const fetchUserRequestedBooks = () => ({
  type: FETCH_USER_REQUESTED_BOOKS,
});

export const fetchUserRequestedBooksSuccess = () => ({
  type: FETCH_USER_REQUESTED_BOOKS_SUCCESS,
});

export const fetchUserRequestedBooksFailure = () => ({
  type: FETCH_USER_REQUESTED_BOOKS_FAILURE,
});

export const cancelUserRequestedBooks = (bookId) => ({
  type: CANCEL_USER_REQUESTED_BOOKS,
  payload: bookId,
});

export const cancelUserRequestedBooksSuccess = () => ({
  type: CANCEL_USER_REQUESTED_BOOKS_SUCCESS,
});

export const cancelUserRequestedBooksFailure = () => ({
  type: CANCEL_USER_REQUESTED_BOOKS_FAILURE,
});
