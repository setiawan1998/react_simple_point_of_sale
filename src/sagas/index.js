import { all, fork } from 'redux-saga/effects'
import watcherProducts from './products'
import watcherStocks from './stocks'
import watcherCategories from './categories'
import watcherOrders from './orders'

export default function* rootSaga(){
    yield all([
        fork(watcherProducts),
        fork(watcherStocks),
        fork(watcherCategories),
        fork(watcherOrders)
    ])
}
