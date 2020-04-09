import { all, call, fork } from "redux-saga/effects";
import todo from "./todo";
import user from "./user";

export default function* rootSaga() {
  yield all([fork(todo), fork(user)]);
}
