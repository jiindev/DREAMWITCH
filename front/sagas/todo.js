import { all, fork, takeLatest, call, put } from "redux-saga/effects";
import {
  LOAD_TODOS_REQUEST,
  LOAD_TODOS_SUCCESS,
  LOAD_TODOS_FAILURE,
  CHECK_TODO_REQUEST,
  CHECK_TODO_SUCCESS,
  CHECK_TODO_FAILURE,
  ADD_TODO_SUCCESS,
  ADD_TODO_FAILURE,
  ADD_TODO_REQUEST,
  EDIT_TODO_SUCCESS,
  EDIT_TODO_FAILURE,
  EDIT_TODO_REQUEST,
  REMOVE_TODO_SUCCESS,
  REMOVE_TODO_FAILURE,
  REMOVE_TODO_REQUEST,
  LOAD_LAST_TODOS_SUCCESS,
  LOAD_LAST_TODOS_FAILURE,
  LOAD_LAST_TODOS_REQUEST,
  CLEAN_LAST_TODOS_SUCCESS,
  CLEAN_LAST_TODOS_FAILURE,
  CLEAN_LAST_TODOS_REQUEST,
} from "../reducers/todo";
import axios from 'axios';
import { SAY_ADD_TODO, SAY_CHECK_TODO, SAY_EDIT_TODO, SAY_DELETE_TODO, SAY_LAST} from "../reducers/character";
import { UPDATE_LASTSTART_REQUEST } from "../reducers/user";

function loadTodosAPI(userId) {
  return axios.get(userId?`/todos/${userId}`:`/todos`, {
    withCredentials: true
  });
}
function* loadTodos(action) {
  try {
    const result = yield call(loadTodosAPI, action.data);
    yield put({
      type: LOAD_TODOS_SUCCESS,
      data: {
        todos: result.data,
      },
      me: !action.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOAD_TODOS_FAILURE,
      error: e,
    });
  }
}
function* watchLoadTodos() {
  yield takeLatest(LOAD_TODOS_REQUEST, loadTodos);
}

function checkTodoAPI(todoData) {
  return axios.patch(`/todo/${todoData.id}/check`, {checked: todoData.checked}, {
    withCredentials: true
  });
}
function* checkTodo(action) {
  try {
    const result = yield call(checkTodoAPI, action.data);
    yield put({
      type: CHECK_TODO_SUCCESS,
      data: result.data,
    });
    if(result.data.checked===true){
      yield put({
        type: SAY_CHECK_TODO
      });
    }
  } catch (e) {
    console.error(e);
    yield put({
      type: CHECK_TODO_FAILURE,
      error: e,
    });
  }
}
function* watchCheckTodo() {
  yield takeLatest(CHECK_TODO_REQUEST, checkTodo);
}
function addTodoAPI(todoData) {
  return axios.post("/todo", todoData, {
    withCredentials: true
  });
}
function* addTodo(action) {
  try {
    const result = yield call(addTodoAPI, action.data);
    yield put({
      type: ADD_TODO_SUCCESS,
      data: result.data,
    });
    yield put({
      type: SAY_ADD_TODO
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: ADD_TODO_FAILURE,
      error: e,
    });
  }
}
function* watchAddTodo() {
  yield takeLatest(ADD_TODO_REQUEST, addTodo);
}

function editTodoAPI(todoData) {
  return axios.patch(`/todo/${todoData.id}`, {content: todoData.content}, {
    withCredentials: true
  });
}
function* editTodo(action) {
  try {
    const result = yield call(editTodoAPI, action.data);
    yield put({
      type: EDIT_TODO_SUCCESS,
      data: result.data,
    });
    yield put({
      type: SAY_EDIT_TODO
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: EDIT_TODO_FAILURE,
      error: e,
    });
  }
}
function* watchEditTodo() {
  yield takeLatest(EDIT_TODO_REQUEST, editTodo);
}

function removeTodoAPI(todoId) {
  return axios.delete(`todo/${todoId}`, {
    withCredentials: true,
  })
}
function* removeTodo(action) {
  try {
    const result = yield call(removeTodoAPI, action.data);
    yield put({
      type: REMOVE_TODO_SUCCESS,
      data: result.data,
    });
    yield put({
      type: SAY_DELETE_TODO,
    })
  } catch (e) {
    console.error(e);
    yield put({
      type: REMOVE_TODO_FAILURE,
      error: e,
    });
  }
}
function* watchRemoveTodo() {
  yield takeLatest(REMOVE_TODO_REQUEST, removeTodo);
}

function loadLastTodosAPI(lastStart) {
  return axios.get(`/todos/last/${encodeURIComponent(lastStart)}`, {
    withCredentials: true
  });
}
function* loadLastTodos(action) {
  try {
    const result = yield call(loadLastTodosAPI, action.data);
    yield put({
      type: LOAD_LAST_TODOS_SUCCESS,
      data: result.data
    });
    if(result.data[0]){
      yield put({
        type: SAY_LAST,
        data: result.data
      })
    }
  } catch (e) {
    console.error(e);
    yield put({
      type: LOAD_LAST_TODOS_FAILURE,
      error: e,
    });
  }
}
function* watchLoadLastTodos() {
  yield takeLatest(LOAD_LAST_TODOS_REQUEST, loadLastTodos);
}

function deleteLastTodosAPI(date) {
  return axios.delete(`/todos/last/${encodeURIComponent(date)}`, {
    withCredentials: true
  });
}
function addLastTodosAPI(data) {
  return axios.post("/todos", data, {
    withCredentials: true
  });
}

function* cleanLastTodos(action) {
  try {
    if(!action.data.isCleared){
      yield call(deleteLastTodosAPI, action.data.lastDate);
    }
    const result = yield call(addLastTodosAPI, action.data);
    yield put({
      type: CLEAN_LAST_TODOS_SUCCESS,
      data: result.data
    });
    yield put({
      type: UPDATE_LASTSTART_REQUEST,
      data: action.data
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: CLEAN_LAST_TODOS_FAILURE,
      error: e,
    });
  }
}
function* watchCleanLastTodos() {
  yield takeLatest(CLEAN_LAST_TODOS_REQUEST, cleanLastTodos);
}


export default function* todoSaga() {
  yield all([
    fork(watchLoadTodos),
    fork(watchCheckTodo),
    fork(watchAddTodo),
    fork(watchEditTodo),
    fork(watchRemoveTodo),
    fork(watchLoadLastTodos),
    fork(watchCleanLastTodos),
  ]);
}
