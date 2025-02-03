import { all } from 'redux-saga/effects';
import { watchForBookListSaga } from './components/pages/HomePage/saga';
import { watchFetchExpenseRequests } from './components/pages/ExpenseTrackerHome/saga';
import { watchDeleteExpenseRequests } from './components/pages/ExpenseTrackerHome/saga';

export default function*() {
  yield all([watchForBookListSaga(),
    watchFetchExpenseRequests(),
    watchDeleteExpenseRequests(),
  ]);
}
