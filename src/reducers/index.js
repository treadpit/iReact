import { combineReducers } from 'redux';
import actionTypes from '@/actions/types';

function userInfo(state = null, action) {
  switch (action.type) {
    case actionTypes.USERINFO:
      return action.data;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  userInfo,
});

export default rootReducer;
