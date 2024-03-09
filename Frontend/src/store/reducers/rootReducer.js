import { combineReducers } from "redux";
import projectReducer from "./projectReducer";
import errorReducer from "./errorReducer";

const rootReducer = combineReducers({
  projects: projectReducer,
  errors: errorReducer
});

export default rootReducer;
