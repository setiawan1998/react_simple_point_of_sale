const initialState ={
    loadResult: true,
    result: {},
    loadResults: true,
    results: []
}
const stocks = (state=initialState, action) => {
    switch (action.type) {
        case 'GET_STOCS':
            return {...state, loadResults: true}
        case 'STOCKS_RECEIVED':
            return {...state, loadResults: false, results: action.payload}
        default:
            return state
    }
}
export default stocks