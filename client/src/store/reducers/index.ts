import { combineReducers } from "redux";
import { State } from "../../types/State";
import { currentReducer } from "./current";
import { jobReducer } from "./Job";
import { mapReducer } from "./Map";
import { modalReducer } from "./Modals";
import { statusReducer } from "./Status";

export const reducer = combineReducers<State>({
    current: currentReducer,
    jobList: jobReducer,
    mapOptions: mapReducer,
    modals: modalReducer,
    statusList: statusReducer,
});
