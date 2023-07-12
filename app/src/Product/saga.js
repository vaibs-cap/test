import { takeLatest,call,put, all} from "redux-saga/effects";
import * as types from './constants';
import { getProductFailure, getProductSuccess } from "./actions";

export function* watchForGetProducts(){
    yield takeLatest(types.GET_PRODUCT_REQUEST,getProductsSaga);
}

const getProducts = async(query)=>{
    const res=await fetch(query);
    const data=await res.json();
    return data.products;
}

export function* getProductsSaga(action){
    console.log("worker")
    try{
        const data = yield call(getProducts,action.query);
        console.log("fetched",data)
        yield put(getProductSuccess(data)); 
    }
    catch(error){
        yield put(getProductFailure(error))
    }
}

export default function*() {
    yield all([watchForGetProducts()]);
  }