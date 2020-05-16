import { all, fork, takeLatest, call, put, throttle } from "redux-saga/effects";
import { TODOS_CLEAR } from "../reducers/todo";
import axios from 'axios';
import { LOAD_HISTORIES_REQUEST, LOAD_HISTORIES_SUCCESS, LOAD_HISTORIES_FAILURE, ADD_HISTORIES_SUCCESS, ADD_HISTORIES_FAILURE, ADD_HISTORIES_REQUEST, LOAD_HISTORY_FAILURE, LOAD_HISTORY_REQUEST, LOAD_HISTORY_SUCCESS, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE, REMOVE_COMMENT_SUCCESS, REMOVE_COMMENT_FAILURE, REMOVE_COMMENT_REQUEST, LOAD_USER_HISTORIES_SUCCESS, LOAD_USER_HISTORIES_FAILURE, LOAD_USER_HISTORIES_REQUEST } from "../reducers/history";
import { GET_STARS, GET_EXP } from "../reducers/user";

function loadHistoriesAPI(lastId = 0, limit=5) {
  return axios.get(`/histories?lastId=${lastId}&limit=${limit}`, {
    withCredentials: true
  });
}
function* loadHistories(action) {
  try {
    const result = yield call(loadHistoriesAPI, action.lastId);
    yield put({
      type: LOAD_HISTORIES_SUCCESS,
      data: result.data,
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
  yield throttle(2000, LOAD_HISTORIES_REQUEST, loadHistories);
}

function loadUserHistoriesAPI(userId, lastId = 0, limit=5) {
  return axios.get(`/histories/${userId}?lastId=${lastId}&limit=${limit}`, {
    withCredentials: true
  });
}
function* loadUserHistories(action) {
  try {
    const result = yield call(loadUserHistoriesAPI, action.data, action.lastId);
    yield put({
      type: LOAD_USER_HISTORIES_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOAD_USER_HISTORIES_FAILURE,
      error: e,
    });
  }
}
function* watchLoadUserHistories() {
  yield takeLatest(LOAD_USER_HISTORIES_REQUEST, loadUserHistories);
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
      },
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
      if(result.data.type==='clearTodos'){
        yield put({
          type: TODOS_CLEAR
        });
        yield put({
          type: GET_STARS,
          data: 10
        });
        yield put({
          type: GET_EXP
        });
      }
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
        },
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

  function removeCommentAPI(commentId) {
    return axios.delete(`/history/comment/${commentId}`, {
      withCredentials: true
    });
  }
  function* removeComment(action) {
    try {
      const result = yield call(removeCommentAPI, action.data.commentId);
      
      yield put({
        type: REMOVE_COMMENT_SUCCESS,
        data: {
          commentId: result.data,
          historyId: action.data.historyId,
        },
      });
    } catch (e) {
      console.error(e);
      yield put({
        type: REMOVE_COMMENT_FAILURE,
        error: e,
      });
    }
  }
  function* watchRemoveComment() {
    yield takeLatest(REMOVE_COMMENT_REQUEST, removeComment);
  }


export default function* historySaga() {
  yield all([
    fork(watchLoadHistories),
    fork(watchLoadUserHistories),
    fork(watchAddHistory),
    fork(watchLoadHistory),
    fork(watchAddComment),
    fork(watchRemoveComment),
  ]);
}
