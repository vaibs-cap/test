import productReducer from '../reducer';
import * as types from '../constants';

const error = new Error('error');

describe('ConfigureKPI Reducer', () => {
  it('it handles the reducer with default type', () => {
    expect(productReducer(undefined, {})).toMatchSnapshot();
    expect(productReducer({}, {})).toEqual({});
  });

  it('it handles the GET_PRODUCT_REQUEST action', () => {
    const action = {
      type: types.GET_PRODUCT_REQUEST,
    };
    expect(productReducer({}, action)).toEqual({
        error: null,
        products: null,
    });
  });

  it('it handles the GET_PRODUCT_SUCCESS action', () => {
    const action = {
      type: types.GET_PRODUCT_SUCCESS,
      payload: [],
    };
    expect(productReducer({}, action)).toEqual({
      products:[],
    });
  });

  it('it handles the GET_PRODUCT_FAILURE action', () => {
    const action = {
      type: types.GET_PRODUCT_FAILURE,
      error,
    };
    expect(productReducer({}, action)).toEqual({
      error:[]
    });
  });
});
