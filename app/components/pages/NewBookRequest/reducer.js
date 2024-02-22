import { fromJS } from 'immutable';
import * as types from './constants';
export const initialState = fromJS({
  bookRequests: [],
  totalCount: 0,
  loading: false,
  error: null,
});

const newBookRequestsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_ALL_BOOK_REQUESTS_REQUEST:
      return state.set('loading', true).set('error', null);
    case types.FETCH_ALL_BOOK_REQUESTS_SUCCESS:
      return state
        .set('loading', false)
        .set('bookRequests', fromJS(action.result))
        .set('totalCount', action.totalCount)
        .set('error', null);
    case types.FETCH_ALL_BOOK_REQUESTS_FAILURE:
      return state.set('loading', false).set('error', action.error);

    case types.ADD_NEW_BOOK_REQUEST_REQUEST:
      return state.set('loading', true).set('error', null);
    case types.ADD_NEW_BOOK_REQUEST_SUCCESS:
      return state
        .set('loading', false)
        .set(
          'bookRequests',
          state.get('bookRequests').unshift(fromJS(action.result)),
        )
        .set('error', null);
    case types.ADD_NEW_BOOK_REQUEST_FAILURE:
      return state.set('loading', false).set('error', action.error);

    case types.REMOVE_ERROR:
      return state.set('error', null);
    default:
      return state;
  }
};

export default newBookRequestsReducer;
