import { call, put, all, takeLatest } from 'redux-saga/effects';
import * as types from './constants';

const JsonUrl = "http://localhost:3000/expenses";

function* fetchExpenseSaga() {
     //console.log("inside worker saga");
    try {
        //console.log("inside FetchWorkerSaga");
        const response = yield call(fetch, JsonUrl);
        const data = yield response.json();
         //console.log("data", data);
        yield put({ type: types.FETCH_EXPENSE_SUCCESS, payload: data });
    } catch (error) {
        yield put({ type: types.FETCH_EXPENSE_FAILURE, payload: error.message });
    }
}

function* editExpenseRequest(action) {
    try {
        const response = yield call(() =>
            fetch(`${JsonUrl}/${action.payload.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(action.payload.updatedData),
            }).then(res => res.json())
        );
        yield put({ type: types.EDIT_EXPENSE_SUCCESS, payload: response });
    } catch (error) {
        yield put({ type: types.EDIT_EXPENSE_FAILURE, payload: error });
    }
}

function* delExpenseRequest(action) {
    try {
        console.log("Inside del saga");
        yield call(() =>
            fetch(`${JsonUrl}/${action.payload}`, {
                method: 'DELETE',
            }),
        );
        // Dispatch success with the deleted expense id
        yield put({ type: types.DELETE_EXPENSE_SUCCESS, payload: action.payload });
    } catch (error) {
        yield put({ type: types.DELETE_EXPENSE_FAILURE, payload: error });
    }
}

// function* searchByNameSaga(action) {
//     try {
//         let response = yield call(fetch, `https://localhost:8001/expenses?description=${action.payload}`);
//         response = yield response.json();
//         console.log('search saga response:', response);
//         yield put({ type: types.SET_SEARCH_LIST, payload: response});
//     } catch (error) {
//         console.log('search saga error:', error);
//     }
// }


export function* watchDeleteExpenseRequests() {
    yield takeLatest(types.DELETE_EXPENSE_REQUEST, delExpenseRequest);
}

export function* watchFetchExpenseRequests() {
    yield takeLatest(types.FETCH_EXPENSE_REQUEST, fetchExpenseSaga);
}

export function* watchEditExpenseRequests() {
    yield takeLatest(types.EDIT_EXPENSE_REQUEST, editExpenseRequest);
}

// export function* watchSearchByName() {
//     yield takeLatest(types.SEARCH_BY_NAME, searchByNameSaga);
// }

export default function*() {
    yield all([
        watchAddExpenseRequests(),
        watchDeleteExpenseRequests(),
        watchFetchExpenseRequests(),
        watchEditExpenseRequests(),
       // watchSearchByName(),
    ]);
}

// for delExpenseRequest
// yield call(() =>
//     fetch(`${JsonUrl}/${action.payload}`, {
//         method: "DELETE",
//     })
// );
// // Dispatch success with the deleted expense id
// yield put({ type: types.DELETE_EXPENSE_SUCCESS, payload: action.payload });