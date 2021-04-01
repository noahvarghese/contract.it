import { CustomAction } from "../reducers";
import { SET_LOCATION, SET_FILTERS, SET_MODALS } from "../types/actions";
import { FilterOptions } from "../types/filters";
import { ModalOptions } from "../types/modals";

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

