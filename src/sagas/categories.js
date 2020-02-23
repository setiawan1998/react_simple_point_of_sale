import { put, takeLatest } from 'redux-saga/effects'
import axios from 'axios'
import url from '../config/url'

function* fetchData() {
    const data = yield axios.get(`${url}/categories`).then((response)=>{
        return response.data.data
    })
    yield put({
        type: 'CATEGORIES_RECEIVED',
        payload: data
    })
}

export default function* watcherCategories() {
    yield takeLatest('GET_CATEGORIES', fetchData)
}