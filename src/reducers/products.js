const initialState = {
    loadResult: true,
    result: {},
    loadResults: true,
    results: []
}
const products = (state=initialState, action) => {
    switch (action.type) {
        case 'GET_PRODUCTS':
            return { ...state, loadResults: true}
        case 'PRODUCTS_RECEIVED':
                return { ...state, results: action.payload, loadResults: false}
        case 'GET_PRODUCT':
            return { ...state, loadResult: true}
        case 'PRODUCT_RECEIVED':
                return { ...state, result: action.payload, loadResult: false}
        default:
            return state
    }
}
export default products