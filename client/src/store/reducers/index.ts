import { combineReducers } from "redux";
import { State } from "../../types/State";
import { currentReducer } from "./current";
import { jobReducer } from "./Job";
import { mapOptionsReducer } from "./MapOptions";
import { mapReducer } from "./Map";
import { modalReducer } from "./Modals";
import { statusReducer } from "./Status";

export const reducer = combineReducers<State>({
    current: currentReducer,
    jobList: jobReducer,
    MicrosoftMaps: mapReducer,
    mapOptions: mapOptionsReducer,
    modals: modalReducer,
    statusList: statusReducer,
});
