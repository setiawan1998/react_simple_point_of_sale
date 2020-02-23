import { put, takeLatest } from 'redux-saga/effects'
import axios from 'axios'
import url from '../config/url'

function* fetchData(){
    const data = yield axios.get(`${url}/products`)
        .then((response)=>{
            return response.data.data
        })
    yield put({
        type: 'PRODUCTS_RECEIVED',
        payload: data
    })
}

export default function* watcherProducts(){
    yield takeLatest('GET_PRODUCTS', fetchData)
}