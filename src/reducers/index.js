import isSubmitted from './isSubmitted';
import loggedReducer from './isLogged';
import { combineReducers } from 'redux';
import isSigned from './isSigned';
import dataReducer from './data';
import demandeUpdateReducer from './demandeUpdate';
import comptesReducer from './comptes';
import filtredDataReducer from './filtredData';

const allReducers = combineReducers({
  demand: isSubmitted,
  logged: loggedReducer,
  signed: isSigned,
  data: dataReducer,
  demandeUpdate : demandeUpdateReducer,
  comptes : comptesReducer,
  filtredData : filtredDataReducer,
});

const rootReducer = (state, action) => {

  if (action.type === 'loggedOut') {
    state = undefined
  }

  else if (action.type === 'Closed-submission') {
    state.demand = undefined
  }
  return allReducers(state, action)
}

export default rootReducer;