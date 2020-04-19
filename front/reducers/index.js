import { combineReducers } from "redux";
import todo from "./todo";
import user from "./user";
import history from './history';
import character from './character';
import item from './item';
const rootReducer = combineReducers({
  todo,
  user,
  history,
  character,
  item
});

export default rootReducer;
