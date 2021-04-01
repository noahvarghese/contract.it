import { FilterOptions } from "../types/filters";
import { State } from "../types/state";

export const SetFilters = (
    state: State,
    filters: FilterOptions[]
): State => ({
    ...state,
    filters
});

