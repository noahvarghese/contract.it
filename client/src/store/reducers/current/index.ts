import { combineReducers } from "redux";
import { currentJobReducer } from "./Job";
import { currentStatusReducer } from "./Status";

export const currentReducer = combineReducers({
    status: currentStatusReducer,
    job: currentJobReducer,
});
