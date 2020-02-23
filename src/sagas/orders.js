import { put, takeLatest } from 'redux-saga/effects'
import axios from 'axios'
import url from '../config/url'

function* fetchData(action){
    if(action.type==="GET_ORDERS"){
        const data = yield axios.get(`${url}/orders`).then((response)=>{
            return response.data.data
        })
        yield put({
            type: 'ORDERS_RECEIVED',
            payload: data
        })
    }else if(action.type==="SEARCH_ORDERS"){
        const data = yield axios.post(`${url}/order-search`, action.data).then((response)=>{
            return response.data.data
        })
        yield put({
            type: 'ORDERS_RECEIVED',
            payload: data
        })
    }else if(action.type==="GET_ORDER"){
        const data = yield axios.get(`${url}/order/${action.data}`).then((response)=>{
            return response.data.data
        })
        yield put({
            type: 'ORDER_RECEIVED',
            payload: data
        })
    }
}

export default function* watcherOrders(){
    yield takeLatest(['GET_ORDERS', 'SEARCH_ORDERS', 'GET_ORDER'], fetchData)
}