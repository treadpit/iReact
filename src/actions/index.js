import actionTypes from './types';
import api from '../api';
// import { showDialog, getCurrentRoute } from './common';

export function userInfo() {
  return dispatch => {
    api.getUserInfo().then(
      resp => {
        dispatch({
          type: actionTypes.DIALOG,
          data: resp
        });
      },
      () => {}
    );
  };
};
