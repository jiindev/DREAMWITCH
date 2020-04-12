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

function loadTodosAPI() {}
function* loadTodos(action) {
  try {
    const result = yield call(loadTodosAPI, action.data);
    yield put({
      type: LOAD_TODOS_SUCCESS,
      //   data: result.data,
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

function checkTodoAPI() {}
function* checkTodo(action) {
  try {
    const result = yield call(checkTodoAPI, action.data);
    yield put({
      type: CHECK_TODO_SUCCESS,
      // data: result.data,
      data: action.data,
    });
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
function addTodoAPI() {}
function* addTodo(action) {
  try {
    const result = yield call(addTodoAPI, action.data);
    yield put({
      type: ADD_TODO_SUCCESS,
      // data: result.data,
      data: {
        todoId: 1,
        content: "밥먹기",
        checked: false,
        User: { userId: 1 },
      },
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

function editTodoAPI() {}
function* editTodo(action) {
  try {
    const result = yield call(editTodoAPI, action.data);
    yield put({
      type: EDIT_TODO_SUCCESS,
      // data: result.data,
      data: action.data,
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

function removeTodoAPI() {}
function* removeTodo(action) {
  try {
    const result = yield call(removeTodoAPI, action.data);
    alert(action.data);
    yield put({
      type: REMOVE_TODO_SUCCESS,
      // data: result.data,
      data: action.data,
    });
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
