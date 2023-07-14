import { takeLatest, call, put, all } from 'redux-saga/effects';
import { delay } from "redux-saga";
import * as types from './constants';
import { getProductFailure, getProductSuccess } from './actions';

export function* watchForGetProducts() {
  yield takeLatest(types.GET_PRODUCT_REQUEST, getProductsSaga);
}

export const getProducts = async (query,category,skip) => {
  var url= `http://localhost:3000/products`+ (category ?`/category/${category}`:"")+`?limit=10&skip=${(skip-1)*10}`;
  console.log("debounced")
  const res = await fetch(url);
  const data = await res.json();
  const filter = await data.products.filter(e=>e.title.toLowerCase().includes(query));
  const total=data.total;
  return ({total:total,data:filter});
  // const total=filter.length;
  // return ({total:total,data:filter.slice(0,10)});
};

export function* getProductsSaga(action) {
  console.log('workerSaga');
  // yield delay(500);
  try {
    const data = yield call(getProducts, action.query,action.category,action.skip);
    console.log('fetched', data);
    yield put(getProductSuccess(data));
  } catch (error) {
    yield put(getProductFailure(error));
  }
}

export default function*() {
  yield all([watchForGetProducts()]);
}
