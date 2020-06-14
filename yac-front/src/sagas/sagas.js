import { put, takeEvery, all } from 'redux-saga/effects';
import fetch from 'node-fetch';
import Axios from 'axios';
import * as actions from '../constants/actions';
import { URL, USER, MESSAGE } from '../constants/config';

// worker Saga: will be fired on FETCH_USER actions
function* fetchUser(action) {
  console.log('fetchUser');
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

export function* updateChatState({ data: { meesageId, snapshot, userId } }) {
  console.log('updateChatState');
  try {
    if (snapshot) {
      yield put({
        type: actions.UPDATE_CHAT_SUCCESS,
        data: { userId, meesageId },
        payload: snapshot,
      });
    }
  } catch (e) {
    console.log(e);
  }
}

export function* postMessage({
  data: {
    currentMessage, openChannel, userId, username,
  },
}) {
  console.log('updateChatState');
  console.log(username);
  try {
    const body = {
      username,
      userId,
      message: currentMessage,
      channel: openChannel,
    };
    const result = yield Axios.post(`${URL}${MESSAGE}`, body);
    yield put({ type: actions.POST_MESSAGE_SUCCEEDED, result });
  } catch (e) {
    yield put({ type: actions.POST_MESSAGE_FAILED, message: e.message });
  }
}
/*
  Starts fetchUser on each dispatched `FETCH_USER` action.
  Allows concurrent fetches of user.
*/
function* watchFetchUser() {
  yield takeEvery(actions.FETCH_USER, fetchUser);
}
function* watchUpdateChatState() {
  yield takeEvery(actions.UPDATE_CHAT, updateChatState);
}
function* watchPostMessage() {
  yield takeEvery(actions.POST_MESSAGE, postMessage);
}

export default function* rootSaga() {
  yield all([
    watchFetchUser(),
    watchUpdateChatState(),
    watchPostMessage(),
  ]);
}
