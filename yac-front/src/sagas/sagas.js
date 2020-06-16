import { put, takeEvery, all } from 'redux-saga/effects';
import Axios from 'axios';
import * as actions from '../constants/actions';
import { URL, USER, MESSAGE } from '../constants/config';
import firebase from '../store/firebase';

// worker Saga: will be fired on FETCH_USER actions
function* fetchUser(action) {
  console.log('fetchUser');
  try {
    const params = {
      ...action.data,
    };
    const { data } = yield Axios.post(`${URL}${USER}`, params);
    yield put({ type: actions.USER_FETCH_SUCCEEDED, data });
  } catch (e) {
    console.log(e);
    yield put({ type: actions.USER_FETCH_FAILED, message: e.message });
  }
}

export function* createUserWithEmailAndPassword({ data: { email, password } }) {
  console.log('createUserWithEmailAndPassword');
  try {
    if (email && password) {
      const response = yield firebase.auth().createUserWithEmailAndPassword(email, password);
      yield put({
        type: actions.CREATE_USER_SUCCESS,
        payload: response,
      });
    }
  } catch (e) {
    console.log(e);
    yield put({
      type: actions.CREATE_USER_FAILED,
      payload: e,
    });
  }
}

export function* signInWithEmailAndPassword({ data: { email, password } }) {
  console.log('signInWithEmailAndPassword');
  try {
    if (email && password) {
      const response = yield firebase.auth().signInWithEmailAndPassword(email, password);
      yield put({
        type: actions.SIGN_IN_SUCCESS,
        payload: response,
      });
    }
  } catch (e) {
    console.log(e);
    yield put({
      type: actions.SIGN_IN_FAILED,
      payload: e,
    });
  }
}

export function* signOut() {
  console.log('signOut');
  try {
    const response = yield firebase.auth().signOut();
    yield put({
      type: actions.SIGN_OUT_SUCCESS,
      payload: response,
    });
  } catch (e) {
    console.log(e);
    yield put({
      type: actions.SIGN_OUT_FAILED,
      payload: e,
    });
  }
}

export function* signInWithSocial({ data: { provider } }) {
  console.log('signInWithSocial');
  console.log(provider);
  try {
    if (provider) {
      let authProvider;
      switch (provider) {
        case 'GOOGLE':
          console.log('entra');
          authProvider = new firebase.auth.GoogleAuthProvider();
          break;
        case 'FACEBOOK':
          authProvider = new firebase.auth.FacebookAuthProvider();
          break;
        case 'GITHUB':
          authProvider = new firebase.auth.GithubAuthProvider();
          break;
        default:
          break;
      }
      const response = yield firebase.auth()
        .signInWithPopup(authProvider);
      yield put({
        type: actions.SIGN_IN_SUCCESS,
        payload: response,
      });
    }
  } catch (e) {
    console.log(e);
    yield put({
      type: actions.SIGN_IN_FAILED,
      payload: e,
    });
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
      yield put({
        type: actions.SCROLL_DOWN,
        payload: true,
      });
      yield put({
        type: actions.SCROLL_DOWN,
        payload: false,
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
function* watchCreateUserWithEmailAndPassword() {
  yield takeEvery(actions.CREATE_USER_WITH_EMAIL_AND_PASSWORD, createUserWithEmailAndPassword);
}
function* watchSignInWithEmailAndPassword() {
  yield takeEvery(actions.SIGN_IN_WITH_EMAIL_AND_PASSWORD, signInWithEmailAndPassword);
}
function* watchSignInWithSocial() {
  yield takeEvery(actions.SIGN_IN_WITH_SOCIAL, signInWithSocial);
}
function* watchSignOut() {
  yield takeEvery(actions.SIGN_OUT, signOut);
}
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
    watchCreateUserWithEmailAndPassword(),
    watchSignInWithEmailAndPassword(),
    watchSignInWithSocial(),
    watchSignOut(),
    watchFetchUser(),
    watchUpdateChatState(),
    watchPostMessage(),
  ]);
}
