import { FromJS, fromJS } from 'immutable';
import * as types from './constants';

export const initialState = fromJS({
  error: null,
  products: null,
});

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PRODUCT_REQUEST:
      return state.set('products', null).set('error', null);
    case types.GET_PRODUCT_SUCCESS:
      return state.set('products', fromJS(action.payload));
    case types.GET_PRODUCT_FAILURE:
      return state.set('error', action.payload);
    default:
      return state;
  }
};

export default productReducer;
