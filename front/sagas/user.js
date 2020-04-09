import { all, delay, put, takeLatest, fork, call } from "redux-saga/effects";
import {
  LOG_IN_FAILURE,
  LOG_IN_SUCCESS,
  LOG_IN_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
} from "../reducers/user";

function logInAPI() {}

function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data);
    yield delay(2000);
    yield put({
      type: LOG_IN_SUCCESS,
      // data: result.data,
      data: action.data,
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

function signUpAPI() {}

function* signUp(action) {
  try {
    const result = yield call(signUpAPI, action.data);
    yield delay(2000);
    yield put({
      type: SIGN_UP_SUCCESS,
      // data: result.data,
      data: action.data,
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
