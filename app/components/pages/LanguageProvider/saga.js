import { takeLatest, call, put } from 'redux-saga/effects';
import * as Api from '../../../services/api';
import * as types from './constants';

export function* getLocizeMessage({ locale, callback }) {
  try {
    const result = yield call(Api.getLocizeMessage, locale);
    if (callback) {
      callback(locale);
    }
    yield [
      put({
        type: types.GET_LOCIZE_MESSAGE_SUCCESS,
        data: result,
        locale,
      }),
    ];
  } catch (error) {
    yield [
      put({
        type: types.GET_LOCIZE_MESSAGE_FAILURE,
        data: error,
      }),
    ];
  }
}
export function* watchGetLocizeMessage() {
  yield takeLatest(types.GET_LOCIZE_MESSAGE_REQUEST, getLocizeMessage);
}

export default [{ key: 'language', saga: watchGetLocizeMessage }];
