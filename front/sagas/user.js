import { all, delay, put, takeLatest, fork, call } from "redux-saga/effects";
import axios from "axios";
import {
  LOG_IN_FAILURE,
  LOG_IN_SUCCESS,
  LOG_IN_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  LOAD_USER_REQUEST,
  UPDATE_LASTSTART_SUCCESS,
  UPDATE_LASTSTART_FAILURE,
  UPDATE_LASTSTART_REQUEST,
  LOAD_FRIENDS_SUCCESS,
  LOAD_FRIENDS_FAILURE,
  LOAD_FRIENDS_REQUEST,
  REMOVE_FRIEND_SUCCESS,
  REMOVE_FRIEND_FAILURE,
  REMOVE_FRIEND_REQUEST,
  ADD_FRIEND_SUCCESS,
  ADD_FRIEND_FAILURE,
  ADD_FRIEND_REQUEST,
} from "../reducers/user";
import Router from 'next/router';
import { SAY_HELLO } from "../reducers/character";
function logInAPI(loginData) {
  return axios.post("/user/login", loginData, {
    withCredentials: true
  });
}

function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
    yield put({
      type: SAY_HELLO,
      data: result.data.nickname
    })
  } catch (e) {
    console.error(e);
    yield put({
      type: LOG_IN_FAILURE,
      error: e,
    });
  }
}

function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}

function logOutAPI() {
  return axios.post("/user/logout", {}, {
    withCredentials: true
  });
}

function* logOut() {
  try {
    yield call(logOutAPI);
    yield put({
      type: LOG_OUT_SUCCESS,
    });
    Router.push('/login');
  } catch (e) {
    console.error(e);
    yield put({
      type: LOG_OUT_FAILURE,
      error: e,
    });
  }
}

function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function signUpAPI(signUpData) {
  return axios.post("/user", signUpData);
}

function* signUp(action) {
  try {
    yield call(signUpAPI, action.data);
    yield put({
      type: SIGN_UP_SUCCESS,
    });
    alert('가입이 완료되었습니다.');
    Router.push('/login');
  } catch (e) {
    console.error(e);
    yield put({
      type: SIGN_UP_FAILURE,
      error: e,
    });
  }
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

function loadUserAPI() {
  return axios.get("/user", {
    withCredentials: true
  });
}

function* loadUser() {
  try {
    const result = yield call(loadUserAPI);
    yield put({
      type: LOAD_USER_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: LOAD_USER_FAILURE,
      error: e,
    });
  }
}

function* watchLoadUser() {
  yield takeLatest(LOAD_USER_REQUEST, loadUser);
}

function updateLastStartAPI(data) {
  return axios.patch(`/user/laststart`, data, {
    withCredentials: true
  });
}

function* updateLastStart(action) {
  try {
    const result = yield call(updateLastStartAPI, action.data);
    yield put({
      type: UPDATE_LASTSTART_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: UPDATE_LASTSTART_FAILURE,
      error: e,
    });
  }
}

function* watchupdateLastStart() {
  yield takeLatest(UPDATE_LASTSTART_REQUEST, updateLastStart);
}

function loadFriendsAPI() {
  return axios.get("/users", {
    withCredentials: true
  });
}

function* loadFriends() {
  try {
    const result = yield call(loadFriendsAPI);
    yield put({
      type: LOAD_FRIENDS_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: LOAD_FRIENDS_FAILURE,
      error: e,
    });
  }
}

function* watchLoadFriends() {
  yield takeLatest(LOAD_FRIENDS_REQUEST, loadFriends);
}

function removeFriendAPI(friendId) {
  return axios.delete(`user/friend/${friendId}`, {
    withCredentials: true,
  })
}
function* removeFriend(action) {
  try {
    const result = yield call(removeFriendAPI, action.data);
    yield put({
      type: REMOVE_FRIEND_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: REMOVE_FRIEND_FAILURE,
      error: e,
    });
  }
}
function* watchRemoveFriend() {
  yield takeLatest(REMOVE_FRIEND_REQUEST, removeFriend);
}
function addFriendAPI(friendData) {
  return axios.post(`user/friend`, friendData, {
    withCredentials: true,
  })
}
function* addFriend(action) {
  try {
    const result = yield call(addFriendAPI, action.data);
    yield put({
      type: ADD_FRIEND_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: ADD_FRIEND_FAILURE,
      error: e,
    });
  }
}
function* watchAddFriend() {
  yield takeLatest(ADD_FRIEND_REQUEST, addFriend);
}

export default function* userSaga() {
  yield all([
    fork(watchLogIn), 
    fork(watchSignUp),
    fork(watchLoadUser),
    fork(watchLogOut),
    fork(watchupdateLastStart),
    fork(watchLoadFriends),
    fork(watchRemoveFriend),
    fork(watchAddFriend),
  ]);
}
