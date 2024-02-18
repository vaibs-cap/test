import { fromJS } from 'immutable';
import * as types from './constant';

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
    default:
      return state;
  }
};

export default bookListReducer;
