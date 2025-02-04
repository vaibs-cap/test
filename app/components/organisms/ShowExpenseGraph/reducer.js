// import { fromJS } from "immutable";
// import {
//     FETCH_EXPENSE_GRAPH_SUCCESS,
//     FETCH_EXPENSE_GRAPH_FAILURE,
//     FETCH_EXPENSE_GRAPH_REQUEST,
// } from './constants';

// export const initialState = fromJS({
//     expenses: [],
//     loading: false,
//     error: null,
// });

// export const expenseGraphReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case FETCH_EXPENSE_GRAPH_REQUEST:
//             return state.set("loading", true).set("error", null);
//         case FETCH_EXPENSE_GRAPH_SUCCESS:
//             return state.set("loading", false).set("expenses", fromJS(action.payload));
//         case FETCH_EXPENSE_GRAPH_FAILURE:
//             return state.set("loading", false).set("error", action.payload);
//         default:
//             return state;
//     }
// };