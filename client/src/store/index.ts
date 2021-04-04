import { createStore } from "redux";
import { reducer } from "./reducers";
import { State } from "../types/State";
import { CustomAction } from "../types/CustomAction";

export const store = createStore<State, CustomAction, unknown, unknown>(
    reducer,
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
        (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);
