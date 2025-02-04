import * as types from "./constants";
import { fromJS } from "immutable";

export const initialState = fromJS({
    expenses: [],
    loading: false,
    error: null,
    searchList: [],
    sortBy: "description",
    // filteredExpenses: [],
    // sortCategory: "",
    // filterByMonth: "",
});

export const expenseReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_EXPENSE_REQUEST:
            return state.set('loading', true).set('error', action.error);
        case types.FETCH_EXPENSE_SUCCESS:
            return state.set('loading', false).set('expenses', fromJS(action.payload)).set('searchList', []);
        case types.FETCH_EXPENSE_FAILURE:
            return state.set('loading', false).set('error', action.payload);

        case types.EDIT_EXPENSE_REQUEST:
            return  state.set('loading', true).set('error', action.error);
        case types.EDIT_EXPENSE_SUCCESS:
            return state.set('loading', false).update('expenses', 
                expenses.map(expense =>
                    expense.id === action.payload.id ? action.payload : expense
                )
            );
        case types.EDIT_EXPENSE_FAILURE:
            return state.set('loading', false).set('error', action.error);

        case types.DELETE_EXPENSE_REQUEST:
            return state.set('loading', true).set('error', null);
        case types.DELETE_EXPENSE_SUCCESS:
            return state
            .update('expenses', expenses => expenses.filter(expense => expense.get('id') !== action.payload),)
            .set('loading', false);
            
        // case types.DELETE_EXPENSE_FAILURE:
        //     return state.set('loading', false).set('error', action.payload);
        
        case types.SET_SEARCH_LIST:
            return state.set('searchList', fromJS(action.payload));
        
        case types.SET_SORT_BY:
            return state.update("expenses", (expenses) =>
                expenses.sort((a, b) => {
                   if (action.payload === "amountAsc") {
                    return a.get("amount") - b.get("amount");
                  } else if (action.payload === "categoryAsc") {
                    return a.get("category").localeCompare(b.get("category"));
                  }
                  return 0;
                })
              );
        // case types.SORT_EXPENSES_BY_CATEGORY:
        //     return state.set('sortCategory', action.payload).update('filteredExpenses', expenses => (
        //         state.expenses.filter(exp => exp.category === action.payload)
        //     ));
        // case types.FILTERED_BY_MONTH:
        //     return (state.set('filterByMonth', action.payload).update('filteredExpenses', expenses => (
        //         state.expenses.filter(exp => exp.date.startsWith(action.payload))
        //     )));
           
        default:
            return state;
    }
};

export default expenseReducer;