import { all, fork, takeLatest, call, put, delay } from "redux-saga/effects";
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
} from "../reducers/todo";
import axios from 'axios';
import { SAY_ADD_TODO, SAY_CHECK_TODO, SAY_EDIT_TODO, SAY_DELETE_TODO, SAY_LOAD_TODOS, SAY_HELLO} from "../reducers/character";

function loadTodosAPI(date) {
  return axios.get("/todos", {
    withCredentials: true
  });
}
function* loadTodos() {
  try {
    const result = yield call(loadTodosAPI);
    yield put({
      type: LOAD_TODOS_SUCCESS,
      data: {
        todos: result.data.todos,
        date: result.data.today,
      }
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

export default function* todoSaga() {
  yield all([
    fork(watchLoadTodos),
    fork(watchCheckTodo),
    fork(watchAddTodo),
    fork(watchEditTodo),
    fork(watchRemoveTodo),
  ]);
}
