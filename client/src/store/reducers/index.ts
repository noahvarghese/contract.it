import { Action } from "redux";
import { State, InitialState } from "../types/state";
import {
    SET_FILTERS,
    SET_LOCATION,
    SET_MODALS,
    SET_STATUSES,
    SHOW_DELETE_STATUS,
    SHOW_UPDATE_STATUS,
} from "../constants";
import { SetLocation } from "./map";
import { SetFilters } from "./filters";
import { SetModals } from "./modals";
import { SetStatuses, SetDeleteStatus, SetUpdateStatus } from "./statuses";

export interface CustomAction extends Action {
    type: string;
    payload: any;
}

export const reducer = (
    state: State = InitialState,
    { type, payload }: CustomAction
) => {
    switch (type) {
        case SET_LOCATION:
            return SetLocation(state, payload);
        case SET_FILTERS:
            return SetFilters(state, payload);
        case SET_MODALS:
            return SetModals(state, payload);
        case SHOW_DELETE_STATUS:
            return SetDeleteStatus(state, payload);
        case SHOW_UPDATE_STATUS:
            return SetUpdateStatus(state, payload);
        case SET_STATUSES:
            return SetStatuses(state, payload);
        default:
            return state;
    }
};
