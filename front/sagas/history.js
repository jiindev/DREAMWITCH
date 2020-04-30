import { all, fork, takeLatest, call, put, delay } from "redux-saga/effects";
import { TODOS_CLEAR } from "../reducers/todo";
import axios from 'axios';
import { LOAD_HISTORIES_REQUEST, LOAD_HISTORIES_SUCCESS, LOAD_HISTORIES_FAILURE, ADD_HISTORIES_SUCCESS, ADD_HISTORIES_FAILURE, ADD_HISTORIES_REQUEST, LOAD_HISTORY_FAILURE, LOAD_HISTORY_REQUEST, LOAD_HISTORY_SUCCESS, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE } from "../reducers/history";
import { SAY_LOAD_HISTORIES, SAY_ADD_HISTORY } from "../reducers/character";
import { GET_STARS } from "../reducers/user";

function loadHistoriesAPI(userId) {
  return axios.get(userId?`/histories/${userId}`:"/histories", {
    withCredentials: true
  });
}
function* loadHistories(action) {
  try {
    const result = yield call(loadHistoriesAPI, action.data);
    yield put({
      type: LOAD_HISTORIES_SUCCESS,
      data: result.data,
      me: !action.data
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
        todos : result.data.todos,
        comments : result.data.comments,
        historyId : action.data,
        userHistory: action.userHistory
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

  function addCommentAPI(historyData) {
    return axios.post(`/history/${historyData.historyId}/comment`, {content: historyData.content}, {
      withCredentials: true
    });
  }
  function* addComment(action) {
    try {
      const result = yield call(addCommentAPI, action.data);
      yield put({
        type: ADD_COMMENT_SUCCESS,
        data: {
          historyId: action.data.historyId,
          comment: result.data,
          userHistory: action.data.userHistory
        }
      });
    } catch (e) {
      console.error(e);
      yield put({
        type: ADD_COMMENT_FAILURE,
        error: e,
      });
    }
  }
  function* watchAddComment() {
    yield takeLatest(ADD_COMMENT_REQUEST, addComment);
  }


export default function* historySaga() {
  yield all([
    fork(watchLoadHistories),
    fork(watchAddHistory),
    fork(watchLoadHistory),
    fork(watchAddComment),
  ]);
}
