import { fromJS } from 'immutable';
import {
  CANCEL_USER_REQUESTED_BOOKS,
  FETCH_USER_REQUESTED_BOOKS,
} from '../constants';
import bookData from '../../../pages/ProfilePage/bookData';

export const initialState = fromJS({
  userRequestedBooks: bookData[0].users[0].requested_books,
  loading: true,
  errors: null,
});

export const profilePageRequestReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUESTED_BOOKS:
      return state.set('loading', true);

    case CANCEL_USER_REQUESTED_BOOKS:
      const arr = state.get('userRequestedBooks');
      console.log('Curr', arr);
      const newState = arr.filter(reqBook => action.payload != reqBook.book_id);

      console.log('new', newState);
      return state.set('userRequestedBooks', newState);

    default:
      return state;
  }
};

export default profilePageRequestReducer;
