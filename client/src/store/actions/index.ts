import { CustomAction } from "../reducers";
import { SET_LOCATION, SET_FILTERS } from "../types/actions";
import { FilterOptions } from "../types/filters";

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

