import { combineReducers } from "redux";
import todo from "./todo";
import user from "./user";
const rootReducer = combineReducers({
  todo,
  user,
});

export default rootReducer;
