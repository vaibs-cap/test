import { FromJS, fromJS } from 'immutable';
import * as types from './constants';

export const initialState = fromJS({
  error: null,
  newProduct: null,
  status: "pending"
});

const productAddReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_PRODUCT_REQUEST:
      return state.set('newProduct', null).set('error', null).set('status','pending');
    case types.SET_PRODUCT_SUCCESS:
      console.log('successs red')
      return state.set('newProduct', fromJS(action.payload)).set('status','success');
    case types.SET_PRODUCT_FAILURE:
      return state.set('error', action.payload).set('status','failure');
    case types.RESET_STATUS:
      return state.set('status',"pending");
    default:
      return state;
  }
};

export default productAddReducer;
