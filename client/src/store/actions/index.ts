import { CustomAction } from "../reducers";
import { SET_LOCATION, SET_FILTERS, SET_MODALS, SHOW_DELETE_STATUS, SET_STATUSES } from "../types/actions";
import { FilterOptions } from "../types/filters";
import { ModalOptions } from "../types/modals";
import { StatusOptions } from "../types/statuses";

export const SetLocation = (location: { latitude: number; longitude: number; }): CustomAction => {
    return {
        type: SET_LOCATION,
        payload: location
    }
};

export const SetFilters = (filters: FilterOptions[]): CustomAction => {
    return {
        type: SET_FILTERS,
        payload: filters
    }
};

export const SetModals = (modals: ModalOptions): CustomAction => {
    return {
        type: SET_MODALS,
        payload: modals
    }
}

export const SetDeleteStatus = (status: StatusOptions): CustomAction => {
    return {
        type: SHOW_DELETE_STATUS,
        payload: status
    }
}

export const SetStatuses = (statuses: StatusOptions[]): CustomAction => {
    return {
        type: SET_STATUSES,
        payload: statuses
    }
}
