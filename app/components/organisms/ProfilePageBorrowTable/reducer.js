import { fromJS } from 'immutable';
import * as types from './constants';
import bookData from '../../pages/ProfilePage/bookData';

export const initialState = fromJS({
  userBorrowedBooks:[],
  loading: false,
  error: null,
});

export const profilePageBorrowedReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_USER_BORROWED_BOOKS:
      return state.set('loading', true);
    case types.FETCH_USER_BORROWED_BOOKS_SUCCESS:
      return state
        .set('loading', false)
        .set('userBorrowedBooks', action.payload);
    case types.FETCH_USER_BORROWED_BOOKS_FAILURE:
      return state.set('loading', false).set('error', action.payload);

    case types.RETURN_USER_BORROWED_BOOKS:
      return state.set('loading', true);
    case types.RETURN_USER_BORROWED_BOOKS_SUCCESS:
      return state.set('loading', false);
    case types.RETURN_USER_BORROWED_BOOKS_FAILURE:
      return state.set('loading', false).set('error', action.payload);
    
    default:
      return state;
  }
};
