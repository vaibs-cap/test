import productReducer from '../reducer';
import * as types from '../constants';
import { fromJS } from 'immutable';

const error = new Error('error');

describe('getProductsReducer', () => {
  it('it handles the reducer with default type', () => {
    expect(productReducer(undefined, {})).toEqual(fromJS({
      error: null,
      products: null,
    }));
  });

  it('it handles the GET_PRODUCT_REQUEST action', () => {
    const action = {
      type: types.GET_PRODUCT_REQUEST,
    };
    expect(productReducer(undefined, action)).toEqual(fromJS({
        error: null,
        products: null,
    }));
  });

  it('it handles the GET_PRODUCT_SUCCESS action', () => {
    const action = {
      type: types.GET_PRODUCT_SUCCESS,
      payload: [],
    };
    expect(productReducer(undefined, action)).toEqual(fromJS({
      products:[],
      error:null,
    }));
  });

  it('it handles the GET_PRODUCT_FAILURE action', () => {
    const action = {
      type: types.GET_PRODUCT_FAILURE,
      payload:"failure",
    };
    expect(productReducer(undefined, action)).toEqual(fromJS({
      error:"failure",
      products:null,
    }));
  });
});
