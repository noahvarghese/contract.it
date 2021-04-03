import { State } from "../types/state";
import { StatusOptions } from "../types/statuses";

export const SetDeleteStatus = (state: State, status: StatusOptions): State => {
    return {
        ...state,
        modals: {
            showCreateCustomer: false,
            showCreateStatus: false,
            showStatuses: false,
            showDeleteStatus: true,
            showUpdateStatus: false
        },
        current: {
            ...state.current,
            status
        }
    }
};

export const SetUpdateStatus = (state: State, status: StatusOptions): State => {
    return {
        ...state,
        modals: {
            showCreateCustomer: false,
            showCreateStatus: false,
            showStatuses: false,
            showDeleteStatus: false,
            showUpdateStatus: true
        },
        current: {
            ...state.current,
            status
        }
    }
}

export const SetStatuses = (state: State, statuses: StatusOptions[]): State => {
    return {
        ...state,
        statuses
    }
}