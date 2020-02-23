import { combineReducers } from 'redux'
import products from './products'
import stocks from './stocks'
import orders from './orders'
import categories from './categories'

export default combineReducers({
    products,
    categories,
    stocks,
    orders
})