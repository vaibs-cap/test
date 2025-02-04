/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router/immutable';

import history from 'utils/history';
import languageProviderReducer from './components/pages/LanguageProvider/reducer';
import capReducer from './components/pages/Cap/reducer';
import bookListReducer from './components/pages/HomePage/reducer';
import expenseReducer from './components/pages/ExpenseTrackerHome/reducer';
import { expenseGraphReducer } from './components/organisms/ShowExpenseGraph/reducer';
//import expenseAddReducer from './components/pages/AddExpense/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    language: languageProviderReducer,
    loyaltyCap: capReducer,
    bookList: bookListReducer,
    expenses: expenseReducer,
    //expensesGraph : expenseGraphReducer,
    //expenses_add : expenseAddReducer,
    ...injectedReducers,
  });

  // Wrap the root reducer and return a new root reducer with router state
  const mergeWithRouterState = connectRouter(history);
  return mergeWithRouterState(rootReducer);
}
