import { takeLatest, call, put, all } from 'redux-saga/effects';
import * as types from './constants';
import { getProductFailure, getProductSuccess } from './actions';

export function* watchForGetProducts() {
  yield takeLatest(types.GET_PRODUCT_REQUEST, getProductsSaga);
}

const getProducts = async (query,category) => {
  var url= `http://localhost:3000/products`+ (category?`/category/${category}`:"");
  console.log(url,query)
  const res = await fetch(url);
  const data = await res.json();
  console.log("data...",data.products)
  const filter = await data.products.filter(e=>e.title.toLowerCase().includes(query));
  console.log("filter...",filter)
  return filter;
};

export function* getProductsSaga(action) {
  console.log('worker');
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
