const initialState = {
    loadResult: true,
    result: {},
    loadResults: true,
    results: []
}
const categories = (state=initialState, action) => {
    switch (action.type) {
        case 'GET_CATEGORIES':
            return {...state, loadResults: true}
        case 'CATEGORIES_RECEIVED':
            return {...state, loadResults: false, results: action.payload}
        default:
            return state
    }
}
export default categories;