const filtredDataReducer = (state = null, action) => {
    switch (action.type) {
        case "GET_FILTRED_DEMANDES_SUCCESS":
            return action.payload;
        case "GET_FILTRED_DEMANDES_FAILURE":
            return null;
        case "CLEAR_FILTRED_DEMANDES":
            return action.payload;
        default:
            return state
    }
}

export default filtredDataReducer;
