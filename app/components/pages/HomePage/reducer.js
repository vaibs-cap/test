import { fromJS } from 'immutable';
import * as types from './constant';

export const initialState = fromJS({
  allBookList: [],
  error: null,
});

const bookListReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_ALL_BOOKLIST_SUCCESS:
      return state.set('allBookList', action.result).set('error', null);
    case types.FETCH_ALL_BOOKLIST_FAILED:
      return state.set('allBookList', []).set('error', action.error);
    default:
      return state;
  }
};

export default bookListReducer;
