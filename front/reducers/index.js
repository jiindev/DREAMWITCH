import { combineReducers } from "redux";
import todo from "./todo";
import user from "./user";
import history from './history';
import character from './character';
const rootReducer = combineReducers({
  todo,
  user,
  history,
  character
});

export default rootReducer;
