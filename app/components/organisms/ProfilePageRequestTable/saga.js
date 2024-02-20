import axios from "axios";
import { put, call, takeLatest } from "redux-saga/effects";
import {
  receiveTaskFailure,
  receiveTaskSuccess,
} from "../components/redux/actions";
import { FETCH_TASK } from "../components/redux/constants";

function* onFetchTask() {
  try {
    const res = yield call(axios.get, ["http://localhost:3000/tasks"]);
    console.log(res.data);
    yield put(receiveTaskSuccess(res.data));
  } catch (err) {
    yield put(receiveTaskFailure(err));
  }
}

export function* fetchTasksSaga() {
  yield takeLatest(FETCH_TASK, onFetchTask);
}
