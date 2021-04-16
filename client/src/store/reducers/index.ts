import { combineReducers } from "redux";
import { State } from "../../types/State";
import { currentReducer } from "./current";
import { jobReducer } from "./Job";
import { mapOptionsReducer } from "./MapOptions";
import { mapReducer } from "./Map";
import { modalReducer } from "./Modals";
import { statusReducer } from "./Status";
import { errorReducer } from "./Error";

export const reducer = combineReducers<State>({
    error: errorReducer,
    current: currentReducer,
    jobList: jobReducer,
    Microsoft: mapReducer,
    mapOptions: mapOptionsReducer,
    modals: modalReducer,
    statusList: statusReducer,
});
