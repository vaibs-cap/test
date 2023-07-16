import { takeLatest, call, put, all } from 'redux-saga/effects';
import { delay } from "redux-saga";
import * as types from './constants';
import { setProductFailure, setProductSuccess } from './actions';

export function* watchForSetProducts() {
  yield takeLatest(types.SET_PRODUCT_REQUEST, setProductsSaga);
}

export const setProducts = async (formData) => {
  if(formData.stock=='0')
    throw new Error;
  const res = await fetch('https://dummyjson.com/products/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  })
  const data = await res.json();
  return data;
};

export function* setProductsSaga(action) {
  console.log('workerSaga');
  // yield delay(500);
  try {
    const data = yield call(setProducts, action.formData);
    console.log('fetched', data);
    yield put(setProductSuccess(data));
  } catch (error) {
    yield put(setProductFailure(error));
  }
}

export default function*() {
  yield all([watchForSetProducts()]);
}
