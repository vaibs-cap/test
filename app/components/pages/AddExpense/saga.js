import { call, all, put, takeLatest } from "redux-saga/effects";
import * as types from "./constants"; 

const JsonUrl = "http://localhost:3000/expenses";

function* addExpenseRequestSaga(action) {
    console.log("inside addExpenseRequestSaga");
    const data = yield call(fetch, JsonUrl);
    const dataJson =  yield data.json();
    //const expensesArray = dataJson.toJS();
    const maxId = dataJson.length > 0 ? Math.max(...dataJson.map(exp => parseInt(exp.id, 10))) : 0;    
    const newId = (maxId + 1).toString();
    const newExpense = { ...action.payload, id: newId};
    try {
        const response = yield call(() =>
            fetch(JsonUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newExpense),
            }).then(res => res.json())
        );
       // yield put({ type: types.ADD_EXPENSE_SUCCESS, payload: response });
    } catch (error) {
        console.log("error", error);
     }
}

export default function* watchAddExpenseRequests() {
    yield takeLatest(types.ADD_EXPENSE_REQUEST, addExpenseRequestSaga);
}
// export default function* (){
//     yield all([
//         watchAddExpenseRequests(),
//     ]);
// }