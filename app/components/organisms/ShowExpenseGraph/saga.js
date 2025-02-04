// import * as types from './constants';
// import { call, put, all, takeLatest} from 'redux-saga/effects';

// const Api_Url = "http://localhost:3000/expenses";
// function* fetchExpenseGraph() {
//     try {
//         const response = yield call(fetch, Api_Url);
//         const data = yield response.json();
//         yield put({type: types.FETCH_EXPENSE_GRAPH_SUCCESS, payload: data});
//     } catch (error) {
//         yield put({type: types.FETCH_EXPENSE_GRAPH_FAILURE, error });
//     }
// }


// export function* watchFetchGraphExpenseRequests() {
//     yield takeLatest(types.FETCH_EXPENSE_GRAPH_REQUEST, fetchExpenseGraph);
// }
// export default function*(){
//     yield all([
//         watchFetchGraphExpenseRequests,
//     ]);
// }