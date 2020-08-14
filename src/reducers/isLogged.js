const loggedReducer = (state = false, action) => {

    switch (action.type) {

        case 'loggedIn':
            return {
                loggedIn: true,
                user: { ...action.payload }
            }
        case 'loggedOut':
            return {
                loggedIn: false,
                user: {}
            }

        case 'loginFailed':
             return {
                loggedIn: false,
                }


        default:
            return state;

    }

};

export default loggedReducer;