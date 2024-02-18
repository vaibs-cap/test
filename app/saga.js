import { all } from 'redux-saga/effects';
import { watchForBookListSaga } from './components/pages/HomePage/saga';

export default function*() {
  yield all([watchForBookListSaga()]);
}
