const dataReducer = (state = [], action) => {
    switch (action.type) {
        case "GET_DEMANDES_SUCCESS":
            return action.payload;
        case "GET_DEMANDES_FAILURE":
            return [];
        default:
            return state
    }
}

export default dataReducer;
