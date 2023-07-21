import { takeLatest, call, put, all } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import * as types from './constants';
import { getProductFailure, getProductSuccess ,getCategorySuccess,getCategoryFailure} from './actions';

export function* watchForGetProducts() {
  yield takeLatest(types.GET_PRODUCT_REQUEST, getProductsSaga);
}

export const getProducts = async (query, category, skip) => {
  var url = `http://localhost:3000/products${
    category ? `/category/${category}` : ''
  }?limit=10&skip=${(skip - 1) * 10}`;
  console.log(url);
  const res = await fetch(url);
  const data = await res.json();
  const filter = await data.products.filter(e =>
    e.title.toLowerCase().includes(query),
  );
  const total = data.total;
  return { total: total, data: filter };
};

export function* getProductsSaga(action) {
  console.log('workerSaga');
  // yield delay(500);
  try {
    const data = yield call(
      getProducts,
      action.query,
      action.category,
      action.skip,
    );
    yield put(getProductSuccess(data));
  } catch (error) {
    yield put(getProductFailure(error));
  }
}

export function* watchForGetCategory() {
  yield takeLatest(types.GET_CATEGORY_REQUEST, getCategorySaga);
}

export const getCategory = async () => {
  var url = 'http://localhost:3000/products/categories';
  const res = await fetch(url);
  const data = await res.json();
  console.log("CATfn")
  return data;
};

export function* getCategorySaga() {
  console.log('CATworkerSaga');
  // yield delay(500);
  try {
    const data = yield call(
      getCategory);
    yield put(getCategorySuccess(data));
  } catch (error) {
    yield put(getCategoryFailure(error));
  }
}

export default function*() {
  yield all([watchForGetProducts(),watchForGetCategory()]);
}
