import { combineReducers } from "redux";
import getUserReducer from "./getUserReducer";
import getCourseReducer from "./getCourseReducer";
import getMergedReducer from "./getMergedReducer";

export default combineReducers({
  getUserData: getUserReducer,
  getCourseData: getCourseReducer,
  getMergedData: getMergedReducer,
});
