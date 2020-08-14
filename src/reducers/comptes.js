const comptesReducer = (state = [], action) => {
    switch (action.type) {
        case "GET_COMPTES_SUCCESS":
            return action.payload;
        case "GET_COMPTES_FAILURE":
            return [];
        default:
            return state
    }
}

export default comptesReducer