import { all, fork } from "redux-saga/effects";
import todo from "./todo";
import user from "./user";
import history from './history';
import item from './item';
import axios from "axios";
import { backUrl } from "../config/config";

axios.defaults.baseURL = `${backUrl}/api`;

export default function* rootSaga() {
  yield all([fork(todo), fork(user), fork(history), fork(item)]);
}
