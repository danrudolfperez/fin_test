import { combineReducers } from "redux";
import getUserReducer from "./getUserReducer";
import getCourseReducer from "./getCourseReducer";
import getMergedReducer from "./getMergedReducer";
import getCurrenciesReducer from "./getCurrenciesReducer";
import getFeesReducer from "./getFeesReducer";
import getConvertedFeesReducer from "./getConvertedFeesReducer";
import getFeesSymbolReducer from "./getFeesSymbolReducer";

export default combineReducers({
  getUserData: getUserReducer,
  getCourseData: getCourseReducer,
  getMergedData: getMergedReducer,
  getCurrenciesData: getCurrenciesReducer,
  getFeesData: getFeesReducer,
  getConvertedFeesData: getConvertedFeesReducer,
  getFeesSymbol: getFeesSymbolReducer,
});
