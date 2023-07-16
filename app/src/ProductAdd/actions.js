import * as types from './constants';

export const setProducts = (formData) => {
  console.log('request');
  return {
    type: types.SET_PRODUCT_REQUEST,
    formData
  };
};

export const setProductSuccess = data => {
  console.log('Success');
  return {
    type: types.SET_PRODUCT_SUCCESS,
    payload: data,
  };
};

export const setProductFailure = error => ({
  type: types.SET_PRODUCT_FAILURE,
  payload: error,
});


export const resetProductStatus = () => ({
  type: types.RESET_STATUS,
});
