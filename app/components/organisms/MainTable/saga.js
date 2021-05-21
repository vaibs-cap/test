import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as Api from '../../../services/api';
import * as types from './constants';

export function* getPrograms() {
  try {
    const res = yield call(Api.getPrograms);
    console.log('RESLT: ', res);
    if (res?.success) {
      yield put({
        type: types.GET_PROGRAMS_SUCCESS,
        result: res?.result || [],
      });
    } else {
      yield put({
        type: types.GET_PROGRAMS_FAILURE,
        error: res?.error || res?.message,
      });
    }
  } catch (error) {
    yield put({ type: types.GET_PROGRAMS_FAILURE, error });
  }
}

export function* watchForGetPrograms() {
  yield takeLatest(types.GET_PROGRAMS_REQUEST, getPrograms);
}

export default function*() {
  yield all([watchForGetPrograms()]);
}
