import { takeLatest, call, put, all } from 'redux-saga/effects';
import * as types from './constants';
import { getProductFailure, getProductSuccess } from './actions';

export function* watchForGetProducts() {
  yield takeLatest(types.GET_PRODUCT_REQUEST, getProductsSaga);
}

export const getProducts = async (query,category) => {
  var url= `http://localhost:3000/products`+ (category?`/category/${category}`:"");
  const res = await fetch(url);
  const data = await res.json();
  const filter = await data.products.filter(e=>e.title.toLowerCase().includes(query));
  return filter;
};

export function* getProductsSaga(action) {
  console.log('workerSaga');
  try {
    const data = yield call(getProducts, action.query,action.category);
    console.log('fetched', data);
    yield put(getProductSuccess(data));
  } catch (error) {
    yield put(getProductFailure(error));
  }
}

export default function*() {
  yield all([watchForGetProducts()]);
}
