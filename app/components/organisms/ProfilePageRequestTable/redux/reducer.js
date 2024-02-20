import { fromJS } from 'immutable';
import {
  CANCEL_USER_REQUESTED_BOOKS,
  FETCH_USER_REQUESTED_BOOKS,
} from '../constants';
import bookData from '../../../pages/ProfilePage/bookData';


const initialState = fromJS({
  userRequestedBooks: [
    {
      book_id: '2',
      request_date: '2024-02-10',
    },
    {
      book_id: '9',
      request_date: '2024-02-15',
    },
  ],
  // userRequestedBooks:bookData[0].users[0].requested_books,
  loading: true,
  errors: []
});

export const profilePageRequestReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUESTED_BOOKS:
      return state;

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
