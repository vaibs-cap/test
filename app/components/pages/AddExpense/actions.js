import {
    ADD_EXPENSE_REQUEST,
    ADD_EXPENSE_SUCCESS,
    ADD_EXPENSE_FAILURE,
} from "./constants";
export const addExpenseRequest = (expense) => ({
    type: ADD_EXPENSE_REQUEST,
    payload: expense,
});

export const addExpenseSuccess = (expense) => ({
    type: ADD_EXPENSE_SUCCESS,
    payload: expense,
});

export const addExpenseFailure = (error) => ({
    type: ADD_EXPENSE_FAILURE,
    payload: error,
});