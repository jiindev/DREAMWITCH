import { all, delay, put, takeLatest, fork, call } from "redux-saga/effects";
import axios from "axios";
import {
  LOG_IN_FAILURE,
  LOG_IN_SUCCESS,
  LOG_IN_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
} from "../reducers/user";

function logInAPI(loginData) {
  return axios.post("/user/login", loginData);
}

function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
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

function signUpAPI(signUpData) {
  return axios.post("/user", signUpData);
}

function* signUp(action) {
  try {
    yield call(signUpAPI, action.data);
    yield put({
      type: SIGN_UP_SUCCESS,
    });
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

export default function* userSaga() {
  yield all([fork(watchLogIn), fork(watchSignUp)]);
}
