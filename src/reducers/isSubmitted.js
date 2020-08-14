const demandSubmitted = (state = false, action) => {

    switch (action.type) {

        case 'Submitted':
            return {
                submitted: true,
                demand: { ...action.payload }
            }
        case 'Submit-Failure':
            return {
                submitted: false,
            }

        case 'Closed-submission':
            return state;


        default:
            return state;

    }

};


export default demandSubmitted;