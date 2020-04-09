import { all, fork, takeLatest, call, put, delay } from "redux-saga/effects";
import {
  LOAD_TODOS_REQUEST,
  LOAD_TODOS_SUCCESS,
  LOAD_TODOS_FAILURE,
} from "../reducers/todo";

function loadTodosAPI() {}
function* loadTodos(action) {
  try {
    const result = yield call(loadTodosAPI, action.data);
    yield delay(2000);
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

export default function* todoSaga() {
  yield all([fork(watchLoadTodos)]);
}
