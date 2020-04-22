import { all, fork, takeLatest, call, put, delay } from "redux-saga/effects";
import { TODOS_CLEAR } from "../reducers/todo";
import axios from 'axios';
import { LOAD_HISTORIES_REQUEST, LOAD_HISTORIES_SUCCESS, LOAD_HISTORIES_FAILURE, ADD_HISTORIES_SUCCESS, ADD_HISTORIES_FAILURE, ADD_HISTORIES_REQUEST, LOAD_HISTORY_FAILURE, LOAD_HISTORY_REQUEST, LOAD_HISTORY_SUCCESS } from "../reducers/history";
import { SAY_LOAD_HISTORIES, SAY_ADD_HISTORY } from "../reducers/character";
import { GET_STARS } from "../reducers/user";

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
function loadHistoryAPI(historyId) {
  return axios.get(`/history/${historyId}`, {
    withCredentials: true
  });
}
function* loadHistory(action) {
  try {
    const result = yield call(loadHistoryAPI, action.data);
    yield put({
      type: LOAD_HISTORY_SUCCESS,
      data: {
        todos : result.data,
        historyId : action.data
      }
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOAD_HISTORY_FAILURE,
      error: e,
    });
  }
}
function* watchLoadHistory() {
  yield takeLatest(LOAD_HISTORY_REQUEST, loadHistory);
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
      yield put({
        type: GET_STARS,
        data: 10
      });
      yield put({
        type: SAY_ADD_HISTORY
      })
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
    fork(watchLoadHistory),
  ]);
}
