import { put, takeEvery } from 'redux-saga/effects';
import fetch from 'node-fetch';
import * as actions from '../constants/actions';
import { URL, USER } from '../constants/config';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchUser(action) {
  try {
    const body = {
      ...action.payload,
    };
    const user = fetch(`${URL}${USER}`, { method: 'GET', body });
    yield put({ type: actions.USER_FETCH_SUCCEEDED, user });
  } catch (e) {
    yield put({ type: actions.USER_FETCH_FAILED, message: e.message });
  }
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* mySaga() {
  yield takeEvery(actions.GET_USER, fetchUser);
}

export default mySaga;
