import { all } from 'redux-saga/effects';
import { watchForBookListSaga } from './components/pages/HomePage/saga';
import { watchFetchExpenseRequests } from './components/pages/ExpenseTrackerHome/saga';
import { watchDeleteExpenseRequests } from './components/pages/ExpenseTrackerHome/saga';
import watchAddExpenseRequests from './components/pages/AddExpense/saga';
import { watchSearchByName } from './components/pages/ExpenseTrackerHome/saga';
import { watchFetchExpenseGraphRequests} from './components/organisms/ShowExpenseGraph/saga'

export default function*() {
  yield all([watchForBookListSaga(),
    watchFetchExpenseRequests(),
    watchDeleteExpenseRequests(),
    watchAddExpenseRequests(),
    watchSearchByName(),
    //watchFetchExpenseGraphRequests(),
  ]);
}
