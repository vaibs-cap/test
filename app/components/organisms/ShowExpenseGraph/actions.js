import {
    FETCH_EXPENSE_GRAPH_REQUEST,
    FETCH_EXPENSE_GRAPH_SUCCESS,
    FETCH_EXPENSE_GRAPH_FAILURE,
} from './constants'
export const fetchExpenseRequest = () => {
    console.log("Inside fetch action");
    return {
        type: FETCH_EXPENSE_GRAPH_REQUEST,
    };
};

export const fetchExpenseSuccess = (expenses) => ({
    type: FETCH_EXPENSE_GRAPH_SUCCESS,
    payload: expenses,
});

export const fetchExpenseFailure = (error) => ({
    type: FETCH_EXPENSE_GRAPH_FAILURE,
    payload: error,
});