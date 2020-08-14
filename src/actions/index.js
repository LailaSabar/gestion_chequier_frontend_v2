import axios from 'axios';
export const submitDemand = (payload) => {
    return {
        type : 'Submitted',
        payload
    }
}

export const submitDemandFailure = (payload) => {
    return {
        type : 'Submit-Failure',
        payload
    }
}

export const signDemande = () => {
    return {
        type : 'Signed'
    }
}

export const signDemandeFailure = () => {
    return {
        type : 'Sign-Failure'
    }
}

export const login = (payload) => {
    return {
        type : 'loggedIn',
        payload
    }
}

export const logout = () => {
    return {
        type : 'loggedOut'
    }
}

export const closedSub = () => {
    return {
        type : 'Closed-submission'
    }
}

export const closedSign = () => {
    return {
        type : 'Closed-signature'
    }
}

export const loginFailed = () => {
    return {
        type : 'loginFailed'
    }
}

  
  export const getDemandesSuccess = demandes => {
    return {
      type: "GET_DEMANDES_SUCCESS",
      payload: demandes
    }
  }
  
  export const getDemandesFailure = error => {
    return {
      type: "GET_DEMANDES_FAILURE",
      payload: error
    }
  }
  
  export const getAbonne = () => {
    return {
      type: 'SIGN_IN',
    }
  };
  
  export const getDemandeUpdate = (demande) => {
    return {
      type: 'UPDATE',
      data: demande
    }
  };
  
  export const getComptes = (id) => {
    return (dispatch) => {
      axios
        .get('http://localhost:8080/abonnes/' + id + '/comptes')
        .then(response => {
          const result = response.data;
          const listComptes = result._embedded.comptes;
          dispatch(getComptesSuccess(listComptes))
        })
        .catch(error => {
          dispatch(getComptesFailure(error.message))
        })
    }
  }
  
  export const getComptesSuccess = demandes => {
    return {
      type: "GET_COMPTES_SUCCESS",
      payload: demandes
    }
  }
  
  export const getComptesFailure = error => {
    return {
      type: "GET_COMPTES_FAILURE",
      payload: error
    }
  }
  
  
  export const clearFiltredData = () => {
    return {
      type: "CLEAR_FILTRED_DEMANDES",
      payload: null
    }
  }
  
  export const getFiltredDemandesSuccess = demandes => {
    return {
      type: "GET_FILTRED_DEMANDES_SUCCESS",
      payload: demandes
    }
  }
  
  export const getFiltredDemandesFailure = error => {
    return {
      type: "GET_FILTRED_DEMANDES_FAILURE",
      payload: error
    }
  }
  
