import * as types from './constants';

export const getProducts = (query,category,skip) => {
  console.log('request');
  return {
    type: types.GET_PRODUCT_REQUEST,
    query,
    category,
    skip
  };
};

export const getProductSuccess = data => {
  console.log('Success');
  return {
    type: types.GET_PRODUCT_SUCCESS,
    payload: data,
  };
};

export const getProductFailure = error => ({
  type: types.GET_PRODUCT_FAILURE,
  payload: error,
});

