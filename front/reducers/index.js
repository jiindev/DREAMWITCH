import { combineReducers } from "redux";
import todo from "./todo";
import user from "./user";
import history from './history';
const rootReducer = combineReducers({
  todo,
  user,
  history,
});

export default rootReducer;
