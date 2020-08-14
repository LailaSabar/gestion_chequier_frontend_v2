const demandAdded = (state = false, action) => {
    switch (action.type) {
        case 'Signed':
            return [

                {
                    signed: true,
                }
            ]
        case 'Sign-Failure':
            return {
                signed: false,
            }

        case 'Closed-signature':
            return state;

        default:
            return state;
    }
}


export default demandAdded;