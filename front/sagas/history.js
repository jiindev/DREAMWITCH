import { all, fork, takeLatest, call, put, delay } from "redux-saga/effects";
import { TODOS_CLEAR } from "../reducers/todo";
import axios from 'axios';
import { LOAD_HISTORIES_REQUEST, LOAD_HISTORIES_SUCCESS, LOAD_HISTORIES_FAILURE, ADD_HISTORIES_SUCCESS, ADD_HISTORIES_FAILURE, ADD_HISTORIES_REQUEST } from "../reducers/history";
import { SAY_LOAD_HISTORIES } from "../reducers/character";

function loadHistoriesAPI() {
  return axios.get("/histories", {
    withCredentials: true
  });
}
function* loadHistories() {
  try {
    const result = yield call(loadHistoriesAPI);
    yield put({
      type: LOAD_HISTORIES_SUCCESS,
      data: result.data
    });
    yield put({
      type: SAY_LOAD_HISTORIES,
      data: result.data.length
    })
  } catch (e) {
    console.error(e);
    yield put({
      type: LOAD_HISTORIES_FAILURE,
      error: e,
    });
  }
}
function* watchLoadHistories() {
  yield takeLatest(LOAD_HISTORIES_REQUEST, loadHistories);
}

function addHistoryAPI(historyData) {
    return axios.post("/history", historyData, {
      withCredentials: true
    });
  }
  function* addHistory(action) {
    try {
      const result = yield call(addHistoryAPI, action.data);
      yield put({
        type: ADD_HISTORIES_SUCCESS,
        data: result.data
      });
      yield put({
        type: TODOS_CLEAR
      });
    } catch (e) {
      console.error(e);
      yield put({
        type: ADD_HISTORIES_FAILURE,
        error: e,
      });
    }
  }
  function* watchAddHistory() {
    yield takeLatest(ADD_HISTORIES_REQUEST, addHistory);
  }


export default function* historySaga() {
  yield all([
    fork(watchLoadHistories),
    fork(watchAddHistory),
  ]);
}
