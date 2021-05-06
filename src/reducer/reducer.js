export const addSearchItem = (state = [], action) => {
    if (action.type === 'ADD_SEARCH_ITEM') {
        return [...state, action.payload]
        //push the search value into the old state
    }
    else {
        return state
    }
}