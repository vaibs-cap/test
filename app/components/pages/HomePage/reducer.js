import { fromJS } from 'immutable';
import { FromJS } from 'immutable';
import * as types from './constant';
import { ISSUE_BOOK, RESERVE_BOOK } from './constant';

export const initialState = fromJS({
  allBookList: [],
  totalBooks: 0,
  isLoading: false,
  error: null,
});

const bookListReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_ALL_BOOKLIST_SUCCESS:
      return state
        .set('allBookList', action.result.result)
        .set('totalBooks', action.result.totalBooks);
    case types.FETCH_ALL_BOOKLIST_FAILED:
      return state.set('allBookList', []).set('error', action.error);
    case types.SET_LOADING_STATE:
      return state.set('isLoading', action.loadingState);

    case ISSUE_BOOK:
      return {
        allBookList: state.allBookList.map(book => {
          if (book.book_id === action.payload) {
            return {
              ...book,
              current_count: book.current_count - 1,
            };
          }
          return book;
        }),
      };

    default:
      return state;
  }
};

export default bookListReducer;
