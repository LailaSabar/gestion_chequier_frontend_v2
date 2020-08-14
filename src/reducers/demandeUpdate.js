const demandeUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case 'UPDATE':
            return action.data;
        default:
            return state
    }
}

export default demandeUpdateReducer;