const initialState = {
    loadResult: true,
    result: [],
    loadResults: true,
    results: []
}
const orders = (state=initialState, action) => {
    switch (action.type) {
        case 'GET_ORDERS':
            return {...state, loadResults: true}
        case 'ORDERS_RECEIVED':
            return {...state, loadResults: false, results: action.payload}
        case 'ORDER_RECEIVED':
            return {...state, loadResult: false, result: action.payload}
        default:
            return state
    }
}
export default orders