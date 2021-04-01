import { State } from "../types/state";
import { ModalOptions } from "../types/modals";

export const SetModals = (state: State, modals: ModalOptions): State => {
    return {
        ...state,
        modals
    }
}