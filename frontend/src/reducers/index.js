import { combineReducers } from 'redux'

import errors from './error_reducer';

const rootReducer = combineReducers({
  errors
});

export default rootReducer;
