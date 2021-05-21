import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as Api from '../../../services/api';
import * as types from './constants';

export function* testDashboard() {
  console.log('test dashboard saga');
}

export function* watchForTestDashboard() {
  yield takeLatest(types.TEST_DASHBOARD_REQUEST, testDashboard);
}

export default function*() {
  yield all([watchForTestDashboard()]);
}
