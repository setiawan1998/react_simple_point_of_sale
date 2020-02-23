import { put, takeLatest } from 'redux-saga/effects'
import axios from 'axios'
import url from '../config/url'

function* fetchData () {
    const data = yield axios.get(`${url}/stocks`).then(response=>{
        return response.data.data
    })
    yield put({
        type: 'STOCKS_RECEIVED',
        payload: data
    })
}

export default function* watcherStocks() {
    yield takeLatest('GET_STOCKS', fetchData)
}