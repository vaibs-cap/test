import {
    DELETE_EXPENSE_REQUEST,
    DELETE_EXPENSE_SUCCESS,
    DELETE_EXPENSE_FAILURE,
    SORT_EXPENSES_BY_CATEGORY,
    FETCH_EXPENSE_REQUEST,
    FETCH_EXPENSE_SUCCESS,
    FETCH_EXPENSE_FAILURE,
    EDIT_EXPENSE_REQUEST,
    EDIT_EXPENSE_SUCCESS,
    EDIT_EXPENSE_FAILURE,
    SET_LOADING,
    FILTERED_BY_MONTH,
    SEARCH_BY_NAME,
    SET_SEARCH_LIST,
    SET_SORT_BY,
} from "./constants";



export const deleteExpenseRequest = (id) => ({
    type: DELETE_EXPENSE_REQUEST,
    payload: id,
});

export const deleteExpenseSuccess = (id) => ({
    type: DELETE_EXPENSE_SUCCESS,
    payload: id,
});

export const deleteExpenseFailure = (error) => ({
    type: DELETE_EXPENSE_FAILURE,
    payload: error,
});

export const fetchExpenseRequest = () => {
    console.log("Inside fetch action");
    return {
        type: FETCH_EXPENSE_REQUEST,
    };
};

export const fetchExpenseSuccess = (expenses) => ({
    type: FETCH_EXPENSE_SUCCESS,
    payload: expenses,
});

export const fetchExpenseFailure = (error) => ({
    type: FETCH_EXPENSE_FAILURE,
    payload: error,
});

export const editExpenseRequest = (expense) => ({
    type: EDIT_EXPENSE_REQUEST,
    payload: expense,
});

export const editExpenseSuccess = (expense) => ({
    type: EDIT_EXPENSE_SUCCESS,
    payload: expense,
});

export const editExpenseFailure = (error) => ({
    type: EDIT_EXPENSE_FAILURE,
    payload: error,
});

export const sortByCategory = (category) => ({
    type: SORT_EXPENSES_BY_CATEGORY,
    payload: category,
});

export const filterByMonth = (month) => ({
    type: FILTERED_BY_MONTH,
    payload: month,
});
export const searchByName = (val) => ({
    type: SEARCH_BY_NAME,
    payload: val,
});

export const setSearchList = (list) => ({
    type: SET_SEARCH_LIST,
    payload: list,
});

export const setSortBy = (sortBy) => ({
    type: SET_SORT_BY,
    payload: sortBy,
});
