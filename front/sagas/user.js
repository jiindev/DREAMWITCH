import { all, delay, put, takeLatest, fork, call, takeEvery } from "redux-saga/effects";
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
  REMOVE_FOLLOWING_SUCCESS,
  REMOVE_FOLLOWING_FAILURE,
  REMOVE_FOLLOWING_REQUEST,
  ADD_FOLLOWING_SUCCESS,
  ADD_FOLLOWING_FAILURE,
  ADD_FOLLOWING_REQUEST,
  LEVEL_UP_SUCCESS,
  LEVEL_UP_FAILURE,
  LEVEL_UP_REQUEST,
  EDIT_GREETINGS_SUCCESS,
  EDIT_GREETINGS_FAILURE,
  EDIT_GREETINGS_REQUEST,
  LOAD_TODAY_USERS_SUCCESS,
  LOAD_TODAY_USERS_FAILURE,
  LOAD_TODAY_USERS_REQUEST,
} from "../reducers/user";
import Router from 'next/router';
import { SAY_HELLO } from "../reducers/character";
import { ADD_HISTORIES_REQUEST } from "../reducers/history";
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

function loadUserAPI(userId) {
  return axios.get(userId? `/user/${userId}` : '/user', {
    withCredentials: true
  });
}

function* loadUser(action) {
  try {
    const result = yield call(loadUserAPI, action.data);
    yield put({
      type: LOAD_USER_SUCCESS,
      data: result.data,
      me: !action.data
    });
  } catch (e) {
    yield put({
      type: LOAD_USER_FAILURE,
      error: e,
    });
  }
}

function* watchLoadUser() {
  yield takeEvery(LOAD_USER_REQUEST, loadUser);
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
function removeFollowingAPI(userId) {
  return axios.delete(`user/${userId}/follow`, {
    withCredentials: true,
  })
}
function* removeFollowing(action) {
  try {
    const result = yield call(removeFollowingAPI, action.data);
    yield put({
      type: REMOVE_FOLLOWING_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: REMOVE_FOLLOWING_FAILURE,
      error: e,
    });
  }
}
function* watchRemoveFollowing() {
  yield takeLatest(REMOVE_FOLLOWING_REQUEST, removeFollowing);
}
function addFollowingAPI(userId) {
  return axios.post(`user/${userId}/follow`, {}, {
    withCredentials: true,
  })
}
function* addFollowing(action) {
  try {
    const result = yield call(addFollowingAPI, action.data);
    yield put({
      type: ADD_FOLLOWING_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    e.response && alert(e.response.data);
    yield put({
      type: ADD_FOLLOWING_FAILURE,
      error: e,
    });
  }
}
function* watchAddFollowing() {
  yield takeLatest(ADD_FOLLOWING_REQUEST, addFollowing);
}

function levelUpAPI(levelData) {
  return axios.patch(`/user/level`, levelData, {
    withCredentials: true
  });
}
function* levelUp(action) {
  try {
    const result = yield call(levelUpAPI, action.data);
    yield put({
      type: LEVEL_UP_SUCCESS,
      data: result.data,
    });
    yield put({
      type: ADD_HISTORIES_REQUEST,
      data: {
        type: 'levelUp',
        content: `나는 이제 ${action.data.level}!`
      }
    })
  } catch (e) {
    console.error(e);
    yield put({
      type: LEVEL_UP_FAILURE,
      error: e,
    });
  }
}
function* watchLevelUp() {
  yield takeLatest(LEVEL_UP_REQUEST, levelUp);
}

function editGreetingsAPI(GreetingsData) {
  return axios.patch(`/user/greetings`, GreetingsData, {
    withCredentials: true
  });
}
function* editGreetings(action) {
  try {
    const result = yield call(editGreetingsAPI, action.data);
    yield put({
      type: EDIT_GREETINGS_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: EDIT_GREETINGS_FAILURE,
      error: e,
    });
  }
}
function* watchEditGreetings() {
  yield takeLatest(EDIT_GREETINGS_REQUEST, editGreetings);
}

function loadTodayUsersAPI() {
  return axios.get('/users/rank', {
    withCredentials: true
  });
}

function* loadTodayUsers() {
  try {
    const result = yield call(loadTodayUsersAPI);
    yield put({
      type: LOAD_TODAY_USERS_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: LOAD_TODAY_USERS_FAILURE,
      error: e,
    });
  }
}

function* watchLoadTodayUsers() {
  yield takeLatest(LOAD_TODAY_USERS_REQUEST, loadTodayUsers);
}


export default function* userSaga() {
  yield all([
    fork(watchLogIn), 
    fork(watchSignUp),
    fork(watchLoadUser),
    fork(watchLogOut),
    fork(watchupdateLastStart),
    fork(watchRemoveFollowing),
    fork(watchAddFollowing),
    fork(watchLevelUp),
    fork(watchEditGreetings),
    fork(watchLoadTodayUsers)
  ]);
}
