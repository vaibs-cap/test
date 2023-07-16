import productAddReducer from '../reducer';
import * as types from '../constants';
import { fromJS } from 'immutable';

const error = new Error('error');

describe('AddProductsReducer', () => {
  it('it handles the reducer with default type', () => {
    expect(productAddReducer(undefined, {})).toEqual(fromJS({
        error: null,
        newProduct: null,
        status: "pending"
    }));
  });

  it('it handles the SET_PRODUCT_REQUEST action', () => {
    const action = {
      type: types.SET_PRODUCT_REQUEST,
    };
    expect(productAddReducer(undefined, action)).toEqual(fromJS({
        error: null,
        newProduct: null,
        status: "pending"
    }));
  });

  it('it handles the SET_PRODUCT_SUCCESS action', () => {
    const action = {
      type: types.SET_PRODUCT_SUCCESS,
      payload: [],
    };
    expect(productAddReducer(undefined, action)).toEqual(fromJS({
        error: null,
        newProduct: [],
        status: "success"
    }));
  });

  it('it handles the SET_PRODUCT_FAILURE action', () => {
    const action = {
      type: types.SET_PRODUCT_FAILURE,
      payload:"failure",
    };
    expect(productAddReducer(undefined, action)).toEqual(fromJS({
        error: 'failure',
        newProduct: null,
        status: "failure"
    }));
  });

  it('it handles the RESET_STATUS action', () => {
    const action = {
      type: types.RESET_STATUS,
    };
    expect(productAddReducer(undefined, action)).toEqual(fromJS({
        error: null,
        newProduct: null,
        status: "pending"
    }));
  });
});
