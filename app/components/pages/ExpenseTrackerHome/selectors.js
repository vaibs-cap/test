import { fromJS } from "immutable";
import { createSelector } from "reselect";
import { initialState } from './reducer';
import { setSearchList } from "./actions";

const selectExpenses = (state = fromJS({})) => state.get("expenses", initialState);
const selectSortBy = (state = fromJS({})) => state.get("sortBy", initialState);

const makeExpensesSelector = () =>
    createSelector(selectExpenses, (substate = fromJS({})) => {
        const searchList = substate.get("searchList");
        const expenses = substate.get("expenses");
        console.log(`searchList: ${searchList} expenses: ${expenses}`);
        return searchList && searchList.size > 0 ? searchList.toJS() : expenses.toJS();
    }
        //substate.get("expenses").toJS(),
    );
const makeLoadingSelector = () => 
    createSelector(selectExpenses, (substate = fromJS({})) =>
      substate.get("loading"),
    );
const makeErrorSelector = () =>
    createSelector(selectExpenses, (substate = fromJS({})) =>
        substate.get("error"),
    );
// const makeSortedExpensesSelector = () =>  createSelector(
//     [selectExpenses, selectSortBy],
//      (expenses, sortBy) => {
//         return expenses.sort((a, b) => {
//             if (sortBy === "name") {
//                 return a.name.localeCompare(b.name);
//             } else if (sortBy === "amount") {
//                 return b.amount - a.amount;  // Descending order
//             }
//             return 0;
//         });
//     }
// )

export {
    makeExpensesSelector,
    makeLoadingSelector,
    makeErrorSelector,
    //makeSortedExpensesSelector,
};
